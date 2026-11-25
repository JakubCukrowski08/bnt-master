---
name: ipal-site
description: Builds a complete client website on ipal-kit from a brief to handover with minimal human involvement — intake and one consolidated question list, foundation, content model, navigation, sections, forms, content seeding in every language, integrations, system pages, design, full self-verification (build, ipal-audit, ipal-seo-check, ipal-consent-check, locale coverage, editor test) and a final report. Orchestrates the other ipal-* skills. Use when asked to build/create/make a website, landing page or new site for a client, or to "finish the site".
---

# ipal-site

You run the project as an independent contractor (AGENT.md §0a): you make technical
decisions yourself, ask once for missing data, anticipate problems, check
your own work, and hand over a report at the end. The user should not have to
guide or correct you.

**Rhythm:** the architecture answers first (phase 0 — you wait for them). Then one phase = one commit
(`feat(site): phase N — <what>`), no waiting for an OK between phases. Before each phase, go through the
"Anticipate" table in AGENT.md §0a.

**ipal-kit first (hard rule, AGENT.md "ipal-kit first"):** anything the plugin covers is built with the
plugin's feature. It does not work or is not enough → report it with **ipal-plugin-gap** and wait for the owner's
decision on that part; no hand-built replacement, no silent workaround. **Code rules:** AGENT.md "Code rules"
(one job per file/component/function, no duplicates, typed, texts from the panel, a check for new behaviour).


## Phase 0 — Discovery, architecture questions and one question list
1. Read: the brief (all attachments), `AGENTS.md`, `DESIGN.md`/`PRODUCT.md`,
   `package.json` (ipal-kit version), existing code. New project or finishing one?
2. Write into `AGENTS.md` → "Site map": pages (from the brief), sections on each,
   forms, languages, collections (only if there are lists with URLs — ipal-collection).
3. **Architecture questions — mandatory, you wait for the answers.** Send the list from **ipal-setup**
   stage 0 (languages + default locale + URLs, styling, pages/collections, forms + e-mail, analytics/consent/
   cookie scan, SEO/GEO, database + media, 2FA/white-label/credit, hosting + domains + DNS) for every topic
   the brief does not answer. Write the answers into `AGENTS.md` → "Project decisions". **Never guess an
   architecture answer**, and do not start phase 1 until every topic is answered.
4. **Content questions** — data that is not in the brief (it does not change the architecture), each with a
   **default** you use if there is no reply:
   ```
   Before I finish, I need (if you don't answer, I'll use the value in brackets):
   1. Company data: tax ID (NIP), address, phone? ([TO FILL] in the panel)
   2. Analytics: GA4/GTM/pixel IDs? (off until the IDs are entered in the panel)
   3. R2 keys (bucket, endpoint, access keys)? (until they arrive, media stay local in dev)
   4. Turnstile keys? (test keys in dev; you'll enter production keys in Site integrations)
   5. Translations: should I make drafts for approval? (yes, marked in the report)
   ```
   Send this list with the architecture questions. After the architecture answers arrive, **keep working**
   on the content defaults and fill in the content answers when they arrive. Stop before an irreversible
   decision (AGENT §0a) and on a plugin gap (ipal-plugin-gap — report, wait for the owner).

## Phase 1 — Foundation
- **New site → `ipal-kit create`** with the phase-0 answers as JSON (`docs/project-starter.md`):
  `pnpm --config.auto-install-peers=false dlx @intecion/ipal-kit@<version> create <domain> --answers answers.json`.
  It generates the site from the reference site (every §0b item wired), installs the skills, writes the answers into
  `AGENTS.md`, and makes the first commit. Check: `git log --oneline` = 1 commit, `pnpm typecheck` passes. Then continue
  with phase 2. What it refuses (a single-language site, a default language other than `pl`, no URL prefix, Postgres) → the manual path below.
- New project without the command → **ipal-setup** (all of it, with `ipal-skills`, `AGENTS.md`). Every file you wire has its canonical
  version in the reference site: `node_modules/@intecion/ipal-kit/docs/agent/reference-site/INDEX.md` (AGENT.md
  "Reference site") — copy the pattern, change only the content.
- Existing project on an older ipal-kit → **ipal-upgrade** before anything else.
- Exit: `pnpm build` passes, `/admin` works, `ipal-audit --quick` = 0 errors —
  **including zero "missing: …"**, i.e. the full AGENT.md §0b set (SEO, GEO, R2, Turnstile,
  forms, consent, security) wired from the first phase, not at the end.

