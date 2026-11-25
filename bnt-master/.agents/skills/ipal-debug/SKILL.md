---
name: ipal-debug
description: Systematic diagnosis for ipal-kit / Payload 3 / Next 16 projects — reproduce, classify (project code, configuration, panel data, environment, or an ipal-kit bug), fix the cause, prove it. Includes a symptom → cause → fix table of every failure seen so far (TS2307, static→dynamic, metadata in body, 404 per locale, importMap, duplicate @payloadcms/ui, emails, R2, Turnstile, hydration). Use whenever something fails — build, type check, runtime error, wrong behaviour, "it worked yesterday" — before asking the user anything.
---

# ipal-debug

Do not guess, do not rewrite blindly, and do not ask the user before you have gone
through this procedure. Ask only when you are missing something you cannot get yourself
(a secret, access to the production admin panel, a business decision).

## Procedure
1. **Reproduce** — the exact command / URL / click, the full message (the first error in
   the log, not the last). Dev and build behave differently — check both if it concerns rendering/SEO.
2. **Narrow down the layer**:
   | Question | How to check |
   |---|---|
   | project code? | `git diff`/`git stash` → does the error go away |
   | configuration? | `payload.config.ts`, `next.config.ts`, `proxy.ts`, `.env` vs `docs/env.md` |
   | panel data? | does the same page in another language / another document work? Was `Save` clicked? |
   | environment? | `rm -rf .next`, restart dev, `pnpm install`, versions: `pnpm why @payloadcms/ui` |
   | ipal-kit? | error in `node_modules/@intecion/ipal-kit/dist/…`, behaviour that contradicts `docs/<module>.md` |
3. **The table below** — most errors have happened before.
4. **Fix the cause**, not the symptom (`as any`, a `try/catch` that swallows the error,
   `force-dynamic` "to make it work", copying plugin code into the project = **no**).
5. **Prove it**: the same command from step 1 passes + `ipal-audit --quick` +
   (rendering/SEO) `ipal-seo-check` on the build.
6. Bug on the ipal-kit side → an **ipal-plugin-gap** report to the owner and **wait for the decision** — no
   workaround on your own. Only an approved workaround goes in, marked
   (`// WORKAROUND ipal-kit <version>: <description>`) and recorded in `AGENTS.md` → "Project decisions".

## Symptom → cause → fix

