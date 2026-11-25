---
name: ipal-migrate-fields
description: Safely changes the shape of fields that already hold content in an ipal-kit / Payload 3 project — renaming a field, replacing old CTA fields with buildLinkField/buildLinksField, moving fields into a group, splitting or merging blocks, changing a field's type, making a field localized. Three phases (add new → copy data with a dry-run script → remove old), all locales, no content loss. Use whenever a schema change touches fields that may already have data in the database, including refactors suggested by ipal-audit.
---

# ipal-migrate-fields

Payload **does not migrate data for you**. Renaming a field or changing its type in code
= the old data stays in the database under the old key, the admin panel shows an empty field, the front end
renders nothing. On Postgres there is also a schema migration that can **drop the column
with the data**. So always three phases, never "change it and see".

## When you do NOT need this skill
- Project without content (fresh, seeded from scratch) → change the schema, re-seed.
- You are adding a **new** field (not replacing an old one) → a normal change.
- You only change `label`, `admin.*`, `validate`, `defaultValue` → no effect on data.

Everything else (rename, type, moving into a group/array, `localized: true/false`,
replacing CTA fields with `buildLinkField`, splitting a block) → this skill.

## Before you start (on your own, without asking)
1. **Database backup** — Mongo: `mongodump --uri "$DATABASE_URI" --out backup/$(date +%F)`;
   Postgres: `pg_dump "$DATABASE_URI" > backup/$(date +%F).sql`. Do not start without a backup.
2. Identify the database adapter (`payload.config.ts` → `mongooseAdapter` / `postgresAdapter`).
3. Write down: collection/global, block type, OLD fields → NEW fields, which ones are `localized`.
4. Find every place that reads the old fields: `grep -rn "<oldName>" src/`.

## Phase 1 — add the NEW fields next to the OLD ones
- Add the new fields to the schema; the old ones **stay**, mark them in the panel:
  `admin: { description: 'DEPRECATED — migrated to <new>', readOnly: true }`.
- Front end: read the NEW fields with a fallback to the OLD ones (during the transition):
  `const links = block.links?.length ? block.links : legacyToLinks(block)`.
- `pnpm payload generate:types` · Postgres: `pnpm payload migrate:create add-<name>` +
  `pnpm payload migrate` (the migration only ADDS columns — review the file before you run it).
- `tsc --noEmit` clean.

## Phase 2 — move the data with a script
1. Copy the template: `resources/migrate-block-fields.template.ts` →
   `scripts/migrate-<name>.ts`. Change only the `CONFIG` section and `migrateBlock()`.
   The template: all documents × all locales, idempotent,
   `context: { ipalMigration: true, ipalSkipIndexNow: true, disableRevalidate: true }`.
2. Rules in `migrateBlock()`:
   - **The first pass (defaultLocale) creates the structure** (array rows, blocks).
   - **Other locales only fill `localized` fields** in existing rows —
     use the row `id`s from the read (new `id` = Payload creates new rows, and content
     disappears in other languages).
   - Relations at `depth: 0` are IDs — copy IDs, not objects.
   - Write non-localized fields only in the defaultLocale.
   - Always write another language with `fallbackLocale: false` (it is in the template) — otherwise
     Payload saves the defaultLocale text as the translation.
3. Dry run: `pnpm payload run scripts/migrate-<name>.ts` → read the list of changes,
   check 2–3 documents by hand (especially the second language). When the migration creates new
   rows, the dry run shows only the defaultLocale pass (the rows do not exist yet) —
   you will see the other languages in the APPLY output.
4. Write: `APPLY=1 pnpm payload run scripts/migrate-<name>.ts`.
5. Verify: another dry run → `0 block change(s)`; in the panel open the document in
   every language; on the front end `pnpm build && pnpm start` + `ipal-seo-check`.

Globals (Header, Footer): instead of `find` → `findGlobal`/`updateGlobal({ slug, data, locale })`
— the same loop over locales. Collection with `versions.drafts`: the script updates
the main version; if a document has a newer draft, add `draft: true` to the read and
the write, or publish the drafts before the migration (ask only if they are the client's drafts).

Project hooks that send emails/revalidate/call webhooks: with `context.ipalMigration`
they must do nothing (`if (context?.ipalMigration) return`). Check before APPLY. Plugin hooks
have their own flags (they are in the template): `ipalSkipIndexNow` (IndexNow with `indexNow: true` in
production would ping Bing for every page), `disableRevalidate` (`buildRevalidateHook`).

## Phase 3 — remove the OLD fields
- **Production with client content → ask the user before phase 3** (the only question
  in this skill). Locally / on staging → do it yourself.
- Remove the old fields from the schema, the fallback from the front end, `grep` → zero hits.
- `generate:types`; Postgres: `migrate:create remove-<name>` — this migration
  **DROPS columns**; run it only after phase 2 on the same database.
- Mongo: the old keys stay in the documents (harmless). Cleanup is optional:
  `$unset` in a separate script.
- `ipal-audit --quick` → 0 errors.

## Common cases → what goes in migrateBlock

| Change | First pass | Other locales |
|---|---|---|
| rename `title` → `heading` | `{ heading: block.title }` | the same, if localized |
| CTA (`ctaLabel`, `ctaUrl`) → `buildLinkField` | `{ link: { type: 'external', url, label, appearance } }` (page from the panel: `type: 'internal', page: id`) | only `link.label` |
| CTA with a relation → `buildLinksField` | row `{ link: { type: 'internal', page: id, … } }` (template) | `links[i].link.label`, keeping the `id` |
| fields → `group` | `{ group: { a: block.a, b: block.b } }` | localized fields in the group |
| `text` → `richText` | `{ body: textToLexical(block.text) }` (paragraphs → `paragraph` nodes) | the same |
| non-localized → `localized` | copy the value to the defaultLocale | (optional) the same value as a starting translation — ask |
| split block A → A + B | add a new block after A (`blockType: 'b'`, no `id`) | fill the localized fields by the new block's `id` |

Lexical from text:
```ts
const textToLexical = (t: string) => ({ root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
  children: t.split(/\n{2,}/).map((p) => ({ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0,
    children: [{ type: 'text', text: p, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }] })) } })
```

## When something goes wrong
- Duplicated rows in the second language → row `id`s were not used; restore the backup, fix, repeat.
- `ValidationError` on APPLY → a new `required` field has no value in the old data;
  add a default value in `migrateBlock` or temporarily drop `required`.
- The script does not start (`Cannot find module '@payload-config'`) → alias in `tsconfig.json`
  (`"@payload-config": ["./src/payload.config.ts"]`) — standard in the Payload template.

Final report: how many documents / blocks / locales were changed, where the database backup is,
whether phase 3 was done (or is waiting for approval).
