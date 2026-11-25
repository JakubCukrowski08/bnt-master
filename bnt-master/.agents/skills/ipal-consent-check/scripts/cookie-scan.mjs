#!/usr/bin/env node
// ipal cookie-scan — lists every cookie (and localStorage key) a running site sets, for the cookie policy.
//   node cookie-scan.mjs <baseUrl> [--pages 10] [--lang pl|en] [--out cookie-scan] [--wait 3000]
// Two fresh browser profiles: before any decision, and after "Accept all" (data-ipal="accept").
// Pages: the base URL + up to --pages URLs from /sitemap.xml.
// Writes <out>/cookies.json (import into the panel: import-cookies.ts) and <out>/cookies.md (table).
// Needs Playwright:  pnpm add -D playwright && pnpm exec playwright install chromium
// Exit code: 0 = ok, 1 = non-necessary cookies set BEFORE consent, 2 = setup problem.
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
if (!args[0] || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: cookie-scan.mjs <baseUrl> [--pages N] [--lang pl|en] [--out dir] [--wait ms]')
  process.exit(args[0] ? 0 : 2)
}
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : def
}
const base = args[0].replace(/\/$/, '')
const MAX = Number(opt('pages', 10)) || 10
const LANG = opt('lang', 'pl') === 'en' ? 'en' : 'pl'
const OUT = opt('out', 'cookie-scan')
const WAIT = Number(opt('wait', 3000)) || 3000

let pw
for (const mod of ['playwright', 'playwright-core', '@playwright/test']) {
  try { pw = await import(mod); break } catch { /* next */ }
}
if (!pw) {
  console.error('cookie-scan: Playwright not found. Install: pnpm add -D playwright && pnpm exec playwright install chromium')
  process.exit(2)
}
const { chromium } = pw.default ?? pw

