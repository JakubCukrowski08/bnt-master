#!/usr/bin/env node
import { readFileSync } from 'node:fs'

// ipal-seo-check — what Googlebot and AI agents actually see on a running site (Node 18+, no dependencies).
//   node seo-check.mjs <baseUrl> [--max 20]
//   node seo-check.mjs http://localhost:3000            # after `pnpm build && pnpm start`
//   node seo-check.mjs https://klient.pl --max 40       # production
// Exit code: 0 = no errors (warnings allowed), 1 = errors, 2 = site unreachable.

const args = process.argv.slice(2)
if (!args[0] || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: seo-check.mjs <baseUrl> [--max N]  (N = pages sampled from the sitemap, default 20)')
  process.exit(args[0] ? 0 : 2)
}
const origin = args[0].replace(/\/$/, '')
const maxIdx = args.indexOf('--max')
const MAX = maxIdx >= 0 ? Number(args[maxIdx + 1]) || 20 : 20
const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
// Client decisions recorded in AGENTS.md (AGENT.md §0b): `ipal-audit-skip: mcp, llms-full — reason`
let SKIP = []
try {
  const line = readFileSync('AGENTS.md', 'utf8').split('\n').find((l) => /^[-* ]*ipal-audit-skip:/i.test(l))
  if (line) SKIP = line.replace(/^[^:]*:/, '').split(/—| - /)[0].split(',').map((k) => k.trim()).filter(Boolean)
} catch {}
const skipped = (key) => SKIP.includes(key)

let errors = 0
let warnings = 0
const findings = []
const report = (level, title, rule, items = []) => {
  if (level === 'ERROR') errors += Math.max(items.length, 1)
  else if (level === 'WARNING') warnings += Math.max(items.length, 1)
  // INFO: shown, never counted — a note, not a problem
  findings.push({ level, title, rule, items })
}
const get = async (path, opts = {}) => {
  const url = path.startsWith('http') ? path : origin + path
  const res = await fetch(url, { redirect: opts.redirect ?? 'follow', headers: { 'user-agent': UA } })
  return { res, text: opts.body === false ? '' : await res.text(), url }
}
const attr = (tag, name) => tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'))?.[1]
const tags = (html, re) => [...html.matchAll(re)].map((m) => m[0])
const norm = (u) => (u || '').replace(/\/$/, '') || '/'

// --- 0. reachable ---------------------------------------------------------
let home
try {
  home = await get('/', { redirect: 'manual', body: false })
} catch (e) {
  console.error(`ipal-seo-check: ${origin} unreachable (${e.cause?.code ?? e.message}). Start the app first.`)
  process.exit(2)
}
console.log(`ipal-seo-check — ${origin} (Googlebot UA)`)

// --- 1. root ----------------------------------------------------------------
const rootStatus = home.res.status
const rootLocation = home.res.headers.get('location')
if (![200, 301, 302, 307, 308].includes(rootStatus)) report('ERROR', `/ returns ${rootStatus}`, 'root must serve the home or redirect to /{locale}')

// --- 2. robots.txt --------------------------------------------------------
const robots = await get('/robots.txt')
if (robots.res.status !== 200) report('ERROR', `robots.txt → ${robots.res.status}`, 'export robots from lib/content (seo.md)')
else {
  const txt = robots.text
  const sm = txt.match(/^sitemap:\s*(\S+)/im)?.[1]
  if (!sm) report('ERROR', 'robots.txt has no Sitemap line', 'buildRobots sitemap: true')
  else if (!sm.startsWith('http')) report('ERROR', `Sitemap URL is relative: ${sm}`, 'set NEXT_PUBLIC_SERVER_URL / baseUrl')
  const star = txt.split(/user-agent:\s*\*/i)[1]?.split(/user-agent:/i)[0] ?? ''
  if (/^disallow:\s*\/\s*$/im.test(star)) report('ERROR', 'robots.txt blocks everything for *', 'Disallow: / — the site is invisible to search engines')
  if (/localhost|127\.0\.0\.1/.test(txt) && !/localhost|127\.0\.0\.1/.test(origin)) report('ERROR', 'robots.txt points to localhost', 'NEXT_PUBLIC_SERVER_URL is not the production URL')
}

