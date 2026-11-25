---
name: ipal-upgrade
description: Upgrades an existing project to the latest @intecion/ipal-kit and replaces hand-written code that the plugin now provides — proxy, route handlers, consent wrapper, language switcher, rich text parser, form logic, noindex, redirects, env validation, privacy link label, 404 page, CTA field zoo. Use when the user asks to update ipal-kit, migrate an older project, or clean up duplicated logic in a project.
---

# ipal-upgrade

What changed in the version: `node_modules/@intecion/ipal-kit/docs/CHANGELOG.md` (the
"Requires project changes" sections — do all of them). List of changes: `…/docs/dev/PROGRAMISTA.md` §6.
Rule: when the plugin provides something the project has written by hand — **remove the local version**.

## 1. Update the package
```bash
pnpm add @intecion/ipal-kit@latest
pnpm payload generate:importmap   # new admin panel components from the plugin (e.g. RowLabel)
rm -rf .next
```
Copy the skills again (AGENT.md §14) — they may have changed.
Postgres with migrations: new plugin fields (e.g. `privacyLinkLabel`) →
`pnpm payload migrate:create`.

## 1a. AGENT.md §0b set
After the update, a full **ipal-audit** shows a "missing: …" section — the missing items of
the MANDATORY SET (GEO: llms-full, Markdown, MCP; R2; Turnstile through
`getTurnstileConfig`…). Wire each one according to PROGRAMISTA §2 — it is part of the update,
not an extra. Skip one only with a client decision in `AGENTS.md` (`ipal-audit-skip:`).

**1.8.x → 1.9.0 (PROGRAMISTA §6, items 17–21):** `twoFactor.plugin` required;
`getTurnstileConfig` instead of `turnstileSiteKey` (with both keys set the token is
required — check that every form has the widget); `clientIp(await headers())` in
the form action + `IPAL_IP_HEADER` in the production env; `buildR2Storage` wired.

**→ 1.9.2 (PROGRAMISTA §6, items 28–33) — import instead of code, start with item 28 (security):**
a custom `FormRenderer` passed the Emails tab (company addresses) to the HTML → a block with `<RenderForm>` +
`formClasses.ts`, remove the renderer. Then: layout → `SiteProviders`, page and 404 → `createPageRoute` /
`createNotFoundPage`, GEO routes → re-exports from `lib/content`, `src/fields/section*.ts` and
`lib/navigation.ts` → `buildSection*Field`, `resolveNav`, `resolveLink`. Check every item in
the browser (form: submission + email; page: 200, 404, metadata). Postgres: `migrate:create`
(new form field types and texts in Notifications).

**→ 1.11.0 (PROGRAMISTA §6, items 34–37):** remove the workarounds — a copy of `publicForm` (→ `RenderForm values` /
`prepareBuilderForm`), manual `remotePatterns`/`dangerouslyAllowLocalIP` (→ `buildImagesConfig()`), conditional
`storage` in `ipalEnvRules`, a custom product JSON-LD graph (→ `pageJsonLd.entries` + `buildProductJsonLd`),
a custom RenderBlocks for `h1` (→ `isFirst`). Links to posts: `buildLinkField({ relationTo: [...] })` with a data migration.

