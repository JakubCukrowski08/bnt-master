---
name: ipal-reference
description: Complete map of everything @intecion/ipal-kit provides — every ipalKit plugin option (with defaults, what it adds and how to turn it off or override it), every env var the code reads, every route, the proxy, the layout components, every admin import-map entry, the hooks, collections, globals and endpoints the plugin injects by itself, and every file the project wires on its own (payload.config, proxy, instrumentation, next.config, lib/content, layout, catch-all page, SEO/GEO routes, Pages/Media hooks, forms, consent, stats, storage, e-mail), each with a minimal example and a concrete check — plus an index of every export with its import path (resources/api.md). Use before writing any feature yourself, when wiring a module, or when asked "does ipal-kit have X".
---

# ipal-reference

## How to use
- **A working example of every row** is in the reference site: `docs/agent/reference-site/INDEX.md` (file → what it
  shows; wiring files in full).
- **Look here first**, then at the code. Looking for a function → `grep -n "<word>" resources/api.md`
  (`resources/api.md` — every export: import, what it does). Module description:
  `node_modules/@intecion/ipal-kit/docs/<page>.md` (the "details" column).
- **The plugin helps, never limits:** every module can be turned off, every default can be overridden,
  the project config wins, the building blocks (`build*`, `create*`) are exported — compose your own version from them.
- Missing option / behaviour that does not match the docs → skill **ipal-plugin-gap** (report). Never patch `node_modules`.
- Described per the current code (checked against 1.16.3). "currently always" = no option to turn it off today (gap → ipal-plugin-gap).

## 1. `ipalKit({...})` options (`IpalOptions`, `dist/types.d.ts`)