// --- 3. sitemap -----------------------------------------------------------
const sitemap = await get('/sitemap.xml')
let urls = []
let hasAlternates = false
const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'))
if (sitemap.res.status === 503) report('ERROR', 'sitemap.xml → 503', 'the database was unreachable while building it (sitemapRoute answers 503 + Retry-After) — check DATABASE_URL / DB health')
else if (sitemap.res.status !== 200) report('ERROR', `sitemap.xml → ${sitemap.res.status}`, 'export sitemapRoute (or sitemap) from lib/content + force-dynamic')
else {
  let xml = sitemap.text
  // Large sites: /sitemap.xml is a <sitemapindex> of parts (?part=N) — read every part.
  if (/<sitemapindex/i.test(xml)) {
    const parts = locs(xml)
    const broken = []
    xml = ''
    for (const part of parts.slice(0, 50)) {
      const r = await get(part).catch(() => null)
      if (!r || r.res.status !== 200) broken.push(`${part} → ${r?.res.status ?? 'unreachable'}`)
      else xml += r.text
    }
    console.log(`sitemap index: ${parts.length} part(s)`)
    if (broken.length) report('ERROR', 'sitemap index parts not 200', 'every <sitemap><loc> must answer 200 (seo.md → Large site)', broken)
  }
  urls = [...new Set(locs(xml))]
  hasAlternates = /hreflang=/.test(xml)
  if (urls.length === 0) report('ERROR', 'sitemap.xml is empty', 'DB unreachable at build without force-dynamic, or no published pages')
  const foreign = urls.filter((u) => !u.startsWith('http') || /localhost|127\.0\.0\.1/.test(u) !== /localhost|127\.0\.0\.1/.test(origin))
  if (foreign.length) report('ERROR', 'sitemap URLs relative or on another host', 'NEXT_PUBLIC_SERVER_URL / baseUrl', foreign.slice(0, 5))
  if (/(\/404|\/500|not-found)(\/|<|$)/.test(xml)) report('ERROR', 'error pages listed in the sitemap', 'pages.md — 404 page is excluded by ID')
}

// --- 4. sampled pages -----------------------------------------------------
const localeOf = (u) => new URL(u).pathname.split('/').filter(Boolean)[0] ?? ''
const byLocale = new Map()
for (const u of urls) {
  const l = localeOf(u)
  if (!byLocale.has(l)) byLocale.set(l, [])
  byLocale.get(l).push(u)
}
const sample = []
for (let i = 0; sample.length < Math.min(MAX, urls.length); i++) {
  for (const list of byLocale.values()) if (list[i] && sample.length < MAX) sample.push(list[i])
}
const multiLocale = hasAlternates || byLocale.size > 1
const urlSet = new Set(urls.map(norm))
const titles = new Map()
const descriptions = new Map()
const issues = { status: [], noHead: [], body: [], title: [], longTitle: [], desc: [], canonical: [], canonSelf: [], noindex: [], hreflang: [], xdefault: [], reciprocal: [], favicon: [], jsonLd: [], mdAlt: [], h1: [], headingSkip: [], alt: [], imgSize: [], lcp: [], ogImage: [], thin: [], noLinks: [], xRobots: [], footerSnippet: [] }
const checkedPaths = []

