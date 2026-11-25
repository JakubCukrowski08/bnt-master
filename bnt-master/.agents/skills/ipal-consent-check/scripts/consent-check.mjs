#!/usr/bin/env node
// ipal-consent-check — proves in a real browser that tracking waits for consent (GDPR).
//   node consent-check.mjs <pageUrl> [--wait 4000]
// Three runs, each in a fresh browser profile:
//   1. no decision  → no third-party pixels, no tracking cookies, Google only with "denied" signals
//   2. accept all   → configured tags start (reported, so you can confirm they're the right ones)
//   3. reject all   → same as 1, also after a reload
// Needs Playwright:  pnpm add -D playwright && pnpm exec playwright install chromium
// Exit code: 0 = compliant, 1 = violations, 2 = setup problem.

const args = process.argv.slice(2)
if (!args[0] || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: consent-check.mjs <pageUrl> [--wait ms]')
  process.exit(args[0] ? 0 : 2)
}
const url = args[0]
const waitIdx = args.indexOf('--wait')
const WAIT = waitIdx >= 0 ? Number(args[waitIdx + 1]) || 4000 : 4000

let pw
for (const mod of ['playwright', 'playwright-core', '@playwright/test']) {
  try { pw = await import(mod); break } catch { /* next */ }
}
if (!pw) {
  console.error('ipal-consent-check: Playwright not found. Install: pnpm add -D playwright && pnpm exec playwright install chromium')
  process.exit(2)
}
const { chromium } = pw.default ?? pw

// Non-Google vendors have no Consent Mode → ANY request before consent is a violation.
const PIXELS = [
  ['Meta Pixel', /connect\.facebook\.net|facebook\.com\/tr/],
  ['Microsoft Clarity', /clarity\.ms/],
  ['LinkedIn Insight', /snap\.licdn\.com|px\.ads\.linkedin\.com/],
  ['TikTok Pixel', /analytics\.tiktok\.com/],
  ['DoubleClick / Google Ads', /doubleclick\.net|googleadservices\.com/],
  ['Hotjar', /hotjar\.com/],
]
// Embeds that set cookies — should wait for consent or use a privacy mode.
const EMBEDS = [
  ['YouTube (cookie mode)', /youtube\.com\/embed/],
  ['Google Maps embed', /google\.com\/maps\/embed/],
]
const GOOGLE_COLLECT = /google-analytics\.com\/(g\/)?collect|analytics\.google\.com\/g\/collect/
const GOOGLE_TAG = /googletagmanager\.com\/(gtm|gtag)/
const TRACKING_COOKIES = /^(_ga|_gid|_gat|_gcl_|_fbp|_fbc|_clck|_clsk|_ttp|li_|lidc|bcookie|_hj)/

// gcs=G1{ad}{analytics}: '1' = granted. Before consent both must not be '1'.
const consentGranted = (u) => {
  const gcs = new URL(u).searchParams.get('gcs')
  return gcs ? /^G1.?1|^G11/.test(gcs) : null
}

const browser = await chromium.launch()
const run = async (label, action) => {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  const requests = []
  page.on('request', (r) => requests.push(r.url()))
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  } catch (e) {
    console.error(`ipal-consent-check: cannot open ${url} (${e.message.split('\n')[0]})`)
    await browser.close()
    process.exit(2)
  }
  await page.waitForTimeout(WAIT)
  await page.mouse.wheel(0, 2000) // some tags wait for interaction (Analytics defer)
  await page.waitForTimeout(500)
  const banner = (await page.locator('[data-ipal="banner"]').count()) > 0
  let clicked = null
  if (action) {
    const btn = page.locator(`[data-ipal="${action}"]`)
    if ((await btn.count()) > 0) {
      const before = requests.length
      await btn.first().click()
      await page.waitForTimeout(WAIT)
      clicked = before
      if (action === 'reject') {
        await page.reload({ waitUntil: 'domcontentloaded' })
        await page.waitForTimeout(WAIT)
      }
    } else clicked = -1
  }
  const cookies = (await ctx.cookies()).map((c) => c.name)
  await ctx.close()
  return { label, requests, cookies, banner, clicked }
}

const violations = []
const warnings = []
const info = []
const inspect = (r, mustBeQuiet) => {
  const pixelHits = PIXELS.filter(([, re]) => r.requests.some((u) => re.test(u))).map(([n]) => n)
  const embedHits = EMBEDS.filter(([, re]) => r.requests.some((u) => re.test(u))).map(([n]) => n)
  const trackingCookies = r.cookies.filter((c) => TRACKING_COOKIES.test(c))
  const collects = r.requests.filter((u) => GOOGLE_COLLECT.test(u))
  const grantedCollects = collects.filter((u) => consentGranted(u) === true)
  if (mustBeQuiet) {
    for (const p of pixelHits) violations.push(`${r.label}: ${p} loaded without consent`)
    for (const c of trackingCookies) violations.push(`${r.label}: tracking cookie "${c}" set without consent`)
    if (grantedCollects.length) violations.push(`${r.label}: Google Analytics hit with consent GRANTED (gcs) before a decision`)
    const noSignal = collects.filter((u) => consentGranted(u) === null)
    if (noSignal.length) warnings.push(`${r.label}: Google Analytics hit without Consent Mode signal (gcs) — setDefaultConsent must run before the tag`)
    for (const e of embedHits) warnings.push(`${r.label}: ${e} loaded before consent — gate it (ConsentScript) or use youtube-nocookie / click-to-load`)
  }
  return { pixelHits, trackingCookies, google: r.requests.some((u) => GOOGLE_TAG.test(u) || GOOGLE_COLLECT.test(u)) }
}

const first = await run('1. no decision')
if (!first.banner) warnings.push('1. no decision: cookie banner [data-ipal="banner"] not found — is <CookieBanner/> rendered? Older ipal-kit versions lack data-ipal attributes on buttons.')
const s1 = inspect(first, true)

const accepted = await run('2. accept all', 'accept')
if (accepted.clicked === -1) warnings.push('2. accept: button [data-ipal="accept"] not found — skipped')
const afterAccept = { ...accepted, requests: accepted.clicked > 0 ? accepted.requests.slice(accepted.clicked) : accepted.requests }
const s2 = inspect(afterAccept, false)
if (!accepted.cookies.includes('cookie-consent') && accepted.clicked >= 0) warnings.push('2. accept: consent cookie "cookie-consent" not stored')

const rejected = await run('3. reject all (+ reload)', 'reject')
if (rejected.clicked === -1) warnings.push('3. reject: button [data-ipal="reject"] not found — skipped')
else inspect({ ...rejected, requests: rejected.requests.slice(rejected.clicked ?? 0) }, true)

await browser.close()

info.push(`before consent: Google tag ${s1.google ? 'loaded (Consent Mode, OK if gcs denied)' : 'not loaded'}`)
info.push(`after accept: ${s2.pixelHits.length ? s2.pixelHits.join(', ') : 'no third-party pixels'}${s2.google ? ' + Google' : ''}; cookies: ${accepted.cookies.filter((c) => TRACKING_COOKIES.test(c)).join(', ') || 'none'}`)

console.log(`ipal-consent-check — ${url}`)
for (const v of violations) console.log(`[ERROR] ${v}`)
for (const w of warnings) console.log(`[WARNING] ${w}`)
for (const i of info) console.log(`  · ${i}`)
console.log(`ipal-consent-check: ${violations.length} violation(s), ${warnings.length} warning(s)`)
process.exit(violations.length ? 1 : 0)