| option | default | what it adds / changes | how to turn off / override |
|---|---|---|---|
| `i18n` **(required)** | — | `config.localization` (always overwritten); validated right away in `ipalKit()` (throws on a bad config) | one source: `src/i18n.config.ts`; your own `localization` in the config gets overwritten anyway |
| `i18n.defaultLocale` | — | `localization.defaultLocale`, `/` redirect in the proxy | must be in `locales` |
| `i18n.fallback` | `true` | `localization.fallback` | `false` |
| `i18n.locales[]` `{ code, label, rtl? }` | — | list of languages (min. 1); `rtl: true` → `rtl` in Payload | adding a language: skill **ipal-locale-add** |
| admin languages (no option) | English + Polish | `i18n.supportedLanguages` set to `{ en, pl }` when the project has none; plugin component texts in `i18n.translations.<lang>.ipal` (`adminTexts`); every plugin label is `{ en, pl }` (rules: `docs/dev/admin-ux.md`) | your own `i18n.supportedLanguages` wins; override a component text with `i18n.translations.<lang>.ipal.<key>`; field/global labels via `globalOverrides` / `collectionOverrides` — see i18n.md "Admin panel languages and texts" |
| `access` | none | `roles` field (`user` < `editor` < `admin`, `saveToJWT`) in the auth collection | omit → **no roles**: every account of the panel's login collection passes the plugin's admin/editor checks (`userMeetsRole`; accounts of other auth collections never pass): Site integrations, the e-mail test, stats, consent-records, settings globals, `form-submissions`. Narrow them with `globalOverrides` / collection overrides |
| `access.authCollection` | — (required in `access`) | collection that gets `roles`; also the slug of the injected auth collection | your own collection with that slug wins |
| `access.defaultRole` | `'user'` | `defaultValue` of the `roles` field | `'editor'` / `'admin'` |
| `access.authAccess` | `{ create: adminOnly, delete: adminOnly, read: adminOrSelfIn(slug), unlock: adminOnly, update: adminOrSelfIn(slug) }` | access of the auth collection the plugin **injects** (Payload's default lets any logged-in account edit or delete every other account) | your keys win, e.g. `{ read: authenticated }`; your own collection with that slug wins whole (give it `adminOrSelf` / `adminOnly` yourself) |
| `access.firstUserAdmin` | `true` | the account made on Payload's "Create first user" screen (`/first-register` on an empty collection) gets `roles: ['admin']`; an open sign-up still gets `defaultRole` | `false` = that account gets what was submitted |
| `access.staffCollections` | `[]` | more auth collections whose accounts are staff, besides the panel's login collection (`admin.user`) and `access.authCollection`; roles count **only** for accounts of a staff collection (every predicate and access function); such accounts are **not** covered by 2FA (one collection only — warning in the log at start); without a `roles` field there, every such account passes every staff check | add `buildRolesField()` to that collection to tell roles apart; a visitor collection (`customers`) is never listed here |
| `adminRoute` | `'/admin'` | `config.routes.admin`; stats link and views, `IntegrationAlerts` | the project moves `app/(payload)/<route>/` itself and adds the route to the proxy matcher (security.md) |
| `twoFactor` | **none = error** | `@clocklimited/payload-2fa` with `forceSetup: true` (TOTP enforced, also checked in the API) | `twoFactor: false` (discouraged); omitting the option throws `[ipal] twoFactor.issuer is required` |
| `twoFactor.issuer` | — (required) | name in the authenticator app | — |
| `twoFactor.plugin` | — (required) | injected `payloadTotp` (the plugin does not import the peer) | missing function → throws |
| `twoFactor.collectionSlug` | the panel's login collection (`admin.user`, else the first auth collection) | collection with 2FA; startup fails with `[ipal] twoFactor…` when it is not an auth collection or differs from `admin.user` | point it at the login collection |
| `twoFactor.provider` | `'@intecion/ipal-kit/admin#TotpRedirectProvider'` | admin provider that sends users to `setup-totp` / `verify-totp` (path read in the browser); replaces the package's header-based one | own component path / `{ path, clientProps, serverProps }` (gets clientProps `forceSetup`); `false` keeps the package's (needs `x-pathname` on `/admin`, else `setup-totp?back=null` loops) |
| `twoFactor.safeBack` | on | the `back` query value of the 2FA setup and verify screens is checked on the server before the package's view gets it (`SafeTotpView` registered in place of the package's four views): kept only as a path on the site's origin inside `routes.admin`, else the admin root — no `javascript:` / off-site redirect after the code. Needs `generate:importmap` (`@intecion/ipal-kit/admin#SafeTotpView`) | `false` = the package's views untouched; a function `(back, { adminRoute, origin }) => string` = your own rule |
| `twoFactor.importMapCheck` | on | production only: at start searches the `importMap.js` on disk (where Payload looks for it) for `@intecion/ipal-kit/admin#SafeTotpView`; when not found, logs `[ipal] The admin import map may be out of date …` and ipal-kit's `TotpRedirectProvider` puts the notice "Two-step verification may not be available" above the 2FA screens (never instead of them). A hint only — the map in the build can differ from the file on disk (Dockerfile runner stage, re-exporting map); a file that is not found is not reported | `false` = no file read, log line or notice |
| `twoFactor.texts` | ipal-kit's en/pl texts (`TOTP_TEXTS`) over the package's; 2FA screens titled "Two-step verification" / "Weryfikacja dwuetapowa" (site's language) | `false` = the package's texts; one text: `i18n.translations.<lang>.totpPlugin.<key>` (security.md) |
| `twoFactor.guard` | on | ipal-kit's own second-factor check on every collection and global (also the plugin's own and those of plugins listed after ipalKit) and in `userMeetsRole`; startup fails with `[ipal] twoFactor: the injected 2FA plugin did not add …` when the 2FA package lacks the `totp` strategy / `hasTotp` / `totpSecret` | per entity: `custom.ipal.secondFactor: false` / `{ read: false }` or the package's `custom.totp.disableAccessWrapper.<op>`; `false` = the package's wrapper only (the plugin's own data then opens to a password without the code; not recommended). The package's endpoints stay limited to accounts of the 2FA collection either way |
| `twoFactor.verifyLimit` | `{ max: 5, windowMinutes: 10 }` | attempts per account on `POST /api/verify-totp` (the 2FA package counts none): the sixth in the window, right or wrong, gets `429` + `Retry-After`; in memory per instance | `{ max, windowMinutes }`; `false` = no limit |
| `twoFactor.requireSetup` | on, `{ windowHours: 72 }` | an account without TOTP reaches nothing but the setup screen and `/api/setup-totp` (REST, GraphQL and the panel's data answer 403); it has `windowHours` from its creation or from an admin's reset, then it is blocked until an admin reopens setup. Adds the field `totpSetupStatus` (panel) to the 2FA collection, a dashboard notice and `POST /api/ipal/two-factor/reset`; the date field `totpSetupFrom` is there whenever 2FA is on (also with `requireSetup: false` / `guard: false`). Existing accounts get their window at the first start after the upgrade, written once. **Postgres/SQLite: the migration must be applied when the new container starts — `prodMigrations` or `pnpm payload migrate && pnpm start`, not a pre-deployment command (deployment.md §4.3) — or every login answers 500**; `generate:importmap`. `exempt` must return exactly `true` at once (an `async` one, or a `windowHours` that is not a number / `false`, stops the start) | `false` = the package's rule (API open until setup); `{ windowHours: 24 }`, `{ windowHours: false }` (no limit), `{ exempt: ({ user }) => … }` (a service account) |
| `twoFactor.requireSetup.dashboardNotice` / `.statusField` / `.setupNotice` | on | the administrators' notice on the dashboard; the status and reset control on the account page; the notice on the setup screen | `false` each (the lock and the reset endpoint stay) |
| `twoFactor.resetAccess` (the endpoint exists with `twoFactor.guard` on; `guard: false` = no endpoint, 404) | a staff admin whose session entered its own TOTP code (not an API key, not an `exempt` account) | who may reset another account's TOTP / reopen its setup (the button on the account page, `POST /api/ipal/two-factor/reset`). The reset clears the secret and the account's sessions. A session that still owes its code is always refused | `({ req }) => boolean` — replaces the rule, so keep `req.user?._strategy === 'totp' &&` in it unless API-key / exempt admins should reset; only `true` allows; `req.user._strategy` tells `'totp'`, `'api-key'`, `'local-jwt'` apart |
| `whiteLabel.inlineImages` | on | on the 2FA screens the logo / icon is fetched by the server as an anonymous visitor gets it (max 512 KB) and inlined as `data:` — the session there is refused `media` | `false` = the browser tries the media URL |
| `adminMeta.serveIcon` | on | `/api/ipal/admin-icon` answers with the favicon's bytes when it is a bitmap (PNG, JPEG, GIF, WebP, ICO, AVIF by its bytes); an SVG favicon always gets a redirect to the media file (never SVG bytes from the site's origin) | `false` = always the redirect |
| `twoFactor.allowCollectionMismatch` | `false` | allows `collectionSlug` ≠ `admin.user` (panel users of the other collection then skip 2FA) | `true` only when you protect a second auth collection on purpose |
| `whiteLabel` | none | `admin.components.graphics.Logo/Icon` (`AdminLogo`/`AdminIcon`) from Site settings + vendor credit | omit / `false`; `true` = defaults |
| `whiteLabel.settingsSlug` | `'site-settings'` | global it reads the logo/name from | — |
| `whiteLabel.logoField` / `iconField` / `nameField` | `'logo'` / `'favicon'` / `'siteName'` | fields in Site settings | any upload/text field |
| `whiteLabel.titleSuffix` | none | `admin.meta.titleSuffix` (tab title) | — |
| `whiteLabel.credit` | on | `IntecionCredit` in `afterLogin` and `afterNavLinks`: "Technology support: Intecion.com" (en/pl, from `agency`) | `false`; `{ text, url }` overrides |
| `agency` | `{ name: 'Intecion.com', url: 'https://intecion.com' }` | the credit line, the panel's link description and preview image | `{ name, url }` = another agency; `false` = none anywhere |
| `adminMeta` | on (with or without `whiteLabel`) | panel `<head>`: `robots` noindex/nofollow, `titleSuffix` "— <site> \| Panel", `og:site_name` + description from Site settings (refreshed on save), `og:image` `GET /api/ipal/admin-og` (1200×630 from the logo or name), icon `GET /api/ipal/admin-icon` (favicon or initials); no import map step | `false` = Payload defaults; `{ robots, titleSuffix, description, image, icons, language }` (each `false` or your value; `{site}`, `{agency}` placeholders); your own `admin.meta` keys always win. Check: `curl -s $URL/admin/login \| grep -E 'og:\|robots'` (white-label.md) |
| `pages` | none | Site settings → **System pages** (page roles) and **Maintenance** tabs | omit → neither tab |
| `pages.slug` | — (required in `pages`) | the project's pages collection (System pages relations, construction, IndexNow) | — |
| `pages.roles` | all: `homepage`, `notFound`, `privacyPolicy`, `cookiePolicy`, `termsOfService` | which assignments to show | subset of the array |
| `content` | none | `<slug>Archive` field in System pages per collection (entry URL = archive page slug) | **ignored without `pages`** (no archive fields; IndexNow still works) |
| `content.collections[]` `{ slug, label?, perPage? }` | `label` = slug, `perPage` 10 | archive entry; the same value goes to `createContentHelpers({ content })` | the project creates the collection (skill **ipal-collection**) |
| `seo` | none | `@payloadcms/plugin-seo` (`meta` group + `titleOverride`), Content/SEO tabs, auto-fill hook | omit |
| `seo.collections` | — (required) | collections with `meta` | — |
| `seo.autoFill` | `{ title: 'title', content: 'layout', descriptionLength: 155 }` | `beforeChange`: empty `meta.title/description` filled from document fields | `false`; object `{ title, description, content, descriptionLength }` |
| `seo.descriptionCheck` | on (`settingsSlug: 'site-settings'`, `siteDescriptionField: 'siteDescription'`) | UI field `MetaDescriptionCheck` below the description (empty / duplicated) | `false`; object overrides slug/field |
| `seo.fields` | `[]` | extra fields in the SEO group | — |
| `seo.uploadsCollection` | `'media'` | upload collection `meta.image` relates to | any upload collection slug |
| `seo.generateTitle` / `generateDescription` | plugin-seo | preview / generation in the panel | your own function `({ doc }) => string` |
| `seo.searchSettings` | tab on (the tab exists with or without `seo`) | Site settings → **Search engines** tab: `searchVerification.google/bing/yandex` (→ `<meta>` via `generatePageMetadata`), `aiCrawlers.policy` + `aiCrawlers.rules[]` (→ robots.txt via `getRobots`), localized `llmsIntro` (→ top of `/llms.txt`); empty fields change nothing. Postgres: `migrate:create` after upgrading | `false` = no tab, but this key exists only inside `seo` (which needs `collections`); without `seo` use the top-level `searchSettings: false`. When both are set, the top-level `searchSettings` wins; `(fields) => fields` = your own set (keep the names `searchVerification`, `aiCrawlers`, `llmsIntro` or read your own fields in your routes) |
| `searchSettings` | tab on | same tab and values as `seo.searchSettings`, but a top-level option: works **with or without `seo`**; read as `searchSettings ?? seo.searchSettings`, so it wins when both are set | `false` = no tab; `(fields) => fields` = your own set |
| `forms` | none | `@payloadcms/plugin-form-builder`: `forms`, `form-submissions` collections | omit |
| `forms.adminGroup` | `'Forms'` | sidebar group | `false` = Payload default; `admin.group` in overrides wins |
| `forms.fields.*` | on: `checkbox`, `checkboxGroup`, `country`, `date`, `email`, `message`, `number`, `radio`, `select`, `state`, `step`, `text`, `textarea`, `time`; off: `payment` | block types in the builder (all with "Show only when") | `<type>: false`; a block object replaces it; `payment: true` **does nothing** (filtered out) — pass a block object |
| `forms.formOverrides` | Form/Forms labels, `emails` readable by logged-in users only | overrides the `forms` collection (`fields: ({ defaultFields }) => …`, `slug`, `admin`, `access`…) | any `CollectionConfig` |
| `forms.formSubmissionOverrides` | create: logged-in, read: editor+, delete: admin | overrides `form-submissions` | `access.create` etc. wins |
| `forms.redirectRelationships` | none | collections a form can redirect to | `['pages']` |
| `forms.emailLayout` | `false` | `beforeEmail` with a layout (logo, colour, footer) + Site settings → **Emails** tab; `{{*:table}}` readable | `true` |
| `forms.beforeEmail` | none | your own e-mail changes (after the layout) | form-builder function |
| `forms.attachments` | off | **File** field in the form builder; a file is checked (size, count, type by content, refused extensions), attached to the company e-mail and dropped — **never stored**; adds `POST /api/ipal/forms/submit`, the fields `submissionFiles` / `filesDelivery` / `filesDeliveryNote` / `attemptKey` on `form-submissions`, and the **Files** texts in Form messages | `true` / `FormAttachmentsOption`: `maxSizeMB` (10), `maxTotalMB`, `maxFiles` (3), `fileTypes`, `allowRisky`, `scan` (antivirus hook — none built in), `strictPdf`, `notice`, `maxConcurrent` (2), `path`, `submit` (`maxPerMinute`, `clientIp`, `honeypotField`, `turnstileHostnames`, `turnstileOnConfigError`, `allowedOrigins`, `idleTimeoutMs`, `timeoutMs`); block only: `forms.fields.file: false` or `buildFileBlock(…)`. Postgres: `migrate:create`. Check: submit a PDF → attached to the company e-mail, absent from the customer e-mail, submission shows *File delivery: Handed to the mail server* (forms.md "Files") |
| `forms.consentFieldName` | `'consent'` | name of the GDPR consent field `submitForm` requires (read from `config.custom.ipal`) | `createSubmitAction({ consentFieldName })` / `submitForm` argument wins |
| `consentLog` | off | `consent-records` collection + `POST /api/ipal/consent` (rate limit 20/min) | `true` / `{ retentionDays }` (default 1095) |
| `consentLog.collectionOverrides` | none | changes `consent-records`: an object merges `access` / `admin` / `hooks` key by key (your keys win), a function `(collection) => collection` takes over (keep the slug) | e.g. `{ access: { read: ({ req }) => req.user?.email === 'dpo@acme.pl' } }` — narrows who reads records in a project without roles |
| `doctor` | on (404 until `IPAL_DOCTOR_TOKEN` is set) | `GET /api/ipal/doctor` — read-only counts for `ipal-doctor --url` (users without TOTP, cookies waiting for approval, versions); Bearer token ≥ 32 characters, rate-limited, never names or values | `false` = no endpoint; `{ tokenVar, access }` (doctor.md) |
| `cookieScanner` | off | `cookie-review` collection, "Scan cookies" box above its list (`CookieScanButton`), `GET`/`POST /api/ipal/cookie-scan`, and (unless `approval: false`) the *Approve cookies* view `/admin/cookie-approval` (`CookieApprovalView`) + `GET`/`POST /api/ipal/cookie-approval` + the dashboard reminder; a scan lists the cookies of the integrations switched on + names looked up in the bundled Open Cookie Database; one **Approve and add** puts the ticked cookies into Cookies → Cookie list (so `<CookieTable>` and the detailed window); never deletes, never overwrites edited text, never duplicates, nothing reaches the banner before approval | `true` / object; after switching on: `pnpm generate:importmap` + `migrate:create`. Check: *Privacy → Cookie review* → **Scan cookies** → "Waiting for approval: N" → **Review and approve** → **Approve and add** → the cookies are in Cookies → Cookie list (cookie-scanner.md) |
| `cookieScanner.adminLayout` | `'combined'` | one *Cookies* entry: *Review and approve* and (with `crawl`) *Site check* tabs on the `cookie-settings` global (`ui` fields, `CookieReviewTab` / `CookieSiteCheckTab`); `cookie-review` and `cookie-crawl` get `admin.group: false` (out of the nav, pages and API kept) | `'separate'`; no migration, `generate:importmap` |
| `fillEmptyLocales` | on | afterChange hooks: text saved in one language fills the empty languages of `cookie-settings` `cookies.purpose` / `cookies.duration` and `cookie-review` `purpose` / `retention`; never overwrites a language's own text | `false`; `{ 'cookie-settings': [...], 'cookie-review': [...] }` (`[]` = off); check: add a cookie in Polish, switch the locale to English → same purpose |
| `cookieScanner.approval` | on | `false` = per-entry review only (no view, endpoint or reminder); `{ unknownCategory, dashboard }` — category for cookies nothing knows (default `'marketing'`, must need consent), dashboard reminder | adds `change` + `needsDescription` to `cookie-review` → `migrate:create` when upgrading |
| `cookieScanner.declarations` / `.integrations` | built-ins only | the project's own cookies (`CookieDeclaration[]`), or `(defaults) => CookieIntegration[]` to add / change / drop integrations (`key`, `label`, `declarations`, `isEnabled(ctx)`) | e.g. a chat widget on when `ctx.integrations.chatId` is filled |
| `cookieScanner.access` / `.collectionOverrides` / `.labels` | editor+ / none / `en` + `pl` | who may scan; changes `cookie-review` like `consentLog.collectionOverrides`; admin labels per language (`CookieScanLabels`) | object or function |
| `cookieScanner.crawl` | off | browser pre-consent check through the shared scanner service (`services/cookie-crawler`, Coolify): **Check site** in the review box, `cookie-crawl` global (latest result only), `GET`/`POST /api/ipal/cookie-crawl`, `POST /api/ipal/cookie-crawl/results` (token), `violation` / `violationDetail` / `seenBeforeConsent` on `cookie-review`, `CookieCrawlAlert` on the dashboard, e-mail to *Cookie check → Warning e-mails to* | `true` / `CookieCrawlOptions`; env `IPAL_COOKIE_SCAN_URL` + `IPAL_COOKIE_SCAN_TOKEN`; `generate:importmap` + `migrate:create`. Check: the review box's **Check site** is enabled → click → "Last crawl …" with counts; `curl -X POST -H "Authorization: Bearer $IPAL_COOKIE_SCAN_TOKEN" $U/api/ipal/cookie-crawl` → 202 |
| `cookieScanner.crawl.serviceUrl` / `.token` / `.siteUrl` / `.maxPages` / `.acceptSelector` | env URL / env token / `serverURL` → `NEXT_PUBLIC_SERVER_URL` / `20` / `[data-ipal="accept"]` | where the service is, the shared secret, the public origin crawled and called back, pages from the sitemap (max 100), the banner's accept button | options win over env |
| `cookieScanner.crawl.consentMode` / `.trackerHosts` / `.dashboard` / `.globalOverride` | `'advanced'` / `DEFAULT_TRACKER_HOSTS` / `true` / none | `'basic'` also flags Google tag requests before consent; hosts counted as trackers; dashboard warning; changes the `cookie-crawl` global like `globalOverrides` | `(defaults) => [...defaults, 'chat.example']`; `dashboard: false` |
| `cookieScanner.database` / `.databaseCategories` / `.syncAccepted` | `true` / Functional+Personalization → functional, Security+Necessary → necessary / `true` | Open Cookie Database lookup on or off; category map; accepting writes to Cookie banner | `database: false`; `{ Functional: 'necessary' }`; `syncAccepted: false` |
| `theme.storageKey` | `'theme'` | localStorage key of the visitor's light / dark choice (next-themes uses the same key — set your own to keep them apart); via `config.custom.ipal.themeStorageKey` → `getSiteShell().theme.storageKey` → `ThemeScript` → `<html data-theme-storage>` → `useTheme` / `ThemeSwitcher`. An old `ipal-theme` choice moves before the first paint | `{ storageKey: 'acme-theme' }`; check: DevTools → Application → Local storage shows the key after a switch |
| `stats` | off | `stats-visits` collection, `POST /api/ipal/hit`, `/<admin>/stats` view, nav link, dashboard chart | `true` / object |
| `stats.collectionOverrides` | none | changes `stats-visits` like `consentLog.collectionOverrides`; its `access.read` also decides who sees the stats view and dashboard chart | object or function |
| `stats.retentionDays` / `timeZone` / `dashboard` | 90 / `'Europe/Warsaw'` / `true` | retention, day boundary, `StatsWidget` | `dashboard: false` hides the chart |
| `indexNow` | `false` | `afterChange` hook (publish → IndexNow, production + https only) in the `pages.slug ?? 'pages'` collection and each one from `content` | `true` + `indexnow-key.txt` route |
| `lightbox` | `false` | **Image viewer** group in the Form messages global (`notifications`) (image viewer labels: open, dialog, previous, next, close, counter — localized); read by `getNotificationTexts(...).lightbox` / `getSiteShell().lightboxTexts`. Postgres: `migrate:create` | omit = English fallbacks + the `texts` prop; `lightboxNotificationFields` for your own global; `globalOverrides.notifications` |
| `siteSettingsFields` | none | **More** tab in Site settings | `Field[]` |
| `integrationsFields` | none | **More** tab in Site integrations | `Field[]` |
| `globalOverrides` | none | changes the plugin's globals (`site-settings`, `site-integrations`, `cookie-settings`, `notifications`): an object merges `access` / `admin` / `hooks` key by key (your keys win, your hooks run after the plugin's), other keys replace; a function `(global) => global` takes over | e.g. `{ notifications: { access: { update: authenticated } } }`; the way to change the plugin globals' access or hooks |
| `revalidatePath` | none | `revalidatePath` from `next/cache` (injected): saving any plugin global revalidates the whole layout (`buildGlobalRevalidateHook`) | omit = globals change after the ISR window; once: `context: { disableRevalidate: true }` |
| `enabled` | `true` | `false` → collections, globals and fields stay (schema and migrations unchanged), but no plugin endpoints (`/api/ipal/*`), no `onInit` work and no admin components; `i18n` is validated anyway | `false`; check: `payload migrate:create` after switching produces no DROP TABLE |