for (const url of sample) {
  let page
  try { page = await get(url, { redirect: 'manual' }) } catch { issues.status.push(`${url} → unreachable`); continue }
  if (page.res.status !== 200) { issues.status.push(`${url} → ${page.res.status}`); continue }
  const html = page.text
  const cut = html.search(/<\/head>/i)
  if (cut < 0) { issues.noHead.push(url); continue }
  const head = html.slice(0, cut)
  const body = html.slice(cut)

  // Next 16 streaming: metadata emitted into <body> is invisible to many crawlers
  if (/<link[^>]+rel="canonical"/i.test(body) || /<title>/i.test(body)) issues.body.push(url)

  const title = head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim()
  if (!title) issues.title.push(url)
  else {
    if (title.length > 65) issues.longTitle.push(`${url} (${title.length} chars)`)
    // per language: the same word in two languages ("Blog" in pl and en) is not a duplicate
    const key = `${multiLocale ? localeOf(url) : ''}\u0000${title}`
    titles.set(key, [...(titles.get(key) ?? []), url])
  }
  const desc = tags(head, /<meta[^>]+name="description"[^>]*>/gi).map((t) => attr(t, 'content'))[0]?.trim()
  if (!desc) issues.desc.push(url)
  else descriptions.set(desc, [...(descriptions.get(desc) ?? []), url])

  const canonTag = tags(head, /<link[^>]+rel="canonical"[^>]*>/gi)[0]
  const canon = canonTag && attr(canonTag, 'href')
  if (!canon) issues.canonical.push(url)
  else if (norm(canon) !== norm(url)) issues.canonSelf.push(`${url} → canonical ${canon}`)

  const robotsMeta = tags(head, /<meta[^>]+name="robots"[^>]*>/gi).map((t) => attr(t, 'content') ?? '').join(' ')
  if (/noindex/i.test(robotsMeta)) issues.noindex.push(url)

  if (!/<link[^>]+rel="(?:shortcut )?icon"/i.test(head)) issues.favicon.push(url)
  if (!/application\/ld\+json/i.test(html)) issues.jsonLd.push(url)
  if (!/<link[^>]+type="text\/markdown"/i.test(head)) issues.mdAlt.push(url)
  checkedPaths.push(new URL(url).pathname)

  // --- content & performance (AGENT.md §0c, §6.11b) ---
  if (/noindex/i.test(page.res.headers.get('x-robots-tag') ?? '')) issues.xRobots.push(url)
  const main = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<template[\s\S]*?<\/template>/gi, '')
  const h1s = (main.match(/<h1[\s>]/gi) ?? []).length
  if (h1s !== 1) issues.h1.push(`${url} (${h1s} h1)`)
  let prev = 0
  for (const m of main.matchAll(/<h([1-6])[\s>]/gi)) {
    const level = Number(m[1])
    if (prev && level > prev + 1) { issues.headingSkip.push(`${url} (h${prev} → h${level})`); break }
    prev = level
  }
  const imgs = tags(main, /<img\b[^>]*>/gi)
  const noAlt = imgs.filter((t) => !/\salt\s*=/.test(t))
  if (noAlt.length) issues.alt.push(`${url} (${noAlt.length} img)`)
  const noSize = imgs.filter((t) => !/\swidth\s*=/.test(t) || !/\sheight\s*=/.test(t)).filter((t) => !/data-nimg="fill"/.test(t))
  if (noSize.length) issues.imgSize.push(`${url} (${noSize.length} img)`)
  if (imgs.length && !/fetchpriority="high"/i.test(imgs[0]) && !/<link[^>]+rel="preload"[^>]+as="image"/i.test(head)) issues.lcp.push(url)
  if (!/<meta[^>]+property="og:image"/i.test(head)) issues.ogImage.push(url)
  const words = main.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').split(/\s+/).filter((w) => /\p{L}{2,}/u.test(w)).length
  if (words < 150) issues.thin.push(`${url} (${words} words)`)
  const own = new URL(url).host
  const internal = tags(main, /<a\b[^>]*href="([^"#]+)"[^>]*>/gi).filter((t) => {
    const href = attr(t, 'href') ?? ''
    try { const u = new URL(href, url); return u.host === own && norm(u.pathname) !== norm(new URL(url).pathname) } catch { return false }
  })
  if (internal.length === 0) issues.noLinks.push(url)
  // Repeated footer text (address, hours) is what Google quotes for brand searches
  const footer = main.match(/<footer\b[\s\S]*<\/footer>/i)?.[0]
  if (footer && !/data-nosnippet/i.test(footer)) issues.footerSnippet.push(url)

  if (multiLocale) {
    const alts = tags(head, /<link[^>]+hreflang="[^"]+"[^>]*>/gi).map((t) => ({ lang: attr(t, 'hreflang'), href: attr(t, 'href') }))
    if (alts.length === 0) issues.hreflang.push(url)
    else {
      if (!alts.some((a) => a.lang === 'x-default')) issues.xdefault.push(url)
      if (!alts.some((a) => norm(a.href) === norm(url))) issues.hreflang.push(`${url} (no self-reference)`)
      for (const a of alts) if (a.lang !== 'x-default' && a.href && !urlSet.has(norm(a.href))) issues.reciprocal.push(`${url} → ${a.lang}: ${a.href}`)
    }
  }
}