## Phase 2 — Content model
- Pages = `Pages` + blocks. Collections only for lists with URLs (**ipal-collection**).
- Globals: Header, Footer, Company (**ipal-nav**), Site settings, System pages.
- Every section from the site map → **a block of the block library first** (`libraryBlocks` from
  `@intecion/ipal-kit/blocks`: hero, textMedia, featureGrid, cta, richText, faq, contact, gallery, testimonials,
  stats, steps, logos, team, pricing, entryList — docs/block-library.md), or one of its variants (`variant`),
  or its options (`fields`, `variants`, `settings`); a project block only when none fits, recorded in
  "Project decisions". Goal: as few own blocks as possible.
- Write the map down: page → sections → library block + variant (or own block + why). The starter turns on
  hero, textMedia, featureGrid, cta, richText, faq, contact, gallery; turn on the rest only when the map needs them.
- Schema change with content in the database → **ipal-migrate-fields**, never "live".

## Phase 3 — Navigation and company data → **ipal-nav**
Language switcher in the header: `LanguageSwitcher` (`/client`). With `renderLabel` (e.g. `PL` / `EN`) wrap it in
your own `'use client'` file (`src/components/layout/LocaleSwitcher.tsx`) and render that from the server header —
a function can't cross from a server to a client component, and `next build` fails. Example: i18n.md
"Language switcher without 404".

## Phase 4 — Sections → **ipal-block** for every block
The reference site's Blocks page (`/pl/bloki` on the reference site, seed `src/seed/showcase.ts` in the index) shows
every library block in every variant, also on the inverted background — pick the closest block × variant there.
Library blocks need no code: `libraryBlocks(blockOptions)` in the Pages layout and `createBlockRegistry(content,
{ Image, Link, sendForm })` in `src/blocks/registry.ts` (docs/block-library.md "Setup"). Change looks through
`classNames` / `ui`, never by copying a block; own it completely only with `ipal-blocks eject <block>`.
Own blocks (no library block fits): order Hero → recurring sections → specific ones.
Every block: schema from the field dictionary, composition of primitives, zero text in JSX
(`ipal-audit --quick` after every block — fix errors right away).
**Enlarged images** (gallery, cards, product photos, certificates, rich text): the shared lightbox,
never a hand-made modal or a lightbox library — `ipalKit({ lightbox: true })` + migration,
`<SiteProviders lightbox>` once, `<LightboxTrigger group={`gallery-${id}`} image={lightboxImage(media, { size })}>`
around the thumbnail, `RenderRichText lightbox` for article images, Form messages → Image viewer labels
in every language (lightbox.md). Check with the keyboard: Enter opens, ←/→ browse, Esc returns focus.

## Phase 5 — Forms → **ipal-form**
Every form = a seed from `ipal-form/resources/seed-form.template.ts` (fields, confirmation, email to the
company **and** confirmation to the customer, every language) — the renderer and action code you write once. **Never** a custom
form with fields in JSX, an `api/contact` route, `nodemailer`, reCAPTCHA (AGENT.md §0b).