## 2. What the plugin adds by itself

| element | what | controlled by | turning off today |
|---|---|---|---|
| auth collection (`users`) | `{ slug, auth: true, useAsTitle: 'email' }`, when the project has none (slug: `access.authCollection` → `twoFactor.collectionSlug` → `admin.user` → `'users'`); with `access`: create/delete/unlock admin only, read/update admin or self | `access.authAccess`; your own collection with that slug | yours wins |
| `forms`, `form-submissions` | form-builder + ipal blocks `step`, `checkboxGroup`, `time` | `forms` | omit `forms` |
| `consent-records` | proof of consent (id, choices, policy version; `consentLog.collectionOverrides`) | `consentLog` | off by default |
| global `cookie-crawl` | latest browser crawl (status, counts, violations, third-party hosts) + e-mail recipients; read editor+, update admin | `cookieScanner.crawl` (`globalOverride`) | off by default |
| `cookie-review` | cookie scanner entries (`status` draft / accepted / rejected, `change` new / changed / gone, `needsDescription`; create/read/update editor+, delete admin) | `cookieScanner` | off by default |
| view `/admin/cookie-approval` | *Approve cookies*: everything waiting, grouped by category, one **Approve and add** | `cookieScanner.approval` | `approval: false` |
| `stats-visits` | visits without IP (admin reads/deletes; `stats.collectionOverrides`) | `stats` | off by default |
| global `site-settings` | General, Theme, [System pages], [E-mails], [Maintenance], Search engines, [More]; public read, write editor+ | `pages`, `content`, `forms.emailLayout`, `searchSettings` / `seo.searchSettings`, `siteSettingsFields` | always present; access/hooks/fields: `globalOverrides` |
| global `site-integrations` | Analytics, Turnstile, SMTP, IndexNow, [More]; admin only | `integrationsFields` | always present; `globalOverrides` |
| global `cookie-settings` | banner texts, categories, cookie list; public read, write editor+ | `globalOverrides` | always present; `globalOverrides` |
| global `notifications` | form messages per language; public read, write editor+ | `globalOverrides` | always present; `globalOverrides` |
| global revalidation hook | `afterChange` on the four globals → `revalidatePath('/', 'layout')` | `revalidatePath` | omit `revalidatePath` |
| `POST /api/ipal/test-email` | SMTP/Graph test (admin only); body `{ to, attachmentMB? }` — `attachmentMB` attaches a dummy file to measure the mail server's size limit | — | **currently always** |
| `POST /api/ipal/forms/submit` | a panel form **with files** posts here (multipart, read as a stream; same gates as `sendForm`); same-origin only | `forms.attachments` (`path`, `submit`) | off by default |
| `POST /api/ipal/consent` | saves consent | `consentLog` | off by default |
| `POST /api/ipal/hit` | page view for stats | `stats` | off by default |
| `GET`/`POST /api/ipal/cookie-crawl`, `POST /api/ipal/cookie-crawl/results` | crawl status / start (editor+ or bearer token) / the scanner service's callback (token, running job only) | `cookieScanner.crawl` | off by default |
| `GET`/`POST /api/ipal/cookie-approval` | the approval list (`?locale=`) / approve (`{ ids? }`), editor+ | `cookieScanner.approval` (`access`) | `approval: false` |
| `GET`/`POST /api/ipal/cookie-scan` | integrations a scan covers / run a scan (`{ names? }`), editor+ | `cookieScanner` (`access`) | off by default |
| `localization` | from `i18n` | `i18n` | **currently always** |
| `routes.admin` | from `adminRoute` | `adminRoute` | — |
| `beforeChange` meta auto-fill hook | in `seo.collections` | `seo.autoFill` | `autoFill: false` |
| `afterChange` IndexNow hook | pages + content | `indexNow` | off by default |
| `onInit` | Cookie banner button migration + log `[ipal] Plugin initialized.` (your `onInit` runs first) | — | **currently always** |