// Known cookies → provider, consent category, purpose. `*` = prefix.
const T = (pl, en) => ({ en, pl })
const CATALOG = [
  ['cookie-consent', 'this site', 'necessary', T('Zapamiętuje Twoją decyzję w sprawie plików cookies.', 'Stores your cookie consent decision.')],
  ['NEXT_LOCALE', 'this site', 'functional', T('Zapamiętuje wybrany język strony.', 'Remembers the selected site language.')],
  ['a11y-prefs', 'this site', 'necessary', T('Zapamiętuje ustawienia dostępności wybrane w widżecie.', 'Remembers the accessibility settings chosen in the widget.')],
  ['ipal_vid', 'this site', 'analytics', T('Wbudowane statystyki: anonimowy identyfikator odwiedzającego (tylko po zgodzie).', 'Built-in statistics: anonymous visitor id (only with consent).')],
  ['payload-token', 'this site', 'necessary', T('Sesja zalogowanego redaktora (panel administracyjny).', 'Logged-in editor session (admin panel).')],
  ['__cf_bm', 'Cloudflare', 'necessary', T('Ochrona przed botami.', 'Bot protection.')],
  ['_cfuvid', 'Cloudflare', 'necessary', T('Ochrona przed nadużyciami i limit zapytań.', 'Abuse protection and rate limiting.')],
  ['cf_clearance', 'Cloudflare', 'necessary', T('Potwierdzenie przejścia weryfikacji Cloudflare.', 'Proof of passing a Cloudflare challenge.')],
  ['_ga', 'Google', 'analytics', T('Google Analytics: rozróżnia użytkowników w statystykach.', 'Google Analytics: distinguishes users in statistics.')],
  ['_ga_*', 'Google', 'analytics', T('Google Analytics: stan sesji w statystykach.', 'Google Analytics: session state for statistics.')],
  ['_gid', 'Google', 'analytics', T('Google Analytics: rozróżnia użytkowników (24 h).', 'Google Analytics: distinguishes users (24 h).')],
  ['_gat*', 'Google', 'analytics', T('Google Analytics: ogranicza liczbę zapytań.', 'Google Analytics: throttles request rate.')],
  ['_gcl_*', 'Google', 'marketing', T('Google Ads: przypisanie konwersji do reklam.', 'Google Ads: attributes conversions to ads.')],
  ['_fbp', 'Meta', 'marketing', T('Meta Pixel: pomiar i dopasowanie reklam.', 'Meta Pixel: ad measurement and targeting.')],
  ['_fbc', 'Meta', 'marketing', T('Meta Pixel: zapamiętuje kliknięcie w reklamę.', 'Meta Pixel: stores the ad click.')],
  ['_clck', 'Microsoft Clarity', 'analytics', T('Clarity: identyfikator użytkownika w analizie zachowań.', 'Clarity: user id for behaviour analytics.')],
  ['_clsk', 'Microsoft Clarity', 'analytics', T('Clarity: łączy odsłony w jedną sesję.', 'Clarity: joins page views into a session.')],
  ['CLID', 'Microsoft Clarity', 'analytics', T('Clarity: identyfikator użytkownika.', 'Clarity: user id.')],
  ['MUID', 'Microsoft', 'marketing', T('Microsoft: identyfikator przeglądarki dla reklam.', 'Microsoft: browser id for advertising.')],
  ['_uetsid', 'Microsoft Ads', 'marketing', T('Microsoft Ads: pomiar konwersji (sesja).', 'Microsoft Ads: conversion tracking (session).')],
  ['_uetvid', 'Microsoft Ads', 'marketing', T('Microsoft Ads: pomiar konwersji (użytkownik).', 'Microsoft Ads: conversion tracking (user).')],
  ['li_fat_id', 'LinkedIn', 'marketing', T('LinkedIn Insight: przypisanie konwersji.', 'LinkedIn Insight: conversion attribution.')],
  ['lidc', 'LinkedIn', 'marketing', T('LinkedIn: wybór centrum danych.', 'LinkedIn: data-center routing.')],
  ['bcookie', 'LinkedIn', 'marketing', T('LinkedIn: identyfikator przeglądarki.', 'LinkedIn: browser id.')],
  ['bscookie', 'LinkedIn', 'marketing', T('LinkedIn: bezpieczny identyfikator przeglądarki.', 'LinkedIn: secure browser id.')],
  ['UserMatchHistory', 'LinkedIn', 'marketing', T('LinkedIn Ads: synchronizacja identyfikatorów.', 'LinkedIn Ads: id sync.')],
  ['AnalyticsSyncHistory', 'LinkedIn', 'marketing', T('LinkedIn: synchronizacja z analityką.', 'LinkedIn: analytics sync.')],
  ['_ttp', 'TikTok', 'marketing', T('TikTok Pixel: pomiar reklam.', 'TikTok Pixel: ad measurement.')],
  ['_tt_enable_cookie', 'TikTok', 'marketing', T('TikTok Pixel: sprawdza obsługę cookies.', 'TikTok Pixel: cookie support check.')],
  ['_hj*', 'Hotjar', 'analytics', T('Hotjar: analiza zachowań użytkowników.', 'Hotjar: behaviour analytics.')],
  ['YSC', 'YouTube', 'marketing', T('YouTube: statystyki odtworzeń osadzonych filmów.', 'YouTube: embedded video statistics.')],
  ['VISITOR_INFO1_LIVE', 'YouTube', 'marketing', T('YouTube: szacuje przepustowość, preferencje odtwarzacza.', 'YouTube: bandwidth estimate, player preferences.')],
  ['VISITOR_PRIVACY_METADATA', 'YouTube', 'marketing', T('YouTube: stan zgody użytkownika.', 'YouTube: user consent state.')],
]
const match = (name) =>
  CATALOG.find(([pattern]) => (pattern.endsWith('*') ? name.startsWith(pattern.slice(0, -1)) : name === pattern))

const human = (expires) => {
  if (!expires || expires < 0) {return LANG === 'pl' ? 'sesja' : 'session'}
  const days = Math.round((expires * 1000 - Date.now()) / 86_400_000)
  if (days < 1) {
    const h = Math.max(1, Math.round((expires * 1000 - Date.now()) / 3_600_000))
    return LANG === 'pl' ? `${h} godz.` : `${h} h`
  }
  if (days < 60) {return LANG === 'pl' ? `${days} dni` : `${days} days`}
  const months = Math.round(days / 30)
  if (months < 24) {return LANG === 'pl' ? `${months} mies.` : `${months} months`}
  const years = Math.round(days / 365)
  return LANG === 'pl' ? `${years} ${years < 5 ? 'lata' : 'lat'}` : `${years} years`
}