**→ 1.11.1 (PROGRAMISTA §6, items 38–45):** remove the workarounds (`WORKAROUND ipal-kit` comments) — the
`NEXT_RUNTIME` condition around the `revalidatePath` injected into `buildRevalidateHook` (a global's own `afterChange` hook keeps it — ipal-nav), the form focus guard, a custom theme (→ `ThemeScript`/`ThemeSwitcher`),
a custom table of contents (→ `extractHeadings` + `TableOfContents` + `headingIds`), catching `notFound` for a redirect
(→ `onMissing: 'redirectHome'`), background colour only for JPEG in `<Media>`, a custom type instead of `CmsLink['appearance']`
(→ per-shape types from `generate:types`: `CmsLink`, `CmsLinkPlain`, `CmsLinkNoLabel`, `CmsLinkPlainNoLabel`; style: `LinkAppearance`). Cookie banner: `buttons.save` →
`buttons.savePreferences` — in `migrate:create` choose **rename** for the column to keep the texts.

**→ 1.12.3 (PROGRAMISTA §6, item 46):** Postgres/SQLite: `migrate:create` (new Cookie banner group →
`detailLabels`, only new columns — no rename). A custom cookie settings window or a cookie list added to
the banner → `<CookieBanner settings="detailed">` and remove the copy. With `detailed`: Cookies → Cookie list filled in
(scan, **ipal-consent-check**) and Detail labels in every language.

**→ 1.13.0 (PROGRAMISTA §6, item 47; CHANGELOG "What projects must update" — do all 7, in order):**
1. **Project without `access`** (no `roles` field): every logged-in account can now use the plugin's admin and editor
   features (Site integrations, settings globals, test e-mail, stats, consent records, forms, form submissions); before,
   nobody could through the API. Check who can log in (`grep -rn "auth:" src/collections`, open sign-up, customer
   accounts). Untrusted accounts → add `access` (roles), or narrow with `globalOverrides`, `forms.formOverrides` /
   `forms.formSubmissionOverrides`, `consentLog.collectionOverrides`, `stats.collectionOverrides`. Verify: log in as a
   non-staff account → `GET /api/globals/site-integrations` is 403.
2. **Project with `access`:** plain `user` accounts can no longer edit Site settings, Cookie banner, Notifications or
   forms, or create/delete users. List staff accounts in the panel (Users → Roles) and give them `editor` / `admin`, or
   loosen with `globalOverrides`, `forms.formOverrides.access`, `access.authAccess`. Verify: an editor saves Site settings.
3. **Postgres/SQLite:** `pnpm payload migrate:create` → `migrate` (Site settings → Search engines:
   `search_verification_*`, `ai_crawlers_policy`, the `ai_crawlers_rules` table, localized `llms_intro`). With
   `enabled: false` the migration now keeps (or restores) the plugin's tables — check it has no DROP TABLE. MongoDB: nothing.
4. `pnpm payload generate:importmap`, `pnpm ipal:skills`, `rm -rf .next`.
5. **Behaviour to check** (grep the project, fix what applies): `getSettings` / `getSiteShell` read at `depth: 1` (code
   that reads a relation of a relation → `createContentHelpers({ settingsDepth: 2 })`); `sitemap()` throws at runtime
   instead of returning `[]` (`sitemapRoute` answers 503); a `twoFactor.collectionSlug` other than `admin.user` stops
   startup (`allowCollectionMismatch: true`); requests without a client IP share one limited bucket (proxy hides the IP
   → `IPAL_IP_HEADER`, or `setUnknownIpFactor`); `RenderRichText` turns unsafe link URLs into `#` (`safeLinks`).
6. **Review the new options with the user** (AGENT.md §7.1): `consentMode: 'basic'`, `revalidatePath`,
   `turnstileHostnames`, Site settings → Search engines (verification codes, or keep DNS verification), `app/robots.ts` →
   `export { getRobots as default }` + `force-dynamic`, `createSearchRoute({ …, isPathVisible })`, `access.firstUserAdmin`.
7. **Remove the workarounds:** a plugin after `ipalKit` that adds `afterChange` or access to the plugin globals →
   `ipalKit({ revalidatePath })` / `globalOverrides`; a hand-written global revalidation hook →
   `buildGlobalRevalidateHook({ revalidatePath })`; `consentFieldName` passed only because the option was ignored →
   `forms.consentFieldName` works now; your own seed guard / upsert code → `@intecion/ipal-kit/seed` (`createSeeder`).

**Every upgrade — Next.js 16.4.5 or later** (AGENT.md §4 item 11): `pnpm ls next sharp`; below 16.4.5 →
`pnpm add next@16.4.6 eslint-config-next@16.4.6 sharp@^0.35.5`, `rm -rf .next`, build, redeploy on Coolify
(a new image ships the fixed next and sharp). **Check:** `pnpm exec ipal-doctor` → no `next-min` finding; `pnpm dev`
prints no security-upgrade warning.

**Every upgrade — Payload** (AGENT.md §4 items 11–12): the reference site and the starter run Payload **3.94.1**; the
plugin still accepts `^3.90.2`, so moving is recommended, not forced. To move: every `payload` / `@payloadcms/*` (in
`dependencies` and in `pnpm.overrides`) to the same exact version, `react` and `react-dom` to 19.3.1 (Payload 3.94
requires `^19.3.1`), Node.js 22.23.5 or later (`"engines": { "node": ">=22.23.5 <23" }`, `.nvmrc` `22`) on every machine and
in Coolify — Payload 3.94 refuses older Node. Nixpacks takes only the major from `engines` / `.nvmrc`; the patch comes
from the Nixpacks release on the Coolify server, so check `node -v` in the app's Terminal (or the build log) and update
Coolify first if it is below 22.23.5 (until then, stay on 3.90.x). Then `pnpm install`, `pnpm payload generate:types`, `pnpm payload generate:importmap`, `rm -rf .next`,
build, redeploy. Payload 3.91–3.94 change no schema the plugin defines: no migration from the plugin; on
Postgres/SQLite run `pnpm payload migrate:create` anyway and commit it if it is not empty.
**Check:** `pnpm ls payload @payloadcms/ui @payloadcms/db-mongodb` → one version, 3.94.1; the panel opens and a document
saves; `pnpm exec ipal-doctor` → no `versions` finding; Coolify app → Terminal → `node -v` → 22.23.5 or later.

**Every upgrade — dependency advisories** (AGENT.md §4 item 12): `pnpm audit --prod`; on Payload 3.94.x add the
`dompurify` and `happy-dom` overrides to `pnpm.overrides`; on an older Payload also `mongoose` (MongoDB sites; 3.90–3.93
pin 8.24.1, which has a critical advisory, GHSA-pcrw-h46h-c93h, and four more) and `undici` (3.90–3.91):
```json
"dompurify@<3.4.17": "^3.4.17",
"happy-dom@<21.0.4": "^21.0.4",
"mongoose@>=8 <8.24.7": "~8.24.10",
"undici@>=7 <7.30.1": "^7.30.1"
```
The selectors match only vulnerable versions, so on 3.94.x the last two do nothing — remove them. A
`"graphql-scalars@<2.0.1": "^2.0.1"` line is no longer needed (the advisory no longer covers Payload's 1.22.2); remove
it or keep it. Then `pnpm install`, `pnpm build`, commit `package.json` and the lockfile, redeploy on Coolify (no data or
schema change, no migration). **Check:** `pnpm audit --prod` → no high or critical; `pnpm why dompurify happy-dom
mongoose undici` → 3.4.17, 21.0.4, 8.24.7, 7.30.1 or later; `pnpm exec ipal-doctor` → no `transitive-min` finding; the
panel opens and a document saves.

**→ 1.14.0 (PROGRAMISTA §6, items 48–49; CHANGELOG "What projects must update" — do all 8, in order):**
1. `pnpm payload generate:importmap` — `@intecion/ipal-kit/admin#FaviconCheck` (hint under Site settings → Site icon)
   and the `RowLabel` entries are injected into every project; then `pnpm ipal:skills`, `rm -rf .next`. **Check:** pick
   a 32×32 PNG as the site icon → a warning appears under the field; saving still works.
2. **Node.js 20.9 or later** (the plugin's `nodemailer` 10 needs it) — check the Coolify build image and `.nvmrc` /
   `engines`. Remove `nodemailer` and `@types/nodemailer` from the project's own `package.json` if someone added them
   (the plugin's copy is the one `mailAdapter` uses). **Check:** Site integrations → E-mail sending → send a test
   e-mail over SMTP (and over Microsoft Graph when the project uses it).
3. **Next.js** — the "Every upgrade — Next.js" step above (today 16.4.5 or later, `sharp@^0.35.5`).
4. **Dependency advisories** — the "Every upgrade — dependency advisories" step above (`dompurify` / `graphql-scalars` /
   `undici` overrides on payload 3.90.x). **Check:** `pnpm audit --prod` → no high or critical.
5. **Cookie list kept by hand** → offer `cookieScanner: true` (+ `crawl: true` with `IPAL_COOKIE_SCAN_URL`,
   `IPAL_COOKIE_SCAN_TOKEN` and the site in the service's `IPAL_CRAWLER_SITES`, cookie-scanner.md); an own image modal →
   `lightbox: true` + `<SiteProviders lightbox>` (PROGRAMISTA item 48). Turning either on → Postgres/SQLite
   `migrate:create` → `migrate`. Without them: no schema change.
6. **Admin languages:** English and Polish by default when the project sets no `i18n.supportedLanguages`. Ask the
   client; English only → `i18n: { supportedLanguages: { en } }`. Own admin texts → `i18n.translations.<lang>.ipal`.
7. **Frontend texts:** validator messages are full sentences and `pl` locales get Polish fallbacks — grep the
   project's tests and code for the old strings (`'required'`, `'invalid email'`) and update them.
8. **Sidebar:** `roles` (users) and Cookies → Consent version moved to the sidebar — update editor instructions.
   Nothing else to change: the statistics tab title, the cookie scanner's integration names and the maintenance
   notice's close button follow the language by themselves.

**→ 1.14.2 (PROGRAMISTA §6, item 51; 2FA setup loop; security.md) — required with 2FA on:**
1. `pnpm payload generate:importmap` — the plugin swaps `@clocklimited/payload-2fa/rsc#TOTPProvider` for
   `@intecion/ipal-kit/admin#TotpRedirectProvider`; commit `importMap.js`, `rm -rf .next`, redeploy on Coolify.
   **Check:** log in as a new admin (or a throwaway one) → `/admin/setup-totp?back=%2Fadmin` with the QR code, no
   reloading; after the code → back on `/admin`. A project that wrote its own `x-pathname` proxy rule for `/admin`
   as a workaround can drop it.

**→ 1.14.1 (PROGRAMISTA §6, item 50; X-Powered-By, CSP; security.md) — nothing required, recommended in this order:**
1. **Hide `X-Powered-By`** — `next.config.ts`: `export default withPayload(withSecurityConfig(nextConfig))`
   (import `withSecurityConfig` from `@intecion/ipal-kit`); remove a hand-written `poweredByHeader: false` or a header
   override if the project had one. **Check:** `curl -sI localhost:3000/pl | grep -i x-powered-by` → nothing (also on
   `/admin` and `/api/health`).
2. **CSP, report-only first** — no CSP yet, or a hand-written one → `buildSecurityHeaders({ csp: { mode: 'report-only',
   reportUri: '/api/csp-report', r2Url: process.env.R2_PUBLIC_URL, <flags for what the site loads> } })`, the admin rule
   `{ source: '/admin/:path*', headers: buildAdminCspHeaders({ mode: 'report-only', reportUri: '/api/csp-report' }) }`
   after the site-wide one, and `src/app/api/csp-report/route.ts` = `export const POST = createCspReportRoute()`.
   Flags: what the panel's Site integrations and the code load (analytics, metaPixel, linkedIn, tiktok, clarity,
   turnstile, youtube, googleMaps); anything else → `extra`. **Check:** `curl -sI localhost:3000/pl | grep -iE
   'content-security-policy-report-only|reporting-endpoints'`; the main pages and `/admin` in a browser, accept the
   cookie banner → no `[Report Only]` lines in the console. Deploy.
3. **Enforce later** — after a few days of clean `[csp]` lines in the Coolify logs: `mode: 'enforce'` in both places,
   redeploy, check the pages again. Record the date in `AGENTS.md` → "Project decisions".

**→ 1.14.3 (PROGRAMISTA §6, item 52; cookie approval; cookie-scanner.md) — only with `cookieScanner`:**
1. `pnpm payload generate:importmap` — `@intecion/ipal-kit/admin#CookieApprovalView` and
   `@intecion/ipal-kit/admin#CookieCrawlAlert` (the dashboard reminder, also without `crawl`); commit `importMap.js`.
2. Postgres/SQLite: `pnpm payload migrate:create` → `migrate` (`cookie_review.change` enum + index,
   `cookie_review.needs_description`); check the migration only adds columns. MongoDB: nothing.
3. Tell the editors about **Approve cookies** (`/admin/cookie-approval`, linked from the scan box on Privacy →
   Cookie review and from the dashboard): tick, **Approve and add**, then
   describe the ones marked **Needs description**. The client wants the old entry-by-entry review →
   `cookieScanner: { approval: false }`; unknown cookies in another category → `approval: { unknownCategory }`.
4. Behaviour: hand-typed Cookie list rows are looked up only while they have no review entry.
**Check:** run a scan → the cookies appear on `/admin/cookie-approval`; approve one → it is in Cookies →
Cookies in every language; the dashboard shows the reminder while cookies wait. Without `cookieScanner`: nothing.

**→ 1.14.4 (PROGRAMISTA §6, item 53; cookie languages and one Cookies entry; consent.md, cookie-scanner.md):**
1. `pnpm payload generate:importmap` — with `cookieScanner`: `@intecion/ipal-kit/admin#CookieReviewTab` and (with
   `crawl`) `@intecion/ipal-kit/admin#CookieSiteCheckTab`; commit `importMap.js`. No migration.
2. **Ask the client** about the two new defaults (both overridable): empty languages of the cookie texts fill
   themselves from the language an editor writes in (`ipalKit({ fillEmptyLocales: false })` to turn it off); with
   `cookieScanner` the cookie screens become one **Cookies** entry with **Review and approve** and **Site check** tabs
   (`cookieScanner: { adminLayout: 'separate' }` for the old entries).
3. Editor instructions and screenshots: **Cookie banner** is now **Cookies**.
**Check:** one **Cookies** entry in the admin navigation; its tabs list the review entries and the site check;
type a cookie purpose in one language and save → the other languages show it, and a language with its own text keeps it.

**→ 1.14.6 (1.14.5 was never published; PROGRAMISTA §6, item 54; CHANGELOG 1.14.5 "What projects must update" — do all 7, in order):**
1. **Cookie storage type (Postgres/SQLite):** `pnpm payload migrate:create cookie-storage-type` → `migrate` (only adds
   `cookie_settings_cookies.storage`, default `cookie`, and `cookie_settings_locales.detail_labels_storage`). Existing
   rows become *Cookie*: set the type of local/session-storage rows by hand. MongoDB: nothing.
2. **Theme key:** code that reads `localStorage.getItem('ipal-theme')` → `THEME_STORAGE_KEY` /
   `documentThemeStorageKey()`; a project that also runs next-themes and wants separate keys →
   `ipalKit({ theme: { storageKey } })`. Visitors keep their choice (moved before first paint).
3. **Cookie list:** after the next **Scan cookies**, approve the new *theme* entry; remove an old *ipal-theme* row.
4. **Panel link preview (`adminMeta`, `agency`):** nothing required. Remove a hand-written `admin.meta` that only set
   the panel title, description, `openGraph` or `robots: noindex` (your `admin.meta` keys still win). The credit reads
   "Technology support: Intecion.com" — `agency: false` or `whiteLabel: { credit: false }` to remove it.
   **Check:** `curl -s $URL/admin/login | grep -E 'og:|robots'`, open `$URL/api/ipal/admin-og`, paste an `/admin` link
   in Slack.
5. **Dependency advisories:** the "Every upgrade — dependency advisories" step above, now with the
   `graphql-scalars` override; Node.js 22 recommended with it.
6. **Title separator / GraphQL fix:** Site settings → Title separator now stores
names (`pipe`, `endash`, `hyphen`, `middot`, `slash`) instead of `|`, `–`… (which broke `/api/graphql` with 500).
**Postgres:** `pnpm payload migrate:create title-separator`, then in the generated file add
`${sql.raw(titleSeparatorSql())}` right after the first `ALTER TABLE "site_settings" ALTER COLUMN "title_separator"
SET DATA TYPE text;` in `up` and `${sql.raw(titleSeparatorSql({ direction: 'down' }))}` at the same place in `down`
(`import { titleSeparatorSql } from '@intecion/ipal-kit'`). Without it the migration fails with `invalid input value
for enum` and rolls back. **SQLite / MongoDB:** nothing required. Old values keep working, and MongoDB is rewritten
at start. A project with its own separator options (`globalOverrides`): use values matching `/^[_A-Za-z][_A-Za-z0-9]*$/`.
Check: `curl -s -X POST $URL/api/graphql -H 'content-type: application/json' -d '{"query":"{ SiteSetting { titleSeparator } }"}'` → 200,
and the browser tab shows the same separator.
   Project code that reads `settings.titleSeparator` itself now gets a name: use `titleSeparatorChar()`.
   **→ 1.15.0 design tokens (opt-in, design-tokens.md → "Migrating an existing site"):** nothing breaks without it. To adopt:
   add the four `@import`s (§6.11) and `src/design/tokens.ts` (template `.agents/skills/ipal-setup/resources/tokens.ts`),
   map the current `@theme` colours/fonts/radius onto the roles, keep the old names as aliases in a marked legacy
   block, delete the `--ipal-*-dark` block kept only for the cookie banner, `pnpm exec ipal-tokens`, then replace old
   utilities and `dark:` colour classes file by file (`ipal-audit` lists them) and remove the legacy block. next/font
   variables become `--font-family-body` / `--font-family-heading`. Check: `ipal-tokens --check`, the site in both themes.
   Only with the owner's decision ("Project decisions": which sites migrate when).
7. `pnpm ipal:skills` (new agent rules: architecture questions first, ipal-kit first). Optional with the owner's
   consent: `pnpm exec ipal-skills --external`.

**→ 1.15.0 (PROGRAMISTA §6, item 55; CHANGELOG 1.15.0 "What projects must update" — do all 10, in order):**
1. **Seeding after launch:** production seed scripts and Coolify jobs need `SEED_ONLY="pages:kontakt,…"` (dry run
   first, back up); a run without it on production now stops. A full re-seed only with the owner's OK:
   `IPAL_SEED_ALLOW_FULL=1`. Update seed scripts copied from older templates (`ipal-site`, `ipal-form`).
2. Optional: database names `<domain without dots>_prod` / `_dev` + `ipalEnvRules({ databaseName: true })` (warns only).
3. Optional: the design-token standard (design-tokens.md → "Migrating an existing site"). A site that styles the
   cookie banner only through `--ipal-*-dark`: check the banner in the dark theme.
4. Optional: the block library, block by block (block-library.md); after turning blocks on: `pnpm generate:types`,
   `pnpm payload generate:importmap`, Postgres/SQLite `migrate:create`.
5. **CookieButton** lifts above the footer — check a site with its own fixed footer bar; `avoid={false}` keeps it fixed.
6. `pnpm ipal:skills` (new **ipal-doctor**; updated ipal-reference, ipal-setup, ipal-site, ipal-audit).
7. Run `pnpm exec ipal-doctor` (and `--url https://<site>`), fix or silence each finding with a reason in
   `ipal-doctor.json`. `IPAL_DOCTOR_TOKEN` (≥ 32 characters) only if the deep check runs against production.
8. Nothing for the exact dependency pins (`nodemailer` 10.3.1 and three more) beyond `pnpm install`.
9. Pages saved before 1.15.0 keep their stored meta description: re-save a page whose description was empty (the
   section header now fills it).
10. New sites: `ipal-kit create` (project-starter.md); single-language / non-`pl` default sites still go through
    **ipal-setup**.
**Check:** `pnpm exec ipal-doctor --strict` → 0 errors, 0 warnings; `pnpm build`; a production seed without
`SEED_ONLY` stops with "full seed refused".

**→ 1.15.1 (PROGRAMISTA §6, item 56; seed exit guard; seeding.md) — nothing required, recommended:**
1. Every seed script: `import { createSeeder, guardSeedExit } from '@intecion/ipal-kit/seed'` and `guardSeedExit()` as
   the first statement, before `getPayload()`; the script ends with `seed.summary()` (the `ipal-site` / `ipal-form`
   templates show it). `pnpm ipal:skills` for the updated templates.
2. **Check:** run the seed with `SEED_DRY_RUN=1` locally → exit 0; in Coolify's Terminal after a seed, `echo $?` → `0`
   (a `1` with `[seed] ended …` means the run stopped early — run it again).

**→ 1.15.2 (PROGRAMISTA §6, item 57; ipal-doctor route groups; doctor.md) — nothing required:**
1. `pnpm ipal:skills`; remove a temporary `layout-required` silence in `ipal-doctor.json` added for a route group with
   another name or a `notFoundView.tsx`.
2. Two frontend candidates reported → `"layout": { "frontend": "src/app/(<group>)" }` in `ipal-doctor.json`.
**Check:** `pnpm exec ipal-doctor --strict` → no `layout-required` finding for the site's own route group.

**→ 1.15.3 (PROGRAMISTA §6, item 58; ipal-audit, bilingual panel labels; ipal-audit skill) — nothing required:**
1. `pnpm ipal:skills`, so the updated `audit.sh` and `polish-literals.mjs` reach the project.
2. Remove a temporary `i18n-literals` silence or `ipal-audit-skip` added because of `adminText()` / `{ en, pl }` labels.
**Check:** `pnpm exec ipal-doctor --strict` → no `i18n-literals` finding for a schema file's bilingual labels; Polish
text in a `.tsx` component is still reported.

**→ 1.15.4 (PROGRAMISTA §6, item 59; seeding whole localized arrays; seeding.md) — nothing required:**
1. Did a seed write a whole localized array (`{ pl: [...], en: [...] }` for form fields, a page `layout`, a global
   array) and the panel shows only the last language? A plain re-run skips existing records (create-only): rewrite
   them locally with `SEED_UPDATE=1 pnpm seed` and check every language in the panel.
2. Live site, only the affected records: `SEED_ONLY="forms:<title>,pages:<slug>" SEED_UPDATE=1
   IPAL_SEED_ALLOW_PROD_UPDATE=1 SEED_DRY_RUN=1 pnpm seed`, back up the database (Coolify), then the same without
   `SEED_DRY_RUN`. Records an editor changed since seeding are skipped (`skip (edited)`) — fix them in the panel.
3. A global array: `fillGlobal` fills empty fields only — clear the field in the panel before the run, or fix it by hand.
**Check:** the panel shows the seeded rows in every language; a second run reports `skip`, not new rows.

**→ 1.15.5 (PROGRAMISTA §6, item 60; required fields with references in seeds; seeding.md) — nothing required:**
1. A seed that failed with "The following field is invalid: … > Layout" for a page whose required layout links to
   another page or a form: run it again — the record is now created complete (`SEED_DRY_RUN=1` first).
2. The dry run is stricter: a `{ $form }` / `{ $page }` to a record that neither exists nor is seeded earlier in the run is
   an error. Seed that record first or create it in the panel.
3. A "cycle of required links" error: make one of the two links optional, or seed one of the pages first.
**Check:** `SEED_DRY_RUN=1 pnpm seed` reports 0 errors; the real run creates the same records.

**→ 1.16.0 (PROGRAMISTA §6, item 61; files on forms, e-mailed and never stored; forms.md "Files") — nothing required:**
1. `pnpm ipal:skills`. Existing forms need nothing; without `forms.attachments` nothing changes. No import map change.
2. Only if the site wants files on a form (ask the owner): `ipalKit({ forms: { attachments: true } })`, a **File** field on
   the form (panel or seed — `ipal-form` skill), one e-mail of that form with a fixed recipient (no `{{field}}`),
   `pnpm generate:types`; Postgres/SQLite: `pnpm payload migrate:create` (additive). Add the `formClasses` keys `file`,
   `help`, `fileList`, `fileItem`, `fileRemove`; fill Form messages → Files for languages other than en/pl.
3. A hand-built upload path for a form (own collection, bucket, route): replace it with the File field and remove it
   (after the owner confirms nothing else uses the stored files).
4. Deploy: a proxy body limit of at least 12 MB on `/api/ipal/forms/submit` (Coolify's Traefik: none by default;
   nginx: `client_max_body_size 12m;`). Mail: Graph needs `Mail.ReadWrite` limited to the forms mailbox for files of
   3 MB and more, or SMTP settings in Site integrations; otherwise the limit is about 2.8 MB.
**Check:** Site integrations → "Send test e-mail" with the 10 MB file arrives; a form submission with a file arrives with
the attachment, and the submission shows **File delivery: Sent**; with Graph, no draft or Sent Items copy is left in the
sender mailbox a minute later.

**→ 1.16.1 (PROGRAMISTA §6, item 62; Next.js minimum 16.4.5, GHSA-mfr8-8qww-v76h; AGENT.md §4 item 11) — required for
every site below Next.js 16.4.5:**
1. `pnpm add next@16.4.6 eslint-config-next@16.4.6`, `rm -rf .next`, `pnpm build`; commit `package.json` and the lockfile,
   redeploy on Coolify (the new image ships the fixed Next.js).
2. `pnpm ipal:skills` (updated `ipal-setup` / `ipal-upgrade`).
**Check:** `pnpm ls next` → 16.4.6; `pnpm exec ipal-doctor` → no `next-min` finding; `pnpm dev` prints no security warning.

**→ 1.16.2 (PROGRAMISTA §6, item 63; Payload's mongoose and happy-dom advisories; AGENT.md §4 item 12) — required for
every site:**
1. Add to `pnpm.overrides` in `package.json`: `"mongoose@>=8 <8.24.7": "~8.24.10"` (MongoDB sites only) and
   `"happy-dom@<21.0.4": "^21.0.4"` (every site). Then `pnpm install`, `pnpm build`; commit `package.json` and the
   lockfile, redeploy on Coolify. No data change, no migration.
2. `pnpm ipal:skills` (updated `ipal-setup` / `ipal-upgrade`).
**Check:** `pnpm why mongoose happy-dom` → mongoose 8.24.10, happy-dom 21.0.4; `pnpm audit --prod` → no high or critical;
`pnpm exec ipal-doctor` → no `transitive-min` finding; open the panel and save a document.

**→ 1.16.3 (PROGRAMISTA §6, item 64; Payload 3.94.1 in the reference site and the starter; AGENT.md §4 items 11–12) —
recommended, not required (the plugin's peer range stays `^3.90.2`):**
1. **Node.js 22.23.5 or later first — everywhere the site runs.** Payload 3.94 refuses older Node. Locally: `node -v`.
   Coolify: Nixpacks takes only the major from `engines` / `.nvmrc`; the patch comes from the Nixpacks release on the
   server, so open the app → Terminal → `node -v` (or read the build log). Below 22.23.5: update Coolify first, and
   stay on Payload 3.90.x until then. CI images must resolve to 22.23.5 or later as well.
2. Every `payload` / `@payloadcms/*` to 3.94.1 (in `dependencies` and `pnpm.overrides`), `react` and `react-dom` 19.3.1,
   `"engines": { "node": ">=22.23.5 <23" }` (`.nvmrc` stays `22`). Overrides: keep `"dompurify@<3.4.17": "^3.4.17"`
   and `"happy-dom@<21.0.4": "^21.0.4"`; remove the `mongoose`, `undici` and `graphql-scalars` lines (they do nothing
   on 3.94.x). Then `pnpm install`, `pnpm payload generate:types`, `pnpm payload generate:importmap`, `rm -rf .next`,
   `pnpm build`; commit `package.json` and the lockfile, redeploy on Coolify.
3. Postgres/SQLite: `pnpm payload migrate:create`, commit it if it is not empty (3.94.1 changes long index and foreign
   key names). MongoDB: no migration.
4. `pnpm ipal:skills` (updated `ipal-setup` / `ipal-upgrade`).
**Check:** `pnpm ls payload @payloadcms/ui @payloadcms/db-mongodb` → 3.94.1; `pnpm why dompurify happy-dom` → 3.4.17,
21.0.4; `pnpm audit --prod` → no high or critical; `pnpm exec ipal-doctor` → no `versions` finding; Coolify Terminal
`node -v` → 22.23.5 or later; the panel opens, a document saves, a form submission arrives.

**→ 1.16.4 (PROGRAMISTA §6, items 65–66; security fixes: 2FA coverage and staff checks) — required
for every site:**
0. **Before deploying:** check the production `PAYLOAD_SECRET` length (Coolify app → Terminal →
   `node -e 'console.log(process.env.PAYLOAD_SECRET.length)'`). Shorter than 32: set a new random secret (with the
   owner's OK: logs everyone out, 2FA code again, API keys regenerate; deployment.md "`PAYLOAD_SECRET` — length and
   changing it"), or add `secretMinLength: 0` to `ipalEnvRules({ … })` for now and note it under "Project
   decisions" in AGENTS.md.
1. Update the package, `pnpm install`, `pnpm ipal:skills`, build, redeploy on Coolify. No migration, no config
   change for a site with one auth collection. `pnpm ls @clocklimited/payload-2fa` should show 3.0.0-beta.7 (tested: beta.1 and beta.7);
   another version may stop startup with `[ipal] twoFactor: the injected 2FA plugin did not add …`.
2. `grep -rn "auth:" src/collections` — more than one auth collection? Then: `admin: { user: '<staff slug>' }` in
   `buildConfig`; `adminOrSelfIn('<slug>')` instead of `adminOrSelf` in each; `access.staffCollections` only when
   the second collection is staff (access.md "Who is staff"). Never list a visitor collection there. Roles now
   count only for accounts of a staff collection: code that relied on `isAdmin` / `adminOnly` for accounts of
   another collection needs its own rule (`req.user.collection === '…'`).
3. `grep -rn "overrideAccess: false" src` — a call on a plugin collection or global (`form-submissions`, `forms`,
   `consent-records`, `stats-visits`, `cookie-review`, the settings globals) must pass the `user` from
   `payload.auth({ headers })`; a user object built by hand needs `collection: '<staff slug>'` for its role to
   count. Own endpoints that check `req.user`: add `secondFactorPassed(req)` or use `userMeetsRole(req, role)`.
   `isAdmin(req.user)` keeps working on the server; prefer `isAdmin(req.user, req.payload)`.
   `grep -rnE "isAdmin\(|isEditor\(|hasMinimumRole\(" src` — a call in a **client component** or in `proxy.ts` /
   middleware now returns `false` without a source: `isAdmin(user, config)` (`useConfig()`), or
   `isAdmin(user, { staffCollections: ['users'] })`.
4. `pnpm exec ipal-doctor --url <site>` (with the doctor token) → accounts without 2FA must be 0. An account that
   has not set TOTP up opens everything with its password alone: have its owner set it up now, or remove it.
5. Tell the owner what the CHANGELOG entry says under "Requires project changes" and agree on it: new SMTP
   password and Turnstile secret, a look through Site settings, Site integrations and each form's Emails tab.
   Do not change those values yourself without that decision.
**Check:** with 2FA on, log in over the API with the password only (security.md → "What the second factor covers" →
Check) → `403` from `/api/globals/site-integrations`, `/api/form-submissions`, `/api/users`; log in fully in the
panel → Site integrations and a form submission open, a setting saves. With a second auth collection: its token
gets `403` from the same addresses and from `POST /api/setup-totp`. The Coolify log has no
`PAYLOAD_SECRET must be at least`; `pnpm exec ipal-doctor` has no `env` finding.

**→ 1.16.5 (PROGRAMISTA §6, item 67; CHANGELOG 1.16.5; security.md "The `back` link of the 2FA screens") — required with 2FA on:**
1. **Do this in ONE deploy with the upgrade, or the panel is locked for everyone.** Run `pnpm exec ipal-doctor`
   before deploying.
   `pnpm payload generate:importmap` — the plugin puts `@intecion/ipal-kit/admin#SafeTotpView` in front of the
   2FA package's setup and verify views; commit `importMap.js`, `rm -rf .next`, redeploy on Coolify. With the old
   import map the build passes and the site starts, but the 2FA screens have no code form (HTTP 200) — nobody can
   sign in. Signs: `pnpm exec ipal-doctor` → `import map lacks …SafeTotpView` (run it before deploying); the log
   line `[ipal] The admin import map may be out of date` at start; the notice "Two-step verification may not be
   available" where the form should be. Fix: the same command, commit, redeploy.
   The log line and the notice with a **working** code form mean a false alarm (the `importMap.js` on disk is not
   the one the build used — a Dockerfile runner stage, a re-exporting map): sign-in works; set
   `twoFactor.importMapCheck: false`.
   **Check:** log in with the password only → open `/admin/verify-totp?back=https%3A%2F%2Fexample.com%2F` → enter
   the code → you land on `/admin` (not on example.com); a normal login still returns to the page you came from.
   No option, env, schema or migration. A project that registered its own 2FA views, or wrote a proxy rule that
   strips `back`, can keep them (`twoFactor.safeBack: false` turns the plugin's check off).
2. `pnpm ipal:skills`.

**→ 1.16.6 — 2FA setup required (CHANGELOG 1.16.6; PROGRAMISTA §6, item 68; security.md "Setup required") — required with 2FA on:**
**Not a routine patch, although the number is one.** From this version an account without 2FA can only set it up and is
blocked after 72 hours; on Postgres / SQLite a missing migration locks everyone out of the panel. Do not upgrade a live
site without steps 1–3 and a deploy day agreed with the owner. Steps 2, 3 and 5 go in ONE deploy.
1. **Before upgrading a live site:** `pnpm exec ipal-doctor --url <site>` (doctor token) → accounts without 2FA.
   Tell the owner: from the upgrade on, such an account can only set 2FA up, and has 72 hours for it; after that
   an administrator must reopen setup on the account's page. Have them set it up now, or remove unused accounts.
   Make sure at least one administrator (better two) has 2FA set up — otherwise nobody can reopen setup from the panel.
   The 72 hours of existing accounts start at the first start after the deploy and are counted once (restarts
   and redeploys do not extend them): agree the deploy day with the owner.
2. Update the package, `pnpm install`, `pnpm ipal:skills`, `pnpm payload generate:types`,
   **`pnpm payload generate:importmap`** (new: `TwoFactorStatusField`, `TwoFactorAlert`; commit `importMap.js`),
   then `pnpm exec ipal-doctor` before deploying.
3. **Postgres/SQLite — required, same deploy, or nobody can log in:** `pnpm payload migrate:create` (adds the
   column `totp_setup_from` to the 2FA collection; needed whenever 2FA is on, also with `requireSetup: false`),
   commit, and have it applied **when the new container starts**: `prodMigrations` in the database adapter, or the
   start command `pnpm payload migrate && pnpm start` (deployment.md §4.3). **Never Coolify's Pre-deployment
   command** — it runs in the old container, without the new migration, and the new version then starts without
   the column. Without the column every login answers 500, administrators included; the log says
   `[ipal] 2FA: the column for "totpSetupFrom" is missing … NOBODY CAN LOG IN`. `pnpm exec ipal-doctor` reports
   it before the deploy. MongoDB: nothing.
4. An integration that logs in with a password and has no TOTP: give it an API key, or
   `twoFactor.requireSetup: { exempt: ({ user }) => user.email === '…' }`. `grep -rn "overrideAccess: false" src`:
   a `user` fetched by id is refused for every account now — take it from `payload.auth({ headers })`.
5. `rm -rf .next`, build, redeploy on Coolify. Read the first lines of the log: `[ipal] 2FA: N existing account(s)
   without two-step verification…` — pass that number to the owner. The line appears on that first start only.
   Postgres/SQLite: if logins answer 500 after the deploy, the migration from step 3 did not run — check that it
   is committed and that the container runs migrations at start (deployment.md §4.3), then redeploy.
6. `requireSetup.exempt` must be a plain function returning `true` / `false` (an `async` one stops the start).
   A script on an API key is refused by `POST /api/ipal/two-factor/reset` by default — pass
   `twoFactor.resetAccess` if that is wanted. A reset ends the account's sessions (it logs in again); after a
   suspected compromise change the password too. An SVG favicon has no tab icon on the 2FA screens.
7. Tell the owner what to tell the staff: a new account has 72 hours to set 2FA up, then an administrator must
   choose "Reopen setup". Not wanted: `twoFactor.requireSetup: false`, or `{ windowHours: false }`.
**Every administrator is blocked** (all missed the 72 h): security.md "Every administrator is blocked" — a
`pnpm payload run` script that sets `totpSetupFrom` to now for one administrator, or
`requireSetup: { windowHours: false }` + redeploy, set 2FA up, put it back.
**Check:** create a throwaway account → its token gets `403` from `/api/users/me`; in the panel it lands on the
setup screen with "Set up two-step verification by …"; after the code it is in. As an administrator open that
account → "Two-step verification: Set up." and the reset button; delete the account.

## 2. Inventory (no code changes)
**What changed for projects** between your old and new plugin version is exactly the reference site's diff —
`git diff v<old> v<new> -- reference/` in the ipal-kit repo (or the two `docs/agent/reference-site/INDEX.md` files):
every file a project must touch, already done once and tested in the plugin's CI.
For **every** item in the PROGRAMISTA §6 table show evidence (grep / file) of whether
it applies to the project. Run the **ipal-audit** skill (`--quick`) and attach the result.
Result: a prioritised to-do list — carry it out right away. Stop
only before an irreversible change (data migration with content → **ipal-migrate-fields**,
changing published slugs).

## 3. Item by item
One item = one change = one commit:
1. read the docs file it points to,
2. replace the local code with the plugin function, remove the old code (do not keep both),
3. `pnpm build` — it passes before you take the next item.

Items that rename fields in the database (e.g. the `ctaLabel` → `links` refactor)
need a **data migration before** the old fields are removed — ask
the user whether the project already has content.

## 4. Finish
A full **ipal-audit** with no errors, then `pnpm exec ipal-doctor` (after `pnpm exec ipal-skills` and
`pnpm payload generate:importmap`): no new errors against the report before the upgrade (skill **ipal-doctor**;
new rules come with new versions — read each finding, fix or record the owner's decision in `ipal-doctor.json` with a
reason). Before the upgrade, `pnpm dlx --package=@intecion/ipal-kit@latest ipal-doctor --offline` shows what the newest
rules will report. Then the list of things to check in the admin panel.