**Import map** (`@intecion/ipal-kit/admin#…`) — after every option change: `pnpm generate:importmap`
(`pnpm payload generate:importmap`), otherwise the panel is blank / a component is missing.

| component | where | condition |
|---|---|---|
| `AdminLogo`, `AdminIcon` | `graphics.Logo/Icon` | `whiteLabel` |
| `IntecionCredit` | `afterLogin`, `afterNavLinks` | `whiteLabel` and `credit !== false` |
| `StatsNavLink`, `StatsView` (`views.ipalStats`, `/stats`), `StatsWidget` (`beforeDashboard`) | nav, view, dashboard | `stats` (`dashboard: false` without the widget) |
| `CookieScanButton` | `beforeListTable` of `cookie-review` (with **Check site** when `crawl` is on) | `cookieScanner` |
| `CookieReviewTab`, `CookieSiteCheckTab` | `ui` fields in the `cookie-settings` tabs | `cookieScanner` with `adminLayout !== 'separate'` (Site check: `crawl`) |
| `CookieApprovalView` (+ client `CookieApprovalForm`) | `views.ipalCookieApproval`, path `/cookie-approval` | `cookieScanner` and `approval !== false` |
| `CookieCrawlAlert` | `beforeDashboard` | `cookieScanner` with `approval.dashboard !== false` ("Waiting for approval"), or `crawl` with `dashboard !== false` |
| `IntegrationAlerts` | `beforeDashboard` | **currently always** (renders nothing when everything works) |
| `IntegrationStatusBanner` | UI field in the Site integrations tabs | always (with the global) |
| `MaskedField` | SMTP / Turnstile secrets | always |
| `TestEmailButton` | Site integrations → E-mail sending | always |
| `MetaDescriptionCheck` | below `meta.description` | `seo` and `descriptionCheck !== false` |
| `FaviconCheck` | below Site settings → Site icon (`afterInput`) | always (with the global); remove with a `globalOverrides['site-settings']` function |
| `RowLabel` | array row labels (Cookie banner categories and cookie list; your own `rowLabel(...)`) | always |