// Pages to visit
const pages = [base]
try {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text()
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    if (pages.length > MAX) {break}
    if (!pages.includes(m[1])) {pages.push(m[1])}
  }
} catch { /* no sitemap — base only */ }

let browser
try {
  browser = await chromium.launch()
} catch (err) {
  console.error(`cookie-scan: cannot start Chromium — run: pnpm exec playwright install chromium\n${err.message?.split('\n')[0] ?? err}`)
  process.exit(2)
}
const host = new URL(base).hostname.replace(/^www\./, '')

async function visit(accept) {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  const storage = new Set()
  try {
    for (const [i, url] of pages.entries()) {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 }).catch(() => {})
      if (accept && i === 0) {
        const btn = page.locator('[data-ipal="accept"]')
        if (await btn.count()) {await btn.first().click().catch(() => {})}
      }
      await page.waitForTimeout(WAIT)
      for (const k of await page.evaluate(() => Object.keys(localStorage)).catch(() => [])) {storage.add(k)}
    }
    return { cookies: await ctx.cookies(), storage: [...storage] }
  } finally {
    await ctx.close()
  }
}

const before = await visit(false)
const after = await visit(true)
await browser.close()

const beforeNames = new Set(before.cookies.map((c) => c.name))
const seen = new Map()
for (const c of [...before.cookies, ...after.cookies]) {
  if (seen.has(c.name)) {continue}
  const known = match(c.name)
  const firstParty = c.domain.replace(/^\./, '').endsWith(host)
  seen.set(c.name, {
    category: known?.[2] ?? 'unknown',
    domain: c.domain.replace(/^\./, ''),
    duration: human(c.expires),
    firstParty,
    name: c.name,
    provider: known ? (known[1] === 'this site' ? (LANG === 'pl' ? 'ta strona' : 'this site') : known[1]) : firstParty ? (LANG === 'pl' ? 'ta strona' : 'this site') : c.domain.replace(/^\./, ''),
    purpose: known?.[3][LANG] ?? '',
    setBeforeConsent: beforeNames.has(c.name),
  })
}
const ORDER = ['necessary', 'functional', 'analytics', 'marketing', 'unknown']
const cookies = [...seen.values()].sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category) || a.name.localeCompare(b.name))

mkdirSync(OUT, { recursive: true })
writeFileSync(path.join(OUT, 'cookies.json'), JSON.stringify({ base, cookies, lang: LANG, localStorage: after.storage, pages, scannedAt: new Date().toISOString() }, null, 2))
const head = LANG === 'pl'
  ? '| Nazwa | Dostawca | Kategoria | Cel | Czas przechowywania |\n|---|---|---|---|---|'
  : '| Name | Provider | Category | Purpose | Duration |\n|---|---|---|---|---|'
const rows = cookies.map((c) => `| \`${c.name}\` | ${c.provider} | ${c.category} | ${c.purpose || '—'} | ${c.duration} |`)
writeFileSync(path.join(OUT, 'cookies.md'), `${head}\n${rows.join('\n')}\n`)

let errors = 0
console.log(`cookie-scan — ${base} (${pages.length} page(s))`)
const early = cookies.filter((c) => c.setBeforeConsent && c.category !== 'necessary')
if (early.length) {
  errors += early.length
  console.log(`\n[ERROR] set BEFORE consent and not necessary (${early.length}) — GDPR: gate it (ConsentScript / Analytics) or classify it as necessary if it truly is`)
  for (const c of early) {console.log(`  ${c.name} (${c.domain}, ${c.category})`)}
}
const unknown = cookies.filter((c) => c.category === 'unknown')
if (unknown.length) {
  console.log(`\n[WARNING] unknown cookies (${unknown.length}) — find the provider and purpose, set the category in cookies.json before importing`)
  for (const c of unknown) {console.log(`  ${c.name} (${c.domain})`)}
}
if (after.storage.length) {console.log(`\nlocalStorage keys (mention in the policy if they hold personal data): ${after.storage.join(', ')}`)}
console.log(`\n${cookies.length} cookie(s) → ${path.join(OUT, 'cookies.json')}, ${path.join(OUT, 'cookies.md')}`)
console.log(`Import into the panel: LOCALE=${LANG} pnpm payload run .agents/skills/ipal-consent-check/scripts/import-cookies.ts ${path.join(OUT, 'cookies.json')}`)
process.exit(errors ? 1 : 0)
