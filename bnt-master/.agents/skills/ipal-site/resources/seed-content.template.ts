/**
 * Content seed from the brief — skill ipal-site, phase 6. Rules: docs/seeding.md.
 *
 *   SEED_DRY_RUN=1 pnpm payload run scripts/seed-content.ts  # no writes: prints create / skip / update per record
 *   pnpm payload run scripts/seed-content.ts                 # creates what's missing, never overwrites
 *   SEED_UPDATE=1 pnpm payload run scripts/seed-content.ts   # also updates records nobody edited since seeding
 *   SEED_ONLY="pages:kontakt" pnpm payload run …           # only the listed records (or set ONLY below)
 *   (`--dry-run` after the script path works too, e.g. `pnpm seed:content --dry-run`.)
 *
 * The rules live in createSeeder (@intecion/ipal-kit/seed), so fixes arrive with a
 * plugin upgrade:
 * - Create-only and idempotent. Pages match by their DEFAULT-locale slug; globals
 *   get only the fields that are still empty. Nothing is ever deleted.
 * - SEED_UPDATE=1 is refused when NODE_ENV=production or the database is not local,
 *   unless IPAL_SEED_ALLOW_PROD_UPDATE=1 is also set. Back up the database first.
 * - An update skips every record an editor changed since seeding ("skip (edited)").
 * - Every locale is written with `fallbackLocale: false` onto the same row ids.
 * - Writes carry ipalSkipIndexNow, disableRevalidate and ipalSeed in `context`.
 * - Never seed users, passwords or secrets (SMTP, Turnstile, API keys) — panel / env.
 * - VERY IMPORTANT — after launch: never run the whole seed again. The owner's edits on the live
 *   site must survive. List exactly the records this run may touch in ONLY (or SEED_ONLY); the rest
 *   is reported as "skip (not listed)". A run without a list against a production / non-local
 *   database is refused unless IPAL_SEED_ALLOW_FULL=1 — only with the owner's explicit OK.
 *
 * Write content ONCE, all languages side by side:
 *   heading: { pl: 'Nasze usługi', en: 'Our services' }   → localized value
 *   heading: 'Nasze usługi'                               → same in every locale / non-localized field
 *   page: { $page: 'kontakt' }                            → ID of the page whose DEFAULT-locale slug is 'kontakt'
 *   form: { $form: 'Contact form' }                       → ID of the form with that title (seed forms first)
 * Missing data: '[TO FILL: tax ID (NIP)]' — never invent company data, prices, reviews, numbers.
 * Media: leave empty or reference existing uploads by ID — the editor adds images. Never upload here.
 */
import config from '@payload-config'
import { libraryBlockSlugs } from '@intecion/ipal-kit/blocks'
import { createSeeder, guardSeedExit } from '@intecion/ipal-kit/seed'
import { pageTemplates } from '@intecion/ipal-kit/templates'
import { getPayload } from 'payload'

import { blockOptions } from '@/blocks/configs'

// ------------------------------------------------------------------ CONTENT --
// Standard pages start from the library templates (docs/block-library.md "Page templates"): every text in
// pl + en, [TO FILL: …] where only the client can write. Put the brief's texts in `overrides`; change the
// sections with `layout`. `blocks` = the library blocks this project turned on (others are left out).
const blocks = libraryBlockSlugs(blockOptions)
const PAGES: Record<string, unknown>[] = [
  pageTemplates.home({
    blocks,
    overrides: {
      hero: {
        header: { heading: { pl: 'Nagłówek z briefu', en: 'Heading from the brief' } }, // buildSectionHeaderField
        variant: 'split',
      },
    },
  }),
  pageTemplates.contact({ blocks, form: { $form: 'Contact form' } }), // seed the form first (ipal-form)
  pageTemplates.legal('privacyPolicy', { blocks }),
  pageTemplates.notFound({ blocks }),
  // A page of your own: { title: { pl, en }, slug: { pl, en }, layout: [{ blockType: 'faq', items: [...] }] }
]
const GLOBALS: { slug: string; data: Record<string, unknown> }[] = [
  // { slug: 'header', data: { links: [{ link: { type: 'internal', page: { $page: 'kontakt' }, label: { pl: 'Kontakt', en: 'Contact' } } }] } },
]
const COLLECTION = 'pages'
// Before launch: undefined (the whole site). After launch: ONLY the records the owner asked for, e.g.
// ['pages:kontakt', 'global:header'] — `collection:<default-locale slug>`, `global:<slug>`, `collection:*`.
const ONLY: string[] | undefined = undefined
// ----------------------------------------------------------------- /CONTENT --

// An early exit (Payload never up, the run cut short) fails with exit 1 instead of a silent 0 (docs/seeding.md).
guardSeedExit()

// Options (docs/seeding.md § Turn off, override, extend) — env vars work without editing this file:
// createSeeder(payload, { editCheck: { hashField: false }, guard: { localHosts: ['db'] }, context: { … } })
const seed = createSeeder(await getPayload({ config }), { only: ONLY, pagesCollection: COLLECTION })

// One call for all pages: missing ones are created first, so $page links work in any order.
await seed.upsertBySlug(COLLECTION, PAGES)
for (const g of GLOBALS) await seed.fillGlobal(g.slug, g.data)

const { errors } = seed.summary()
const todo = JSON.stringify({ PAGES, GLOBALS }).match(/\[TO FILL:[^\]]*\]/g) ?? []
if (todo.length) console.log(`\n${todo.length} placeholder(s) for the final report:\n  ${[...new Set(todo)].join('\n  ')}`)
process.exit(errors ? 1 : 0)