## 3. What the project wires itself

Mandatory set: AGENT.md §0b, skill **ipal-setup**; checks: **ipal-audit**, **ipal-seo-check**, **ipal-doctor** (`pnpm exec ipal-doctor` — the whole site against the team standard; `ipal-doctor.json` silences a rule with a reason; the pages may sit in any route group — `layout.frontend` names it when two qualify; docs/doctor.md).
`$U` = `NEXT_PUBLIC_SERVER_URL` (e.g. `http://localhost:3000`).

| element | file | minimal example | how to check | details |
|---|---|---|---|---|
| plugin | `src/payload.config.ts` | `plugins: [ipalKit({ i18n: i18nConfig, access: { authCollection: 'users' }, twoFactor: { issuer, plugin: payloadTotp }, … })]` | `pnpm dev` → log `[ipal] Plugin initialized.` | PROGRAMISTA §2.3 |
| languages | `src/i18n.config.ts` | `export const i18nConfig = { defaultLocale: 'pl', locales: [{ code: 'pl', label: 'Polski' }] } as const satisfies I18nConfig` | `curl -sI $U/` → 3xx to `/pl` | i18n.md |
| proxy | `src/proxy.ts` | `export const proxy = createProxy(i18nConfig, { NextResponse, markdown: true })` + `export const config = { matcher: ['/((?!api\|admin\|_next\|.*\\..*).*)'] }` (a literal!) | `curl -sI $U/` → `/pl`; `curl -s -H 'Accept: text/markdown' $U/pl` → Markdown | i18n.md, PROGRAMISTA §2.6 |
| proxy (Next 15 / custom) | `middleware`/`proxy.ts` | `createLocaleMiddleware({ config, … })` (`/next/middleware` or the main entry) | as above | i18n.md |
| env validation | `src/instrumentation.ts` | `if (process.env.NEXT_RUNTIME === 'nodejs') assertEnv(ipalEnvRules({ storage: true, ipHeader: true, databaseName: true }))` from `@intecion/ipal-kit/env` | remove a variable → startup fails with the list of missing ones; a database not named `<domain>_prod`/`_dev` → a warning | env.md, deployment.md §4.2a |
| Next config | `next.config.ts` | `withPayload(withSecurityConfig({ images: buildImagesConfig(), htmlLimitedBots: /Googlebot\|Bingbot…/i, headers: async () => [{ source: '/:path*', headers: buildSecurityHeaders({ hsts, csp }) }, { source: '/admin/:path*', headers: buildAdminCspHeaders(csp) }, ...buildUploadSecurityHeaders()] }))` | `curl -sI $U/pl \| grep -iE 'x-content-type\|strict-transport\|x-powered-by'` (no `x-powered-by`) | security.md, storage.md, PROGRAMISTA §2.9 |
| CSP | `next.config.ts`, `src/app/api/csp-report/route.ts` | `csp = { mode: 'report-only', reportUri: '/api/csp-report', r2Url, <flags> }` in `buildSecurityHeaders` + `buildAdminCspHeaders`; route `export const POST = createCspReportRoute()`; after clean reports `mode: 'enforce'` | `curl -sI $U/pl \| grep -i content-security-policy-report-only`; browser console and `[csp]` log lines without violations | security.md |
| data / routes | `src/lib/content.ts` | `export const { … } = createContentHelpers({ config, content, i18n: i18nConfig, baseUrl, markdownAlternate: true, summaryField: 'aiSummary', mcp: { serverName } })` | `pnpm tsc --noEmit` | frontend.md, PROGRAMISTA §2.7 |
| layout | `app/(frontend)/[locale]/layout.tsx` | `const shell = await getSiteShell(locale)`; `<SiteProviders shell={shell} logEndpoint="/api/ipal/consent" banner={<CookieBanner equalChoice settings="detailed" />} theme stats>` | HTML: `<script type="application/ld+json">` (WebSite+Organization), cookie banner | frontend.md, consent.md |
| theme | layout | `<SiteProviders theme>` (or `<ThemeScript {...shell.theme} />` from `/rsc`), `<html suppressHydrationWarning>`; switcher `<ThemeSwitcher>` (`/client`) | `data-theme` on `<html>` before hydration | theme.md |
| catch-all | `app/(frontend)/[locale]/[[...slug]]/page.tsx` | `export const revalidate = 3600`; `const route = createPageRoute(content, { blocks, notFound, permanentRedirect, blockProps })`; `export default route.Page`; `generateMetadata`, `generateStaticParams` | `curl -s $U/pl/<slug>` 200; change the slug → the old one gives 308 | frontend.md, pages.md |
| 404 | `[locale]/not-found.tsx` + `notFoundView.ts` | `export default createNotFoundPage(content, { load: loadNotFoundView })`; `'use server'` `renderNotFoundView(content, { blocks }, locale)` | `curl -sI $U/pl/xyz` → 404 with content from System pages | pages.md |
| sitemap | `app/sitemap.xml/route.ts` | `export { sitemapRoute as GET } from '@/lib/content'` + `dynamic = 'force-dynamic'` (or `sitemap.ts` with `sitemap` — never both; only `sitemapRoute` splits a large site into a `<sitemapindex>` with `?part=N` parts above 10 000 URLs) | `curl -s $U/sitemap.xml` (hreflang, XSL style); `curl -sI` → `Cache-Control: public, max-age=0, s-maxage=3600…`; a database error → 503 + `Retry-After` | seo.md |
| robots | `app/robots.ts` | `export { getRobots as default } from '@/lib/content'` + `force-dynamic` (AI crawler policy from Site settings → Search engines); `robots` (sync) ignores the panel | `curl -s $U/robots.txt` (Sitemap:, AI bots, `User-agent` groups from the panel) | seo.md |
| manifest | `app/manifest.ts` | `export { manifest as default }` + `force-dynamic` | `curl -s $U/manifest.webmanifest` | seo.md |
| llms | `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` | `export { llmsRoute as GET }` / `llmsFullRoute` + `force-dynamic` | `curl -s $U/llms.txt` | seo.md |
| Markdown | `app/md/[locale]/[[...slug]]/route.ts` | `export { markdownRoute as GET }` + `force-dynamic` | `curl -s $U/md/pl` | content.md |
| MCP | `app/api/mcp/route.ts` | `export { mcpGET as GET, mcpPOST as POST }` + `force-dynamic` | `curl -s -X POST $U/api/mcp -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'` | mcp.md |
| health | `app/api/health/route.ts` | `export { healthRoute as GET }` + `force-dynamic` | `curl -s $U/api/health` → `"status":"ok"` (503 on a database error) | deployment.md |
| IndexNow key | `app/indexnow-key.txt/route.ts` | `export { indexNowKeyRoute as GET }` + `force-dynamic` | `curl -s $U/indexnow-key.txt` = the key | seo.md |
| search (optional) | `app/api/search/route.ts` | `export const GET = createSearchRoute({ getCachedPayload, config: i18nConfig, baseUrl, isPathVisible })` (`isPathVisible` from `@/lib/content` — hides pages under construction) | `curl -s "$U/api/search?q=test&locale=pl"` | content.md |
| Pages | `src/collections/Pages.ts` | `buildSlugField({ from: 'title' })`, `buildNoindexField()`, `buildSummaryField()`, `slugHistory` field + `trackSlugHistoryHook`, `buildRevalidateHook({ revalidatePath, config })` → `afterChange`/`afterDelete` | edit in the panel → the page refreshes without a deploy | slug.md, hooks.md, seo.md |
| Pages — protection | as above | `beforeDelete: [buildPreventDeleteSystemPage({ settingsSlug: 'site-settings' })]`; `setPublishedAtHook`, `buildCrossLocaleFieldSync(...)` as needed | delete the homepage → error | hooks.md |
| Media | `src/collections/Media.ts` | `upload: { focalPoint: true }`, `hooks.beforeOperation: [normalizeFilenameHook, buildOptimizeUploadHook(), buildMediaPlaceholderHook()]`, fields `buildOptimizeUploadField()`, `buildMediaPlaceholderField()`, `alt` | upload `Zdjęcie Ś.JPG` → `zdjecie-s.jpg`, placeholder in the document | media.md |
| image lightbox (optional) | layout + blocks | `lightbox: true` in `ipalKit`; `<SiteProviders shell lightbox>`; `<LightboxTrigger group image={lightboxImage(media, { size: 'hero' })}>` around the thumbnail (`/client`); `<RenderRichText lightbox>` | keyboard: Tab to a thumbnail, Enter → dialog with focus on Close, ←/→, Esc → focus back; Network: a resized file on a phone | lightbox.md |
| image on the frontend | `Media` primitive | `<Image {...mediaImageProps(media, { sizes })} />`, video `videoProps` | blur before load | media.md |
| storage | `payload.config.ts` | `buildR2Storage(['media'], { s3Storage })` — always (without `R2_*` = local disk) | upload → URL from `R2_PUBLIC_URL` | storage.md |
| e-mail | `payload.config.ts` | `email: mailAdapter()` (SMTP from the panel / Graph from env; also `panelSmtpAdapter`, `graphAdapter`, `sendEmail` from `/server`) | Site integrations → E-mail sending → **Send test** | email.md |
| forms — action | `app/(frontend)/[locale]/actions.ts` | `'use server'`; `export const sendForm = createSubmitAction({ getCachedPayload, headers })` (`/server`) | submit → document in Form Submissions + e-mails | forms.md, skill **ipal-form** |
| forms — files | config + panel | `forms: { attachments: true }`; a **File** field on the form; an e-mail with fixed recipients in Forms → E-mails; `mailAdapter({ graph: { largeAttachments } })` when Graph must stay under 3 MB; Azure: `Mail.ReadWrite` limited to the forms mailbox for files of 3 MB and more over Graph | Test e-mail with "Attach a 10 MB test file" arrives; a submission with a PDF arrives with the attachment; nothing in Media | forms.md "Files", email.md "Attachments" |
| forms — render | form block | `<RenderForm form={form} action={sendForm} locale={locale} texts={formTexts} classNames={formClasses} />` (`/rsc`) | form from the panel, Turnstile, message from Notifications | forms.md |
| Turnstile | panel / env | `SiteProviders` wires `TurnstileProvider`; keys in Site integrations → Spam protection or env; server: `verifyTurnstile` (`/server`) | widget in the form; dashboard alert on a bad key | turnstile.md |
| consent | layout + policy page | banner via `SiteProviders`; table `<CookieTable rows={…} labels={…} />` (`/rsc`) from `getCookieTable` | `ipal-consent-check`; delete the consent cookie → the banner comes back | consent.md |
| cookie crawl | config + env + service | `cookieScanner: { crawl: true }`, `IPAL_COOKIE_SCAN_URL` / `IPAL_COOKIE_SCAN_TOKEN`, site in the service's `IPAL_CRAWLER_SITES`; optional Coolify scheduled task `curl -X POST -H "Authorization: Bearer $IPAL_COOKIE_SCAN_TOKEN" $U/api/ipal/cookie-crawl` | **Check site** → "Last crawl …: N pages, N violations"; *Privacy → Cookie check* | cookie-scanner.md → Browser crawl |
| cookie list | config | `cookieScanner: true` (+ `declarations` for embeds/chat), `generate:importmap`, `migrate:create` | *Cookie review* → **Scan cookies** → **Review and approve** → **Approve and add** → Cookies → Cookie list; `<CookieBanner settings="detailed">` and `<CookieTable>` list it | cookie-scanner.md |
| proof of consent | config + layout | `consentLog: true` + `logEndpoint="/api/ipal/consent"` | after a click, a document in Consent Records | consent.md |
| stats | config + layout | `stats: true` + `<SiteProviders stats={{ locale }}>` (or `<PageStats locale />` inside `ConsentProvider`) | `/<admin>/stats`; `POST /api/ipal/hit` request in Network | stats.md |
| analytics | layout | `SiteProviders` wires `Analytics` (ID from Site integrations → Analytics); Consent Mode: `analytics={{ consentMode: 'basic' }}` = no request to Google before consent, default `'advanced'` = the Google tag loads at once with every signal `denied` | Meta/other pixels only after consent; in `basic` no `gtm.js` / `gtag/js` in Network before consent | analytics.md, gtm-meta-pixel.md |
| extra JSON-LD | layout / `lib/content` | `jsonLd={[buildNavigationJsonLd(…)]}`; `siteJsonLd` → `buildLocalBusinessJsonLd` | Rich Results Test | seo.md |
| links and navigation | components | `buildLinkField`/`buildLinksField` in fields; `resolveNav`, `resolveLink`, `getSystemLinks` | a menu link still works after a slug change | links.md, skill **ipal-nav** |
| block library (schema) | `src/blocks/configs.ts` → `Pages.layout` | `export const blockOptions = { hero: true, textMedia: true, featureGrid: true, cta: true, richText: true, faq: true, contact: true, gallery: true } satisfies LibraryBlocksOptions`; `blocks: [...libraryBlocks(blockOptions), ...ownBlocks]` (`/blocks`) | block picker in en/pl; `pnpm generate:types`, `generate:importmap`; Postgres/SQLite `migrate:create` | block-library.md |
| blocks (registry) | `src/blocks/registry.ts` | `createBlockRegistry(content, { Image, Link, sendForm, formClassNames, contactDetails?, extra: { own: Own } })` (`/blocks/rsc`; `Image`/`Link` from `next/image`/`next/link`) → `blocks` for `createPageRoute`; own blocks use `buildSectionHeaderField`, `buildSectionSettingsField`, `buildItemsField` | every section has `data-ipal-block`; one `h1` per page | block-library.md, blocks.md, skill **ipal-block** |
| page templates | `scripts/seed-content.ts` | `pageTemplates.home({ blocks: libraryBlockSlugs(blockOptions) })`, `pageTemplates.contact({ form: { $form: 'Contact form' } })` (`/templates`); after launch only with `SEED_ONLY` | seed summary 0 errors | block-library.md, seeding.md |
| FAQ rich results | page route | `getPageJsonLd(locale, slug, { faq: faqItemsFromLayout })` | Rich Results Test → FAQPage | block-library.md, seo.md |
| languages in the header | header | `<LanguageSwitcher>` (`/client`), `<AlternateLinksUpdater>` | switches to `/en/<slug-en>` | i18n.md |
| Tailwind + design tokens | `styles.css`, `src/design/tokens.ts`, `DESIGN.md` | `@import` `fluid-wide.css` (or `fluid.css`), `tokens.css`, `tailwind.css`, `../../design/tokens.css` + `@source "…/node_modules/@intecion/ipal-kit/dist/**/*.js";`; `pnpm exec ipal-tokens`; next/font `--font-family-body` / `--font-family-heading` | `ipal-tokens --check` up to date, no ✗ contrast rows; the cookie banner in the brand colour in both themes | design-tokens.md |
| a11y widget CSS | `styles.css` | `@import "@intecion/ipal-kit/a11y.css";` (only with `<AccessibilityWidget>`) | widget options change the page | accessibility.md |
| `/its` panel | `app/(payload)/its/…` | `adminRoute: '/its'` + `its` in the proxy matcher | `/its` login, `/admin` 404 | security.md |
| skills | `package.json` | `"ipal:skills": "ipal-skills"` | `.agents/skills/` up to date | PROGRAMISTA §2.1a |
| a new site | CLI (from the parent folder) | `pnpm --config.auto-install-peers=false dlx @intecion/ipal-kit@<version> create <domain> [--answers answers.json] [--dir] [--external] [--no-install] [--no-git] [--dry-run]`; in a project: `pnpm exec ipal-kit create <domain> --dir ../<name>-web`. Building blocks: `@intecion/ipal-kit/starter` (resources/api.md) | one commit, `AGENTS.md` decisions filled, `pnpm typecheck` passes | project-starter.md |
| eject a library block | CLI | `pnpm exec ipal-blocks list` / `pnpm exec ipal-blocks eject faq [--dest src/blocks] [--dry-run]` → `src/blocks/Faq/`; then the ejected builder in `blockOptions`' place and `components: { faq: FaqBlock }` | the block renders from the project file | block-library.md "Own blocks and eject" |

