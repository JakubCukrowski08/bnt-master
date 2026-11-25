/**
 * Field migration — PHASE 2 of 3 (skill ipal-migrate-fields).
 * Copies data from OLD fields to NEW fields inside one block type, in every locale.
 *
 *   pnpm payload run scripts/migrate-<name>.ts           # dry run — prints what would change
 *   APPLY=1 pnpm payload run scripts/migrate-<name>.ts   # writes
 *
 * Idempotent: every branch of migrateBlock() returns null once its target is
 * filled, so a re-run after a crash is safe — and a dry run after APPLY must
 * print "0 block change(s)". Note: a dry run BEFORE the first APPLY shows only
 * the default-locale pass when the structure (rows) doesn't exist yet.
 *
 * Example below: Hero `ctaLabel` + `ctaTarget` (relationship → pages) → `links`
 * (buildLinksField). Adapt CONFIG + migrateBlock() — nothing else.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

// ---------------------------------------------------------------- CONFIG --
const COLLECTION = 'pages'
const LAYOUT_FIELD = 'layout'
const BLOCK_TYPE = 'hero'
const APPLY = process.env.APPLY === '1'

type Row = { id?: string; [key: string]: unknown }
type Block = Row & { blockType: string }

/**
 * OLD → NEW for one block in ONE locale. Return null = nothing to change.
 * `isDefaultLocale` = first pass: create structure (rows). Other locales only
 * fill LOCALIZED sub-fields of the rows created in the first pass — reuse the
 * row ids from `block` (read in that locale), otherwise Payload creates new rows.
 */
function migrateBlock(block: Block, isDefaultLocale: boolean): Partial<Block> | null {
  const label = typeof block.ctaLabel === 'string' ? block.ctaLabel.trim() : ''
  const target = block.ctaTarget as Row | string | number | null | undefined
  const pageId = target && typeof target === 'object' ? target.id : target
  const rows = Array.isArray(block.links) ? (block.links as Row[]) : []

  if (isDefaultLocale) {
    if (rows.length > 0) return null // already migrated
    if (!label && !pageId) return null
    return {
      links: [
        {
          link: {
            type: 'internal',
            page: pageId ?? null,
            label: label || null,
            newTab: false,
            appearance: 'primary',
          },
        },
      ],
    }
  }

  // Other locales: only the localized label, on the existing row (same id).
  if (rows.length === 0 || !label) return null
  const first = rows[0] as Row & { link?: Row }
  if (first.link?.label === label) return null // already migrated in this locale
  return { links: [{ ...first, link: { ...(first.link ?? {}), label } }, ...rows.slice(1)] }
}
// ------------------------------------------------------------ /CONFIG --

const payload = await getPayload({ config })
const localization = payload.config.localization
const defaultLocale = localization ? localization.defaultLocale : undefined
const locales = localization
  ? [defaultLocale, ...localization.localeCodes.filter((l) => l !== defaultLocale)]
  : [undefined]

const { docs } = await payload.find({
  collection: COLLECTION as never,
  depth: 0,
  limit: 0,
  pagination: false,
  ...(defaultLocale ? { locale: defaultLocale as never } : {}),
})

let changes = 0
for (const { id } of docs as Row[]) {
  for (const locale of locales) {
    const doc = (await payload.findByID({
      collection: COLLECTION as never,
      id: id as string,
      depth: 0,
      ...(locale ? { locale: locale as never, fallbackLocale: false as never } : {}),
    })) as Row
    const layout = (Array.isArray(doc[LAYOUT_FIELD]) ? doc[LAYOUT_FIELD] : []) as Block[]

    let dirty = false
    const next = layout.map((block) => {
      if (block.blockType !== BLOCK_TYPE) return block
      const patch = migrateBlock(block, locale === defaultLocale)
      if (!patch) return block
      dirty = true
      changes++
      console.log(`${APPLY ? 'UPDATE' : 'would update'} ${COLLECTION}/${String(id)} [${locale ?? '-'}] block ${block.id}:`, JSON.stringify(patch))
      return { ...block, ...patch }
    })

    if (dirty && APPLY) {
      await payload.update({
        collection: COLLECTION as never,
        id: id as string,
        data: { [LAYOUT_FIELD]: next } as never,
        depth: 0,
        // fallbackLocale: false — otherwise Payload saves default-locale text as this locale's value
        ...(locale ? { locale: locale as never, fallbackLocale: false as never } : {}),
        // ipalMigration: the project's own hooks skip side effects on it. The plugin's hooks read
        // their own flags: ipalSkipIndexNow (no IndexNow ping per page in production),
        // disableRevalidate (buildRevalidateHook).
        context: { disableRevalidate: true, ipalMigration: true, ipalSkipIndexNow: true },
      })
    }
  }
}

console.log(`\n${changes} block change(s) ${APPLY ? 'written' : 'planned (dry run — set APPLY=1 to write)'}.`)
process.exit(0)