## Phase 6 — Content in the panel, every language
1. Copy `resources/seed-content.template.ts` → `scripts/seed-content.ts`. Start every standard page from
   `pageTemplates` (`@intecion/ipal-kit/templates`: home, about, services, service, contact, blogIndex, post,
   legal, cookiePolicy, notFound) with `blocks: libraryBlockSlugs(blockOptions)` and `overrides` for the brief's
   texts; forms by `{ $form: 'Contact form' }`; system pages with `systemPageRefs` (docs/block-library.md).
   Enter content from the brief: pages, blocks, links (`{ $page: 'slug' }`), globals —
   all languages side by side (`{ pl, en }`). Missing data → `[TO FILL: …]`.
   Never invent company data, prices, reviews, numbers, certificates, names.
   **VERY IMPORTANT — after launch never run the whole seed again** (the owner's edits must survive): a later
   change lists exactly the records it touches in `ONLY` / `SEED_ONLY` (e.g. `pages:kontakt,global:header`),
   checked with a dry run; a full re-seed only with the owner's explicit OK (`IPAL_SEED_ALLOW_FULL=1`).
   The template is a thin script over `createSeeder` (`@intecion/ipal-kit/seed`): keep the calls
   (`upsertBySlug`, `fillGlobal`, `summary`), change only CONTENT; options in docs/seeding.md.
2. `pnpm payload run scripts/seed-content.ts` → the placeholder list goes into the report.
   On production (rules: `node_modules/@intecion/ipal-kit/docs/seeding.md`): `SEED_DRY_RUN=1` first, back up the
   database, then the real run. It only creates what is missing; `SEED_UPDATE=1` there is refused without
   `IPAL_SEED_ALLOW_PROD_UPDATE=1` and still skips pages an editor changed (`skip (edited)`).
3. System pages: Homepage, 404, privacy policy (the page exists; the policy
   text comes from the client → placeholder). Cookie banner (with Detail labels and the Cookies list
   from the scan), Notifications — texts in every language.
4. **ipal-locale-add → `locale-coverage`** = 0 gaps (or deliberate ones listed in the report).
5. Images: leave upload fields empty (the editor adds them) or upload files from
   the brief via the panel — prepared (WebP/JPG ≤ 1.5 MB, ≤ 2560 px).

## Phase 7 — Integrations (panel, not code)
Site integrations: email transport + **Send test**, Turnstile (both keys — one
key = Turnstile off and a red alert on the dashboard), analytics/pixels
(only with IDs from the client), consent (categories matching the tools in use).
Site settings: name, description (feeds llms.txt and MCP), OG image, favicon. SEO tab: meta
title/description of every page (≤ 60 / ≤ 155 characters, unique); `aiSummary` —
keep the auto-fill or fix it when the summary is weak.

## Phase 8 — Design
The reference site's `/design` page (`src/components/design/TokenPanel.tsx` in the index) is the styleguide to reproduce:
every token from `IPAL_TOKENS`, light and dark, the inverse scope.
The design-token standard (AGENT.md §6.11, `design-tokens.md`): `DESIGN.md` exists → its values go into
`src/design/tokens.ts` (template `.agents/skills/ipal-setup/resources/tokens.ts`) → `pnpm exec ipal-tokens` (no ✗
contrast rows). None → copy the `DESIGN.md` template, keep the neutral defaults + the brand primary, and recommend
Impeccable in the report. Components use only the preset's utilities. Do not polish styles ad hoc in components. Library blocks follow the
tokens by themselves (token utilities only); a part that needs another look → `createBlockRegistry({ classNames })`.
Responsiveness: 360 px, 768 px, 1280 px — no horizontal scroll.

## Phase 9 — Verification (all by yourself, results go into the report)
```bash
pnpm generate:types && pnpm tsc --noEmit
bash .agents/skills/ipal-audit/scripts/audit.sh            # full: + tsc + build
pnpm build && pnpm start &                                  # page routes ● (SSG), not ƒ
node .agents/skills/ipal-seo-check/scripts/seo-check.mjs http://localhost:3000
node .agents/skills/ipal-consent-check/scripts/consent-check.mjs http://localhost:3000/<locale>
pnpm payload run .agents/skills/ipal-locale-add/scripts/locale-coverage.ts
```
`ipal-seo-check` also checks GEO: `/llms.txt`, `/llms-full.txt`, `/md/…`, `/api/mcp`,
JSON-LD, AI bots in robots — every gap is an `[ERROR]` to fix.
Plus by hand: the editor test (AGENT §11) in every language, the form (list in
ipal-form §6), keyboard (Tab through the menu, banner, form; visible focus),
404 in every language. Fix every `[ERROR]` (**ipal-debug**) and run the
check again. Never hand over with errors — exception: an ipal-kit bug reported with `ipal-plugin-gap`
and waiting for the owner's decision (or handled by an approved, marked workaround).

## Phase 10 — Final report (the only big message to the user)
```markdown
# <Client> — site ready for review
## Done
- pages: <list with URLs per language> · blocks: <list> · forms: <list>
- languages: <…> · integrations: <email ✓ Send test, Turnstile ✓, analytics: waiting for IDs>
## Checks
build ✓ (n routes ●) · ipal-audit 0/0 · seo-check <e>/<w> · consent-check 0 violations · locale-coverage 0
## Mandatory set (AGENT.md §0b)
SEO ✓ · JSON-LD ✓ · llms.txt + llms-full ✓ · Markdown ✓ · MCP ✓ · R2 <✓ / waiting for keys> ·
Turnstile <✓ / waiting for keys> · forms from the panel ✓ · consent ✓ · 2FA ✓ · health ✓
(skipped by client decision: <ipal-audit-skip or "none">)
## To fill in by you / the client (in the panel)
- [TO FILL: tax ID (NIP)] → Company · … (full list from the seed)
- draft translations for approval: <pages>
## Decisions I made
- <decision> — <why> (full list in AGENTS.md)
## Fixed along the way
- <problem → cause → fix> (briefly, only what matters)
## For ipal-kit
- [bug|improvement] <topic> → docs/plugin-requests/<file> · owner's decision: <wait / option / approved workaround at file:line>
## Next step
- <one thing, e.g. "give me the domain → deployment per PROGRAMISTA §4">
```
Do not report progress along the way. Exceptions: the question lists from phase 0, a plugin gap
(reported at once, ipal-plugin-gap), an irreversible decision.
