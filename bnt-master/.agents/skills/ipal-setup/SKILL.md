---
name: ipal-setup
description: Complete start-to-finish install of @intecion/ipal-kit in a Payload 3 + Next 16 project (empty folder or a project missing its ipal-kit foundation) with the full mandatory feature set (AGENT.md §0b). Every stage gives exact steps, the minimal code per file, a concrete check (command, curl, panel) and how to switch the module off or override it — registry and dependencies, ipal-skills (skills + AGENTS.md/CLAUDE.md pointer) and required reading (AGENT.md, ipal-reference), i18n, payload.config with ipalKit (injected 2FA, white-label, forms, mailAdapter, R2, consent log, IndexNow, global revalidation), Pages/Media, design tokens, UI primitives, proxy with Markdown negotiation, layout with SiteProviders, catch-all and 404, SEO routes, GEO routes (llms.txt, llms-full.txt, Markdown, MCP, IndexNow), security headers, CSP, env validation, forms, cookies, navigation, final completeness check and panel steps for the client. Use when starting a new website or when ipal-kit wiring is missing or partial.
---

# ipal-setup

**Goal: the MANDATORY SET from AGENT.md §0b (18 items), with nothing left "to discover".** Stage 11
checks everything; you do not finish with gaps (exception: an `ipal-audit-skip:` line from a client decision, AGENT.md §0b).

**Canonical code:** every stage's files exist, wired and tested, in the reference site —
`node_modules/@intecion/ipal-kit/docs/agent/reference-site/INDEX.md` (AGENT.md "Reference site"). When a snippet here
and the reference site differ, the reference site is the current one (and the difference is a plugin bug to report).

**Stage 0 first: ask the architecture questions and wait for the answers** (below). After that: **one stage = one
commit** (`git commit -m "ipal-setup <N>: <stage>"`), no waiting for an OK between stages (AGENT.md §0a). Missing
*content data* (keys, IDs, company data) does not block you: wire the code, the value goes into `.env`/the panel
later, anything missing goes into the report. Step-by-step mode only on request. Full site build: **ipal-site**.

**ipal-kit first (hard rule, AGENT.md "ipal-kit first"):** anything the plugin covers is built with the
plugin's feature. It does not work or is not enough → report it with **ipal-plugin-gap** and wait for the owner's
decision on that part; no hand-built replacement, no silent workaround. **Code rules:** AGENT.md "Code rules"
(one job per file/component/function, no duplicates, typed, texts from the panel, a check for new behaviour).


**ipal-kit helps, never limits:** you can turn off every module separately and override every default —
**the project config wins**. Every stage has a **Turn off / override** line; "currently always" = the plugin code
has no option for it yet. No option = **plugin gap** (`ipal-plugin-gap`), never a patch in `node_modules`.

Every stage: **Steps** → **Code** (minimum, imports verified against `exports`) → **Check** → **Turn off / override**.
Entry points: `@intecion/ipal-kit` (config, builders, helpers), `/rsc` (server components), `/client`
(`'use client'`), `/server` (server actions), `/env` (instrumentation), `/admin`, `/fluid.css`, `/fluid-wide.css`.

---

## 0. Architecture questions — ask, then wait (mandatory)

**Steps.** Read the brief, `DESIGN.md`/`PRODUCT.md` and any existing code. Send the owner **one list** with every
question the brief does not answer (rule: AGENT.md "Ask before you build"). **Wait for the answers** — do not start
stage 1 on a guess. Ask again about anything still open; a missing architecture answer is never filled with a default.
```
Before I set up the site I need your decisions on:
1. Languages: which ones, which is the default, URLs — every language with a prefix (/pl/…, /en/…) or the default without one?
2. Styling: a design system / DESIGN.md, or Tailwind tokens from scratch? Brand colours, fonts, light/dark theme?
3. Pages and content: which pages? Lists with their own URLs (blog, case studies, products) and their archive pages?
4. Forms: which forms, who receives the submissions, e-mail via SMTP (panel) or Microsoft Graph?
5. Analytics and consent: GA4 / GTM / Meta / other pixels? Consent Mode basic or advanced? Cookie dialog
   inline / modal / detailed? Cookie scan of the finished site?
6. SEO/GEO: market, local business (address, opening hours)? AI access (llms.txt, Markdown, MCP, AI bots) — on?
7. Database: Postgres or MongoDB? Names (rule: domain without dots + _prod / _dev) — for <domain> I will use
   <domainnodots>_prod and <domainnodots>_dev, OK? Media: Cloudflare R2 or local disk (Coolify volume)?
8. Admin: 2FA (on by default), white-label with the client's logo, agency credit in the panel?
9. Hosting: Coolify — which server/project? Production domain(s), www or apex? Who adds the DNS records?
```
**Code.** None — write every answer into `AGENTS.md` → "Project decisions" (one line per topic; template: AGENT.md §13).

**Database names** (VERY IMPORTANT, deployment.md §4.2a): derive them from the production domain — dots removed,
plus `_prod` / `_dev` (`intecion.com` → `intecioncom_prod`, `intecioncom_dev`; `architektimprez.pl` →
`architektimprezpl_prod`, `architektimprezpl_dev`) — and confirm them in question 7. Never `payload`, `test` or a guess.

**Check.** All nine topics have an answer in "Project decisions" (including both database names); nothing in it
says "assumed" or "default".

**Turn off / override.** Never skipped. If the owner says "you decide" for a topic, write that down as their answer,
propose a concrete choice and get a yes before you build it.

## 1. Installation

**New site: `ipal-kit create` does stages 1–10 in one command** (`node_modules/@intecion/ipal-kit/docs/project-starter.md`).
After stage 0, write the answers as JSON (shape `StarterAnswers` from `@intecion/ipal-kit/starter`) and run, from the
folder that will hold the project (needs the `@intecion` registry line in `~/.npmrc`):
```bash
pnpm --config.auto-install-peers=false dlx @intecion/ipal-kit@<version> create <domain> --answers answers.json
```
It generates the site from the reference site, writes `.env` (fresh `PAYLOAD_SECRET`), installs from the shipped
lockfile, runs `ipal-skills`, `ipal-tokens`, `generate:types`, `generate:importmap`, `typecheck` (and `ipal-doctor
--strict --offline` when shipped), checks for secrets and makes the first commit. **Check:** `git log --oneline` = 1 commit,
`git status` clean, `AGENTS.md` → "Project decisions" holds every answer, `pnpm typecheck` passes. Then go to stage 11.
**Turn off / override:** it stops (nothing written) for **single-language sites** and **a default language other than
`pl`** (not supported yet), sites without `en`, URLs without a prefix and
Postgres — use the stages below; every generated file is the project's own afterwards. The stages below are also the
path for an existing project.