const dupTitles = [...titles.entries()].filter(([, us]) => us.length > 1).map(([k, us]) => `"${k.split('\u0000')[1]}" × ${us.length}`)
const dupDescs = [...descriptions.entries()].filter(([, us]) => us.length > 1).map(([d, us]) => `"${d.slice(0, 60)}…" × ${us.length}`)
if (issues.status.length) report('ERROR', 'sitemap URLs not 200 (redirect / error)', 'sitemap must list final, live URLs', issues.status)
if (issues.noHead.length) report('ERROR', 'no </head> in HTML', 'broken document', issues.noHead)
if (issues.body.length) report('ERROR', 'metadata rendered in <body>', 'htmlLimitedBots, no explicit <head>, ISR + generateStaticParams (AGENT.md §4)', issues.body)
if (issues.title.length) report('ERROR', 'missing <title> in head', 'generatePageMetadata', issues.title)
if (issues.canonical.length) report('ERROR', 'missing canonical', 'generatePageMetadata + NEXT_PUBLIC_SERVER_URL', issues.canonical)
if (issues.canonSelf.length) report('ERROR', 'canonical not pointing to itself', 'canonical must be the page URL (or remove the page from the sitemap)', issues.canonSelf)
if (issues.noindex.length) report('ERROR', 'noindex pages listed in the sitemap', 'sitemap filters noindex — check buildNoindexField / stale build', issues.noindex)
if (issues.hreflang.length) report('ERROR', 'missing / non-self hreflang', 'createPageMetadata builds alternates from locale:"all" slugs', issues.hreflang)
if (issues.xdefault.length) report('WARNING', 'no x-default hreflang', 'buildHreflangAlternates adds x-default → defaultLocale', issues.xdefault)
if (issues.reciprocal.length) report('WARNING', 'hreflang alternates not in the sitemap', 'translation missing/unpublished or noindex in that locale', issues.reciprocal.slice(0, 15))
if (issues.desc.length) report('WARNING', 'missing meta description', 'fill SEO tab in the panel (or site description fallback)', issues.desc)
if (dupTitles.length) report('WARNING', 'duplicate titles', 'unique meta titles per page', dupTitles)
if (dupDescs.length) report('WARNING', 'duplicate meta descriptions (Google ignores them)', 'own description per page in the SEO tab — empty ones auto-fill from content on save', dupDescs)
if (issues.footerSnippet.length) report('WARNING', 'footer without data-nosnippet (Google quotes the address as the snippet)', 'wrap footer contents in <NoSnippet> (seo.md → Descriptions in Google)', issues.footerSnippet.slice(0, 3))
if (issues.longTitle.length) report('WARNING', 'titles over 65 chars (truncated in results)', 'shorten in the SEO tab', issues.longTitle)
if (issues.favicon.length) report('WARNING', 'no favicon link in head', 'buildIconsMetadata(settings.favicon) in root generateMetadata', issues.favicon.slice(0, 3))
if (issues.xRobots.length) report('ERROR', 'X-Robots-Tag: noindex on pages', 'IPAL_NOINDEX is set in this environment — remove it in production', issues.xRobots.slice(0, 3))
if (issues.h1.length) report('ERROR', 'not exactly one h1', 'one h1 per page — SectionHeader as="h1" only in the first section (AGENT.md §0c)', issues.h1)
if (issues.alt.length) report('ERROR', 'images without alt', 'alt from the Media document; decorative: alt=""', issues.alt)
if (issues.headingSkip.length) report('WARNING', 'heading levels skipped', 'h1 → h2 → h3, no jumps (AGENT.md §0c)', issues.headingSkip)
if (issues.imgSize.length) report('WARNING', 'images without width/height (layout shift)', '<Media> via mediaImageProps (AGENT.md §6.11b)', issues.imgSize)
if (issues.lcp.length) report('WARNING', 'first image not prioritised (LCP)', '<Media priority> on the hero image (AGENT.md §6.11b)', issues.lcp)
if (issues.ogImage.length) report('WARNING', 'no og:image', 'share image in the SEO tab or Site Settings → Default share image', issues.ogImage.slice(0, 5))
if (issues.thin.length) report('WARNING', 'thin pages (< 150 words)', 'add real content from the brief or merge pages (AGENT.md §0c)', issues.thin)
if (issues.noLinks.length) report('WARNING', 'pages without internal links', 'link related pages and contact (AGENT.md §0c)', issues.noLinks)
if (!skipped('jsonld') && issues.jsonLd.length) report('ERROR', 'no JSON-LD structured data', '<JsonLdGraph> WebSite + Organization in [locale]/layout.tsx (AGENT.md §0b.4)', issues.jsonLd.slice(0, 5))
if (!skipped('markdown') && issues.mdAlt.length) report('WARNING', 'no text/markdown alternate link in head', 'createContentHelpers({ markdownAlternate: true }) (AGENT.md §0b.6)', issues.mdAlt.slice(0, 3))