### Build / TypeScript
| Symptom | Cause | Fix |
|---|---|---|
| the 2FA code screen answers "Too many codes were tried…" (`429` from `/api/verify-totp`) | more than 5 verify attempts for that account in 10 minutes (`twoFactor.verifyLimit`); repeated lines `[ipal] 2FA: too many verify attempts` in the log without the owner trying = someone has the password | wait for the window, enter the current code once; unexplained attempts: change that account's password. Tests that log in often: `verifyLimit: { max: … }` for that environment |
| `isAdmin(req.user)` says `false` for a real administrator on the server, in a process that loads two Payload configs (tests, a multi-site script) | a call without a source counts only collections that are staff in **every** config of the process | pass the source: `isAdmin(req.user, req.payload)` — with it each config gets its own answer |
| `isAdmin(user)` / `isEditor(user)` is always `false` in a client component or in `proxy.ts` | the staff collections are not known there (no config in the browser bundle / middleware), and the predicates fail closed | `isAdmin(user, config)` with `useConfig()`; in middleware `isAdmin(user, { staffCollections: ['users'] })` |
| an account logs in but every page and request answers 403 / the setup screen says "The time to set up two-step verification has passed" | 2FA setup required: the account did not set TOTP up within the window (72 h from its creation, an admin's reset, or the first start after the upgrade) | an administrator opens the account in the panel → Two-step verification → "Reopen setup" (or `POST /api/ipal/two-factor/reset` `{ userId }`); every administrator is blocked: security.md "Every administrator is blocked" — a script with the Local API, `payload.update({ collection: 'users', id, data: { totpSetupFrom: new Date().toISOString() } })` (`pnpm payload run`), then log in and set TOTP up; or `requireSetup: { windowHours: false }`, redeploy, set up, put it back |
| a new account gets `403` from the API although its role allows the request | 2FA setup required: until TOTP is set up the account reaches only the setup screen | set TOTP up (log in to the panel); an integration: use an API key, or `twoFactor.requireSetup.exempt` |
| after an upgrade EVERY panel login answers `500` (also `/api/users/init`), administrators with 2FA included; log: `[ipal] 2FA: the column for "totpSetupFrom" is missing … NOBODY CAN LOG IN` or `column users.totp_setup_from does not exist` | Postgres/SQLite: the migration that adds the 2FA column has not run (needed whenever 2FA is on) | `pnpm payload migrate:create` if no migration has it, commit, and redeploy with migrations run when the new container starts — `prodMigrations` in the adapter or the start command `pnpm payload migrate && pnpm start` (deployment.md §4.3; not Coolify's Pre-deployment command, which runs in the old container); nothing is lost. `ipal-doctor` reports a project whose migrations lack `totp_setup_from` |
| the site does not start: `[ipal] twoFactor.requireSetup.exempt must not be async` / `…windowHours must be a number` | `exempt` is an `async` function, or `windowHours` is a string / negative | `exempt: ({ user }) => user.email === '…'` (returns `true` / `false` at once); `windowHours: 72` or `false` |
| log: `[ipal] twoFactor.requireSetup.exempt returned a Promise … The account is NOT exempt` (and the service account gets 403) | `exempt` does not return exactly `true` | return a boolean decided from the fields on `user` |
| an administrator's "Reset two-step verification" answers 403 from a script with an API key, or for an exempt account | by default the reset needs a session that entered its own TOTP code | reset from the panel after logging in with the code; or `twoFactor.resetAccess: ({ req }) => …` |
| after "Reset two-step verification" the user is logged out everywhere | intended: the reset ends the account's sessions | the user logs in again with the password and sets 2FA up; after a suspected compromise also change the password |
| no "Two-step verification" box on the account page / no "Reopen setup" | the import map lacks `TwoFactorStatusField` (not regenerated), or `requireSetup: { statusField: false }` | `pnpm payload generate:importmap`, commit, redeploy; meanwhile `POST /api/ipal/two-factor/reset` `{ userId }` works |
| "Two-step verification" is missing on the account page / the dashboard shows a missing component | the import map is stale | `pnpm payload generate:importmap`, commit `importMap.js`, `rm -rf .next`, redeploy |
| startup: `[ipal] twoFactor: the injected 2FA plugin did not add the totpSecret field / hasTotp field / totp auth strategy` | the installed `@clocklimited/payload-2fa` is not a version ipal-kit's second-factor check recognises (tested: 3.0.0-beta.1 and beta.7), or a custom factory was injected | install a supported version; stop-gap only: `twoFactor.guard: false` (the plugin's own data is then not covered by 2FA — security.md) |
| own route or script gets `403` / "not allowed" on `form-submissions`, `forms`, a settings global with `overrideAccess: false`, although the user is an admin | the `user` was fetched by id and passed by hand: it does not carry how the account logged in, so the second-factor check refuses it | take the user from `payload.auth({ headers })` (it sets `collection` and how the account logged in), or (server-only code that needs no access check) leave `overrideAccess` at its default; a hand-built user needs at least `collection: 'users'` for its role to count |
| an account of a second auth collection (`customers`) gets `403` from a settings global, submissions, `/api/ipal/*`, `/api/setup-totp`, or `isAdmin` / `adminOnly` say no although it has `roles: ['admin']`, after an upgrade | by design since 1.16.4: roles and staff checks count only for accounts of a staff collection | write the one rule it needs (`formSubmissionOverrides`, `globalOverrides`, `collectionOverrides`); a second STAFF collection: `access.staffCollections` (access.md "Who is staff") |
| `TS2307 next/navigation` in the plugin's `dist` | import without `.js` in the plugin client (NodeNext) | **ipal-kit bug** → plugin gap; the plugin imports `'next/navigation.js'` |
| `TS2307 @payloadcms/storage-s3` | package missing when using `buildR2Storage` | `pnpm add @payloadcms/storage-s3` + `buildR2Storage(['media'], { s3Storage })` |
| `does not provide an export named X` / `X is not a function` | symbol not exported from the entry point, or wrong subpath (`/client` vs root vs `/server` vs `/rsc`) | `docs/README.md` → the right import; missing from every entry → **ipal-kit bug** (export) |
| `Cannot find module '@clocklimited/payload-2fa'` | not injected | `twoFactor: { plugin: payloadTotp }` (`serverExternalPackages` does not help — it fails on `.css`) |
| `TS2322` on `plugin: payloadTotp` (`string` vs `CollectionSlug`) | ipal-kit ≤ 1.8.13 typed `collection` as `string` | update ipal-kit; remove the adapter/cast |
| `Page changed from static to dynamic at runtime` | `headers()`, `cookies()`, `searchParams` in the page tree (often `not-found.tsx`) | locale from `params`; `not-found` → `LocaleView` (pages.md); `headers()` only in server actions / route handlers |
| `ƒ` routes despite `generateStaticParams` | the build cannot see the database | `DATABASE_URI` in the build (PROGRAMISTA §4.3) |
| build fails with `ENOTFOUND` / Mongoose | a route reads the database during a build without a database | routes that read the database (sitemap.xml, manifest, llms.txt, llms-full.txt, api/health): `export const dynamic = 'force-dynamic'` (only these, not pages) |
| `slug.join is not a function` | `[slug]` instead of `[[...slug]]` | rename the folder |
| `Missing <html> and <body>` | `[locale]` layout without `<html>` after the root layout was removed | `<html lang>` and `<body>` in `[locale]/layout.tsx` |
| `Export fileTypeFromFile doesn't exist in target module` (Turbopack, dev start) | `instrumentation.ts` imports from the package root → Payload in the Edge bundle | import from `@intecion/ipal-kit/env` + `NEXT_RUNTIME === 'nodejs'` (env.md) |
| `R2_PUBLIC_URL must be a valid URL (got "/media")` | old version of the rule / production with a relative path | dev: `/media` allowed since the new version; production: full URL of the media domain, or leave it empty (media through the app; optional since `ipalEnvRules` makes it so by default, env.md) |
| `server-only` in the client | import from `@intecion/ipal-kit/server` in `'use client'` | call it through a server action |

### Admin panel (`/admin`)
| Symptom | Cause | Fix |
|---|---|---|
| `PayloadComponent not found in importMap` (e.g. `@intecion/ipal-kit/admin#RowLabel`) | importMap out of date after a plugin update / adding `rowLabel` | `pnpm payload generate:importmap`, restart |
| after an upgrade the 2FA setup / verify screen has no code form (HTTP 200), only the notice "Two-step verification may not be available" (or nothing at all with `importMapCheck: false` / an own provider); nobody can sign in; the log has `[ipal] The admin import map may be out of date` and `getFromImportMap: PayloadComponent not found in importMap … @intecion/ipal-kit/admin#SafeTotpView` | the import map was not regenerated after the upgrade that added the `back` link check (`twoFactor.safeBack`); the production build uses the committed, old `importMap.js` | `pnpm payload generate:importmap`, commit `importMap.js`, `rm -rf .next`, redeploy; `pnpm exec ipal-doctor` shows it before a deploy. The opposite case (wrapper present, package view missing) throws `[ipal] The admin import map has no "@clocklimited/payload-2fa/rsc#TOTPVerify"` — same fix |
| the notice "Two-step verification may not be available" and the log line `[ipal] The admin import map may be out of date` appear, but the code form is there and sign-in works | false alarm: the check searches the `importMap.js` on disk, which is not the map inside the build (map generated during the build and a Dockerfile runner stage that copies the repository's file; a map file that re-exports or computes its entries) | `twoFactor: { …, importMapCheck: false }`; or ship the generated `importMap.js` in the image |
| an own 2FA screen (set through the wrapped factory) ignores the check on `back` | a client component reading `useSearchParams()` gets the raw query value | read the `back` prop (or `searchParams.back`) the wrapper passes — both are checked (security.md "Your own 2FA screen") |
| after the 2FA code the user lands on `/admin` instead of the page in `back` | `back` pointed outside the admin route or to another origin (the check keeps only a path inside `routes.admin`; an absolute URL only on the `serverURL` origin) | expected; for another rule pass `twoFactor.safeBack: (back, { adminRoute, origin }) => string` (security.md) |
| new admin stuck on `/admin/setup-totp?back=null` (the page keeps redirecting to itself) | ipal-kit ≤ 1.14.1: the 2FA package's provider needs an `x-pathname` header nothing sets on `/admin`; or `twoFactor.provider: false` without that header | update ipal-kit, `pnpm payload generate:importmap` (`TotpRedirectProvider`), restart; check: `/admin/setup-totp?back=%2Fadmin` shows the QR (security.md) |
| `Cannot destructure property 'config'` / UI hooks without context | two copies of `@payloadcms/ui` | `pnpm why @payloadcms/ui`; one version + `pnpm.overrides`; `ls node_modules/@intecion/ipal-kit/node_modules/@payloadcms` = empty |
| empty SEO tab, no Forms | mismatched `@payloadcms/*` versions | all `@payloadcms/*` = the `payload` version |
| upload rejected "Image is … Tick Optimize" | `buildOptimizeUploadHook` (intended) | tick the checkbox or prepare the file; limit in the hook options |
| video upload rejected | `maxVideoBytes` limit | export as the message says (H.264, 720–1080p, fast start) |
| change in the panel not visible | no Save / ISR without revalidation | collection: `buildRevalidateHook`; your own global (Header, Footer…): `afterChange: [buildGlobalRevalidateHook({ revalidatePath })]` (ipal-nav); the plugin's globals (Site settings, Site integrations, Cookie banner, Notifications): pass `ipalKit({ revalidatePath })` (from `next/cache`) — without it the change waits until the `revalidate` window ends |

### Front end / routing / SEO
| Symptom | Cause | Fix |
|---|---|---|
| `/pl` → 404 | Homepage not assigned in System pages | set it in the panel |
| `/en/*` → 404, `/pl/*` works | slug/title missing in EN | `ipal-locale-add` → `locale-coverage` |
| language switcher → 404 | prefix swap instead of `AlternateLinksUpdater` | i18n.md → AlternateLinks |
| metadata in `<body>` (seo-check) | streaming: no `htmlLimitedBots`, explicit `<head>`, dynamic page | AGENT §4; `generatePageMetadata` |
| canonical / sitemap with localhost | `NEXT_PUBLIC_SERVER_URL` not set in the build | set it in the build env (not only at runtime) |
| `/admin`, `/_next` → 500 or a loop | the proxy matcher is not a literal | inline matcher in `proxy.ts` |
| hydration mismatch on the banner | reading cookie/`window` during render | consent only through `CookieBanner`/`useConsentContext`; `Date`, `Math.random` outside render |
| images do not load (R2) | media domain missing in `images.remotePatterns` / wrong `R2_PUBLIC_URL`; without `R2_PUBLIC_URL`: Media has no `access.read: () => true` → 403 on `/api/media/file/…` | `next.config.ts` + env, or Media access (storage.md) |
| 404 page without styles/nav | `not-found.tsx` outside `[locale]` without a layout | pages.md — `not-found` example |

### Consent / analytics / forms / email
| Symptom | Cause | Fix |
|---|---|---|
| pixel before consent (consent-check) | script wired by hand (`<Script>`) | only through the panel → `<Analytics>` (GA/GTM/pixels) or `<ConsentScript>` (analytics.md, consent.md) |
| banner without styles | Tailwind does not scan the plugin | `@source` on `node_modules/@intecion/ipal-kit/dist/**/*.js` (path relative to the CSS file, PROGRAMISTA §2.5) |
| emails are not sent | no `email: mailAdapter()` / empty transport / empty Emails tab | email.md; Send test in the panel |
| old email sender | mail client cache | check the raw headers |
| form: `unknown_fields` | field outside the definition (honeypot not removed) | `ipal-form` → actions.ts |
| Turnstile always rejects | the `[ipal] Turnstile …` log says why: no secret, `invalid-input-secret`, `timeout-or-duplicate` | turnstile.md → table; secret in the panel or `TURNSTILE_SECRET_KEY`; **do not** write the secret in code |

### Environment
| Symptom | Cause | Fix |
|---|---|---|
| change in the plugin not visible | old version in `node_modules` / `.next` | `pnpm add @intecion/ipal-kit@<version>`, `grep -c <symbol> node_modules/@intecion/ipal-kit/dist/...`, `rm -rf .next`, restart |
| skills out of date after an update | not refreshed | `pnpm exec ipal-skills` |
| `ipal-skills: command not found` | ipal-kit ≤ 1.8.13 did not publish `bin` | update ipal-kit |
| "Code is right, behaviour is wrong" | — | in order: restart dev → Save in the panel → duplicate dependency → importmap → cache |

## When it is an ipal-kit bug (report, not a patch in node_modules)
- the error points to a file in the plugin's `dist` and does not come from misusing the documented API;
- behaviour contradicts `docs/<module>.md`;
- the docs tell you to import something that the entry point does not export;
- you are writing the same boilerplate in a second project in a row (a module candidate).
Then **ipal-plugin-gap**: symptom, minimal reproduction, version, proposed
change in the plugin, the owner's decision (and the approved workaround, if any). **Never** edit `node_modules`.