**`createContentHelpers` keys (exports of `@/lib/content`)** — all lazy and cached per request:

| key | use |
|---|---|
| `getCachedPayload` | `await getCachedPayload()` — Local API (actions, routes) |
| `getSettings(locale)` | Site settings (`depth: 1`: relations as documents, theirs as ids; `settingsDepth` option changes it) |
| `getConfiguredLocales()` | layout: `notFound()` for an unknown language |
| `resolveRoute`, `getEntries`, `getNotFoundPage`, `resolvePageRedirect` | your own page / archive instead of `createPageRoute` |
| `generatePageMetadata`, `generateStaticParams`, `getPageJsonLd` | used by `createPageRoute`; call by hand in your own pages |
| `getSiteShell(locale)` | layout → `SiteProviders shell` |
| `getFormTexts(locale)` | `blockProps` for forms |
| `getLinkOptions`, `getHomeSlug`, `resolveLink`, `resolveNav`, `getSystemLinks` | header, footer, CMSLink |
| `getConstructionMode` | under-construction mode (construction.md) |
| `isPathVisible(path, locale)` | `false` for a page construction mode hides; wired into `markdownRoute` and `mcpPOST` already, pass it to `createSearchRoute` |
| `sitemap`, `sitemapRoute`, `robots`, `getRobots`, `manifest`, `llmsRoute`, `llmsFullRoute`, `markdownRoute`, `mcpGET`, `mcpPOST`, `healthRoute`, `indexNowKeyRoute` | re-exports in `app/` (table above) |
| `i18n` | the `I18nConfig` passed in |

