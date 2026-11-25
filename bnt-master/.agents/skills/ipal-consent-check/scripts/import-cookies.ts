/**
 * Imports a cookie-scan result into Cookie Settings → Cookies (panel), so the
 * cookie policy page (<CookieTable>) and the detailed consent window
 * (<CookieBanner settings="detailed">) list what the site really sets.
 *
 *   LOCALE=pl pnpm payload run .agents/skills/ipal-consent-check/scripts/import-cookies.ts cookie-scan/cookies.json
 *   # second language: scan again with --lang en, then import with LOCALE=en
 *   # (rows are matched by cookie name; only purpose/duration are localized)
 *
 * Merges by cookie name: an editor's own purpose/duration/provider are kept
 * unless OVERWRITE=1. Cookies no longer seen are kept too (remove them in the
 * panel) — a scan of a few pages can miss cookies set elsewhere. `unknown`
 * category rows are skipped: classify them in cookies.json first.
 */
import config from '@payload-config'
import { readFileSync } from 'node:fs'
import { getPayload } from 'payload'

type Scanned = { category: string; duration?: string; name: string; provider?: string; purpose?: string }
type Row = { category?: string; duration?: null | string; id?: string; name?: string; provider?: null | string; purpose?: null | string }

// `payload run` forwards positional args but not --flags — options come from env.
const file = process.argv.slice(2).find((a) => a.endsWith('.json'))
const locale = process.env.LOCALE
const overwrite = process.env.OVERWRITE === '1'
if (!file || !locale) {
  console.error('Usage: LOCALE=<code> [OVERWRITE=1] pnpm payload run import-cookies.ts <cookies.json>')
  process.exit(2)
}

const scan = JSON.parse(readFileSync(file, 'utf8')) as { cookies: Scanned[] }
const payload = await getPayload({ config })
const current = (await payload.findGlobal({ slug: 'cookie-settings' as never, depth: 0, locale: locale as never })) as { cookies?: Row[] }
const rows: Row[] = [...(current.cookies ?? [])]

let added = 0
let updated = 0
let skipped = 0
for (const c of scan.cookies) {
  if (c.category === 'unknown') {
    skipped++
    continue
  }
  const existing = rows.find((r) => r.name === c.name)
  if (!existing) {
    rows.push({ category: c.category, duration: c.duration, name: c.name, provider: c.provider, purpose: c.purpose })
    added++
    continue
  }
  const pick = (mine: null | string | undefined, theirs?: string) => (overwrite || !mine ? (theirs ?? mine) : mine)
  existing.provider = pick(existing.provider, c.provider)
  existing.purpose = pick(existing.purpose, c.purpose)
  existing.duration = pick(existing.duration, c.duration)
  if (overwrite) {existing.category = c.category}
  updated++
}

await payload.updateGlobal({ slug: 'cookie-settings' as never, data: { cookies: rows } as never, locale: locale as never })
console.log(`Cookie Settings (${locale}): ${added} added, ${updated} updated, ${skipped} unknown skipped. Review them in the panel.`)
process.exit(0)