**Steps (manual path).** Scaffold: `npx create-payload-app@latest <project>` (Blank, Postgres/Mongo), delete the starter
`src/app/(frontend)/layout.tsx` and `page.tsx` (the frontend root becomes `[locale]/layout.tsx`). Do not create
`middleware.ts` (Next 16 = `proxy.ts`; delete an existing one). Never install from git (`git+https://…`).
```ini
# .npmrc (commit it — no secret)
legacy-peer-deps=true
@intecion:registry=https://git.intecion.net/api/packages/IntecionSoftware/npm/
```
```bash
pnpm add @intecion/ipal-kit @payloadcms/plugin-seo @payloadcms/plugin-form-builder \
  @payloadcms/storage-s3 @clocklimited/payload-2fa@3.0.0-beta.7 tailwindcss @tailwindcss/postcss
```
**Next.js 16.4.5 or later** (minimum safe version: 16.0.0–16.4.0 have critical advisories, 16.3.0–16.4.4 have
GHSA-mfr8-8qww-v76h — AGENT.md §4 item 11): `pnpm add next@16.4.6 eslint-config-next@16.4.6 sharp@^0.35.5` when
create-payload-app gave you an older one.
**Payload 3.94.1** (what the reference site and the starter use; the plugin accepts `^3.90.2`): every `payload` /
`@payloadcms/*` on the same exact version, `react` and `react-dom` 19.3.1 (Payload 3.94 requires `^19.3.1`), and
**Node.js 22.23.5 or later** on the 22 line (`"engines": { "node": ">=22.23.5 <23" }`, `.nvmrc` `22`) — Payload 3.94's
minimum, also in Coolify (Nixpacks picks the patch: check `node -v` in the app's Terminal after the first deploy). After the install, `pnpm audit --prod` → no high or critical; add the `dompurify` and `happy-dom` overrides
from AGENT.md §4 item 12 (`"happy-dom@<21.0.4": "^21.0.4"` fixes two high advisories Lexical still brings in). On an
older Payload also the `mongoose` (MongoDB) and `undici` ones listed there. `pnpm exec ipal-doctor` → no
`transitive-min` finding.
`nodemailer`, `lucide-react`, `slugify`, `server-only` come with the plugin — do not add them (your own
`lucide-react` only `~0.400.0`). In `package.json`: pin every `@payloadcms/*` (ui, next, db-*, richtext-lexical,
plugin-seo, plugin-form-builder, storage-s3) in `pnpm.overrides` **to the exact `payload` version**, then
`rm -rf node_modules pnpm-lock.yaml && pnpm install`. Build with webpack:
`"build": "cross-env NODE_OPTIONS=\"--max-old-space-size=3072\" next build --webpack"`.

**Check.** `ls node_modules/@intecion/ipal-kit/docs/agent/AGENT.md` exists;
`pnpm ls payload @payloadcms/ui @payloadcms/plugin-seo` — one, identical version; `pnpm ls next sharp` → next ≥ 16.4.5,
sharp ≥ 0.35.5; `ls src/middleware.ts` → not found.
404 on `pnpm add` = missing `@intecion:registry` line; 401 = stale `_authToken` in `~/.npmrc` (PROGRAMISTA §1).

**Turn off / override.** `@payloadcms/storage-s3` and `@clocklimited/payload-2fa` are optional peers — only unneeded
with `twoFactor: false` / without `buildR2Storage` (both mandatory in §0b). Never let `@payloadcms/*` versions drift apart.

## 2. Skills, pointer and reading — before you write code

**Steps.**
1. `pnpm exec ipal-skills` — copies the `ipal-*` skills to `.agents/skills/` **and** appends the ipal-kit pointer
   block to the project's `AGENTS.md` / `CLAUDE.md`. Add the script `"ipal:skills": "ipal-skills"`; run it after
   every package update. Commit `.agents/skills/`.
2. `tsconfig.json`: `"exclude": ["node_modules", ".agents"]` (skills contain `.ts`/`.tsx` templates; without this
   `tsc`/`next build` fail and `ipal-skills` exits with code 1).
3. **Read in full:** `node_modules/@intecion/ipal-kit/docs/agent/AGENT.md` and the **ipal-reference** skill
   (`.agents/skills/ipal-reference/SKILL.md` — wiring map; `resources/api.md` — index of every export).
   Check every name not in this skill there, not from memory.
4. `AGENTS.md` per AGENT.md §13: project line (client, domain, market, languages, media, mail) and "Project decisions"
   (cookie dialog mode, decisions from the question list) — **outside** the `<!-- ipal-kit:start -->…<!-- ipal-kit:end -->` block
   (overwritten on every `ipal-skills` run). No `CLAUDE.md` → `ipal-skills` creates it with an `@AGENTS.md` line.

**Check.** `ls .agents/skills | grep -c '^ipal-'` > 0 (including `ipal-reference`); `grep -c 'ipal-kit:start' AGENTS.md` = 1;
`CLAUDE.md` has `@AGENTS.md` or its own block; `pnpm exec ipal-skills --dry-run` without a `tsconfig` warning.

**Turn off / override.** `--no-pointer` — no block in AGENTS.md/CLAUDE.md (then write the "Rules" section from §13
yourself); `--dest .claude/skills` — another directory (then exclude `.claude` and replace the `.agents/skills` paths in
commands); `--dry-run` — preview. Name your own skills without the `ipal-` prefix — they are left untouched.

**Optional — external skills** (after the architecture answers; only if the owner wants them, record it in
"Project decisions"): `pnpm exec ipal-skills --external` (all) or `--external ext-react-best-practices,ext-accessibility`
— Vercel React best practices and composition patterns, Addy Osmani accessibility, Anthropic frontend design,
the official Payload 3 skill (reference). Pinned, text only, nothing downloaded; our rules win over them (AGENT.md §14).
**Check:** `ls .agents/skills | grep '^ext-'`; each folder has `SOURCE.md` with the pinned commit.

## 3. Configuration

**Code.**
```ts
// src/i18n.config.ts — the ONLY source of languages
import type { I18nConfig } from '@intecion/ipal-kit'
export const i18nConfig = {
  defaultLocale: 'pl',
  locales: [{ code: 'pl', label: 'Polski' }, { code: 'en', label: 'English' }],
} as const satisfies I18nConfig

// src/content.config.ts — collections with an archive (blog…) are added by the ipal-collection skill
import type { ContentOption } from '@intecion/ipal-kit'
export const contentConfig: ContentOption = { collections: [] }

```
```ts
// src/payload.config.ts — keep from create-payload-app: db, editor, secret, sharp, typescript, admin.importMap
import { buildConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { buildR2Storage, ipalKit, mailAdapter } from '@intecion/ipal-kit'
import { payloadTotp } from '@clocklimited/payload-2fa'
import { s3Storage } from '@payloadcms/storage-s3'
import { i18nConfig } from '@/i18n.config'
import { contentConfig } from '@/content.config'
import { Pages } from '@/collections/Pages'
import { Media } from '@/collections/Media'

export default buildConfig({
  // …db, editor, secret, sharp, typescript from create-payload-app…
  collections: [Pages, Media],                // ipalKit injects users
  email: mailAdapter(),                       // without this form-builder emails are not sent
  plugins: [
    ipalKit({
      i18n: i18nConfig,
      access: { authCollection: 'users' },
      pages: { slug: 'pages' },
      content: contentConfig,
      seo: { collections: ['pages'] },
      forms: { redirectRelationships: ['pages'] },
      twoFactor: { issuer: '<Client name>', plugin: payloadTotp },
      whiteLabel: true,
      indexNow: true,
      consentLog: true,                       // without this there is no POST /api/ipal/consent
      revalidatePath,                         // saving a plugin global refreshes the whole site (ISR)
    }),
    buildR2Storage(['media'], { s3Storage }), // ALWAYS: R2 with the full R2_* set, local disk without it
  ],
})
```
`.env.example` (no values, in the repo): `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `R2_BUCKET`,
`R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_URL` (empty = media through the app — the default), `IPAL_IP_HEADER` (`cf-connecting-ip`
behind Cloudflare, `x-forwarded-for` behind a plain proxy), `IPAL_NOINDEX` (empty; `1` on staging only), `INDEXNOW_KEY`,
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (panel fallback), with Graph `GRAPH_TENANT_ID`,
`GRAPH_CLIENT_ID`, `GRAPH_CLIENT_SECRET`, `GRAPH_SENDER`. Local `.env` with `PAYLOAD_SECRET` ≥ 32 characters (in production `ipalEnvRules` refuses a shorter one; `secretMinLength` changes it).
One language: one entry in `locales`, no `[locale]` folder (i18n.md).

**Check.** `pnpm payload generate:importmap` (whiteLabel adds admin components) and `pnpm generate:types` without
errors (the import map lists `@intecion/ipal-kit/admin#TotpRedirectProvider` and `#SafeTotpView`); `pnpm dev`, `/admin`: first-user screen → after saving, TOTP setup is enforced (`/admin/setup-totp?back=%2Fadmin`, QR, no reloading);
the panel shows Site settings, Site integrations, Cookies, Form messages, the Forms group, Consent records.
`curl -s -o /dev/null -w '%{http_code}' -X POST localhost:3000/api/ipal/consent -H 'content-type: application/json'
-d '{"id":"0123456789abcdef","version":1,"state":{"necessary":true,"functional":false,"analytics":false,"marketing":false}}'` → `201`.

**Turn off / override.**
- `enabled: false` — collections, globals and fields stay (schema unchanged, `migrate:create` drops nothing);
  no `/api/ipal/*` endpoints, no `onInit` work, no admin components.
- Omitted option = module off: `seo`, `forms`, `pages` (without it `content` does not work), `content`,
  `consentLog`, `indexNow`, `whiteLabel`, `access`, `stats`.
- `twoFactor`: **omitting it throws** (`issuer` is required) — turn it off only explicitly with `twoFactor: false`
  (discouraged); without an injected `plugin: payloadTotp` it also throws. `forceSetup` currently always `true`.
- `users`: the injected collection lets admins manage everyone and others only themselves — loosen with
  `access: { authCollection: 'users', authAccess: { read: authenticated } }` (your keys win); your own collection with
  that slug wins whole (the plugin only adds `roles` — give it `adminOrSelfIn('users')` / `adminOnly`). The first account
  (Create first user) gets `admin` — `access.firstUserAdmin: false` turns that off. `localization` currently always
  overridden from `i18n`.
- 2FA wraps the panel's login collection (`admin.user`); a different `twoFactor.collectionSlug` stops startup with
  `[ipal] twoFactor…` unless `allowCollectionMismatch: true`. The second factor covers every collection and global
  (the plugin's own, and those of plugins listed after `ipalKit`) and the plugin's endpoints; guard your own
  endpoints with `secondFactorPassed(req)` or `userMeetsRole(req, role)` (security.md "What the second factor covers").
  Verify attempts: 5 per account in 10 minutes (`twoFactor.verifyLimit`).
  The `back` link of the setup and verify screens is checked on the server (`twoFactor.safeBack`, on by default:
  only a path inside the admin route is kept; `false` turns it off, a function replaces the rule). It needs the
  import map entry `@intecion/ipal-kit/admin#SafeTotpView` — run `pnpm payload generate:importmap` and commit
  (a production build with a map that lacks it shows 2FA screens without a code form: nobody can sign in;
  `ipal-doctor`, the start log and a notice above the screen report it; `twoFactor.importMapCheck: false` turns the
  log line and the notice off — needed when the `importMap.js` on disk is not the one the build used).
  Check: password only → `/admin/verify-totp?back=https%3A%2F%2Fexample.com%2F` → code → you land on `/admin`.
  **Set 2FA up right after creating an account** (log in as it, scan the code): until then its password alone
  opens everything its role allows. One entity reachable without the code: `custom.ipal.secondFactor`.
  **Setup required** (`twoFactor.requireSetup`, default): an account without TOTP reaches only the setup screen; it
  has 72 h from its creation (or an admin's "Reopen setup" on the account page), then it is blocked. So create an
  account, hand over the password and have the owner set 2FA up at once. **Postgres/SQLite: `pnpm payload
  migrate:create` and have the migration applied when the container starts, before the site serves** — `prodMigrations`
  or the start command `pnpm payload migrate && pnpm start`, never a pre-deployment command (deployment.md §4.3)
  (column `totp_setup_from`, there whenever 2FA is
  on) — without it every login answers 500; `pnpm payload generate:importmap` (`TwoFactorStatusField`,
  `TwoFactorAlert`). A service account that logs in with a password: `requireSetup: { exempt }` (a plain function
  returning exactly `true`; never `async`); an API key needs nothing. Parts to switch off: `requireSetup:
  { dashboardNotice: false, statusField: false, setupNotice: false }`. An admin's reset ends the account's
  sessions and needs the admin's own TOTP code (`twoFactor.resetAccess` changes who). Have two administrators
  with 2FA: when all are blocked, only a script or a redeploy helps (security.md "Every administrator is
  blocked"). One entity reachable without the code: `custom.ipal.secondFactor`.
- A second auth collection (`customers`, a client zone): set `admin: { user: 'users' }` in `buildConfig`; its
  accounts pass none of the plugin's checks and no role counts for them (not even their own `roles: ['admin']`);
  a field that grants rights is never writable at sign-up; use `adminOrSelfIn('<slug>')` in every auth collection; a second
  collection of STAFF goes in `access.staffCollections` (access.md "Who is staff"). Check: that account's token
  gets `403` from `/api/globals/site-integrations` and `/api/form-submissions`.
- The `site-settings`, `site-integrations`, `cookie-settings`, `notifications` globals (write: editor+; Site
  Integrations: admin), the `/api/ipal/test-email` endpoint and dashboard alerts — currently always present; extend
  `siteSettingsFields` / `integrationsFields`; change access, admin or hooks with
  `globalOverrides: { notifications: { access: { update: authenticated } } }` (object = merged key by key, your keys
  win; a function `(global) => global` takes over). Without `revalidatePath` global saves wait for the ISR window.
- `whiteLabel: { credit: false, titleSuffix, settingsSlug, logoField, … }`; with `whiteLabel` the plugin overrides
  `graphics.Logo/Icon` — your own graphics only without it.
- Panel link preview (`adminMeta`, on): noindex/nofollow, "— <site> | Panel" suffix, site name, description and
  preview image (`/api/ipal/admin-og`) from Site settings; `agency` names who supports the technology (default
  Intecion.com). Turn off: `adminMeta: false`, `agency: false`; your own `admin.meta` keys win. Check:
  `curl -s localhost:3000/admin/login | grep -E 'og:|robots'` → `noindex, nofollow`, `og:site_name` = Site settings name.
- Mail: any Payload adapter instead of `mailAdapter()`; `mailAdapter({ fallbackFromAddress, smtp, graph })`.
- R2: other storage-s3 options (prefix, clientUploads) → call `s3Storage` yourself instead of `buildR2Storage`.
- `forms: { adminGroup, fields, formOverrides, formSubmissionOverrides, beforeEmail, emailLayout }` (forms.md).
- `adminRoute: '/its'` — requires moving `app/(payload)/admin` → `its`, a proxy matcher with `its` (stage 6)
  and `robots: { adminRoute: false }` (stage 7).

## 4. Core — Pages, Media, block registry, primitives

**Code.**
```ts
// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { buildNoindexField, buildPreventDeleteSystemPage, buildRevalidateHook, buildSlugField,
  buildSummaryField, trackSlugHistoryHook } from '@intecion/ipal-kit'
import { i18nConfig } from '@/i18n.config'
import { pageBlocks } from '@/blocks/configs'

const revalidate = buildRevalidateHook({ revalidatePath, config: i18nConfig })

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    buildSlugField({ from: 'title' }),
    { name: 'layout', type: 'blocks', minRows: 1, blocks: pageBlocks },
    buildSummaryField(),                       // aiSummary — GEO (llms, MCP)
    buildNoindexField(),
    { name: 'slugHistory', type: 'array', admin: { readOnly: true }, fields: [{ name: 'slug', type: 'text' }] },
  ],
  hooks: {
    beforeChange: [trackSlugHistoryHook],
    beforeDelete: [buildPreventDeleteSystemPage({ settingsSlug: 'site-settings' })],
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
  },
}
```
`src/collections/Media.ts` = the "Full collection" from media.md 1:1 (`focalPoint: true`, `mimeTypes` images + PDF + video,
`alt` required+localized, `beforeOperation: [normalizeFilenameHook, buildOptimizeUploadHook(), buildMediaPlaceholderHook()]`,
fields `buildOptimizeUploadField()`, `buildMediaPlaceholderField()`) plus `access: { read: () => true }` — media are
served through the app (`/api/media/file/…`, storage.md), whose file route checks `read`; the hooks use `sharp` from `buildConfig`.
Blocks: `src/blocks/configs.ts` (`export const pageBlocks: Block[] = [HeroBlock]`) and `src/blocks/registry.ts`
(`export const blockRegistry = { hero: Hero }` — a `BlockComponentMap` map from `/rsc`). Create the first block (Hero) and the
`src/components/ui/` primitives (CMSLink on `resolveLink`, Button, Media via `mediaImageProps`/`videoProps`, Section,
SectionHeader) **1:1** from `.agents/skills/ipal-block/resources/section-code.md` — before any other block.
No other collections (content with URLs → **ipal-collection**).

**Check.** `pnpm generate:types` → `payload-types.ts` has `Page`, `Media`, `CmsLink`; panel → Media: the file
`Zdjęcie Test.JPG` is saved as `zdjecie-test.jpg`; Pages: a page with a Hero block saves, the slug is generated
from the title, noindex in the sidebar, an AI summary field; changing the slug appends to `slugHistory`.

**Turn off / override.** Every field/hook is opt-in (not wired = not active); `buildSlugField({ overrides })`
(e.g. `unique`), field names via parameters (`buildSummaryField` → another field + `summaryField` in stage 6), thresholds of
`buildOptimizeUploadHook({…})`; the bare function instead of the hook (`normalizeFilename`). `buildRevalidateHook`
refreshes collections only (globals — stage 3; archive entries — your own hook, hooks.md).

## 5. Styles — the design-token standard

**Code.** `postcss.config.mjs`: `export default { plugins: { '@tailwindcss/postcss': {} } }`. Copy the two templates:
`.agents/skills/ipal-setup/resources/DESIGN.md` → `DESIGN.md` (project root; fill it from the stage 0 answers) and
`.agents/skills/ipal-setup/resources/tokens.ts` → `src/design/tokens.ts` (brand values from `DESIGN.md`: primary,
secondary/accent, theme, radius, fonts). Then `pnpm exec ipal-tokens` → `src/design/tokens.css` (commit both).
```css
/* src/app/(frontend)/styles.css — the same on every site, no brand values here */
@import "tailwindcss";
@import "@intecion/ipal-kit/fluid-wide.css";   /* default; fluid.css = stops at 1280 px */
@import "@intecion/ipal-kit/tokens.css";       /* neutral defaults for every --ipal-* token */
@import "@intecion/ipal-kit/tailwind.css";     /* utilities (bg-surface, text-fg, py-section…), dark: on data-theme */
@import "../../design/tokens.css";             /* the brand, generated by ipal-tokens — always last */
@source "../../../node_modules/@intecion/ipal-kit/dist/**/*.js";   /* without this the banner/Turnstile have no styles */
```
Fonts via `next/font` with `subsets: ['latin', 'latin-ext']` and `variable: '--font-family-body'` /
`'--font-family-heading'`, both classes on `<html>` (design-tokens.md → Wiring). Hero on `--ipal-hero-min-h` (§6.11a).
Optional (only when the site shows the a11y widget): `@import "@intecion/ipal-kit/a11y.css";`.

**Check.** `pnpm exec ipal-tokens` exits 0 (no ✗ contrast rows) and `pnpm exec ipal-tokens --check` says up to date;
paste `pnpm exec ipal-tokens --report` into `DESIGN.md` → Colour. After stage 6: on `/pl` the `text-h1`/`py-section`/
`bg-surface` classes work, `getComputedStyle(document.documentElement).getPropertyValue('--ipal-primary')` is the brand
colour, switching the theme changes `--ipal-bg`, the cookie banner uses the brand colour in both themes, Polish characters
render in the font; screens 360, 768, 1366×768, 1920 without horizontal scroll.

**Turn off / override.** Every file is optional: no `tokens.ts` = the neutral defaults; plain CSS without Tailwind =
`tokens.css` alone and `var(--ipal-…)`; `fluid*.css` optional. Any value: `tokens.ts` (`raw: { … }` for tokens without a
field) or CSS after the imports; project-only decorative colours below the imports + `DESIGN.md` → Deviations. Plugin
components also take `classNames` (consent.md). Full list of tokens and utilities: design-tokens.md.

## 6. Routing — proxy, data layer, layout, catch-all, 404

**Code.**
```ts
// src/proxy.ts
import { NextResponse } from 'next/server'
import { createProxy } from '@intecion/ipal-kit'
import { i18nConfig } from '@/i18n.config'
export const proxy = createProxy(i18nConfig, { NextResponse, markdown: true })
// Inline LITERAL (importing DEFAULT_PROXY_MATCHER = 500 on /admin); with adminRoute '/its' write `its` instead of `admin`
export const config = { matcher: ['/((?!api|admin|_next|.*\\..*).*)'] }
```
`src/lib/content.ts` = PROGRAMISTA §2.7 1:1: `createContentHelpers({ config, content: contentConfig, i18n: i18nConfig,
baseUrl: process.env.NEXT_PUBLIC_SERVER_URL, markdownAlternate: true, summaryField: 'aiSummary', mcp: { serverName:
'<client>-site' } })` destructuring all keys (data, layout, links, routes). Local business:
`siteJsonLd` with `buildLocalBusinessJsonLd` + `formatOpeningHours` (seo.md). Full key list: ipal-reference.
```tsx
// src/app/(frontend)/[locale]/layout.tsx — NO <head>, no headers()
import { notFound } from 'next/navigation'
import { CookieBanner } from '@intecion/ipal-kit/client'
import { SiteProviders } from '@intecion/ipal-kit/rsc'
import { getConfiguredLocales, getSiteShell } from '@/lib/content'
import '../styles.css'

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!(await getConfiguredLocales()).includes(locale)) notFound()
  return (
    <html lang={locale}>
      <body>
        <SiteProviders shell={await getSiteShell(locale)} logEndpoint="/api/ipal/consent"
          banner={<CookieBanner equalChoice settings="detailed" />}>
          <main>{children}</main>{/* Header/Footer — stage 10 */}
        </SiteProviders>
      </body>
    </html>
  )
}
```
`src/app/(frontend)/[locale]/actions.ts` = `.agents/skills/ipal-form/resources/actions.ts` 1:1
(`createSubmitAction({ getCachedPayload, headers })` from `@intecion/ipal-kit/server`, exports `sendForm`).
`src/app/(frontend)/[locale]/[[...slug]]/page.tsx` (**double** brackets) = PROGRAMISTA §2.8 1:1:
`export const revalidate = 3600` (literal), `createPageRoute(content, { blocks: blockRegistry, notFound,
permanentRedirect, blockProps: async ({ locale }) => ({ formTexts: await content.getFormTexts(locale), sendForm }) })`,
exports `route.Page`, `route.generateMetadata`, `route.generateStaticParams`.
`notFoundView.ts` (`'use server'`, `loadNotFoundView(locale)` → `renderNotFoundView(content, { blocks: blockRegistry }, locale)`)
and `not-found.tsx` (`export default createNotFoundPage(content, { load: loadNotFoundView })`) — both from `/rsc`, PROGRAMISTA §2.8.

**Check.** `curl -sI localhost:3000/ | grep -i location` → `/pl`; after stage 11 (Homepage in System pages)
`curl -s -A Googlebot localhost:3000/pl | grep -o '<link rel="canonical"[^>]*>'` — in `<head>`, plus `hreflang`
and `rel="alternate" type="text/markdown"`; `/pl/nie-ma-takiej` → 404 with content from the panel; `/admin` and `/_next` → no 500;
`pnpm build` shows `●` (SSG) next to `[[...slug]]`.

**Turn off / override.**
- `createProxy`: `markdown: '/ai'` (another prefix), `exposeHeaders: false`, `cookieName`, `consentCategory`;
  a fully custom proxy on `createLocaleMiddleware`. The matcher belongs to the project.
- `createContentHelpers`: skip any key or replace it with your own function of that name in `lib/content.ts`;
  `siteJsonLd: false` (no WebSite/Organization), `pageJsonLd`, `robots`, `sitemapStyle`, `markdownAlternate: false`,
  `settingsDepth`, `sitemapOptions`, `sitemapEntries`, `underConstructionSeo: false`; construction filter off in Markdown/MCP:
  `markdown: { isPathVisible: () => true }`, `mcp: { isPathVisible: () => true }`.
- `createPageRoute`: `render` (your own view, e.g. an archive), `onMissing: 'redirectHome'`, `jsonLd: false`,
  `homeAlias: false`, `layoutField`; a fully custom page on `resolveRoute` (pages.md).
  `generateStaticParams` covers **only the pages collection, up to 1000 per language** — the scope is currently fixed (entries → ISR).
- `SiteProviders`: `banner={false}` / your own, `cookieButton={false}`, `analytics={false}` / `{{ defer: true }}`,
  `preconnect={false}`, `jsonLd={[…]}` (adds), `cookieMap`, `theme`, `stats`; `JsonLdGraph` and
  `TurnstileProvider` currently always (Turnstile turns itself off without keys). A fully custom layout: providers from `/client`
  with data from `shell` (consent.md).
- 404: `createNotFoundPage` with `blocks` / `fallback`, or your own `not-found.tsx`.

## 7. SEO, security, operations

**Code.** Every route is a re-export from `lib/content` (nothing in `public/`, one sitemap — never next to `sitemap.ts`):

| File | Content |
|---|---|
| `src/app/sitemap.xml/route.ts` | `export { sitemapRoute as GET } from '@/lib/content'` + `export const dynamic = 'force-dynamic'` |
| `src/app/robots.ts` | `export { getRobots as default } from '@/lib/content'` + `force-dynamic` (AI crawler policy from Site settings → Search engines; `robots` = code only) |
| `src/app/manifest.ts` | `export { manifest as default } from '@/lib/content'` + `force-dynamic` |
| `src/app/api/health/route.ts` | `export { healthRoute as GET } from '@/lib/content'` + `force-dynamic` |
| `src/app/api/csp-report/route.ts` | `import { createCspReportRoute } from '@intecion/ipal-kit'` + `export const POST = createCspReportRoute()` (CSP violation reports → `[csp]` lines in the logs) |

```ts
// next.config.ts
import { withPayload } from '@payloadcms/next/withPayload'
import {
  buildAdminCspHeaders, buildImagesConfig, buildSecurityHeaders, buildUploadSecurityHeaders, withSecurityConfig,
} from '@intecion/ipal-kit'

// CSP step 1: report-only. After the reports are clean (security.md → "ROLL OUT CSP"): mode 'enforce'.
const csp = { mode: 'report-only', reportUri: '/api/csp-report', r2Url: process.env.R2_PUBLIC_URL } as const
const securityHeaders = buildSecurityHeaders({
  hsts: process.env.NODE_ENV === 'production',
  // flags for what the site loads: analytics, metaPixel, linkedIn, tiktok, clarity, turnstile, youtube, googleMaps
  csp: { ...csp, turnstile: true, analytics: true },
})

// withSecurityConfig: no X-Powered-By (Next's and Payload's)
export default withPayload(withSecurityConfig({
  images: { ...buildImagesConfig() },
  htmlLimitedBots:
    /Googlebot|Google-InspectionTool|Storebot-Google|Bingbot|Yandex|DuckDuckBot|Baiduspider|Screaming Frog|AhrefsBot|SemrushBot/i,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/admin/:path*', headers: buildAdminCspHeaders(csp) },   // after the site-wide rule
      ...buildUploadSecurityHeaders(),
    ]
  },
}))
```
```ts
// src/instrumentation.ts — import from /env (the root pulls in Payload → Edge/Turbopack crash)
import { assertEnv, ipalEnvRules } from '@intecion/ipal-kit/env'
export function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  // R2_PUBLIC_URL optional: media served through the app by default (storage.md, env.md)
  assertEnv(
    ipalEnvRules({ storage: true, ipHeader: true, databaseName: true /* , emailGraph: true with Graph */ }).map((r) =>
      r.name === 'R2_PUBLIC_URL' ? { ...r, required: false } : r,
    ),
  )
}
```

**Check.** `curl -s localhost:3000/sitemap.xml | head` → `<urlset` with `xhtml:link hreflang`; in the browser
the "XML Sitemap" style; `curl -s localhost:3000/robots.txt` → `Sitemap:`, `Disallow: /admin`, AI bots (GPTBot,
ClaudeBot…) with `Allow` (a policy picked in Site settings → Search engines → AI assistants shows up after a reload);
`curl -sI localhost:3000/sitemap.xml | grep -i cache-control` → `s-maxage=3600`; `/manifest.webmanifest` → JSON with the name from Site settings; `/api/health` → `200`
(`503` without a database); `curl -sI localhost:3000/pl | grep -iE 'x-frame-options|content-security-policy-report-only|reporting-endpoints|x-powered-by'`
→ the first three, NO `x-powered-by`; `/pl` and `/admin` in the browser → no `[Report Only]` CSP lines in the console
(each one → a flag or `extra`, see security.md); `curl -si -X POST localhost:3000/api/csp-report -H 'content-type: application/csp-report' -d '{"csp-report":{}}' | head -1` → `204`;
an empty `PAYLOAD_SECRET` in `.env` → `pnpm dev` exits with a list of missing variables (restore it).

**Turn off / override.** `robots`: `aiBots: 'block-training' | 'disallow' | false` (only on a client decision →
`ipal-audit-skip: aibots`), `adminRoute: false` (hidden panel), `extraDisallow`; `sitemapStyle: false` (raw XML)
or your own text; `buildSecurityHeaders({ frameOptions, coop, hsts, additional })` — an `additional` entry with the same key
overrides the default; CSP: `buildCsp` flags (`youtube`, `googleMaps`, `metaPixel`, `linkedIn`, …), `extra`, `override`, no `csp`
= no policy; after clean reports `mode: 'enforce'` (site and admin); nonces only for pages that already render per request
(`createProxy({ csp })` + `<SiteProviders nonce>`); `withSecurityConfig(config, { hidePoweredBy: false })` keeps `X-Powered-By`;
`buildImagesConfig({ extraHosts })`; env validation is fully opt-in — filter/add rules
(`ipalEnvRules(…).filter(…)`). Staging: `IPAL_NOINDEX=1` (also stops IndexNow). Search engines: `robots` instead of
`getRobots` ignores the panel; `ipalKit({ searchSettings: false })` removes the tab; per-bot exceptions in code:
`createContentHelpers({ robots: { aiBotRules: [{ userAgent, access }] } })`. Sitemap: `sitemapOptions: { maxUrls,
cacheControl, memoSeconds }`, `sitemapEntries: (entries) => entries` (add/remove URLs), `underConstructionSeo: false`.

**Search engines panel step.** Nothing in code — the tab exists by default. **Postgres:** after installing or upgrading
the plugin run `pnpm payload migrate:create` (new columns `search_verification_*`, `ai_crawlers_policy`, the
`ai_crawlers_rules` table, localized `llms_intro`) → `pnpm payload migrate`; SQLite/Mongo: nothing. Search Console:
verify the **domain via DNS** (stage 11) and leave the verification fields empty; only for URL-prefix verification
paste the code into Site settings → Search engines (never into code). `llmsIntro` (per language): 2–4 sentences of facts
from the brief (who, what, where, since when, for whom) — it goes at the top of `/llms.txt`. Check:
`curl -s localhost:3000/llms.txt | head` (the note under the description).

## 8. GEO (mandatory)

**Code.** Re-exports from `lib/content`, each with `export const dynamic = 'force-dynamic'`:

| File | Content |
|---|---|
| `src/app/llms.txt/route.ts` | `export { llmsRoute as GET } from '@/lib/content'` |
| `src/app/llms-full.txt/route.ts` | `export { llmsFullRoute as GET } from '@/lib/content'` |
| `src/app/md/[locale]/[[...slug]]/route.ts` (one language: `src/app/md/[[...slug]]/route.ts`) | `export { markdownRoute as GET } from '@/lib/content'` |
| `src/app/api/mcp/route.ts` (public) | `export { mcpGET as GET, mcpPOST as POST } from '@/lib/content'` |
| `src/app/indexnow-key.txt/route.ts` | `export { indexNowKeyRoute as GET } from '@/lib/content'` |

Already wired and required: `markdown: true` (stage 6 proxy), `markdownAlternate`, `summaryField`, `mcp` (lib/content),
`buildSummaryField` (Pages), `indexNow: true` (payload.config), AI bots in robots (stage 7).

**Check.** `curl -s localhost:3000/llms.txt` → site name and a list of pages with descriptions (`aiSummary`);
`/llms-full.txt` → page content; `curl -s localhost:3000/md/pl` → Markdown of the home page; `curl -s -H 'Accept:
text/markdown' localhost:3000/pl` → the same Markdown; `curl -s -X POST localhost:3000/api/mcp -H 'content-type:
application/json' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'` → `get_site_info`, `list_pages`,
`search_content`, `get_page`; `/indexnow-key.txt` → `404` until the key is generated in the panel, then the key.

**Turn off / override.** No route file = no feature (allowed only with `ipal-audit-skip: llms | llms-full |
markdown | mcp`); Markdown prefix: `createProxy({ markdown: '/ai' })` + your own folder; MCP: `mcp: { rateLimit:
false | { max, windowMs }, serverVersion, maxBatch, clientIp }`, more options → `createMcpRoute` (mcp.md), the tool
list is currently fixed; block Markdown: `markdown: { overrides }` in `createContentHelpers`; IndexNow: without
`indexNow` (works only in production), key from the panel or `INDEXNOW_KEY`.

## 9. Forms and cookies

**Steps.** Skill **ipal-form**: a block with `<RenderForm>` (`/rsc`), `src/components/forms/formClasses.ts`, the action from stage 6
(one per project), every form from a **seed** `scripts/seed-form-*.ts` (email to the company + confirmation to the customer,
every language, consent checkbox). Cookies: skill **ipal-consent-check** — `cookie-scan.mjs` → `import-cookies.ts` into
Cookies → Cookie list; on the cookie policy page a block with `<CookieTable>` (`/rsc`, data from `getCookieTable`);
the same list appears in the `settings="detailed"` dialog (labels: Cookies → Settings window → Cookie list headings, every language).

**Check.** Panel → Forms: the seeded form; a submission on `/pl` → an entry in Form Submissions + 2 emails (SMTP:
Site integrations → E-mail sending → Send test); with Turnstile test keys the widget is visible, without a token the submission is rejected;
`node .agents/skills/ipal-consent-check/scripts/consent-check.mjs http://localhost:3000/pl` = 0 errors;
after a choice in the banner a new record in Consent records.

**Turn off / override.** Turnstile: both keys empty (panel and env) → no widget and no verification; fail-closed
`turnstileOnConfigError: 'reject'`; the Turnstile/SMTP fields in Site integrations currently always. Form look:
`formClasses`, unusual ones → `useBuilderForm` (no copy of the engine). Banner: `settings`, `controls`, `order`,
`equalChoice`, `classNames`, tokens; no `consentLog` = no register and no endpoint (then remove `logEndpoint`).
**Consent Mode choice** (record it in "Project decisions"): `'advanced'` (default) — the Google tag loads at once with
every signal `denied` (pixels and Clarity only after consent); `'basic'` — `<SiteProviders analytics={{ consentMode: 'basic' }}>`,
no request to `googletagmanager.com` before analytics or marketing consent (a client requiring zero requests to Google).
Check in `basic`: DevTools → Network shows no `gtm.js` / `gtag/js` before consent. Analytics: empty IDs in the panel or
`analytics={false}`. Forms: `createSubmitAction({ turnstileHostnames: ['client.pl'] })` rejects a token solved on
another domain (leave it empty in dev — Cloudflare test keys report `example.com`). The locale cookie respects consent;
after an editor bumps Cookies → Policy version nothing to change (`createProxy(config, { policyVersion })` pins one).

## 10. Navigation

**Steps.** Skill **ipal-nav**: Header/Footer/Company globals (`buildLinkField`/`buildLinksField`, `resolveNav`,
legal links via `getSystemLinks(locale)`), `afterChange: [buildGlobalRevalidateHook({ revalidatePath })]` on **your own**
globals (the plugin's globals already refresh with `ipalKit({ revalidatePath })` from stage 3), Header/Footer in the layout, optionally
`<SiteProviders jsonLd={[buildNavigationJsonLd(…)]}>`.

**Check.** A menu item change in the panel is visible on `/pl` right after saving; a link to a page in EN leads to
`/en/…`; the footer has legal links in the page language.

**Turn off / override.** Navigation is entirely project code (the plugin provides fields and resolvers); `buildLinkField({
relationTo, appearances: false, disableLabel })`, `LanguageSwitcher` (`classNames`, `renderLabel` — only inside a `'use client'` wrapper of your own, i18n.md) or your own on
`useAlternateLinks()`.

### Optional modules (outside the set; separate commit, entry in "Project decisions")
- Statistics: `stats: true` + `<SiteProviders stats>` + `pnpm payload generate:importmap`; `/admin/stats`.
  Off: no option; `stats: { dashboard: false }` hides only the chart.
- Light/dark theme: `<SiteProviders theme>` + `<ThemeSwitcher>` (theme.md). Off: no prop.
- Hidden panel: `adminRoute` (stage 3) — folder `app/(payload)/<route>`, proxy matcher, `robots.adminRoute: false`.
- Under-construction mode (construction.md), accessibility widget (accessibility.md — only when required, EAA).

## 11. Completeness check

**Commands (all must pass):**
```bash
pnpm generate:types && pnpm payload generate:importmap
pnpm payload migrate:create            # Postgres with migrations only — also after every ipal-kit upgrade (new plugin fields)
bash .agents/skills/ipal-audit/scripts/audit.sh            # full: §0b "missing: …" = 0, tsc, build
pnpm build && pnpm start
node .agents/skills/ipal-seo-check/scripts/seo-check.mjs http://localhost:3000        # 0 errors
node .agents/skills/ipal-consent-check/scripts/consent-check.mjs http://localhost:3000/pl
pnpm exec ipal-doctor --strict --offline --deep --url http://localhost:3000   # the team standard (skill ipal-doctor)
```
The §0b list with its checks: proxy + catch-all + 404 (stage 6) · meta, sitemap, robots, manifest (7) · JSON-LD (6, 10) ·
llms, llms-full, Markdown, MCP, AI bots, IndexNow (8) · Media/R2 (3–4) · seeded forms (9) · Turnstile (9) ·
consent + register + analytics (6, 9) · headers, 2FA, CSP report-only, `IPAL_IP_HEADER` (3, 7) · health, env,
`IPAL_NOINDEX` on staging (7) · system pages (panel below) · zero hardcoding (audit) · content (AGENT.md §0c) ·
scaling (5). `●` routes for pages need the database at build time (PROGRAMISTA §4.3).

**Panel steps for the user** (`/admin`, paste them this list with the gaps from the report):
1. First user with the **admin** role + 2FA setup (TOTP app).
2. **Site settings → General**: site name, logo, favicon (PNG), description.
3. **Pages**: home page (title and slug **in every language**, otherwise `/en` → 404), 404, privacy policy,
   cookie policy (with the `CookieTable` block), terms if needed; `noindex` on the policies; AI summary.
4. **Site settings → System pages**: Homepage (without it `/pl` → 404), 404, policies; content collection archives.
5. **Cookies**: banner texts, Privacy link label, Policy version, Cookies (import from the scan), Detail labels —
   in every language.
6. **Notifications**: form messages in every language.
7. **Site integrations**: SMTP or Graph (From Name/Address; Send test), Turnstile (for testing site
   `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`; production keys from the client), analytics/pixel
   IDs, IndexNow → generate key. Mail/Turnstile errors show up as a dashboard alert.
8. **Forms**: check the addresses in the Emails tab of the seeded forms.

**Deployment (Coolify — the only path; the user/team does it, you prepare the inputs).** Full procedure:
`node_modules/@intecion/ipal-kit/docs/deployment.md` §4. Hand over:
- the env list for the Coolify app, each marked **build time** and/or **runtime** — `NEXT_PUBLIC_*` both; secrets
  (`PAYLOAD_SECRET`, `R2_*`, `GRAPH_*`, `TURNSTILE_SECRET_KEY`, `IPAL_IP_HEADER`) runtime; `DATABASE_URI` /
  `PAYLOAD_SECRET` also build time when pages are prerendered from the database (§3a3);
- domains `https://client.pl,https://www.client.pl` with the www ↔ apex redirect matching `NEXT_PUBLIC_SERVER_URL`;
  port 3000; health check `/api/health`;
- Postgres: migrations run on container start — `postgresAdapter({ …, prodMigrations: migrations })` (import from
  `./migrations`) or the start command `pnpm payload migrate && pnpm start`; never Coolify's Pre-/Post-deployment
  command (pre = old container, skipped on the first deploy; post = after traffic switched). Backward-compatible
  migrations only. Mongo: none;
- scheduled database backups to S3/R2 and **Backup now** before a production seed (Coolify Terminal: dry run →
  backup → real run; rules: `node_modules/@intecion/ipal-kit/docs/seeding.md`) or a big migration; rollback (Coolify → Rollback) does not undo migrations;
- no R2 → a Coolify persistent volume for the media directory.

**DNS records for the team** (our team manages the zones; the plugin sets nothing in DNS — you
prepare the list with values, a human adds them, you verify with `dig`). Full table:
`node_modules/@intecion/ipal-kit/docs/deployment.md` §6.

| Record | Value | Check |
|---|---|---|
| `A`/`AAAA` apex + `CNAME www` (or `A`) | IP of the Coolify server running the app | `dig +short client.pl A`, `dig +short www.client.pl`; `curl -sI https://www.client.pl` → 301/308 to the `NEXT_PUBLIC_SERVER_URL` host |
| `CAA` (only when the zone has CAA) | `0 issue "letsencrypt.org"` — Coolify's proxy uses Let's Encrypt (HTTP challenge: port 80 open) | `dig +short client.pl CAA` |
| `TXT` apex — Search Console (*Domain* property) | `google-site-verification=<code>` | `dig +short TXT client.pl \| grep google-site` → GSC → Verify |
| Bing (if used) | import from GSC in Bing (no DNS) or `CNAME <code>` → `verify.bing.com` | `dig +short CNAME <code>.client.pl` |
| `TXT` SPF of the From domain | `v=spf1 include:<provider> -all` — one record per domain | `dig +short TXT <domain> \| grep v=spf1` |
| DKIM | `CNAME selector1._domainkey` / `selector2…` (M365) or `TXT <selector>._domainkey` | `dig +short CNAME selector1._domainkey.<domain>` |
| `TXT _dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@<domain>` → later `p=quarantine` | `dig +short TXT _dmarc.<domain>` |
| R2 media | **none by default** — `R2_PUBLIC_URL` empty, media through the app. An R2 Custom Domain needs the zone in our Cloudflare account (CNAME setup = Business/Enterprise), so `media.client.pl` on our DNS does not work; media-heavy site → a separate media domain on Cloudflare. `*.r2.dev` = dev only | `curl -sI https://client.pl/api/media/file/<file>` → 200 without login |

From domain: SMTP from the panel → the domain of the *From address* (records from the mailbox provider); Graph → From is
always `GRAPH_SENDER` (agency domain, set once — nothing in the project). After DNS: *Send test* and in the received
email `Authentication-Results: spf=pass dkim=pass dmarc=pass`. We verify Search Console **via DNS** —
the verification fields in Site settings → Search engines stay **empty** (only URL-prefix verification uses them; the plugin then adds the `<meta>` itself); submit the sitemap `https://client.pl/sitemap.xml`
once by hand in GSC and Bing (no API). Turnstile, IndexNow, llms, MCP — no DNS.

Final report: what is wired, what is missing (data, keys, decisions), the DNS record list with values (`dig` status), every `ipal-audit-skip`, any
**plugin gap** (`ipal-plugin-gap`). Next: blocks (**ipal-block**), content collections (**ipal-collection**).