`createContentHelpers` options (`baseUrl`, `pagesSlug`, `settingsSlug`, `redirectCollections`, `markdown`,
`markdownAlternate`, `mcp`, `pageJsonLd`, `robots` (incl. `aiBotRules`), `settingsDepth`, `siteJsonLd`, `sitemapEntries`, `sitemapImages`, `sitemapOptions` (`maxUrls`, `cacheControl`, `memoSeconds`), `sitemapStyle`, `summaryField`, `underConstructionSeo`)
and what throws without `i18n`: frontend.md. `SiteProviders` props: `shell`, `banner`, `cookieButton`, `analytics`,
`cookieMap`, `jsonLd`, `logEndpoint`, `preconnect`, `stats`, `theme` — replace any part or set it to `false`.

## 4. Environment variables

`.env` in dev, the hosting runtime (Coolify) in production, `.env.example` without values in the repo. Validation: `ipalEnvRules(features)`.

| variable | required when | effect when missing | where to set |
|---|---|---|---|
| `DATABASE_URI` | always (Payload; `ipalEnvRules` always) | no database, startup fails | env (name: `databaseVar`); the database is named `<domain without dots>_prod` / `_dev` (`intecioncom_prod`), checked by `databaseName: true` |
| `PAYLOAD_SECRET` | always; ≥ 32 characters in production (`ipalEnvRules({ secretMinLength })`, default 32, `0` = off) | Payload does not start; `assertEnv` throws (also for a too-short secret in production) | env, different in prod (`secretVar`) |
| `NEXT_PUBLIC_SERVER_URL` | always (`kind: 'url'`) | sitemap/robots/canonical/JSON-LD/llms with origin `''` (relative), IndexNow does not send, R2 relative URL without a prefix | env (`serverUrlVar`) |
| `NODE_ENV` | no (`development`/`production`/`test`) | `production` is stricter: R2 and `IPAL_IP_HEADER` required, IndexNow works, IP warning, `buildImagesConfig` prod | set by Next / hosting |
| `R2_BUCKET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | `storage: true` + production, or when at least one is set (all or none) | local disk (in prod files disappear on redeploy); incomplete set → warning | env |
| `R2_PUBLIC_URL` | optional; required only with `ipalEnvRules({ storage: { requirePublicUrl: true } })` (then like the other `R2_*`); absolute URL in prod when set | empty (default) → media served by the app at `/api/media/file/…` (Media needs `access.read: () => true`); set it only for a media domain on Cloudflare (storage.md); `R2_PUBLIC_URL` alone in dev = media read-only; `/media` allowed outside prod; also used by `buildImagesConfig`, `MediaPreconnect`, CSP | env |
| `GRAPH_TENANT_ID`, `GRAPH_CLIENT_ID`, `GRAPH_CLIENT_SECRET`, `GRAPH_SENDER` | `emailGraph: true` / Graph transport in the panel | `mailAdapter` falls back to SMTP from the panel (logged) | env (agency Exchange) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | `turnstile: true` (names: `siteKeyVar`/`secretVar`) | fallback for keys from Site integrations → Spam protection; neither set → Turnstile off | panel (takes precedence) or env |
| `INDEXNOW_KEY` | no | key from Site integrations → IndexNow (generated) | env or panel |
| `IPAL_IP_HEADER` | `ipHeader: true` + production | rate limit trusts any IP header (spoofing) + warning in prod | env: `cf-connecting-ip` (Cloudflare) / `x-forwarded-for` (Traefik/nginx) |
| `IPAL_COOKIE_SCAN_URL`, `IPAL_COOKIE_SCAN_TOKEN` | `cookieScanner.crawl` (`ipalEnvRules({ cookieCrawl: true })` requires both in production; token ≥ 16 chars) | **Check site** disabled, the box names the missing variable | env; the token also goes into the scanner service's `IPAL_CRAWLER_SITES` as `host=token` |
| `IPAL_DOCTOR_TOKEN` | no; ≥ 32 characters | `GET /api/ipal/doctor` answers 404; with it the endpoint answers a Bearer token, and `ipal-doctor --url` with the same variable reads the deep counts | env (Coolify) and the doctor's shell; also read by the doctor: `CI`, `NO_COLOR`, `PAYLOAD_CONFIG_PATH` (`--deep`), `IPAL_DOCTOR_IMPORT_MAP` (internal) — doctor.md |
| `IPAL_NOINDEX` | no; `1`/`true`/`yes` **staging/preview only** | — (when set: robots Disallow, meta noindex, `X-Robots-Tag`, IndexNow sends nothing) | staging env |
| `NEXT_PHASE` | set by Next | only tells `next build` from runtime: during the build an unreachable database gives an empty sitemap; at runtime the sitemap throws (route → 503) | do not set by hand |
| `NEXT_RUNTIME` | set by Next | `instrumentation.ts` checks for `nodejs`; missing (scripts, seed) → `buildRevalidateHook` does not revalidate | do not set by hand |

Details: env.md, deployment.md, PROGRAMISTA §3.

**DNS** (A/AAAA, www, CAA, Search Console TXT, Bing, SPF/DKIM/DMARC for the From domain, R2 domain): the plugin sets nothing — list of records to check with `dig`: `deployment.md` §6, summary in **ipal-setup** stage 11.

**Seeding** (content in pages, forms, globals) — **VERY IMPORTANT: after launch never re-seed everything; named records only** (`only` / `SEED_ONLY`; a full run of a live database needs the owner's OK and `IPAL_SEED_ALLOW_FULL=1`). Create-only, matched by a natural key, never delete, never seed users or secrets, dry run → backup → real run; updates on production only for untouched records and only with `IPAL_SEED_ALLOW_PROD_UPDATE=1`. Helper: `createSeeder` from `@intecion/ipal-kit/seed` (resources/api.md → Seeding), with `guardSeedExit()` called first (an early exit → exit 1 with the reason, never a silent 0). Templates: `ipal-site/resources/seed-content.template.ts`, `ipal-form/resources/seed-form.template.ts`. Rules and Coolify steps: `node_modules/@intecion/ipal-kit/docs/seeding.md`.

| Seed env var (run time) | Effect |
|---|---|
| `SEED_DRY_RUN=1` (or `--dry-run`) | no writes, print the plan |
| `SEED_UPDATE=1` | also update records nobody edited since seeding |
| `IPAL_SEED_ALLOW_PROD_UPDATE=1` | allow `SEED_UPDATE=1` on production / a non-local database (back up first) |
| `SEED_ONLY` | the records a run may touch (`pages:kontakt,global:header`) — required after launch |
| `IPAL_SEED_ALLOW_FULL=1` | allow a run without `SEED_ONLY` on production / a non-local database — owner's explicit OK only (in code: `createSeeder(payload, { guard: { allowFull: true } })`; `guard: false` turns every guard off) |
| `SEED_FORCE=1` | with `SEED_UPDATE=1`: overwrite edited records too — local database only |
| `SEED_LOCAL_HOSTS` | extra hosts that count as a local database (comma-separated) |
| `SEED_DB_URL_ENV` | name of the env var holding the database URL (default `DATABASE_URI`) |
| `SEED_UNTOUCHED_SECONDS` | "untouched" window for the timestamp check (default 120) |
| `SEED_HASH_FIELD` | hash field name (default `seedHash`; empty = timestamps only) |
| `SEED_NOTIFY_EMAIL` | form seed: notification address on a first run |
