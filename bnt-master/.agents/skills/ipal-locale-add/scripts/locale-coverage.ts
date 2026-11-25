/**
 * ipal-locale-add — what is still untranslated, per locale.
 *
 *   pnpm payload run .agents/skills/ipal-locale-add/scripts/locale-coverage.ts
 *   LOCALE=de pnpm payload run .agents/skills/ipal-locale-add/scripts/locale-coverage.ts   # one locale
 *
 * Reports (read-only, never writes):
 *  - collections with a localized `slug`: documents missing slug/title in a locale
 *    → that URL returns 404 in that language and is left out of sitemap/hreflang
 *  - globals: top-level localized text fields (also inside group/tabs/row/collapsible)
 *    that are empty in a locale while filled in the default locale
 * Exit code: 0 = complete, 1 = gaps found.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

type AnyField = { type: string; name?: string; localized?: boolean; fields?: AnyField[]; tabs?: AnyField[] }
const TEXT = new Set(['text', 'textarea', 'richText', 'email'])

const payload = await getPayload({ config })
const loc = payload.config.localization
if (!loc) {
  console.log('locale-coverage: localization is off (single-language project) — nothing to check.')
  process.exit(0)
}
const def = loc.defaultLocale
const targets = process.env.LOCALE ? [process.env.LOCALE] : loc.localeCodes.filter((c) => c !== def)
const empty = (v: unknown) =>
  v == null || (typeof v === 'string' && v.trim() === '') || (typeof v === 'object' && v !== null && 'root' in v &&
    !JSON.stringify(v).includes('"text":"'))

/** Paths of localized text fields, descending into non-data containers and named groups. */
const localizedPaths = (fields: AnyField[], prefix: string[] = []): string[][] =>
  fields.flatMap((f) => {
    if (f.type === 'tabs') return (f.tabs ?? []).flatMap((t) => localizedPaths(t.fields ?? [], t.name ? [...prefix, t.name] : prefix))
    if (f.type === 'row' || f.type === 'collapsible') return localizedPaths(f.fields ?? [], prefix)
    if (f.type === 'group') return localizedPaths(f.fields ?? [], f.name ? [...prefix, f.name] : prefix)
    return f.localized && f.name && TEXT.has(f.type) ? [[...prefix, f.name]] : []
  })
const at = (obj: unknown, path: string[]) => path.reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), obj)

const gaps: string[] = []

for (const col of payload.config.collections) {
  const slugField = (col.fields as AnyField[]).find((f) => f.name === 'slug')
  if (!slugField?.localized) continue
  const titleField = col.admin?.useAsTitle ?? 'title'
  const { docs } = await payload.find({ collection: col.slug as never, locale: 'all' as never, depth: 0, limit: 0, pagination: false })
  for (const doc of docs as Record<string, unknown>[]) {
    const slug = doc.slug as Record<string, unknown> | undefined
    const title = doc[titleField] as Record<string, unknown> | string | undefined
    const label = (typeof title === 'object' ? title?.[def] : title) ?? slug?.[def] ?? doc.id
    for (const l of targets) {
      const missing = [empty(slug?.[l]) && 'slug', typeof title === 'object' && empty(title?.[l]) && titleField].filter(Boolean)
      if (missing.length) gaps.push(`[${l}] ${col.slug}/${String(doc.id)} "${String(label)}" — missing ${missing.join(', ')}`)
    }
  }
}

for (const g of payload.config.globals) {
  const paths = localizedPaths(g.fields as AnyField[])
  if (!paths.length) continue
  const byLocale = Object.fromEntries(
    await Promise.all([def, ...targets].map(async (l) => [l, await payload.findGlobal({ slug: g.slug as never, locale: l as never, fallbackLocale: false as never, depth: 0 })])),
  )
  for (const p of paths) {
    if (empty(at(byLocale[def], p))) continue
    for (const l of targets) if (empty(at(byLocale[l], p))) gaps.push(`[${l}] global ${g.slug} → ${p.join('.')} empty`)
  }
}

for (const line of gaps) console.log(line)
console.log(`\nlocale-coverage (${targets.join(', ')} vs ${def}): ${gaps.length} gap(s)`)
process.exit(gaps.length ? 1 : 0)