// --- 4b. Search Console / Bing verification tags (Site Settings → Search engines) ----
// INFO only: domain (DNS) verification — the recommended route — leaves the tags empty.
if (!skipped('verification') && sample.length) {
  const page = await get(sample[0]).catch(() => null)
  const head = page?.text.split(/<\/head>/i)[0] ?? ''
  const missing = [['google-site-verification', 'Google Search Console'], ['msvalidate.01', 'Bing Webmaster Tools']]
    .filter(([name]) => !new RegExp(`<meta[^>]+name="${name}"`, 'i').test(head))
    .map(([, label]) => label)
  if (missing.length) report('INFO', 'no verification meta tag (fine with DNS / domain verification)', 'only for URL-prefix verification: paste the code in Site Settings → Search engines', missing)
}

// --- 5. 404 ---------------------------------------------------------------
const firstLocale = [...byLocale.keys()].find((l) => l && l.length <= 5) ?? ''
for (const path of [`/${firstLocale ? firstLocale + '/' : ''}ipal-seo-check-${Date.now()}`]) {
  const r = await get(path.replace('//', '/'), { redirect: 'manual' })
  if (r.res.status === 200) report('ERROR', `unknown URL returns 200 (soft 404): ${path}`, 'notFound() in the catch-all, not-found.tsx (pages.md)')
  else if (r.res.status !== 404 && !(r.res.status >= 300 && r.res.status < 400)) report('WARNING', `unknown URL returns ${r.res.status}`, 'expected 404')
}

// --- 6. GEO: llms, Markdown, MCP, AI bots (AGENT.md §0b.5–8) ---------------
const ok = async (path, opts) => { try { return await get(path, opts) } catch { return null } }
if (!skipped('llms')) {
  const llms = await ok('/llms.txt')
  if (!llms || llms.res.status !== 200) report('ERROR', `/llms.txt → ${llms?.res.status ?? 'unreachable'}`, 'createLlmsTxtRoute (seo.md)')
  else if (!/^#\s+\S/m.test(llms.text)) report('WARNING', '/llms.txt has no "# Site name" heading', 'fill Site Settings → name/description')
}
if (!skipped('llms-full')) {
  const full = await ok('/llms-full.txt', { body: false })
  if (!full || full.res.status !== 200) report('ERROR', `/llms-full.txt → ${full?.res.status ?? 'unreachable'}`, 'createLlmsTxtRoute({ full: true })')
}
if (!skipped('markdown') && checkedPaths.length) {
  const path = checkedPaths[0]
  const md = await ok(`/md${path === '/' ? '' : path}`)
  const type = md?.res.headers.get('content-type') ?? ''
  if (!md || md.res.status !== 200 || !/markdown/i.test(type)) report('ERROR', `Markdown version /md${path} → ${md?.res.status ?? 'unreachable'} ${type}`, 'src/app/md/[locale]/[[...slug]]/route.ts; one language: src/app/md/[[...slug]]/route.ts (i18n.md)')
}
if (!skipped('mcp')) {
  let mcpOk = false
  let tools = []
  try {
    const rpc = (body) => fetch(origin + '/api/mcp', { body: JSON.stringify(body), headers: { 'content-type': 'application/json' }, method: 'POST' }).then((r) => (r.ok ? r.json() : null))
    const init = await rpc({ id: 1, jsonrpc: '2.0', method: 'initialize', params: { protocolVersion: '2025-06-18' } })
    mcpOk = Boolean(init?.result?.serverInfo)
    tools = ((await rpc({ id: 2, jsonrpc: '2.0', method: 'tools/list' }))?.result?.tools ?? []).map((t) => t.name)
  } catch {}
  if (!mcpOk) report('ERROR', 'MCP server /api/mcp not answering initialize', 'createMcpRoute (mcp.md) — public, AI browses the site')
  else if (!tools.includes('list_pages')) report('WARNING', 'MCP without list_pages / get_site_info', 'update @intecion/ipal-kit to ≥ 1.9.0')
}
if (!skipped('aibots') && robots.res.status === 200) {
  const groups = robots.text.split(/(?=^user-agent:)/im)
  const blocked = ['ClaudeBot', 'GPTBot', 'PerplexityBot', 'OAI-SearchBot'].filter((bot) =>
    groups.some((g) => new RegExp(`^user-agent:.*\\b${bot}\\b`, 'im').test(g) && /^disallow:\s*\/\s*$/im.test(g)),
  )
  if (blocked.length) report('WARNING', 'robots.txt blocks AI bots', 'aiBots: allow (default) — block only with the client decision in AGENTS.md', blocked)
}
const health = await ok('/api/health', { body: false })
if (!health || health.res.status !== 200) report('WARNING', `/api/health → ${health?.res.status ?? 'unreachable'}`, 'createHealthRoute (Coolify healthcheck)')

// --- output -------------------------------------------------------------
for (const f of findings) {
  console.log(`\n[${f.level}] ${f.title}${f.items.length ? ` (${f.items.length})` : ''} — ${f.rule}`)
  for (const i of f.items.slice(0, 10)) console.log(`  ${i}`)
  if (f.items.length > 10) console.log(`  … and ${f.items.length - 10} more`)
}
console.log(`\nroot: ${rootStatus}${rootLocation ? ' → ' + rootLocation : ''} · sitemap: ${urls.length} URL(s), ${byLocale.size} locale group(s) · checked: ${sample.length} page(s)`)
console.log(`ipal-seo-check: ${errors} error(s), ${warnings} warning(s)`)
process.exit(errors ? 1 : 0)
