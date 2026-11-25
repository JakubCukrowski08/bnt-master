# ipal-kit — export index

Every public export of `@intecion/ipal-kit` (all entries: root, `/client`, `/rsc`,
`/server`, `/seed`, `/starter`, `/next/middleware`, `/admin`, `/env`, `/blocks`, `/blocks/rsc`, `/templates`, `/tokens`, `/doctor`), grouped by module. Search with grep
(`grep -n "name" .agents/skills/ipal-reference/resources/api.md`) before you write anything yourself.
"Import from" column — the first entry is preferred. Plugin options, env, routes and what the
project wires: `../SKILL.md`. Module details: `node_modules/@intecion/ipal-kit/docs/<page>.md`.

## Plugin (`plugin`, `types`) — details: `node_modules/@intecion/ipal-kit/docs/dev/PROGRAMISTA.md`

| Export | Import from | What it does / when |
|---|---|---|
| `ipalKit(options)` | `@intecion/ipal-kit` | Payload 3 plugin (`plugins: [ipalKit({...})]`) — the only wiring point: adds globals (SiteSettings, SiteIntegrations, CookieSettings, Notifications), roles, enforced 2FA, SEO, forms, i18n (localization), white-label, stats, consent log, `/api/ipal/*` endpoints; no auth collection → injects a simple `users`. Validates `i18n` right away (fail fast). `enabled: false` = schema stays, behaviour off. |

**Types:** `IpalOptions` — `ipalKit()` options: `i18n`, `access`, `twoFactor` (`{ issuer, plugin: payloadTotp }` or `false`), `whiteLabel`, `adminRoute`, `consentLog`, `content`, `cookieScanner`, `forms`, `pages`, `seo`, `searchSettings`, `stats`, `indexNow`, `siteSettingsFields`, `integrationsFields`, `globalOverrides`, `revalidatePath`, `enabled`. `GlobalOverride`, `GlobalOverrides`, `IpalGlobalSlug` — see Payload globals below.

## Admin (import map) (`admin`, `branding`, `admin-ui`, `globals/SiteIntegrations`) — details: `node_modules/@intecion/ipal-kit/docs/white-label.md`, `…/docs/integrations.md`, `…/docs/email.md`, `…/docs/links.md`

Admin panel components from `@intecion/ipal-kit/admin` — the project does NOT import them; the plugin (or a helper) writes the path `@intecion/ipal-kit/admin#Name` into the config, and Payload resolves it through the import map.

| Export | Import from | What it does / when |
|---|---|---|
| `MaskedField` | `@intecion/ipal-kit/admin` | Masked text field (••••, Reveal button) for secrets in SiteIntegrations (SMTP password, R2 key, Turnstile secret) — masking in the UI only, not encryption. Injected by the plugin; you can also wire it to your own `text` field via `admin.components.Field`, then `pnpm generate:importmap`. |
| `TestEmailButton` | `@intecion/ipal-kit/admin` | "Send test e-mail" button in the SiteIntegrations e-mail tab — POST `/api/ipal/test-email` through the selected transport (SMTP/Graph), shows the result/error. Injected by the plugin — do not call. |
| `RowLabel` | `@intecion/ipal-kit/admin` | Array row title in the panel taken from the row content (e.g. "Fast delivery" instead of "Item 01"). Do not wire by hand — use `rowLabel()`; after adding, `pnpm generate:importmap`. |
| `AdminLogo` | `@intecion/ipal-kit/admin` | Server Component: large panel logo (login screen) from SiteSettings `logo`, fallback `siteName`. Injected by the plugin with `whiteLabel`; after turning the option on, `pnpm generate:importmap`. |
| `AdminIcon` | `@intecion/ipal-kit/admin` | Server Component: small panel nav icon from SiteSettings `favicon`, fallback initials. Injected by the plugin with `whiteLabel`; after turning the option on, `pnpm generate:importmap`. |
| `CookieReviewTab` | `@intecion/ipal-kit/admin` | Client: the *Review and approve* tab of *Cookies* — scan box + approval list inline (reloads after approving; waits while the form has unsaved changes) + link to the review entries. Injected by `addCookieScannerTabs` (combined layout); `pnpm generate:importmap`. |
| `CookieSiteCheckTab` | `@intecion/ipal-kit/admin` | Client: the *Site check* tab — start a check, status, latest violations, link to the warning e-mails. Injected with `crawl` in the combined layout. |
| `CookieApprovalView` | `@intecion/ipal-kit/admin` | Server Component: the *Approve cookies* view at `/admin/cookie-approval` — everything waiting, grouped by consent category, one **Approve and add**. Injected with `cookieScanner` (unless `approval: false`); after turning it on, `pnpm generate:importmap`. |
| `CookieApprovalForm` | `@intecion/ipal-kit/admin` | Client part of the view: tick boxes, markers (New / Changed / Needs description), Edit links, the button. Props `pending`, `gone`, `unknownCategory`, `labels?`, `adminRoute?` — reuse it in your own view. |
| `CookieCrawlAlert` | `@intecion/ipal-kit/admin` | Server Component: dashboard warning — "Waiting for approval: N" with a link to the approval view, and with the crawl violations or a failed crawl; renders nothing otherwise. Props `approval`, `crawl`. Injected with `cookieScanner` (`approval.dashboard: false` / `crawl.dashboard: false` drop its parts); after turning it on, `pnpm generate:importmap`. |
| `CookieScanButton` | `@intecion/ipal-kit/admin` | "Scan cookies" box above the *Cookie review* list: integrations in use, optional extra names, runs `POST /api/ipal/cookie-scan`. Injected by the plugin with `cookieScanner`; after turning it on, `pnpm generate:importmap`. |
| `SafeTotpView` | `@intecion/ipal-kit/admin` | Server admin view in front of the 2FA package's setup and verify views: replaces the `back` query value with a checked one and renders the view named by the serverProp `ipalTotpView` (a path or `{ path, exportName }`, found in the import map) the way Payload renders a view: a server component gets all server props, a client component only Payload's client props, `ipalTotpClientProps`, `back` and `searchParams` (both checked). `ipalSafeBack` = own rule. Registered by the plugin with `twoFactor` (`twoFactor.safeBack`, on by default). After upgrading, `pnpm generate:importmap`. Check: password only → `/admin/verify-totp?back=https%3A%2F%2Fexample.com%2F` → code → `/admin`. Own registration: `Component: { path: '@intecion/ipal-kit/admin#SafeTotpView', serverProps: { ipalTotpView: '<path>' } }` + that path in `admin.dependencies`. |
| `TotpRedirectProvider` | `@intecion/ipal-kit/admin` | Client admin provider: sends a user without TOTP to `/admin/setup-totp?back=…` and a user whose session has not passed TOTP to `/admin/verify-totp?back=…` (path read in the browser; never redirects away from those screens or logout; renders nothing while redirecting). Injected by the plugin with `twoFactor` in place of the package's header-based provider; swap with `twoFactor.provider`. After upgrading, `pnpm generate:importmap`. Check: a new admin lands on `setup-totp?back=%2Fadmin` with the QR code. Props type `TotpRedirectProviderProps` (`forceSetup`) |
| `TwoFactorStatusField` | `@intecion/ipal-kit/admin` | Server component, the `totpSetupStatus` UI field ipalKit adds to the 2FA collection (sidebar of an account): "Set up", "Not set up… until <date>" or "blocked", and for an administrator on someone else's account the reset / "Reopen setup" button. Wired by the plugin with `twoFactor.requireSetup`; needs `generate:importmap`. |
| `TwoFactorResetButton` | `@intecion/ipal-kit/admin` | Client button inside `TwoFactorStatusField`: `POST /api/ipal/two-factor/reset` `{ userId }`, then reloads the view. Props `{ kind: 'reset' \| 'reopen', userId }`. |
| `TwoFactorAlert` | `@intecion/ipal-kit/admin` | Server component on the dashboard (`beforeDashboard`), administrators only: accounts without two-step verification and how many are blocked. Wired by the plugin with `twoFactor.requireSetup`; renders nothing when every account has it. |
| `IntecionCredit` | `@intecion/ipal-kit/admin` | The line "Technology support: Intecion.com" (admin language; `agency` prop = the name) below the nav and below the login form (`variant: 'nav' \| 'login'`). Injected by the plugin with `whiteLabel`; turn off: `whiteLabel: { credit: false }` or `agency: false`. |
| `buildAdminMeta({ agency, apiRoute?, defaultLocale?, meta?, options? })` | `@intecion/ipal-kit` | The `adminMeta` step: static panel meta (robots, preview image, icon) without overwriting keys in `meta`; returns `{ meta, resolved }` |
| `adminMetaForSite(site, resolved)`, `syncAdminMeta(payload, resolved, { nameField?, settingsSlug? })` | `@intecion/ipal-kit` | Site-name parts (suffix, description, siteName); `syncAdminMeta` writes them into the live config (onInit + Site settings afterChange, never throws) |
| `buildAdminImageEndpoints(resolved, { settingsSlug?, nameField?, logoField?, iconField? })` | `@intecion/ipal-kit` | `GET /api/ipal/admin-og` (1200×630 PNG via `next/og`) and `GET /api/ipal/admin-icon` (the favicon itself, or initials) — already added by `adminMeta` |
| `DEFAULT_AGENCY`, `ADMIN_META_TEXTS` | `@intecion/ipal-kit` | Default agency `{ name: 'Intecion.com', url }`; en/pl meta texts (`{site}`, `{agency}`). Types `AdminMetaOptions`, `AgencyOption`, `ResolvedAdminMeta` |

## Readable array rows in the panel (`admin-ui`) — details: `node_modules/@intecion/ipal-kit/docs/links.md`

| Export | Import from | What it does / when |
|---|---|---|
| `rowLabel(fields, fallback = 'Item')` | `@intecion/ipal-kit` | Returns `{ RowLabel: { path, clientProps } }` to put in `admin.components` of an `array` field — the row shows the first non-empty path from `fields` (e.g. `'heading'`, `['name','link.label']`), otherwise "{fallback} 02". Use it in every array in the project; `buildLinksField` has it built in. Then `pnpm generate:importmap`. |

**Types:** `RowLabelProps` — props of the `RowLabel` component (`fields`, `fallback`).

## Roles and access (`access`) — details: `node_modules/@intecion/ipal-kit/docs/access.md`

| Export | Import from | What it does / when |
|---|---|---|
| `adminOnly` | `@intecion/ipal-kit` | Collection `Access`: `admin` role only. In `access.read/create/update/delete`. |
| `adminOrEditor` | `@intecion/ipal-kit` | Collection `Access`: `editor` or `admin`. Typical for content edited in the panel. |
| `adminOrSelf` | `@intecion/ipal-kit` | Collection `Access`: admin sees everything, a logged-in user only their own document (`Where` `id = user.id`), anonymous nothing. E.g. `users.read`. |
| `adminOrSelfIn(slug)` | `@intecion/ipal-kit` | `adminOrSelf` for the auth collection `slug`: only an account **of that collection** is "self"; an account of another auth collection gets nothing. Use it whenever the project has more than one auth collection (with numeric ids `adminOrSelf` would match customer no. 5 with staff account no. 5). The injected auth collection uses it. |
| `authenticated` | `@intecion/ipal-kit` | Collection `Access`: any logged-in user. |
| `requireRole(minimum)` | `@intecion/ipal-kit` | Collection `Access` factory: at least the given role (`'user' \| 'editor' \| 'admin'`). |
| `adminOnlyField` | `@intecion/ipal-kit` | `FieldAccess` (boolean only): field for admin only. In `field.access.read/update`. |
| `adminOrEditorField` | `@intecion/ipal-kit` | `FieldAccess`: field for editor or admin. |
| `requireRoleField(minimum)` | `@intecion/ipal-kit` | `FieldAccess` factory: at least the given role. |
| `hasMinimumRole(user, minimum, source?)` | `@intecion/ipal-kit` | Predicate → `boolean`: the user is an account of a **staff collection** and has a role ≥ `minimum` (reads `user.roles` and `user.collection` safely). A role on an account of another auth collection never counts. `source` says which collections are staff: `req.payload` on the server, the config from `useConfig()` in a client component, or `{ staffCollections: ['users'] }` (middleware). Without it: the staff collections of the config ipalKit built in this process (two different configs: only what both call staff) — and **`false` where there is none** (browser bundle, middleware, edge). Does not check the second factor. |
| `isAdmin(user, source?)` | `@intecion/ipal-kit` | Predicate → `boolean`: staff account with the `admin` role (see `hasMinimumRole`). In hooks and endpoints: `isAdmin(req.user, req.payload)`; in a client component: `isAdmin(user, config)`. |
| `isEditor(user, source?)` | `@intecion/ipal-kit` | Predicate → `boolean`: staff account with `editor` or higher. |
| `userMeetsRole(req, minimum)` | `@intecion/ipal-kit` | Predicate → `boolean` with `req` (`{ payload, user }`), in this order: the account belongs to a **staff collection** (`admin.user`, `access.authCollection`, `access.staffCollections`); with 2FA on it has passed the second factor (`secondFactorPassed`); it has a role ≥ `minimum`, **or** its collection has no `roles` field (the project omitted `access`). An account of any other auth collection never passes, whatever fields it has. The plugin's staff features (Site integrations, settings globals, form submissions, consent records, stats, cookie scanner, the e-mail test) use it; use it in your own endpoints. |
| `staffCollectionSlugs(source?)` | `@intecion/ipal-kit` | `string[]`: the staff collections — `admin.user`, `access.authCollection` and `access.staffCollections` — from `req.payload`, a config or `{ staffCollections }`; without an argument what the configs built in this process agree on (`[]` when there is none). Roles and staff checks count only for accounts of these. |
| `ROLE_HIERARCHY` | `@intecion/ipal-kit` | Constant `['user', 'editor', 'admin']` (lowest first) — a higher role meets the requirements of a lower one. The plugin injects the `roles` field into the auth collection (`access.authCollection`). |
| `buildRolesField(defaultRole?, { firstUserAdmin? })` | `@intecion/ipal-kit` | The `roles` select field the plugin injects (only admins set roles; `firstUserAdmin` default `true` = the account made on "Create first user" gets `admin`). The plugin wires it itself — use it only for an auth collection the plugin does not manage. |
| `injectRoles(config, accessOption)` | `@intecion/ipal-kit` | Adds `roles` to `accessOption.authCollection` in a config. The plugin calls it itself with `access` — do not call. |

**Types:** `VerifyLimitOptions` (`twoFactor.verifyLimit`: `{ max?, windowMinutes? }`), `RequireSetupOptions` (`twoFactor.requireSetup`), `TwoFactorResetOptions`, `TwoFactorSetupState`, `SafeBackRule` / `SafeBackContext` (`twoFactor.safeBack` as a function: `(back, { adminRoute, origin? }) => string`), `TotpViewComponent` (a view component as registered: a path or `{ path, exportName?, clientProps?, serverProps? }`), `SafeTotpViewProps` (`@intecion/ipal-kit/admin`), `Role` (`'user' \| 'editor' \| 'admin'`), `AccessOption` (the plugin's `access` option: `authCollection`, `defaultRole`, `authAccess`, `firstUserAdmin`, `staffCollections`).

## Accessibility — widget (`accessibility`) — details: `node_modules/@intecion/ipal-kit/docs/accessibility.md`

| Export | Import from | What it does / when |
|---|---|---|
| `AccessibilityProvider` | `@intecion/ipal-kit/client` | Accessibility preferences provider: holds state, saves the `a11y-prefs` cookie, sets `data-a11y-*` attributes on `<html>`. Wrap the layout once. The plugin ships no CSS — the project styles the attributes. |
| `AccessibilityWidget` | `@intecion/ipal-kit/client` | Floating button + options panel (text size, line height, contrast, grayscale, link underline, readable font, reduced motion, large cursor). Props `classNames`, `texts` (English by default — translate per locale). Inside `AccessibilityProvider`. |
| `useAccessibility()` | `@intecion/ipal-kit/client` | Hook → `{ state, set(key, value), reset() }` — for your own accessibility UI. Inside `AccessibilityProvider`. |
| `A11Y_COOKIE` | `@intecion/ipal-kit` | Preferences cookie name: `'a11y-prefs'` — read it in SSR to set attributes without a flash. |
| `A11Y_DEFAULT` | `@intecion/ipal-kit` | Default `A11yState` (everything off, `contrast: 'default'`, `textSize: 0`, `lineHeight: 0`). |
| `A11Y_DEFAULT_TEXTS` | `@intecion/ipal-kit/client` | Accessibility widget texts per language (`en`, `pl`); the widget's `locale` prop picks one, `texts` wins |
| `parseA11y(raw)` | `@intecion/ipal-kit` | Cookie value → `A11yState` (`A11Y_DEFAULT` on error). For SSR in the layout. |
| `serializeA11y(state)` | `@intecion/ipal-kit` | `A11yState` → JSON string for the cookie. |
| `a11yAttributes(state)` | `@intecion/ipal-kit` | `A11yState` → `{ 'data-a11y-*': string \| null }` (null = remove the attribute). To set attributes on `<html>` in SSR. |

**Types:** `A11yState` (root and `/client`) — preferences state; `A11yTexts`, `A11yClassNames` (`/client`) — `AccessibilityWidget` texts and classes.

## Analytics and pixels (`analytics`) — details: `node_modules/@intecion/ipal-kit/docs/analytics.md`

| Export | Import from | What it does / when |
|---|---|---|
| `getAnalyticsConfig(payload)` | `@intecion/ipal-kit` | Server: reads public tag IDs (GA4, GTM, Meta Pixel, Clarity, LinkedIn, TikTok) from SiteIntegrations, validates the format → `Promise<AnalyticsConfig>`; pass the result to `<Analytics>`. |
| `shouldLoadGoogle({ consentMode, ready, state })` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Pure consent gate (no React/DOM) → `boolean`: may the Google tag load now? `'basic'` waits for an analytics or marketing grant, `'advanced'` loads once `ready`. `<Analytics>` uses it; apply the same rule to your own Google-dependent code. |
| `Analytics` | `@intecion/ipal-kit/client` | Loads all configured tags respecting consent: Google through Consent Mode, the rest only after consent for the category (marketing / analytics). Props = `AnalyticsConfig` + `defer`, `deferTimeoutMs`, `consentMode` (`'advanced'` default: the Google tag loads at once with every signal `denied`; `'basic'`: no request to Google before analytics or marketing consent). Renders nothing; mount once inside `ConsentProvider`. Do not add tags by hand. |
| `pushDataLayer(event, params?)` | `@intecion/ipal-kit/client` | Pushes an event to the GTM `window.dataLayer` (SSR-safe, buffers before GTM loads). E.g. `form_submit` after a form is sent (`docs/gtm-meta-pixel.md`). |
| `loadMetaPixel(id)` | `@intecion/ipal-kit/client` | Low-level Meta Pixel loader (idempotent, PageView). `Analytics` calls it itself after marketing consent — call by hand only in unusual cases, and only after consent. |
| `loadClarity(id)` | `@intecion/ipal-kit/client` | Microsoft Clarity loader (analytics category). `Analytics` calls it itself — usually do not call. |
| `loadLinkedIn(partnerId)` | `@intecion/ipal-kit/client` | LinkedIn Insight Tag loader (marketing). `Analytics` calls it itself — usually do not call. |
| `loadTikTok(id)` | `@intecion/ipal-kit/client` | TikTok Pixel loader (marketing). `Analytics` calls it itself — usually do not call. |

**Types:** `AnalyticsConfig` (root) — tag IDs from SiteIntegrations; `AnalyticsProps` (`/client`) — `Analytics` props.

## Blocks and sections (`blocks`) — details: `node_modules/@intecion/ipal-kit/docs/blocks.md`

| Export | Import from | What it does / when |
|---|---|---|
| `RenderBlocks` | `@intecion/ipal-kit/rsc` | Server block renderer: `{ blocks, components, enhanceProps? }` — each block through a `blockType → component` map, skips unknown ones, no extra markup. Do not write your own loop over blocks. Nested blocks render their own `RenderBlocks` (do not pass the map as a prop). |
| `blockPosition({ allBlocks, index })`, `blockHasImage(data)` | `@intecion/ipal-kit` | `{ isFirst, firstImage }` for a block — first section (page `h1`) and "no earlier block shows an image" (LCP image); createPageRoute passes both, spread it in your own `enhanceProps`. |
| `buildSectionHeaderField(opts?)` | `@intecion/ipal-kit` | `header` field group (eyebrow, heading, intro — localized) for every section block; `interfaceName` `SectionHeaderData`. Options: `name`, `fields`, `interfaceName`. |
| `buildSectionSettingsField(opts?)` | `@intecion/ipal-kit` | `settings` group in the block sidebar: `anchor` (#id) + `background` (select, default Default/Muted/Inverted) + your own fields; instead of a per-block `bgColor`/`sectionId`. |

**Types:** `BlockData`, `BlockComponentMap`, `EnhanceProps`, `RenderBlocksProps` (`/rsc`) — block data, component map, props enhancer, renderer props; `SectionHeaderFieldOptions`, `SectionSettingsFieldOptions` (root) — options of the section field builders.

## Block library (`block-library`) — details: `node_modules/@intecion/ipal-kit/docs/block-library.md`

Fifteen ready blocks and ten page templates. **Use a library block (or a variant / options of one) before writing a block.**

| Export | Import from | What it does / when |
|---|---|---|
| `libraryBlocks(options, shared?)` | `@intecion/ipal-kit/blocks` | The blocks the project turned on, for `Pages.layout`: `{ hero: true, faq: { maxItems: 10 }, cta: (b) => b }`; nothing is on by default; `shared` = `{ localization, settings }` for every block. |
| `libraryBlockSlugs(options)` | `@intecion/ipal-kit/blocks` | Turned-on blocks with renamed slugs → `{ faq: 'faq', testimonials: 'reviews' }` — for `pageTemplates` (`blocks`) and the registry (`slugs`). |
| `LIBRARY_BLOCK_BUILDERS`, `LIBRARY_BLOCK_SLUGS` | `@intecion/ipal-kit/blocks` | Builder per slug; the 15 slugs in picker order. |
| `buildHeroBlock`, `buildTextMediaBlock`, `buildFeatureGridBlock`, `buildCtaBlock`, `buildRichTextBlock`, `buildFaqBlock`, `buildContactBlock`, `buildGalleryBlock`, `buildTestimonialsBlock`, `buildStatsBlock`, `buildStepsBlock`, `buildLogosBlock`, `buildTeamBlock`, `buildPricingBlock`, `buildEntryListBlock` | `@intecion/ipal-kit/blocks` | One block each, `(options?: BlockOptions) => Block`. Options: `slug`, `interfaceName`, `labels`, `admin`, `custom`, `fields` (array or `(defaults) => fields`), `variants` (subset / own / `false`), `header`, `links`, `settings` (`false` drops header / links), `maxItems`, `localization` (`'fields'` / `'layout'`), `thumbnail`. Extra: featureGrid `icons`, testimonials `collection`, entryList `collections`, contact `formsCollection`. |
| `buildItemsField`, `buildMediaField`, `buildVariantField`, `buildIconField`, `buildContentField`, `columnsField`, `COLUMNS` | `@intecion/ipal-kit/blocks` | Field builders of the library for the project's own blocks: `items` array with readable rows, `media` upload, sidebar `variant`, `icon` select of the project's names, `content` rich text, `columns` (`two`/`three`/`four`). |
| `defineLibraryBlock(def)`, `adminText(en, pl)`, `variantOption(value, en, pl)` | `@intecion/ipal-kit/blocks` | The library's block frame (header → fields → buttons → variant → settings) for an own block; `{ en, pl }` text and variant shorthands. |
| `applyBlockOptions(block, options)`, `isNamed(field, name)`, `replaceField(fields, name, patch)`, `removeField(fields, name)`, `stripLocalized(fields)`, `pickVariants(defaults, chosen)` | `@intecion/ipal-kit/blocks` | Option merging and field-list helpers (also for `fields: (defaults) => …`). |
| `blockThumbnail(slug)` | `@intecion/ipal-kit/blocks` | Inline SVG sketch (data URL) for the block picker — what `thumbnail: true` uses. |
| `faqItemsFromLayout(doc, { field?, slugs? })` | `@intecion/ipal-kit/blocks` | FAQ questions of the page's FAQ blocks → `getPageJsonLd(locale, slug, { faq: faqItemsFromLayout })` (FAQPage). |
| `blockLibraryManifest`, `buildBlockLibraryManifest()`, `fieldPaths(fields)` | `@intecion/ipal-kit/blocks` | Plain data: every block's slug, interface name, variants, stored field paths; primitives, field builders, templates — for `ipal-doctor` and tests. |
| `createBlockRegistry(content, options?)` | `@intecion/ipal-kit/blocks/rsc` | `blockType → component` map for `createPageRoute` / `RenderBlocks`, bound to lib/content. Options: `Image`, `Link` (next/image, next/link), `sendForm`, `formClassNames`, `contactDetails`, `classNames` (per block part), `ui` (swap primitives), `components` (swap a block), `backgrounds`, `slugs`, `only`, `extra` (own blocks), `noSnippet` (e.g. `['cta']`), `itemHeadings`, `priorityImage`, `icons`, `texts`, `lightbox`, `richText`, `entryCard`, `mapTestimonial`. |
| `LIBRARY_BLOCK_COMPONENTS` | `@intecion/ipal-kit/blocks/rsc` | The plugin's component per slug. |
| `HeroBlock`, `TextMediaBlock`, `FeatureGridBlock`, `GalleryBlock`, `FaqBlock`, `CtaBlock`, `ContactBlock`, `TeamBlock`, `PricingBlock`, `LogosBlock`, `TestimonialsBlock`, `StatsBlock`, `RichTextBlock`, `StepsBlock`, `EntryListBlock` | `@intecion/ipal-kit/blocks/rsc` | The block components (server; props `LibraryBlockProps`: data + `locale`, `isFirst`, `ui`, `ctx`, `classNames`). |
| `HERO_PARTS`, `TEXT_MEDIA_PARTS`, `FEATURE_GRID_PARTS`, `GALLERY_PARTS`, `FAQ_PARTS`, `CTA_PARTS`, `CONTACT_PARTS`, `TEAM_PARTS`, `PRICING_PARTS`, `LOGOS_PARTS`, `TESTIMONIALS_PARTS`, `STATS_PARTS`, `RICH_TEXT_PARTS`, `STEPS_PARTS`, `ENTRY_LIST_PARTS` | `@intecion/ipal-kit/blocks/rsc` | Default token classes per block part — the keys of `classNames`. |
| `defaultEntryCard(doc)`, `defaultTestimonial(doc)` | `@intecion/ipal-kit/blocks/rsc` | Default mapping of a collection document to an entry card / a testimonial (`entryCard`, `mapTestimonial` replace them). |
| `Section`, `SECTION_BACKGROUNDS`, `SectionHeader`, `Media`, `CMSLink`, `Anchor`, `buttonClass`, `BUTTON_CLASSES`, `Container`, `CONTAINER_WIDTHS`, `Card`, `CARD_CLASS`, `CARD_INTERACTIVE_CLASS` | `@intecion/ipal-kit/blocks/rsc` | UI primitives, token utilities only: section (anchor, background, `data-surface`), heading group, image/video, panel link, link element, button looks, page column, card. |
| `itemHeadingLevel(slug, props)`, `leadsWithImage(props)` | `@intecion/ipal-kit/blocks/rsc` | Item heading tag (one below the section heading; `h2` without one; `itemHeadings` overrides) and whether the block's first image is the page's LCP image (`isFirst` / `firstImage`; `priorityImage: false` turns it off). |
| `Buttons`, `headingId(block)`, `TitleLink`, `GRID_COLUMNS`, `cx`, `parts(defaults, overrides)` | `@intecion/ipal-kit/blocks/rsc` | Helpers for own blocks: button row, heading id for `aria-labelledby`, card title link (plain text when the link is dead), grid columns, class joining, part classes. |
| `BLOCK_TEXTS`, `blockTexts(locale, own?)`, `fillText(text, value)` | `@intecion/ipal-kit/blocks/rsc` | Visitor texts the blocks write (rating, step) in en/pl; override with `texts`. |
| `pageTemplates` | `@intecion/ipal-kit/templates` | `home`, `about`, `services`, `service`, `contact`, `blogIndex`, `post`, `legal(role)`, `cookiePolicy`, `notFound` → `{ title, slug, layout }` for `seed.upsertBySlug('pages', …)`. Options: `blocks`, `overrides`, `layout`, `slug`, `title`, `defaultLocale`, `linkTo`; `contact`/`service` take `form` (`{ $form: 'title' }`). After launch: only with `SEED_ONLY`. |
| `systemPageRefs(roles)` | `@intecion/ipal-kit/templates` | `{ homepage: 'start' }` → `{ homepage: { $page: 'start' } }` for `seed.fillGlobal('site-settings', …)`. |

**Types:** `BlockOptions`, `BlockBuilder`, `BlockLocalization`, `LibraryBlockSetting`, `LibraryBlocksShared`, `LibraryBlockSlug`, `LibraryBlocksOptions`, `VariantOption`, `LibraryBlockDefinition`, `ContactOptions`, `EntryListOptions`, `FeatureGridOptions`, `TestimonialsOptions`, `ItemsFieldOptions`, `MediaFieldOptions`, `VariantFieldOptions`, `IconFieldOptions`, `Columns`, `BlockLibraryManifest`, `ManifestBlock`, `ManifestField` (`/blocks`); `BlockRegistryOptions`, `BlockContent`, `BlockContext`, `BlockUi`, `LibraryBlockProps`, `ContactDetail`, `EntryCard`, `TestimonialItem`, `BlockTexts`, `PartClasses`, `BaseBlockData`, `LinkData`, `LinksData`, `MediaValue`, `RichTextData`, `SectionHeaderData`, `SectionSettingsData`, `HeroBlockData`, `TextMediaBlockData`, `FeatureGridBlockData`, `FeatureItem`, `GalleryBlockData`, `GalleryItem`, `FaqBlockData`, `FaqItem`, `CtaBlockData`, `ContactBlockData`, `TeamBlockData`, `TeamMember`, `PricingBlockData`, `PricingPlan`, `LogosBlockData`, `LogoItem`, `TestimonialsBlockData`, `StatsBlockData`, `StatItem`, `RichTextBlockData`, `StepsBlockData`, `StepItem`, `EntryListBlockData`, `CMSLinkProps`, `ResolveLink`, `LinkComponent`, `ImageComponent`, `ItemHeadingLevel`, `MediaProps`, `SectionProps`, `SectionHeaderProps`, `HeadingLevel`, `CardProps`, `ContainerProps`, `ContainerWidth` (`/blocks/rsc`); `TemplateOptions`, `TemplatePage`, `TemplateBlock`, `TemplateValue` (`/templates`).

## Cookie consent (`consent`) — details: `node_modules/@intecion/ipal-kit/docs/consent.md`

| Export | Import from | What it does / when |
|---|---|---|
| `ConsentProvider` | `@intecion/ipal-kit/client` | Consent provider: `{ texts, cookieMap?, logEndpoint? }` — consent state, cookie, Consent Mode, deleting cookies after consent is withdrawn, optional POST of the decision to the log (`'/api/ipal/consent'`). Wrap the layout once; required by the banner, `Analytics`, `ConsentScript`. |
| `CookieBanner` | `@intecion/ipal-kit/client` | Consent banner + category settings: `settings: 'inline' \| 'modal' \| 'detailed'`, `controls`, `equalChoice` (recommended `true`), `order`, `settingsActions`, `icon`, `classNames`; colours from `--ipal-*` CSS vars. Do not write your own banner. |
| `CookieButton` | `@intecion/ipal-kit/client` | Floating button that reopens the cookie settings (withdrawing consent); hidden while the banner is visible. Props `className`, `side` (`'left' \| 'right'`), `avoid` (selector it lifts above, default `COOKIE_BUTTON_AVOID` = footer; `false`). Tokens `--ipal-cookie-button-offset`, `--ipal-cookie-button-inset`. Type `CookieButtonProps`. |
| `COOKIE_BUTTON_AVOID`, `bottomOverlap(tops, viewportHeight)` | `@intecion/ipal-kit/client` | Default footer selector; pixels the footer covers at the bottom of the screen (how far the button moves up) |
| `TOTP_TEXTS`, `TOTP_VIEW_TITLE` | `@intecion/ipal-kit` | en/pl texts of the 2FA screens (`totpPlugin:*`, merged by `twoFactor`) and their tab title |
| `ConsentScript` | `@intecion/ipal-kit/client` | Loads an external script (`src` or `code`) only after consent for `category` — for vendors without Consent Mode (chat, Plausible etc.). Inside `ConsentProvider`. |
| `CookieTable` | `@intecion/ipal-kit/rsc` | Server Component: cookie table for the cookie policy page — `{ rows, labels?, locale?, categories?, caption?, classNames?, storageColumn?, storageTypes? }`; `rows` from `getCookieTable()`; a **Type** column when a row is local / session storage (`storageColumn: 'auto' \| boolean`). |
| `useConsent(options?)` | `@intecion/ipal-kit/client` | Low-level consent state hook → `{ state, decided, consentId, acceptAll, rejectAll, savePreferences, reopen }`. Usually use `ConsentProvider` + `useConsentContext` (the provider calls it itself). |
| `useConsentContext()` | `@intecion/ipal-kit/client` | Hook: the `useConsent` value + `texts` from `ConsentProvider` — for your own consent-dependent UI (e.g. `state.marketing`). Throws outside the provider. |
| `getConsentTexts({ payload, config, locale?, privacyPolicy?, settingsSlug? })` | `@intecion/ipal-kit` | Server: banner texts from the CookieSettings global (EN fallback per field) + privacy policy link from the system pages → `Promise<ConsentTexts>`; pass to `ConsentProvider texts`. |
| `getCookieTable({ payload, locale? })` | `@intecion/ipal-kit` | Server: Cookies → Cookie list rows in one language → `Promise<CookieTableRow[]>` (does not throw) — for `CookieTable`. |
| `setDefaultConsent(state)` | `@intecion/ipal-kit` | Google Consent Mode `consent default` (with `wait_for_update`). `Analytics` calls it itself before loading Google tags — do not call. |
| `updateConsent(state)` | `@intecion/ipal-kit` | Google Consent Mode `consent update` after the decision. `useConsent` calls it itself — do not call. |
| `parseConsent(raw, version?)` | `@intecion/ipal-kit` | Consent cookie value → `ConsentState \| null` (null: missing, error or a different policy version). For server-side gating. |
| `readConsentRecord(raw, version?)` | `@intecion/ipal-kit` | Like `parseConsent`, but the full record `{ id, state, timestamp, version } \| null`. |
| `serializeConsent(state, version?, id?)` | `@intecion/ipal-kit` | `ConsentState` → encoded cookie value (with timestamp and version). Usually the provider does this. |
| `CONSENT_COOKIE` | `@intecion/ipal-kit` | Consent cookie name: `'cookie-consent'`. |
| `CONSENT_VERSION` | `@intecion/ipal-kit` | Default policy version: `1` (overridden in the panel: Cookies → Policy version; changing it invalidates old consents). |
| `CONSENT_MAX_AGE` | `@intecion/ipal-kit` | Consent cookie lifetime in seconds: 180 days. |
| `CONSENT_CATEGORIES` | `@intecion/ipal-kit` | `['necessary', 'functional', 'analytics', 'marketing']`; `necessary` always on. |
| `DEFAULT_CONSENT` | `@intecion/ipal-kit` | State before the decision: only `necessary: true`. |
| `ACCEPT_ALL_CONSENT` | `@intecion/ipal-kit` | All categories `true`. |
| `REJECT_ALL_CONSENT` | `@intecion/ipal-kit` | Only `necessary: true` (a copy of `DEFAULT_CONSENT`). |
| `CONSENT_LOG_SLUG` | `@intecion/ipal-kit` | Consent log collection slug: `'consent-records'`. |
| `buildConsentLogCollection()` | `@intecion/ipal-kit` | Consent log collection (id, choices, version, time — no IP/personal data; proof of consent under GDPR Art. 7(1)). The plugin wires it itself with `consentLog: true` — do not call. |
| `buildConsentLogEndpoint({ retentionDays? })` | `@intecion/ipal-kit` | `POST /api/ipal/consent` endpoint that saves decisions and deletes records older than `retentionDays` (default 1095). The plugin wires it itself with `consentLog` — do not call. |

**Built-in texts:** `CONSENT_FALLBACK`, `CONSENT_FALLBACK_PL`, `consentFallback(locale)` (banner defaults by page language), `CONSENT_CATEGORY_LABELS` / `consentCategoryOptions()` (category names `{ en, pl }`), `COOKIE_TABLE_LABELS` (`/rsc`, `<CookieTable locale>` defaults), `COOKIE_STORAGE_LABELS` (`/rsc`, type names per language).

**Types:** `ConsentCategory`, `ConsentState`, `ConsentStorage` (`'cookie' \| 'localStorage' \| 'sessionStorage'`), `ConsentTexts`, `CookieTableRow`, `ConsentLogOptions` (root) — categories, consent state, banner texts, cookie table row, log options; `CookieBannerAction`, `CookieSettingsAction`, `CookieBannerClassNames` (`/client`) — `CookieBanner` buttons and classes; `CookieTableLabels` (`/rsc`) — `CookieTable` column headers.

## Cookie scanner (`consent/scanner`) — details: `node_modules/@intecion/ipal-kit/docs/cookie-scanner.md`

Opt-in with `ipalKit({ cookieScanner: true })`; the plugin wires the collection, endpoints, admin box and approval view. The exports are building blocks for a CLI, a scheduled job or your own admin view.

**One approval** (`cookieScanner.approval`, on by default):

| Export | Import from | What it does / when |
|---|---|---|
| `loadCookieApproval({ payload, locale, req? })` | `@intecion/ipal-kit` | What waits (`pending`: drafts and accepted cookies marked changed) and what is no longer found (`gone`), texts in one content locale → `CookieApprovalList` of `CookieApprovalItem`s. |
| `approveCookies({ payload, ids?, unknownCategory?, addToList?, req? })` | `@intecion/ipal-kit` | **Approve and add**: accepts the pending entries (all, or `ids`) and adds them to Cookies → Cookie list in every locale — no duplicates (`sameCookie`), editor text and categories kept, unknown ones get `unknownCategory` + "Needs description" → `CookieApprovalResult`. |
| `countPendingCookies(payload)` / `PENDING_WHERE` | `@intecion/ipal-kit` | How many cookies wait (dashboard, e-mail) / the `Where` for them. |
| `buildCookieApprovalEndpoints(options)` | `@intecion/ipal-kit` | `GET`/`POST /api/ipal/cookie-approval` — the plugin wires them; call only to wire by hand. |
| `flagGoneEntries({ payload, keep, where, req? })` | `@intecion/ipal-kit` | Marks entries a scan no longer finds `change: 'gone'` (never deletes) → count. |
| `nextChange(existing, changed)` | `@intecion/ipal-kit` | Pure marker rule → `CookieChange` (`'new' \| 'changed' \| 'gone'`) or null. |
| `addCookieScannerTabs(global, { approval, crawl, labels, unknownCategory? })` | `@intecion/ipal-kit` | Adds the *Review and approve* / *Site check* tabs (`ui` fields) to a global's `tabs` field — the plugin does it for `cookie-settings` (`adminLayout: 'combined'`). |
| `sameCookie(a, b)` | `@intecion/ipal-kit` | Same name, or one is a pattern covering the other (`_ga_*` / `_ga_XYZ`). |
| `COOKIE_APPROVAL_PATH` / `COOKIE_APPROVAL_VIEW_PATH` / `DEFAULT_UNKNOWN_CATEGORY` | `@intecion/ipal-kit` | `'/ipal/cookie-approval'` / `'/cookie-approval'` (admin route) / `'marketing'`. |

**Types:** `CookieApprovalOptions` (`approval`), `CookieApprovalItem`, `CookieApprovalList`, `CookieApprovalResult`, `CookieChange`.


| Export | Import from | What it does / when |
|---|---|---|
| `runCookieScan({ payload, plugin, options?, names?, req? })` | `@intecion/ipal-kit` | The whole scan as `POST /api/ipal/cookie-scan` runs it → `{ enabled, summary }` (`plugin` = `{ localeCount, stats }`). |
| `collectCookieFindings({ ctx, integrations?, declarations?, names?, database?, databaseCategories? })` | `@intecion/ipal-kit` | Findings for the project without writing: enabled integrations' cookies, project declarations, extra names looked up (declarations → built-ins → Open Cookie Database → `unknown`). |
| `applyCookieFindings({ payload, findings, req?, collection? })` | `@intecion/ipal-kit` | Writes findings to `cookie-review` as drafts: new names created, existing ones updated only where the editor did not change the value; status untouched, nothing deleted → `CookieScanSummary`. |
| `cookieScanContext(payload, plugin, req?)` | `@intecion/ipal-kit` | Builds the `CookieScanContext` (Site integrations + module switches). |
| `parseCookieNames(input)` | `@intecion/ipal-kit` | Text box / array → clean, unique names (max 200; no spaces, `;`, `,`, `=`). |
| `mergeCookieReview(current, previous, next)` | `@intecion/ipal-kit` | Pure "never overwrite an edit" rule, per field and per locale. |
| `suggestionFor(finding, locales)` | `@intecion/ipal-kit` | A finding's values resolved per locale (own language → English → first). |
| `addToCookieList({ payload, entry, req? })` | `@intecion/ipal-kit` | What accepting does: adds the row to Cookies → Cookie list or fills only its empty text, every locale → `'added' \| 'filled' \| 'unchanged'`. |
| `loadCookieDatabase()` / `indexCookieDatabase(rows)` / `lookupCookie(index, name, categories?)` | `@intecion/ipal-kit` | Bundled Open Cookie Database (Apache-2.0, loaded on first use): exact name, then the longest wildcard prefix → `CookieFinding \| null`. |
| `DEFAULT_DATABASE_CATEGORIES` | `@intecion/ipal-kit` | Database → consent category map (Functional → `functional` on purpose; override with `cookieScanner.databaseCategories`). |
| `DEFAULT_COOKIE_INTEGRATIONS` | `@intecion/ipal-kit` | Built-in declarations: consent cookie, admin login, `NEXT_LOCALE`, `ipal_vid`, GA4, GTM, Meta Pixel, Clarity, LinkedIn, TikTok, Turnstile — each with its `isEnabled` check. |
| `cookieNameMatches(pattern, name)` | `@intecion/ipal-kit` | `*` at the end = prefix, else exact. |
| `buildCookieReviewCollection(options)` / `buildCookieScanEndpoints(options, plugin)` | `@intecion/ipal-kit` | The collection and the GET/POST endpoints — the plugin wires them with `cookieScanner`; call only to wire by hand. |
| `COOKIE_REVIEW_SLUG` / `COOKIE_SCAN_PATH` | `@intecion/ipal-kit` | `'cookie-review'` / `'/ipal/cookie-scan'`. |
| `COOKIE_SCAN_LABELS` / `mergeCookieScanLabels(overrides)` | `@intecion/ipal-kit` | Admin labels (`en`, `pl`) and the merge `cookieScanner.labels` uses. |

**Browser crawl** (`cookieScanner.crawl`; the browser runs in the shared service `services/cookie-crawler`, never in the site):

| Export | Import from | What it does / when |
|---|---|---|
| `buildCookieCrawlGlobal(labels)` / `buildCookieCrawlEndpoints({ labels, options, plugin })` | `@intecion/ipal-kit` | The `cookie-crawl` global (latest result only) and the three crawl endpoints — the plugin wires them with `crawl`; call only to wire by hand. |
| `resolveCrawlConfig(crawlOptions, payload)` | `@intecion/ipal-kit` | Options → env (`IPAL_COOKIE_SCAN_URL`, `IPAL_COOKIE_SCAN_TOKEN`) → `serverURL` / `NEXT_PUBLIC_SERVER_URL` → `ResolvedCrawlConfig` (null = missing). |
| `parseCrawlResult(body)` | `@intecion/ipal-kit` | Validates the service's JSON → `CrawlResult` (`CrawlObservation`, `CrawlRequest`) or null; junk dropped. |
| `ingestCrawlResult({ payload, result, options, config, labels, plugin, req? })` | `@intecion/ipal-kit` | Applies a result: clears the previous flags, drafts for new names (same merge rules), `seenBeforeConsent` / `violation` / `violationDetail` → `CrawlIngestSummary`. |
| `finishCrawl({ payload, labels, result, summary?, siteUrl?, req? })` | `@intecion/ipal-kit` | Writes the `cookie-crawl` global (done / failed) and sends the e-mail warning when recipients are set. |
| `findCrawlViolations({ observations, requests, categoryOf, consentMode?, trackerHosts? })` | `@intecion/ipal-kit` | Pure rule: stored before consent and not `necessary` (unclassified counts), tracker requests before consent → `CrawlViolation[]`. |
| `DEFAULT_TRACKER_HOSTS` / `GOOGLE_TAG_HOSTS` | `@intecion/ipal-kit` | Request hosts that are violations before consent; Google's only with `consentMode: 'basic'`. |
| `sendCrawlWarning({ payload, labels, siteUrl, summary, to })` | `@intecion/ipal-kit` | The warning e-mail through `payload.sendEmail` (the project's mail adapter); never throws. |
| `bearerMatches(header, token)` | `@intecion/ipal-kit` | Constant-time `Authorization: Bearer` check. |
| `COOKIE_CRAWL_SLUG` / `COOKIE_CRAWL_PATH` / `COOKIE_CRAWL_RESULTS_PATH` | `@intecion/ipal-kit` | `'cookie-crawl'` / `'/ipal/cookie-crawl'` / `'/ipal/cookie-crawl/results'`. |
| `COOKIE_SCAN_URL_ENV` / `COOKIE_SCAN_TOKEN_ENV` | `@intecion/ipal-kit` | `'IPAL_COOKIE_SCAN_URL'` / `'IPAL_COOKIE_SCAN_TOKEN'`. |

**Types:** `CookieScannerOptions` (the option), `CookieDeclaration`, `CookieIntegration`, `CookieScanContext`, `CookieFinding`, `CookieFindingSource`, `CookieStorage`, `LocalizedText`, `CookieScanSummary`, `CookieReviewValues`, `CookieDatabaseIndex`, `CookieScanLabels`, `OpenCookieCategory`, `CookieObservation` (a name with `storage` / `domain` for `collectCookieFindings`), `CookieReviewEntryRef` (`applyCookieFindings` `entries`); crawl: `CookieCrawlOptions`, `ResolvedCrawlConfig`, `CrawlResult`, `CrawlObservation`, `CrawlRequest`, `CrawlViolation`, `CrawlIngestSummary`.

## Under construction (`construction`) — details: `node_modules/@intecion/ipal-kit/docs/construction.md`

| Export | Import from | What it does / when |
|---|---|---|
| `ConstructionNotice` | `@intecion/ipal-kit/client` | "Under construction" popup: `{ mode, classNames?, locale?, closeLabel? }` — with no button text in the panel the button shows `×` and gets a screen-reader name in the page language ("Close" / "Zamknij"; `locale` defaults to `mode.locale`, `closeLabel` overrides the text); opens after a redirect from a blocked address (`?notice=construction`) and on a click on a link to an unavailable page; texts from the panel, renders nothing when the mode is off. In `[locale]/layout.tsx` with `mode={await getConstructionMode(locale)}`. |
| `isPathAllowed(pathname, allowedPaths)` | `@intecion/ipal-kit` | Whether the path is allowed in under-construction mode (exact match, no trailing `/`) → `boolean`. `createPageRoute` uses it itself — by hand only in your own routes. |
| `isPathVisibleIn(mode, pathname)` | `@intecion/ipal-kit` | `true` when the mode is off or the path is allowed — the rule behind `isPathVisible` from `createContentHelpers`. For your own routes when you already hold the `ConstructionMode`. |
| `pathOf(url)` | `@intecion/ipal-kit` | Pathname of an absolute or relative URL — feed a result URL to a `PathVisibility` check. |
| `constructionNoticeHref(homePath)` | `@intecion/ipal-kit` | Redirect address for a blocked page: `${homePath}?notice=construction`. `createPageRoute` uses it itself. |
| `CONSTRUCTION_NOTICE_PARAM` | `@intecion/ipal-kit` | Name of the query parameter that opens the popup: `'notice'` (value `construction`). |

**Types:** `ConstructionMode` (root and `/client`) — `{ enabled, allowedPaths, homePath, locale, texts }` from `getConstructionMode(locale)`;
`CONSTRUCTION_CLOSE_LABEL`, `CONSTRUCTION_CLOSE_LABEL_PL`, `constructionCloseLabel(locale?)` (root and `/client`) — the close button's screen-reader name; `PathVisibility` — `(path, locale) => boolean | Promise<boolean>` (`isPathVisible` from `createContentHelpers`; the `isPathVisible` option of the Markdown, MCP and search routes); `ConstructionNoticeClassNames` (`/client`) — popup classes.

## Content and routing (`content`) — details: `node_modules/@intecion/ipal-kit/docs/content.md`

| Export | Import from | What it does / when |
|---|---|---|
| `resolveRoute({ payload, locale, segments, page, content, draft? })` | `@intecion/ipal-kit` | resolves a catch-all path → `{ type: 'home'\|'page'\|'archive'\|'entry', doc, … }` or `null` (404); usually through `resolveRoute` from `createContentHelpers` |
| `getArchiveEntries({ payload, collection, locale, page, perPage, sort?, where?, depth?, draft? })` | `@intecion/ipal-kit` | fetches a page of archive entries (`ArchiveEntries`); `getEntries` from `createContentHelpers` has the defaults |
| `archiveFieldName(slug)` | `@intecion/ipal-kit` | name of the archive field in System pages (`'posts'` → `'postsArchive'`); the plugin adds these fields itself |
| `buildEntryPath({ locale, archiveSlug, entrySlug })` | `@intecion/ipal-kit` | entry path `/pl/artykuly/moj-post` (always with the locale prefix) |
| `buildArchivePath({ locale, archiveSlug, page })` | `@intecion/ipal-kit` | listing path with `?page=N` pagination (page 1 without a query) |
| `parsePageParam(value)` | `@intecion/ipal-kit` | `?page=` → number ≥ 1 (junk/missing → 1) |
| `resolveRedirect({ payload, locale, segments, config, homeSlug, collections? })` | `@intecion/ipal-kit` | looks up an old slug in `slugHistory` → path for `permanentRedirect` or `null`; pairs with `trackSlugHistoryHook` — do not write your own lookup |
| `resolveNotFoundPage({ payload, locale, pagesSlug?, settingsSlug? })` | `@intecion/ipal-kit` | page assigned as 404 in System pages or `null`; does not throw (with the helpers: `getNotFoundPage`) |
| `blocksToMarkdown(layout, { overrides? })` | `@intecion/ipal-kit` | page blocks → Markdown by field naming convention (heading, body, items…) |
| `createMarkdownRenderer({ content, collection?, layoutField?, overrides?, frontmatter?, baseUrl?, config? })` | `@intecion/ipal-kit` | returns `render({ payload, locale, slug })` → page Markdown (GEO) or `null` |
| `createMarkdownRoute({ getCachedPayload, content, config, baseUrl })` | `@intecion/ipal-kit` | ready `GET` handler for the `/md/...` route; usually `markdownRoute` from `createContentHelpers` is enough |
| `markdownResponse(md, { canonical? })` | `@intecion/ipal-kit` | `Response` `text/markdown` (noindex, `s-maxage`) or 404 for `null` |
| `MARKDOWN_PREFIX` | `@intecion/ipal-kit` | constant `'/md'` — default prefix of Markdown routes |
| `markdownHref(pathname, prefix?)` | `@intecion/ipal-kit` | page path → Markdown version address (`/pl/o-nas` → `/md/pl/o-nas`), e.g. for `alternates.types` |
| `prefersMarkdown(request \| headers \| accept)` | `@intecion/ipal-kit` | whether the `Accept` header prefers `text/markdown` (q-values); for your own proxy — `createProxy({ markdown: true })` does it itself |
| `searchContent({ payload, query, config, locale?, limit?, baseUrl?, collection?, summaryField? })` | `@intecion/ipal-kit` | searches published, indexable pages by title/description → `SearchResult[]`; does not throw |
| `listContent({ payload, config, locale?, limit? })` | `@intecion/ipal-kit` | list of published, indexable pages (no query) — used by MCP `list_pages` |
| `createSearchRoute({ getCachedPayload, config, baseUrl, defaultLimit?, rateLimit?, clientIp?, isPathVisible? })` | `@intecion/ipal-kit` | `GET` handler for the JSON search endpoint (`?q=&locale=&limit=`), with a per-IP rate limit; pass `isPathVisible` from `@/lib/content` so construction mode hides pages here too |

**Types:** `ContentOption`, `ContentCollectionOption` — the plugin's `content` option (archive collections: `slug`, `label`, `perPage`); `ResolvedRoute` — `resolveRoute` result; `ArchiveEntries` — a page of entries (`docs`, `page`, `totalDocs`, `totalPages`, `hasPrevPage`, `hasNextPage`); `SearchResult` — search result (`title`, `url`, `description?`, `slug`).

## E-mail (`email`) — details: `node_modules/@intecion/ipal-kit/docs/email.md`

| Export | Import from | What it does / when |
|---|---|---|
| `mailAdapter({ smtp?, graph?, fallbackFromAddress?, fallbackFromName? })` | `@intecion/ipal-kit` | recommended adapter for `buildConfig({ email })`: on every send picks SMTP or Graph per the panel setting and saves the integration status; the plugin does not set `config.email` itself |
| `panelSmtpAdapter({ fallbackFromAddress?, fallbackFromName? })` | `@intecion/ipal-kit` | Payload adapter that always sends through the SMTP configured in Site integrations |
| `graphAdapter({ fallbackFromAddress?, fallbackFromName?, largeAttachments?, cleanupDelaysMs? })` | `@intecion/ipal-kit` | Payload adapter through Microsoft Graph (Exchange/M365; `GRAPH_*` credentials from env). Attachments under 3 MB ride in `sendMail`; larger ones go through a draft + upload session (needs `Mail.ReadWrite`) and the mailbox copy is deleted; `largeAttachments: false` turns that path off (email.md "Attachments") |
| `mailAttachmentLimit(payload)` | `@intecion/ipal-kit` | Total attachment bytes the site's e-mail adapter can carry, or `null` (no ceiling of its own). About 3 MB on Graph without the large-file path and without SMTP settings — form File fields use it for the limit they show |
| `sendEmail({ payload, to, subject, html, text?, from?, replyTo? })` | `@intecion/ipal-kit/server` | sends your own e-mail (your HTML) always through SMTP from the panel → `{ sent: true, messageId }` / `{ sent: false, error }`; does not throw; server code only |

**Types:** `MailAdapterArgs`, `PanelSmtpAdapterArgs`, `GraphAdapterArgs` — adapter options; `SendEmailArgs`, `SendEmailResult` (`/server`) — `sendEmail` arguments and result.

## Environment variables (`env`) — details: `node_modules/@intecion/ipal-kit/docs/env.md`

| Export | Import from | What it does / when |
|---|---|---|
| `assertEnv(rules, { env?, label? })` | `@intecion/ipal-kit/env`, `@intecion/ipal-kit` | validates `process.env` against the rules at startup; collects every missing item and throws one error |
| `ipalEnvRules({ storage?, emailGraph?, ipHeader?, turnstile?, serverUrlVar?, secretVar?, secretMinLength?, databaseVar?, databaseName? })` | `@intecion/ipal-kit/env`, `@intecion/ipal-kit` | ready rule set (`DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` + `R2_*`/`GRAPH_*`/Turnstile/`IPAL_IP_HEADER` depending on the features used) for `assertEnv`; `R2_PUBLIC_URL` optional unless `storage: { requirePublicUrl: true }`; `secretMinLength` (default 32, `0` = off) is the minimum `PAYLOAD_SECRET` length in production; `databaseName: true \| { domain?, warn? }` only warns when the `DATABASE_URI` database is not `<domain without dots>_prod` / `_dev` |
| `databaseNamesFor(domainOrUrl)` | `@intecion/ipal-kit/env`, `@intecion/ipal-kit` | the two database names for a site: `intecion.com` → `{ prod: 'intecioncom_prod', dev: 'intecioncom_dev' }` (`www.` dropped, dots removed) |
| `databaseNameFromUri(uri)` | `@intecion/ipal-kit/env`, `@intecion/ipal-kit` | the database name (URI path) of a Mongo / Postgres `DATABASE_URI`; null for SQLite files or no name |
| `checkDatabaseName({ databaseUri, domain })` | `@intecion/ipal-kit/env`, `@intecion/ipal-kit` | warning text when the name breaks the rule, else null (skips localhost / no domain) — what `databaseName` uses |

**Types:** `EnvRule`, `EnvKind` — variable rule (`name`, `required`, `kind`, `oneOf`, `validate`); `AssertEnvOptions` — `assertEnv` options; `IpalEnvFeatures` — `ipalEnvRules` argument (all from `/env` and root).

## Frontend layer (`frontend`) — details: `node_modules/@intecion/ipal-kit/docs/frontend.md`

| Export | Import from | What it does / when |
|---|---|---|
| `createContentHelpers({ config, content?, i18n?, baseUrl?, … })` | `@intecion/ipal-kit` | factory for `src/lib/content.ts`: cached `getCachedPayload`, `getSettings`, `resolveRoute`, `getEntries`, `generatePageMetadata`, `getSiteShell`, `sitemap`, `robots`, `getRobots`, `isPathVisible`, `markdownRoute`, `healthRoute`, `mcpGET`/`mcpPOST`… — do not write these wrappers yourself |
| `createPageRoute(content, { blocks, notFound, permanentRedirect, redirect?, … })` | `@intecion/ipal-kit/rsc` | ready `[[...slug]]` catch-all page → `{ Page, generateMetadata, generateStaticParams }` (blocks, slug history redirects, JSON-LD, under-construction mode); does not paginate `?page=` |
| `createNotFoundPage(content, { load } \| { blocks, fallback?, … })` | `@intecion/ipal-kit/rsc` | default export of `not-found.tsx` — the 404 page chosen in the panel or a fallback (the lazy `load` variant is recommended) |
| `renderNotFoundView(content, { blocks, fallback?, blockProps?, layoutField? }, locale)` | `@intecion/ipal-kit/rsc` | 404 content in one language — called from a server action for the lazy `createNotFoundPage({ load })` (pages.md) |
| `SiteProviders` | `@intecion/ipal-kit/rsc` | layout component: `shell={await getSiteShell(locale)}` mounts consent, cookie banner, analytics, Turnstile, site JSON-LD, theme script (and `lightbox` → `LightboxProvider`); `nonce` (from `x-nonce`) goes on the theme script and the GA4/GTM tag; does not mount `AlternateLinksProvider` |

Full option lists of `createContentHelpers` / `createPageRoute` / `SiteProviders` and the returned `@/lib/content` keys: `node_modules/@intecion/ipal-kit/docs/frontend.md`.

**Types:** `ContentHelpers` — `createContentHelpers` result; `SiteShell` — layout data from `getSiteShell` (consent, analytics, theme, jsonLd, settings, formTexts, lightboxTexts, turnstileSiteKey); `PageJsonLdOptions`, `EntryJsonLdContext` — `getPageJsonLd` options / your own JSON-LD nodes for entries (root); `PageRouteOptions`, `NotFoundPageOptions`, `NotFoundViewOptions`, `SiteProvidersProps` (`/rsc`) — options of `createPageRoute`, `createNotFoundPage`, `renderNotFoundView` and `SiteProviders` props.

## Health check (`health`) — details: `node_modules/@intecion/ipal-kit/docs/deployment.md`

| Export | Import from | What it does / when |
|---|---|---|
| `createHealthRoute({ getCachedPayload, collection?, extra? })` | `@intecion/ipal-kit` | `GET` handler for `app/api/health/route.ts`: database round-trip → 200 `{ status: 'ok', db: 'up' }` / 503; usually `healthRoute` from `createContentHelpers` is enough |

## Collection hooks (`hooks`) — details: `node_modules/@intecion/ipal-kit/docs/hooks.md`

| Export | Import from | What it does / when |
|---|---|---|
| `buildRevalidateHook({ revalidatePath, config, homeSlug? })` | `@intecion/ipal-kit` | → `{ afterChange, afterDelete }` that revalidate ISR for the document paths in all languages; the project injects `revalidatePath` from `next/cache` |
| `buildGlobalRevalidateHook({ revalidatePath })` | `@intecion/ipal-kit` | Global `afterChange`: `revalidatePath('/', 'layout')` — the whole site picks up the change. The plugin adds it to its own globals when you pass `ipalKit({ revalidatePath })`; wire it yourself on your own globals (Header, Footer). Skip once: `context: { disableRevalidate: true }`. |
| `buildFillEmptyLocalesGlobalHook({ global, fields })` / `buildFillEmptyLocalesCollectionHook({ collection, fields })` | `@intecion/ipal-kit` | `afterChange`: text saved in one language fills the same field in every language where it is empty; never overwrites a language's own text. Fields `'field'` or `'array.subField'` (rows matched by id). The plugin adds them to the cookie list and the cookie review (`fillEmptyLocales`). |
| `fillEmptyLocales({ payload, target, source, sourceLocale, fields, req? })` | `@intecion/ipal-kit` | The core of those hooks (`FillEmptyLocalesTarget`: `{ global }` or `{ collection, id }`) → locales changed. |
| `withFillLocales(kind, config, fields)` | `@intecion/ipal-kit` | Adds the right hook to a global (`'global'`) or collection (`'collection'`) config; no fields = unchanged. |
| `setPublishedAtHook` | `@intecion/ipal-kit` | `beforeChange`: sets `publishedAt` on first publish (does not overwrite an existing date) |
| `trackSlugHistoryHook` | `@intecion/ipal-kit` | `beforeChange`: appends the old slug to the `slugHistory` field (add the field yourself); `resolveRedirect` reads it |
| `buildPreventDeleteSystemPage({ settingsSlug?, roleFields? })` | `@intecion/ipal-kit` | `beforeDelete`: blocks deleting a page assigned to a system role (homepage, policies) |
| `buildValidateUniqueRole({ siblingFields })` | `@intecion/ipal-kit` | `beforeValidate` for a role field: one page cannot have two roles; the plugin does not add it to its own fields — wire it yourself |
| `buildCrossLocaleFieldSync({ config, collection, fields, arrayField?, guardFlag? })` | `@intecion/ipal-kit` | `afterChange`: copies the given fields (e.g. images) in localized `blocks` to the other languages |

## Languages and i18n (`i18n`) — details: `node_modules/@intecion/ipal-kit/docs/i18n.md`

| Export | Import from | What it does / when |
|---|---|---|
| `getLocaleCodes(config)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | list of language codes from `I18nConfig` |
| `getDefaultLocale(config)` | `@intecion/ipal-kit` | default language from the config |
| `isValidLocale(code, config)` | `@intecion/ipal-kit` | whether the code is a configured language |
| `getLocaleDefinition(code, config)` | `@intecion/ipal-kit` | language definition `{ code, label, rtl? }` |
| `getLocalizedSlugs({ slugField, config })` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | slug field from `locale: 'all'` → map `{ pl, en }` |
| `buildLocalizedPath({ slugs, locale, config, homeSlug?, prefix? })` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | page path in a language (home → root, single language → no `/pl`); `undefined` when the slug is missing |
| `switchLocalePath({ slugs, targetLocale, config, homeSlug?, prefix? })` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | address after a language switch without a 404 (no translation → archive or `/{locale}`) |
| `resolveLocalized(value, locale, fallback?)` | `@intecion/ipal-kit` | localized field (string or map) → text in the given language |
| `negotiateLocale({ config, cookieLocale, acceptLanguage })` | `@intecion/ipal-kit` | language choice: cookie → Accept-Language → default |
| `matchAcceptLanguage(header, config)` | `@intecion/ipal-kit` | matches the `Accept-Language` header to the configured languages |
| `LOCALE_COOKIE_NAME` | `@intecion/ipal-kit` | constant `'NEXT_LOCALE'` — cookie with the chosen language (functional, saved only with consent) |
| `createProxy(i18nConfig, { NextResponse, markdown?, exposeHeaders?, consentCategory?, cookieName?, policyVersion?, csp? })` | `@intecion/ipal-kit/next/middleware`, `@intecion/ipal-kit` | recommended `proxy.ts`: language negotiation, redirect `/` → `/{locale}`, cookie with consent, `x-locale`/`x-pathname` headers, optional Markdown routes; `csp` (buildCsp args) = a nonce CSP per request + `x-nonce` for `<SiteProviders nonce>` (dynamic pages only, security.md) |
| `createLocaleMiddleware({ config, cookieName?, policyVersion? })` | `@intecion/ipal-kit/next/middleware`, `@intecion/ipal-kit` | lower level: a `req → LocaleMiddlewareResult` function for your own proxy. The locale cookie is saved only with `functional` consent (`consentCategory: 'necessary'` = always), read under the version the consent was stored with; `policyVersion` pins one version |
| `DEFAULT_PROXY_MATCHER` | `@intecion/ipal-kit/next/middleware`, `@intecion/ipal-kit` | alias of `DEFAULT_MIDDLEWARE_MATCHER` for `createProxy`; paste the value into `config.matcher` as a literal |
| `DEFAULT_MIDDLEWARE_MATCHER` | `@intecion/ipal-kit/next/middleware`, `@intecion/ipal-kit` | array `['/((?!api\|admin\|_next\|.*\\..*).*)']` (excludes `api`, `admin`, `_next`, files); paste into `config.matcher` as a literal — Next reads the matcher statically |
| `AlternateLinksProvider` | `@intecion/ipal-kit/client` | layout provider that holds the current page's addresses per language (for `LanguageSwitcher`); `SiteProviders` does not mount it |
| `AlternateLinksUpdater` | `@intecion/ipal-kit/client` | `<AlternateLinksUpdater links={{ pl, en }} />` on a page — reports its addresses in other languages |
| `LanguageSwitcher` | `@intecion/ipal-kit/client` | headless language switcher (`config`, `currentLocale`, `classNames`, `renderLabel`) linking to the addresses from context. `renderLabel` is a function: pass it from a `'use client'` wrapper of your own, never from a server header (build fails) — i18n.md |
| `useAlternateLinks()` | `@intecion/ipal-kit/client` | hook: `{ [locale]: url }` of the current page — for your own switcher |
| `useSetAlternateLinks()` | `@intecion/ipal-kit/client` | setter hook used by `AlternateLinksUpdater` (usually not needed) |

**Types:** `I18nConfig`, `LocaleDefinition` — language config (`defaultLocale`, `locales[{ code, label, rtl? }]`, `fallback`); `LocalizedSlugs` — map of slugs per language; `LocaleMiddlewareResult` — `createLocaleMiddleware` result (`next`/`redirect` + cookie); `AlternateLinks`, `LanguageSwitcherClassNames` (`/client`) — map of addresses per language and switcher classes.

## Integration status (`integrations`) — details: `node_modules/@intecion/ipal-kit/docs/integrations.md`

| Export | Import from | What it does / when |
|---|---|---|
| `recordIntegrationStatus(payload, field, previous, { state, code?, message? })` | `@intecion/ipal-kit` | saves the state of your own integration in Site integrations (only on change / every 10 min); does not throw. For e-mail and Turnstile the plugin calls it itself — do not call |
| `buildIntegrationStatusField(name)` | `@intecion/ipal-kit` | hidden status group field (`state`, `code`, `message`, `since`, `checkedAt`) for `integrationsFields` |
| `buildIntegrationStatusBanner(statusField, label, texts?)` | `@intecion/ipal-kit` | UI field with a status banner on the integration tab (`label` string or `{ en, pl }`; `texts` = `{ failing, hint }` keys of your own `ipal` translations) (`integrationsFields`; then `pnpm generate:importmap`) |
| `IntegrationAlerts` | `@intecion/ipal-kit/admin` | dashboard alert about integrations in the `degraded` state; always injected by the plugin (`beforeDashboard`); your own integrations: a second instance with `checks` |
| `IntegrationStatusBanner` | `@intecion/ipal-kit/admin` | status banner on the tab; injected by the plugin / `buildIntegrationStatusBanner` through the import map (`pnpm generate:importmap`), the project does not import it |

**Types:** `IntegrationState` (`'ok' | 'degraded'`), `IntegrationStatus` — integration state and saved status; `IntegrationLabel` (`string | { en, pl }`) — banner / alert label; `IntegrationBannerTexts` (`{ failing, hint }` text keys) — third argument of `buildIntegrationStatusBanner` for your own wording.

## Forms (`forms`) — details: `node_modules/@intecion/ipal-kit/docs/forms.md`

The editor builds forms in the panel (Forms collection). The project does NOT write its own forms: the block renders `<RenderForm>`, submission goes through `sendForm = createSubmitAction(...)`.

### Configuration and panel fields (config-time)

| Export | Import from | What it does / when |
|---|---|---|
| `buildFormsPlugin(forms)` | `@intecion/ipal-kit` | Wires `@payloadcms/plugin-form-builder` (Forms + Form Submissions, field types, closed REST for submissions); the plugin wires it itself with the `forms` option — do not call |
| `stepBlock` | `@intecion/ipal-kit` | Form-builder "Step" block (splits the form into steps, with "Show only when"); the plugin adds it itself (`forms.fields.step`) — only for your own form-builder configuration |
| `buildFileBlock(options?)`, `fileBlock` | `@intecion/ipal-kit` | "File" block of the form builder (label, help text, allowed types, maximum size and files); the plugin adds it with `forms.attachments`. `buildFileBlock({ maxSizeMB, fileTypes, … })` for your own variant in `forms.fields.file`; `fileBlock` = the default one |
| `FORM_FILE_TYPES`, `RISKY_FILE_EXTENSIONS` | `@intecion/ipal-kit` | Built-in file types of the File field (`pdf`, `doc`, `docx`, `odt`, `rtf`, `xls`, `xlsx`, `jpg`, `png`, `webp` → label, extensions, MIME type) and the extensions refused unless `attachments.allowRisky` lists them |
| `formatFileSize(bytes)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | "2.1 MB" / "640 KB" for a file list |
| `fileFieldRules(field)`, `fileFieldError(field, files, texts)` | `@intecion/ipal-kit/client` | The limits of a File field in the browser (from `field.resolved`, set by the server) and the first problem with the picked files as the visitor's message — `useBuilderForm` uses both |
| `splitFormFiles(values)` | `@intecion/ipal-kit/server` | Splits `File` values from the answers → `{ fields, files }` for `submitForm({ data: fields, files })` in your own action or route; `createSubmitAction` already does it |
| `checkboxGroupBlock` | `@intecion/ipal-kit` | "Checkbox group" block (multiple choice, `minSelected`/`maxSelected`, value `string[]`); the plugin adds it itself (`forms.fields.checkboxGroup`) |
| `timeBlock` | `@intecion/ipal-kit` | "Time" block (`<input type="time">`, value `HH:MM`); the plugin adds it itself (`forms.fields.time`) |
| `placeholderField` | `@intecion/ipal-kit` | Payload `placeholder` field (localized hint in an empty field) for your own form blocks |
| `withPlaceholder(block)` | `@intecion/ipal-kit` | Appends `placeholderField` to a block; the plugin handles the built-in text/email/textarea/number itself — use it for your own block (then a migration) |
| `buildFormAnalyticsFields()` | `@intecion/ipal-kit` | Returns the `analytics` field group (Event name, default `form_submit`, + Event parameters) for `forms.formOverrides.fields` — GTM event after submit, set from the panel |

### Render (server → client)

| Export | Import from | What it does / when |
|---|---|---|
| `RenderForm({ form, action, locale, texts, classNames?, values?, … })` | `@intecion/ipal-kit/rsc` | A panel form in a block in one line (RSC): renders message blocks and the confirmation, binds `sendForm` to the form and language, resolves the redirect, sends only `publicForm` to the browser; `form` not populated → nothing |
| `prepareBuilderForm({ form, action, locale, … })` | `@intecion/ipal-kit/rsc` | The server half of `RenderForm` without markup → `PreparedBuilderForm` (or `null`) to spread into `<BuilderForm>` in a client component (e.g. a configurator with changing `values`) |
| `publicForm(form)` | `@intecion/ipal-kit/rsc` | Public part of the form document (no Emails tab, no message rich text, safe redirect URL) — when you pass the form to the client yourself; never pass the raw document |
| `BuilderForm(props)` | `@intecion/ipal-kit/client` | Client renderer for any panel form (steps, all field types, Turnstile, honeypot, a11y), unstyled — look via `classNames`, field replacement via `renderField`; usually used indirectly through `RenderForm` |
| `useBuilderForm({ form, action, texts, values?, onSuccess?, navigate?, redirectHref? })` | `@intecion/ipal-kit/client` | Panel form engine without markup (steps, `next/back/goTo`, per-step validation, server errors, redirect, analytics, `getInputProps`/`getSelectProps`/…, `TurnstileWidget`) — for your own markup of an unusual form |

### Pure panel form logic (client and server)

| Export | Import from | What it does / when |
|---|---|---|
| `visibleFields(fields, values)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Fields (with steps and message) visible for the given values per "Show only when" — a rule shared by browser and server (hidden = not required and not saved) |
| `splitSteps(fields, isShown?)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Splits the field list into steps at `step` blocks → `BuilderStep[]` (skips hidden ones, keeps the original `index`) |
| `inputFields(fields)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Only fields that carry a value (have a `name`, not `message`/`step`) |
| `initialBuilderValues(fields)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Initial values: checkbox → boolean, checkboxGroup → `string[]`, the rest → string (from `defaultValue`) |
| `validateBuilderFields(fields, values, texts)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Client errors (required, email, number, min/max selected) → `{ [name]: message }`, `{}` = OK; text from `texts.validation` with `{field}` |
| `stepOfField(steps, name)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Index of the step containing the field (go back to the step with a server error); none → 0 |
| `autoCompleteFor(field)` | `@intecion/ipal-kit/client` | `autoComplete` hint from the field type/name (`email`, `country-name`, `name`, `tel`, `organization`) or `undefined` |

### Submission (server)

| Export | Import from | What it does / when |
|---|---|---|
| `createSubmitAction({ getCachedPayload, headers, … })` | `@intecion/ipal-kit/server` | Creates the server action `sendForm(formId, locale, values, token?)`: honeypot → `clientIp` → `submitForm` → text from Notifications; returns `SubmitActionResult`. Standard: `export const sendForm = createSubmitAction({ getCachedPayload, headers })` in `actions.ts` |
| `submitForm({ payload, formId, data, files?, attemptKey?, turnstileToken?, ip?, locale?, maxPerMinute?, consentFieldName?, turnstileHostnames? })` | `@intecion/ipal-kit/server` | Server core (`consentFieldName`: argument → `ipalKit({ forms: { consentFieldName } })` → `'consent'`; `turnstileHostnames` rejects a token solved on another domain): rate limit → Turnstile → validation against the panel definition (+ GDPR consent) → saves the submission; returns a `SubmitFormResult` code, not text. Usually through `createSubmitAction`; server-only |

### Honeypot

| Export | Import from | What it does / when |
|---|---|---|
| `HONEYPOT_FIELD` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Constant: default trap field name `'company_url'` |
| `honeypotInputProps(name?)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Props of the hidden input (off-screen, `aria-hidden`, `tabIndex -1`) — `<input {...honeypotInputProps()} />`; `BuilderForm` adds it itself |
| `isHoneypotTripped(values, name?)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | `true` when the trap is filled → fake success without saving; `createSubmitAction` checks it itself |

### Lower-level hooks and validators (forms outside the builder)

| Export | Import from | What it does / when |
|---|---|---|
| `useForm({ initialValues, submitAction, validate?, requireTurnstile?, onSuccess?, … })` | `@intecion/ipal-kit/client` | Generic form engine without markup (state, validation, Turnstile token, submit, success/error; `setField`, `handleSubmit`, `reset`) — for forms outside the builder (e.g. filters); not for contact forms |
| `useContactForm({ submitAction, requireTurnstile?, requireTopic?, requireConsent?, onSuccess?, … })` | `@intecion/ipal-kit/client` | `useForm` preset for a fixed contact form (`name, email, phone, topic, message, consent`) — only when you deliberately do not use the builder |
| `buildValidator(schema)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Builds a `Validator` from per-field rule lists (the first failing one wins); also works on the server |
| `required(msg?)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Rule: non-empty, not `null`, not `false` |
| `email(msg?)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Rule: valid e-mail address |
| `minLength(n, msg?)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Rule: string of at least `n` characters (after trim) |
| `maxLength(n, msg?)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Rule: string of at most `n` characters (after trim) |
| `checked(msg?)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Rule: the checkbox must be `true` |
| `pattern(re, msg?)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Rule: matches a regex (empty values skipped — combine with `required`) |
| `custom(test, msg)` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit` | Rule from any predicate `(value, values) => boolean` |
| `isEmail(v)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Standalone e-mail check → boolean |
| `localizedRules(locale)`, `validationMessages(locale)`, `VALIDATION_MESSAGES` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Validators with default messages in the page language (en/pl); type `ValidationMessages` |

### Analytics

| Export | Import from | What it does / when |
|---|---|---|
| `formAnalyticsOnSuccess(config)` | `@intecion/ipal-kit/client` | Turns `form.analytics` (panel) into an `onSuccess` handler that calls `pushDataLayer(event, params)` (a value like `$topic` — `$` + field name — is taken from the submitted data; empty event = no-op); `useBuilderForm` calls it itself — by hand only with `useForm`/`useContactForm` |

**Types:** `BuilderField`, `BuilderOption`, `BuilderStep`, `BuilderFormDoc`, `BuilderFormTexts`, `FieldCondition` (root, `/client`; `BuilderOption` only `/client`) — shape of the panel form, field, option, step, texts and the "Show only when" condition. `BuilderFileLimits` (root, `/client`) — what the server resolved for a File field (`field.resolved`: `maxSizeMB`, `maxTotalMB`, `maxFiles`, `accept`, `extensions`, `typeLabels`); `BuilderFile` (`/client`) — `{ name, size }`, a browser `File` fits. `FormAttachmentsOption`, `FormSubmitEndpointOptions`, `FormFileType`, `FormFileDetect`, `FormFileScanInput`, `FormFileScanResult` (root) — the `forms.attachments` option, its `submit` gates, a file type and its `detect`, and the `scan` hook's input and result. `BuilderFormProps`, `BuilderFormClassNames`, `BuilderFieldRenderArgs`, `BuilderFormAction`, `BuilderFormApi`, `UseBuilderFormOptions` (`/client`) — `BuilderForm` props/classes/`renderField`, the bound action and the `useBuilderForm` result. `RenderFormProps`, `SendFormAction`, `PrepareBuilderFormArgs`, `PreparedBuilderForm` (`/rsc`) — `RenderForm` props, `sendForm` signature, `prepareBuilderForm` input/output. `SubmitFormArgs`, `SubmitFormResult`, `SubmitActionResult` (`/server`) — `submitForm` arguments and result codes, and the `sendForm` result (`{ success, message, reason?, field? }`). `FormErrors`, `FormSubmitAction`, `Validator`, `Rule` (root, `/client`), `ContactFormValues`, `ContactFormErrors`, `SubmitAction` (`/client`) — `useForm`/`useContactForm` and validator types. `FormAnalyticsConfig` (`/client`) — form analytics configuration from the panel. `FormsOption`, `FormsCollectionOverrides`, `FormsFieldsOverride` (root) — the plugin's `forms` option and collection overrides.

## Links (`links`) — details: `node_modules/@intecion/ipal-kit/docs/links.md`

| Export | Import from | What it does / when |
|---|---|---|
| `buildLinkField(options?)` | `@intecion/ipal-kit` | ONE link field (group): page / URL (also mailto:, tel:, #) / file + label, new tab, `appearance`; `CmsLink*` type in payload-types. Use it for every CTA instead of your own `ctaLabel`/`buttonUrl` |
| `buildLinksField(options?)` | `@intecion/ipal-kit` | Array of 0..N links (`links`, max 2 by default, "Button" rows) — section buttons |
| `resolveLinkHref(link, { locale, config, homeSlug?, archives?, pagesSlug? })` | `@intecion/ipal-kit` | Link value → href or `null` (empty / page missing in the language / unsafe URL); the page must be populated |
| `resolveLink(link, options)` | `@intecion/ipal-kit` | Panel link → `ResolvedLink` (`href`, `label`, `newTab`, `internal`, `targetProps`, `appearance`) or `null` — for your own `CMSLink` |
| `resolveNav(items, { locale, config, homeSlug?, linkField?, childrenField? })` | `@intecion/ipal-kit` | Menu items from the Header/Footer global → serializable `NavItem[]` (any depth, dead links skipped) |
| `resolveSystemLinks(settings, { locale, config, roles?, … })` | `@intecion/ipal-kit` | Links to system pages from Site settings (privacy/cookies/terms) with the page title as the label → `SystemLink[]`; in a project usually `getSystemLinks` from `lib/content` |
| `homeSlugFrom(settings, field?)` | `@intecion/ipal-kit` | Homepage slug from `SiteSettings.homepage` (populated) or `undefined` |
| `safeHref(url)` | `@intecion/ipal-kit` | The URL when safe (http(s), mailto, tel, sms, #, `/` path), otherwise `null` — blocks `javascript:`/`data:` |

**Types:** `BuildLinkFieldOptions`, `BuildLinksFieldOptions`, `LinkAppearance`, `LinkAppearanceOption` — link field options and styles; `LinkValue`, `ResolveLinkHrefOptions`, `ResolvedLink`, `NavItem`, `ResolveNavOptions`, `SystemLink` — panel link value, resolver options and results.

## MCP (`mcp`) — details: `node_modules/@intecion/ipal-kit/docs/mcp.md`

| Export | Import from | What it does / when |
|---|---|---|
| `createMcpRoute({ getCachedPayload, config, baseUrl?, serverName?, … })` | `@intecion/ipal-kit` | Read-only MCP server for the site (JSON-RPC: `get_site_info`, `list_pages`, `search_content`, `get_page`) as a route handler → `{ GET, POST }` in `app/api/mcp/route.ts`; with a per-IP rate limit. Usually through `mcpGET`/`mcpPOST` from `lib/content` |

## Image lightbox (`lightbox`) — details: `node_modules/@intecion/ipal-kit/docs/lightbox.md`

| Export | Import from | What it does / when |
|---|---|---|
| `LightboxProvider({ texts?, classNames?, icons?, loop?, unstyled?, renderImage?, renderDialog? })` | `@intecion/ipal-kit/client` | One shared viewer for the site (or `<SiteProviders lightbox>`); renders nothing until an image is opened |
| `LightboxTrigger({ image, group?, children, className?, style?, unstyled?, texts?, 'aria-label'? })` | `@intecion/ipal-kit/client` | `<button>` around any thumbnail that opens the large image; same `group` = one gallery in page order; works without a provider (own viewer) |
| `useLightbox()` / `useOptionalLightbox()` | `@intecion/ipal-kit/client` | `open(images, index, returnFocus)`, `openGroup(group, start)`, `next`, `previous`, `close`, `isOpen`, `index`, `images`, `texts` — for your own controls; the optional one returns `null` outside a provider |
| `LightboxDialog({ images, index, onClose, onIndexChange, … })` | `@intecion/ipal-kit/client` | The viewer itself, controlled (dialog role, focus trap and return, Esc, arrows, Home/End, swipe, counter, caption, scroll lock, reduced motion) |
| `lightboxImage(media, { size?, sizes?, srcSet?, alt?, caption? })` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Payload media doc → `LightboxImage` (`src` from `size`, `srcSet` from every Payload size + original, alt, caption) or `null` (video, PDF, id) |
| `withLightboxUploads(converters?, { group?, image?, triggerClassName? })` | `@intecion/ipal-kit/rsc` | Wraps rich text image uploads in `LightboxTrigger` on top of your converters (`RenderRichText lightbox` uses it) |
| `LIGHTBOX_FALLBACK`, `resolveLightboxTexts(texts)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | English labels; partial texts → full set (empty → fallback) |
| `LIGHTBOX_FALLBACK_PL`, `lightboxFallback(locale)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Polish lightbox labels; set for a page language. `resolveLightboxTexts(texts, locale)` uses it |
| `lightboxIndex(index, delta, total, loop?)`, `formatLightboxCounter(template, current, total)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Wrap / clamp a gallery index; "{current} / {total}" → "2 / 5" |
| `prefersReducedMotion()` | `@intecion/ipal-kit/client` | OS reduced motion or the AccessibilityWidget switch (`data-a11y-motion="reduce"`) |
| `lightboxNotificationFields` | `@intecion/ipal-kit` | The Form messages → Image viewer field group (added by `ipalKit({ lightbox: true })`) — to place in your own global |

**Types:** `LightboxImage`, `LightboxTexts`, `LightboxClassNames`, `LightboxRenderImage`, `LightboxImageOptions` (root and `/client`); `LightboxApi`, `LightboxProviderProps`, `LightboxTriggerProps`, `LightboxDialogProps` (`/client`); `RichTextLightboxOptions` (`/rsc`). Styling: `--ipal-lightbox-*` CSS variables, `data-ipal="lightbox…"` hooks.

## Media (`media`) — details: `node_modules/@intecion/ipal-kit/docs/media.md`

| Export | Import from | What it does / when |
|---|---|---|
| `mediaImageProps(resource, { sizes?, priority?, alt?, placeholderColor? })` | `@intecion/ipal-kit` | `next/image` props for an image upload (dimensions, focal point → `objectPosition`, blur placeholder, `preload` for LCP) or `null` (video/PDF/ID) — for your own `<Media>` |
| `videoProps(resource, { mode?, poster?, reducedMotion? })` | `@intecion/ipal-kit` | `<video>` attributes for a video upload (`'background'`: autoplay/muted/loop; `'player'`: controls, `preload="none"`) or `null` |
| `MEDIA_SIZES` | `@intecion/ipal-kit` | Ready constant `sizes` values: `full`, `half`, `third`, `quarter`, `thumb` |
| `normalizeFilename(filename)` | `@intecion/ipal-kit` | Slugifies a file name, keeping the extension (`"Zdjęcie 1.JPG"` → `"zdjecie-1.jpg"`) |
| `normalizeFilenameHook` | `@intecion/ipal-kit` | `beforeOperation` hook for an upload collection (Media) that normalizes the file name; the project adds it to its Media collection |
| `buildOptimizeUploadHook(options?)` | `@intecion/ipal-kit` | `beforeOperation` hook: blocks oversized JPG/PNG/video, converts the image to WebP after the editor agrees (sharp from `buildConfig`); the project adds it to Media |
| `buildOptimizeUploadField(name?)` | `@intecion/ipal-kit` | "Optimize this upload" consent checkbox (default `optimizeOnUpload`) for Media, paired with `buildOptimizeUploadHook` |
| `buildMediaPlaceholderHook({ field?, size? })` | `@intecion/ipal-kit` | `beforeOperation` hook that computes a tiny blur preview (base64 WebP) and the dominant colour on upload; the project adds it to Media |
| `buildMediaPlaceholderField(name?)` | `@intecion/ipal-kit` | Hidden field group for the placeholder (read by `mediaImageProps`), paired with `buildMediaPlaceholderHook` |

**Types:** `MediaImageOptions`, `MediaImageProps`, `VideoMode`, `VideoProps` — options and result of `mediaImageProps`/`videoProps`; `OptimizeUploadOptions` — limits and quality of `buildOptimizeUploadHook`.

## Notifications (`notifications`) — details: `node_modules/@intecion/ipal-kit/docs/notifications.md`

| Export | Import from | What it does / when |
|---|---|---|
| `getNotificationTexts({ payload, locale? })` | `@intecion/ipal-kit` | Reads the Form messages global (`notifications`) in a language → `NotificationTexts` (`form.success`, `error`, `validation`, `next`, `back`, `stepOf`, …) with an EN fallback per field; source of `texts` for `RenderForm` (usually `getFormTexts` from `lib/content`) |
| `resolveFormMessage(result, texts)` | `@intecion/ipal-kit` | `SubmitFormResult` code → text from the panel (`{field}` filled in for `validation`, `error` without exception details); `createSubmitAction` calls it itself |
| `NOTIFICATION_FALLBACK` | `@intecion/ipal-kit` | Constant: built-in English `form.*` texts used when a panel field is empty |
| `NOTIFICATION_FALLBACK_PL`, `notificationFallback(locale)` | `@intecion/ipal-kit` | Polish defaults; picks the set for a page language (`pl` → Polish, else English) |

**Types:** `NotificationTexts`, `FormNotificationTexts` — resolved notification texts (`form` group; `lightbox` group = `LightboxTexts`, see Image lightbox).

## System pages (`pages`) — details: `node_modules/@intecion/ipal-kit/docs/pages.md`

| Export | Import from | What it does / when |
|---|---|---|
| `unlistedPageIds(settings)` | `@intecion/ipal-kit` | Site settings → ids of pages with no URL of their own (the assigned 404 page, unless it is the homepage) — the sitemap, llms.txt and the site index skip them; use it in your own page lists |
| `getSystemPagePath({ page, locale, config, homeSlug? })` | `@intecion/ipal-kit` | Page assigned in Site settings (read with `locale: 'all'`) → path in the language (`/pl` for the homepage, `/en/privacy-policy`) or `undefined` |
| `ALL_SYSTEM_PAGE_ROLES` | `@intecion/ipal-kit` | Constant: all system page roles in a fixed order: `homepage`, `notFound`, `privacyPolicy`, `cookiePolicy`, `termsOfService` |
| `LocaleView({ views, defaultLocale })` | `@intecion/ipal-kit/client` | Picks, from ready per-language views, the one from the URL (`/en/...`) — in `not-found.tsx` without `headers()` (the route stays static); used by `createNotFoundPage` |
| `NotFoundLoader({ load, locales, defaultLocale })` | `@intecion/ipal-kit/client` | Lazy 404 content: fetches the view from a server action only when the 404 is shown (smaller RSC payload on every page); used by `createNotFoundPage(content, { load })` |

**Types:** `PagesOption` (the plugin's `pages: { slug, roles? }` option), `SystemPageRole` (system page role).

## Payload globals (`payload`) — details: `node_modules/@intecion/ipal-kit/docs/payload-helpers.md`

| Export | Import from | What it does / when |
|---|---|---|
| `getSiteSettings<T>(payload, { locale?, depth? })` | `@intecion/ipal-kit` | Reads the Site settings global (generated type `SiteSetting` as `T`) |
| `getSiteIntegrations<T>(payload, { locale?, depth? })` | `@intecion/ipal-kit` | Reads the Site integrations global with secrets (the Local API bypasses access) — server only, never raw to the client |
| `getGlobal<T>(payload, slug, { locale?, depth? })` | `@intecion/ipal-kit` | Thin `payload.findGlobal` wrapper for any global (the project's too) |
| `SITE_SETTINGS_SLUG` | `@intecion/ipal-kit` | Constant: global slug `'site-settings'` |
| `SITE_INTEGRATIONS_SLUG` | `@intecion/ipal-kit` | Constant: global slug `'site-integrations'` |
| `applyGlobalOverrides(globals, overrides)` | `@intecion/ipal-kit` | Applies `ipalKit({ globalOverrides })` to the plugin's globals: an object merges `access` / `admin` / `hooks` key by key (your keys win, your hooks run after the plugin's), other keys replace; a function `(global) => global` takes over. The plugin calls it itself — pass `globalOverrides`, do not call. |
| `applyCollectionOverride(collection, override)` | `@intecion/ipal-kit` | Same rules for one collection: an object merges `access` / `admin` / `hooks` key by key, other keys replace; a function takes over. The plugin applies `consentLog.collectionOverrides` and `stats.collectionOverrides` with it; use it on your own builder output (e.g. `buildConsentLogCollection()`). |

**Types:** `GlobalQueryOptions` — `{ locale?, depth? }` of the global helpers; `IpalGlobalSlug` (`'site-settings' \| 'site-integrations' \| 'cookie-settings' \| 'notifications'`), `GlobalOverride` (object or function), `GlobalOverrides` (map slug → override) — the `globalOverrides` option. `CollectionOverride` (object or function) — `consentLog.collectionOverrides` / `stats.collectionOverrides`.

## Rich text (`richtext`) — details: `node_modules/@intecion/ipal-kit/docs/richtext.md`

| Export | Import from | What it does / when |
|---|---|---|
| `RenderRichText({ data, converters?, className?, headingIds?, lightbox?, safeLinks? })` | `@intecion/ipal-kit/rsc` | Renders a richText (Lexical) field through Payload's official converter; `lightbox` = click-to-enlarge images (lightbox.md); your own classes via `converters`, `headingIds` adds anchors to headings (the same ids as `extractHeadings`). Unsafe link URLs (`javascript:`, `data:`…) render as `#`; `safeLinks={false}` turns that off (fully trusted content only). Instead of a hand-written renderer. |
| `extractHeadings(data, { levels? })` | `@intecion/ipal-kit`, `@intecion/ipal-kit/rsc` | List of headings `{ id, level, text }` (h2 by default) for a table of contents — ids match `RenderRichText headingIds`. |
| `headingText(node)` | `@intecion/ipal-kit` | Plain text of a Lexical node (a heading with bold, links…). |
| `buildTableOfContentsField({ name? })` | `@intecion/ipal-kit` | `tableOfContents` group field (show + localized label) for a text block/section — table of contents toggle in the panel. |
| `TableOfContents({ items, label?, classNames?, offset? })` | `@intecion/ipal-kit/client` | Unstyled table of contents (`<nav>` with links); in the browser it highlights the section being read (`aria-current`, `classNames.linkActive`). Feed it `extractHeadings`. |
| `lexicalToMarkdown(data)` | `@intecion/ipal-kit` | Lexical → Markdown (no dependencies) — for AI output (page Markdown, llms-full.txt); not for rendering on the page. |

**Types:** `ExtractHeadingsOptions`, `HeadingItem`, `HeadingLevel` (root) — heading extraction options and result; `RenderRichTextProps` (`/rsc`) — renderer props; `TableOfContentsProps`, `TableOfContentsClassNames` (`/client`) — table of contents props and classes.

## Seeding (`seed`) — details: `node_modules/@intecion/ipal-kit/docs/seeding.md`

Server only (`pnpm payload run`); never import it from client code, the Payload config or a route.

| Export | Import from | What it does / when |
|---|---|---|
| `createSeeder(payload, { dryRun?, update?, force?, only?, guard?, editCheck?, context?, pagesCollection?, formsCollection?, label?, log? })` | `@intecion/ipal-kit/seed` | The seed rules in one place → `{ upsertBySlug, upsertBy, fillGlobal, summary, dryRun, update, force, local, only }`. `only` (or `SEED_ONLY`) = the records the run may touch (`pages:kontakt`, `forms:<title>`, `global:<slug>`, `pages:*`), the rest → `skip (not listed)`; a run without it against production / a non-local database throws unless `IPAL_SEED_ALLOW_FULL=1` / `guard.allowFull: true` (after launch: named records only; dry runs are never refused; `guard: false` turns every guard off). Create-only by default, natural keys, never deletes, globals: empty fields only, every locale with `fallbackLocale: false` onto the same row ids, skips records edited since seeding, writes with `context` `{ ipalSeed, disableRevalidate, ipalSkipIndexNow }`. Throws when `update` runs on production / a non-local database without `IPAL_SEED_ALLOW_PROD_UPDATE=1`. Both seed templates use it. |
| `upsertBySlug(collection, data \| data[], { slugField? })` | (method of `createSeeder`) | Matches by the default-locale slug; an array creates missing records first, so `{ $page: 'slug' }` links work in any order; `{ $form: 'title' }` = the form's id (`formsCollection`, default `forms`). A required field (layout) with references is written complete in the first write; a link to a page later in the same call waits for it; required cycles and unknown targets are an error with nothing written; the dry run reports the same. |
| `upsertBy(collection, key, data)` | (method) | Matches by other keys, e.g. a form by `{ title }`. |
| `fillGlobal(slug, data)` | (method) | Fills only empty fields of a global — a choice (select, radio, checkbox, number, date) still at its `defaultValue` counts as empty, text never does; a field already holding the seeded value is skipped (all seeded fields with `update` when untouched). |
| `summary()` | (method) | Prints and returns `{ created, skipped, updated, skippedEdited, notListed, errors }`; exit 1 when `errors`. |
| `guardSeedExit({ label?, log?, process? })`, `activeSeedExitGuard()` | `@intecion/ipal-kit/seed` | Call first in a seed script: a run that ends before Payload initializes or before `summary()` (Node exiting through an empty event loop under `payload run`) prints `[seed] ended before …` and exits 1 instead of a silent 0. `createSeeder` / `summary()` report to it; `dispose()` stops it. |
| `isLocalDatabase(url, { localHosts? })` | `@intecion/ipal-kit/seed` | `true` for SQLite files, Unix sockets, localhost / 127.0.0.1 / ::1 (+ `SEED_LOCAL_HOSTS`). |
| `writeLocales(payload, target, data, { context?, draft? })` | `@intecion/ipal-kit/seed` | Writes seed values (`{ pl, en }` per field, or a whole array per locale) to `{ collection, id }` or `{ global }`: default locale first, then every other locale with `fallbackLocale: false` onto the same row ids (shared rows of non-localized arrays and blocks; a `localized: true` field keeps rows per locale). |
| `seedHash(value)` | `@intecion/ipal-kit/seed` | Stable hash for the hidden `seedHash` field (key order, row ids, nulls ignored). |
| `projectOnto(seed, current)` | `@intecion/ipal-kit/seed` | Current values at the keys the seed writes — hash them to compare with the stored hash. |
| `editedSinceSeed({ doc, currentHash?, hashField?, untouchedSeconds? })` | `@intecion/ipal-kit/seed` | `null` = untouched; otherwise the reason (stored hash differs / `updatedAt` too late after `createdAt`). |

**Types:** `SeedExitGuard`, `SeedExitGuardOptions`, `SeedExitProcess` — the early-exit guard; `Seeder`, `SeederOptions`, `SeedResult`, `SeedStatus`, `SeedSummary`, `UpsertOptions` — the seeder, its options and results; `SeedValue`, `SeedTarget`, `WriteLocalesOptions`, `EditedSinceSeedArgs` — building-block inputs (all `/seed`).

## Security (`security`) — details: `node_modules/@intecion/ipal-kit/docs/security.md`

| Export | Import from | What it does / when |
|---|---|---|
| `buildSecurityHeaders({ hsts?, csp?, additional?, coop?, frameOptions?, permissionsPolicy?, referrerPolicy?, … })` | `@intecion/ipal-kit` | Returns `SecurityHeader[]` (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP; with `IPAL_NOINDEX` also `X-Robots-Tag`) for `headers()` in `next.config.ts`. `csp` = `buildCsp` args → the CSP header (+ `Reporting-Endpoints` with `reportUri`); off by default. `additional` overrides by key. |
| `withSecurityConfig(nextConfig, { hidePoweredBy? })` | `@intecion/ipal-kit` | Next config wrapper: `poweredByHeader: false` + drops `X-Powered-By` from `headers()` (Next's "Next.js" and withPayload's "Next.js, Payload"). `withPayload(withSecurityConfig(nextConfig))`; `hidePoweredBy: false` = no change. |
| `secondFactorPassed(req)` | `@intecion/ipal-kit` | `boolean` with `req` (`{ payload, user }`): `false` only for an account of the 2FA collection that has TOTP set up and has not entered the code in this session (password only). `true` for a full login, an API key, an account that has not set TOTP up yet, accounts of other auth collections, no user, and with `twoFactor: false`. Guard your own endpoints with it: `if (!req.user \|\| !secondFactorPassed(req)) return 403`. |
| `safeAdminBack(back, { adminRoute, origin? })` | `@intecion/ipal-kit` | The default `back` rule of the 2FA screens: returns `back` as a path when it resolves to the site's origin (the placeholder origin for relative values, `origin` for absolute ones), over HTTP(S), without credentials, inside `adminRoute`; otherwise the admin root. `safeAdminBack('javascript:alert(1)', { adminRoute: '/admin' })` → `'/admin'`; `safeAdminBack('/admin/collections/pages?page=2', { adminRoute: '/admin' })` → the same path. Use it in your own rule or view. |
| `wrapTotpViews(views, added, rule?, wrapper?)` | `@intecion/ipal-kit` | Puts `SafeTotpView` in front of the views whose route is `setup-totp` / `verify-totp` and for which `added(key)` is true (keeps `exportName`, `serverProps`; `clientProps` travel as `ipalTotpClientProps`); returns `{ views, dependencies }` (`dependencies` → `admin.dependencies`, so the wrapped views stay in the import map). What `ipalKit` runs after the 2FA factory; for a project that registers the 2FA package itself. |
| `copyViews(views)` / `changedViewKeys(before, after)` | `@intecion/ipal-kit` | The comparison `ipalKit` uses to tell which views a 2FA factory registered: put `copyViews(views)` into the config before calling the factory, then `changedViewKeys(before, viewsAfter)` gives the keys whose view object changed — the `added` argument of `wrapTotpViews` (`(key) => keys.has(key)`). By object, not by key: the 2FA package replaces a view that already stands under its keys. Example: security.md "Your own 2FA screen". |
| `SAFE_TOTP_VIEW` / `totpViewImportKey(component)` | `@intecion/ipal-kit` | `'@intecion/ipal-kit/admin#SafeTotpView'`, the wrapper's import-map path (the default `wrapper` of `wrapTotpViews`); and the import-map key (`path#export`) of a component given as a string or `{ path, exportName }`. |
| `findImportMapFile(config, cwd?)` / `missingImportMapEntries(config, entries, cwd?)` | `@intecion/ipal-kit` | Where the project's `importMap.js` is on disk (`admin.importMap.importMapFile`, else `app/(payload)<admin route>/` or `src/app/…` under `admin.importMap.baseDir` / the working directory; `null` when not found), and which of `entries` its text does not contain (`{ file, missing }`). A hint from the file on disk, not the map in the build: warn on it, never block on it. Behind `twoFactor.importMapCheck`. |
| `buildSetupFields({ statusField? })`, `stampSetupFrom`, `backfillSetupFrom(payload, collection)` | `@intecion/ipal-kit` | The parts of "2FA setup required" for a project that wires them itself: the fields for the 2FA collection (`totpSetupFrom`, and the panel's `totpSetupStatus` unless `statusField: false`), the `beforeChange` hook that stamps the window start (on create, and when an account loses its TOTP secret), and the start-up step that gives accounts without TOTP and without a start their window (returns how many; once per account). |
| `buildTwoFactorResetEndpoint(collection, { access? })`, `TWO_FACTOR_RESET_PATH` | `@intecion/ipal-kit` | `POST /api/ipal/two-factor/reset` `{ userId }`: clears the account's TOTP secret and sessions and starts a new window. Default: a staff admin whose session entered its own TOTP code; `access` replaces that (only `true` allows; a session that owes its code is always refused). `ipalKit` registers it only with `twoFactor.guard` on. |
| `countAccountsWithoutTotp(payload, collection, setupWindowMs?)` | `@intecion/ipal-kit` | `{ without, blocked }` — accounts of the 2FA collection without TOTP, and how many are past their window. |
| `resolveRequireSetup(option)`, `strictExempt(fn)`, `SETUP_FROM_FIELD`, `DEFAULT_SETUP_WINDOW_HOURS` | `@intecion/ipal-kit` | `twoFactor.requireSetup` → `{ requireSetup, setupWindowMs, exempt? }` as the guard reads it (throws on a `windowHours` that is not a number ≥ 0 or `false`, and on an `async` `exempt`); the wrapper that makes an `exempt` function answer `true` only for exactly `true`; the field name `'totpSetupFrom'`; `72`. |
| `fetchPublicImage(url, base)`, `publicImageDataUri(url, base)`, `rasterImageType(bytes)`, `siteOrigin(serverURL)`, `PUBLIC_IMAGE_MAX_BYTES` | `@intecion/ipal-kit` | An image fetched the way an anonymous visitor gets it (no cookies; http(s) only; `image/*`; at most 512 KB, reading stops at the limit) as `{ bytes, type }` or a `data:` address, else `null`. Used for the logo and icon on the 2FA screens. `rasterImageType(bytes)` → the media type of a bitmap by its first bytes (PNG, JPEG, GIF, WebP, ICO, AVIF) or `null` — never trust a claimed type before answering a file's bytes from the site's origin; an SVG gives `null`. |
| `UPLOAD_SECURITY_HEADERS` | `@intecion/ipal-kit` | The two headers of `buildUploadSecurityHeaders` (`Content-Security-Policy: default-src 'none'; … sandbox`, `X-Content-Type-Options: nosniff`) for a route of your own that returns an uploaded file's bytes from the site's origin. In a Next project a site-wide `headers()` rule with the same key overrides a header the route sets itself: add a `headers()` rule for the path after the site-wide one (as `buildUploadSecurityHeaders({ collections, adminIcon })` does for the upload routes and `/api/ipal/admin-icon`), and never answer with an SVG. |
| `twoFactorSetupState(req)`, `twoFactorSetupDeadline(req)` | `@intecion/ipal-kit` | Where an account stands with TOTP setup, from `{ payload, user }`: `'set-up'`, `'open'` (may set it up now), `'closed'` (the setup window has passed: blocked until an admin reopens it), `'exempt'` (`requireSetup.exempt`, or `requireSetup: false`), `'not-applicable'` (no user, another collection, 2FA off); and the moment setup closes (`Date`, or `null` without a window). Types: `TwoFactorSetupState`, `RequireSetupOptions`. |
| `requireSecondFactor(access?)` | `@intecion/ipal-kit` | Wraps an `Access` function: refused while the second factor is owed, otherwise the function itself (Payload's default "logged in" when none). ipalKit applies it to every collection and global in the config, and to those added by plugins listed after it (in `onInit` and at the start of the first request, so also after a dev hot reload); use it for access functions that are not part of the config. Per-entity opt-out: `custom.ipal.secondFactor: false \| { read: false }` or the package's `custom.totp.disableAccessWrapper`. Wrapping twice is harmless. |
| `totpRedirectTarget({ adminRoute, forceSetup?, pathname, user, excludePaths? })`, `totpAdminPath(adminRoute, path)` | `@intecion/ipal-kit` | The 2FA redirect rules as pure functions: the setup / verify URL (with `back`) to send this user to, or `null` (no path, api key, already on a TOTP screen or logout). For an own `twoFactor.provider`. Types `TotpRedirectArgs`, `TotpUser` |
| `buildCsp({ mode?, reportUri?, reportGroup?, r2Url?, analytics?, metaPixel?, linkedIn?, tiktok?, clarity?, turnstile?, youtube?, googleMaps?, nonce?, strictDynamic?, dev?, extra?, override? })` | `@intecion/ipal-kit` | Returns `{ key, value }` with a hardened CSP (`base-uri`, `object-src`, `frame-ancestors`, `form-action`) + sources for the enabled integrations. `mode: 'report-only'` → `…-Report-Only` (start here), `'enforce'` later. `extra` adds to any directive, `override` replaces / drops one (`null`). `dev` (default `NODE_ENV === 'development'`) adds `'unsafe-eval'`. `nonce` → `'nonce-…' 'strict-dynamic'`. |
| `buildCspHeaders(args)` | `@intecion/ipal-kit` | `[csp, Reporting-Endpoints]` (the second only with `reportUri`). |
| `buildAdminCsp(args)` / `buildAdminCspHeaders(args)` | `@intecion/ipal-kit` | Looser policy for Payload's admin: Monaco from `cdn.jsdelivr.net`, `blob:` workers, `https:` images, Live Preview `frame-src 'self'`, `frame-ancestors 'self'`. Rule `{ source: '/admin/:path*', headers: buildAdminCspHeaders({ mode, reportUri }) }` AFTER the site-wide rule. |
| `createCspReportRoute({ onReport?, maxBytes? })` | `@intecion/ipal-kit` | `POST` handler for `reportUri` (`src/app/api/csp-report/route.ts`): both report formats, body cap 16 KB, always `204`; default sink = one `[csp] …` `console.warn` line per violation (Coolify logs). |
| `parseCspReports(body)` | `@intecion/ipal-kit` | Normalises a report body (`csp-report` object or Reporting API array) to `CspViolation[]` — for your own collector. |
| `buildReportingEndpoints(url, group?)`, `cspHeaderKey(mode?)`, `DEFAULT_CSP_REPORT_GROUP` | `@intecion/ipal-kit` | Building blocks: the `Reporting-Endpoints` header, the header name for a mode, the default `report-to` group (`'csp-endpoint'`). |
| `createCspNonce()`, `CSP_NONCE_HEADER` | `@intecion/ipal-kit/next/middleware`, `@intecion/ipal-kit` | A per-request nonce and the request header (`x-nonce`) `createProxy({ csp })` passes it in — for your own proxy. Nonces make pages dynamic (no ISR). |
| `buildUploadSecurityHeaders({ collections? })` | `@intecion/ipal-kit` | `headers()` entries for `/api/<upload>/file/*` (`media` by default): files from disk are displayed, never executed (sandbox). Needed for media without R2. |

**Types:** `BuildCspArgs`, `BuildAdminCspArgs`, `BuildSecurityHeadersArgs`, `WithSecurityConfigOptions`, `CreateCspReportRouteArgs` — builder options; `CspDirective`, `CspSources` — directive names / sources per directive; `CspViolation` — one normalised report; `SecurityHeader` — `{ key, value }` in the Next.js shape.

## SEO (`seo`) — details: `node_modules/@intecion/ipal-kit/docs/seo.md`

Most routes and metadata are already ready in `createContentHelpers` (`generatePageMetadata`, `sitemap`, `sitemapRoute`, `robots`, `llmsRoute`, `llmsFullRoute`, `manifest`, `indexNowKeyRoute`, `getPageJsonLd`, `getSiteShell().jsonLd`) — the functions below are their building blocks; reach for them when a route does not follow the conventions.

### Metadata (generateMetadata)

| Export | Import from | What it does / when |
|---|---|---|
| `createPageMetadata({ config, baseUrl, content?, … })` | `@intecion/ipal-kit` | Page metadata generator with the plugin's convention resolvers wired in (Pages, SiteSettings, `meta`, System pages, archives); call it with `{ payload, locale, slug }`. Normally through `generatePageMetadata` from `createContentHelpers`. |
| `createMetadataGenerator({ config, baseUrl, resolveDocument, … })` | `@intecion/ipal-kit` | As above, but with your own resolvers — for routes with non-standard conventions. |
| `buildMetadata({ meta, siteName, locale, config, slugs, baseUrl, … })` | `@intecion/ipal-kit` | Builds a Next.js `Metadata` object (title, canonical, hreflang, OG, Twitter, robots) from ready data; fetches nothing. The lowest level. |
| `composeTitle({ pageTitle, siteName, separator?, order? })` | `@intecion/ipal-kit` | Full title "Page \| Company" (or the other way round), without duplicating the site name. |
| `buildHreflangAlternates({ slugs, config, baseUrl? })` | `@intecion/ipal-kit` | Map locale → URL for `alternates.languages`. |
| `slugsAcrossLocales({ payload, collection, id, config })` | `@intecion/ipal-kit` | Document slug in all languages (separate query, depth 0) — input for hreflang. |
| `readSiteMetaConfig({ payload, locale, pagesSlug?, settingsSlug?, settings? })` | `@intecion/ipal-kit` | Reads from SiteSettings: site name, separator (with padding), title order, homepage slug per language, default description and OG image. |
| `buildIconsMetadata(favicon)` | `@intecion/ipal-kit` | `icons` (favicon, apple-touch-icon) from the favicon upload in the panel — once in the root layout `generateMetadata`. |
| `verificationFrom(settings)` | `@intecion/ipal-kit` | Site settings → Search engines verification codes → Next `Metadata.verification` (`google`, `yandex`, `other['msvalidate.01']` for Bing); `undefined` when every field is empty. `generatePageMetadata` adds it itself — by hand only in your own metadata. |
| `createManifestHandler({ getCachedPayload, config, settingsSlug? })` | `@intecion/ipal-kit` | `app/manifest.ts` handler from SiteSettings; without a database at build time it returns a minimal manifest. Usually `manifest` from `createContentHelpers`. |
| `NoSnippet({ as?, children })` | `@intecion/ipal-kit/client`, `@intecion/ipal-kit/rsc` | Wrapper with `data-nosnippet` — keeps repeated text (footer: address, hours, phone) out of Google snippets. Do not wrap `<main>`. |

### JSON-LD (schema.org)

| Export | Import from | What it does / when |
|---|---|---|
| `JsonLdGraph({ schemas })` | `@intecion/ipal-kit/rsc` | Renders nodes as one `@graph` in `<script type="application/ld+json">` with safe serialization; skips null. Instead of a hand-written `<script>`. |
| `buildWebSiteJsonLd({ name, url, search? })` | `@intecion/ipal-kit` | WebSite (optionally SearchAction). Site-wide; `getSiteShell().jsonLd` already includes it. |
| `buildOrganizationJsonLd({ name, url, logo?, sameAs? })` | `@intecion/ipal-kit` | Organization (brand, logo, profiles). Site-wide; `getSiteShell().jsonLd` already includes it. |
| `sameAsUrls(settings)` | `@intecion/ipal-kit` | Profile URLs from SiteSettings → `sameAs` for Organization/LocalBusiness. |
| `buildLocalBusinessJsonLd({ name, url, telephone?, address?, openingHours?, … })` | `@intecion/ipal-kit` | LocalBusiness (local SEO); data from the panel, you can override `@type` with a subtype. |
| `formatOpeningHours(input)` | `@intecion/ipal-kit` | Hours typed in human form (PL/EN/DE) → `string[]` in the schema.org `openingHours` format; skips unreadable ones. |
| `buildWebPageJsonLd({ name, url, description?, inLanguage?, dateModified?, … })` | `@intecion/ipal-kit` | WebPage for a single page; `getPageJsonLd` from `createContentHelpers` builds it itself. |
| `buildBreadcrumbJsonLd(crumbs)` | `@intecion/ipal-kit` | BreadcrumbList from `[{ name, url }]`; null for ≤1 item. `getPageJsonLd` builds it itself. |
| `buildFaqJsonLd(items)` | `@intecion/ipal-kit` | FAQPage from `[{ question, answer }]` visible on the page; null for an empty list. |
| `buildArticleJsonLd({ headline, url, datePublished, author?, image?, type?, … })` | `@intecion/ipal-kit` | Article/BlogPosting for entries; `getPageJsonLd` builds it for content collections. |
| `buildProductJsonLd({ name, url, sku?, image?, price?, … })` | `@intecion/ipal-kit` | Product (Offer only when there is a price — "price on request" without Offer). |
| `buildServiceJsonLd({ name, providerName, url, areaServed?, … })` | `@intecion/ipal-kit` | Service for a service page. |
| `buildSpeakableJsonLd({ url, cssSelectors?, id? })` | `@intecion/ipal-kit` | WebPage with `speakable` — points to the parts for assistants to read/quote. |
| `buildSiteNavigationJsonLd(items)` | `@intecion/ipal-kit` | SiteNavigationElement from `[{ name, url }]`; null for empty navigation. |
| `buildNavigationJsonLd({ items, baseUrl, locale, config, homeSlug })` | `@intecion/ipal-kit` | The same straight from the Header global's `navItems` (resolves links per language, skips external ones, deduplicates). |

### Sitemap, robots, llms.txt

| Export | Import from | What it does / when |
|---|---|---|
| `buildSitemapEntries({ payload, config, baseUrl, content? })` | `@intecion/ipal-kit` | All public URLs (pages + archives) with hreflang and lastmod; skips drafts and noindex. Usually `sitemap` from `createContentHelpers`. |
| `buildSitemapXml(entries, { cssUrl? })` | `@intecion/ipal-kit` | Serializes entries to XML (optionally with `xml-stylesheet`). |
| `buildSitemapIndexXml(items, { cssUrl? })` | `@intecion/ipal-kit` | `<sitemapindex>` for `[{ url, lastModified? }]` — what `sitemapRoute` serves above `maxUrls`. Only for your own sitemap route. |
| `createSitemapRouteHandler(sitemap, { style?, cssUrl? })` | `@intecion/ipal-kit` | `GET /sitemap.xml` handler (XML + built-in CSS under `?style`). Usually `sitemapRoute` from `createContentHelpers`; do not keep `app/sitemap.ts` next to it. |
| `buildSitemapCss({ title?, credit?, accent? })` | `@intecion/ipal-kit` | CSS for how the sitemap looks in a browser (served by the handler). |
| `SITEMAP_STYLE_PARAM` | `@intecion/ipal-kit` | `'style'` — sitemap URL parameter that returns CSS instead of XML. |
| `DEFAULT_SITEMAP_CREDIT` | `@intecion/ipal-kit` | `'Technology by Intecion.com'` — default line below the sitemap heading. |
| `buildRobots({ baseUrl, aiBots?, disallowParams?, extraDisallow?, … })` | `@intecion/ipal-kit` | `app/robots.ts` rules: blocks admin/API, points to the sitemap, explicitly allows AI bots (`aiBots: 'allow' \| 'block-training' \| 'disallow'`); with `IPAL_NOINDEX` blocks everything. Usually `robots` from `createContentHelpers`. |
| `AI_ASSISTANT_BOTS` | `@intecion/ipal-kit` | List of user agents of AI assistant/search bots (ClaudeBot, PerplexityBot…). |
| `AI_TRAINING_BOTS` | `@intecion/ipal-kit` | List of user agents of model-training crawlers (GPTBot, Google-Extended…). |
| `robotsOptionsFrom(settings)` | `@intecion/ipal-kit` | Site settings → Search engines → AI assistants as `buildRobots` options (`aiBots` unless the policy is `default`, `aiBotRules`; invalid user agents dropped). `getRobots` from `createContentHelpers` uses it — own robots: `buildRobots({ ...robotsOptionsFrom(settings), … })`. |
| `buildLlmsTxt({ payload, config, baseUrl, full?, content?, summaryField?, … })` | `@intecion/ipal-kit` | `/llms.txt` content (or `llms-full.txt` with `full`) from the panel, same rules as the sitemap. |
| `createLlmsTxtRoute({ getCachedPayload, config, baseUrl, full?, … })` | `@intecion/ipal-kit` | Ready `GET` handler for `/llms.txt` / `/llms-full.txt`. Usually `llmsRoute` / `llmsFullRoute` from `createContentHelpers`. |
| `collectSiteIndex({ payload, config, baseUrl?, content?, locales?, … })` | `@intecion/ipal-kit` | Shared index of public documents per language (URL, title, description, dates) — the source for llms.txt, MCP `list_pages`, IndexNow. Use it before you write your own site listing. |

### IndexNow

| Export | Import from | What it does / when |
|---|---|---|
| `buildIndexNowHook({ config, contentCollection?, baseUrl?, settingsSlug? })` | `@intecion/ipal-kit` | `afterChange` hook: after publish, sends the URLs in all languages to IndexNow (in the background, production only). With `ipalKit({ indexNow: true })` the plugin wires it itself on pages and content collections — do not call. |
| `submitToIndexNow({ payload, urls, baseUrl? })` | `@intecion/ipal-kit` | Manual POST of a batch of URLs to IndexNow; never throws, returns `boolean`. |
| `createIndexNowKeyRoute({ getCachedPayload })` | `@intecion/ipal-kit` | `GET` handler for the key file (`/indexnow-key.txt`) for verification. Usually `indexNowKeyRoute` from `createContentHelpers`. |
| `getIndexNowKey(payload)` | `@intecion/ipal-kit` | IndexNow key: env `INDEXNOW_KEY`, then Site integrations; `''` when missing. |
| `INDEXNOW_KEY_ENV` | `@intecion/ipal-kit` | `'INDEXNOW_KEY'` — name of the env variable with the key. |
| `INDEXNOW_KEY_PATH` | `@intecion/ipal-kit` | `'/indexnow-key.txt'` — path of the key file route. |

### Fields, auto-fill, admin

| Export | Import from | What it does / when |
|---|---|---|
| `buildNoindexField(args?)` | `@intecion/ipal-kit` | `noindex` checkbox in the collection sidebar: excludes the page from the sitemap, llms.txt, search, and gives `robots: noindex, follow`. Add it to the collection's `fields` (the plugin does not). |
| `buildSummaryField(args?)` | `@intecion/ipal-kit` | Localized `aiSummary` field (auto-filled from content when empty) — a description for AI; then `summaryField: 'aiSummary'` in llms/search/MCP. |
| `buildAutoFillMetaHook(mapping?)` | `@intecion/ipal-kit` | `beforeChange` hook that fills empty `meta.title`/`meta.description` from content. The plugin wires it itself on the `seo.collections` collections (option `seo.autoFill`) — do not call. |
| `injectAutoFillMeta(config, seo)` | `@intecion/ipal-kit` | Injects the hook above into the SEO collections. The plugin wires it itself — do not call. |
| `TITLE_SEPARATORS` | `@intecion/ipal-kit` | Site settings → Title separator: stored name → character (`{ pipe: '\|', endash: '–', hyphen: '-', middot: '·', slash: '/' }`). Type `TitleSeparatorName`. |
| `titleSeparatorChar(value)` | `@intecion/ipal-kit` | Stored separator value → the character in the title. A name maps through `TITLE_SEPARATORS`; an old stored character (≤ 1.14.4) or a project's own option is returned as is. For a custom title builder. `readSiteMetaConfig` already uses it. |
| `titleSeparatorSql({ table?, column?, direction? })` | `@intecion/ipal-kit` | SQL `UPDATE` that rewrites old separator characters to names (`'up'`) or back (`'down'`). Put it in the Postgres migration after `SET DATA TYPE text;` (ipal-upgrade, CHANGELOG). |
| `SKIP_AUTO_FILL` | `@intecion/ipal-kit` | `'ipalSkipAutoFill'` — `context` key (`context: { [SKIP_AUTO_FILL]: true }`) that turns off meta auto-fill and the AI summary on save (migrations, scripts). |
| `validateFaviconField` | `@intecion/ipal-kit` | `FieldHook` that logs a server warning when the favicon is < 48×48 or not square (never blocks the save). The plugin wires it itself on the favicon field in SiteSettings — call it only for your own favicon field. |
| `DocumentTitle` | `@intecion/ipal-kit/admin` | Client component `{ title }`: sets the browser-tab title of a custom admin view after load, so it follows the admin language (Payload's view `meta.title` is one fixed string). Render it in your view with a translated title; the statistics view uses it. |
| `adminDocumentTitle(title, titleSuffix?)` | `@intecion/ipal-kit` | `"Title - Suffix"` the way Payload builds a tab title — pass `req.payload.config.admin.meta.titleSuffix`. |
| `FaviconCheck` | `@intecion/ipal-kit/admin` | Hint under the site icon in Site settings: the chosen image is under 48×48 px or not square (text in the admin language, saving never blocked). Injected by the plugin; `pnpm generate:importmap`. Props: `fieldPath` (default the field it sits under), `mediaSlug` (`'media'`) — for your own favicon field: `admin.components.afterInput: [{ path: '@intecion/ipal-kit/admin#FaviconCheck', clientProps: { fieldPath: 'icon' } }]`. |
| `faviconProblems(media)`, `FAVICON_MIN_SIZE` | `@intecion/ipal-kit` | The check both use: `{ width, height, mimeType }` → `FaviconProblem[]` (`{ key: 'faviconTooSmall' \| 'faviconNotSquare', width, height }`); SVG and unknown sizes pass. Types: `FaviconProblem` (root), `FaviconCheckProps` (`/admin`). |
| `MetaDescriptionCheck` | `@intecion/ipal-kit/admin` | Hint below the meta description in the SEO tab (description duplicated from the global or another document). Injected by the plugin; after turning the option on, `pnpm generate:importmap`. |

**Types:** `PageMetadata`, `OgImage` — `buildMetadata` result and OG image; `SeoMeta`, `SeoOption`, `AutoFillMapping` — the `meta` group, the plugin's `seo` option and the auto-fill mapping; `SiteMetaConfig` — `readSiteMetaConfig` result; `RobotsOptions`, `RobotsRules` — `buildRobots` options and result; `AiBotsPolicy` (`'allow' \| 'block-training' \| 'disallow' \| false`), `AiBotRule` (`{ userAgent, access: 'allow' \| 'disallow' }`, `aiBotRules`, wins over the policy); `VerificationMetadata` — `verificationFrom` result; `SitemapEntry`, `SitemapRouteOptions`, `SitemapStyleOptions` — sitemap entry, handler and style options; `CollectSiteIndexArgs`, `SiteIndexEntry` — `collectSiteIndex` arguments and entry; `NoSnippetProps` (`/client`, `/rsc`) — `NoSnippet` props.

## Rate limit and client IP (`shared`) — details: `node_modules/@intecion/ipal-kit/docs/forms.md`

| Export | Import from | What it does / when |
|---|---|---|
| `clientIp(source, { header?, trustedProxies? })` | `@intecion/ipal-kit` | Client IP from a `Request` or `Headers` (`clientIp(await headers())` in a server action): `cf-connecting-ip`, `x-real-ip`, then XFF counted from the right; `''` when missing. In production pin `header` (or env `IPAL_IP_HEADER`). |
| `setRateLimitStore(store \| null)` | `@intecion/ipal-kit` | Shared store (e.g. Redis) for all plugin limiters (forms, consents, MCP…); `null` = process memory. Call once at startup when several instances run. |
| `setUnknownIpFactor(n)` | `@intecion/ipal-kit` | Requests with no client IP share one `unknown-ip` bucket with `n` × the limit (every plugin limiter). Call once at startup; `0` = unlimited (only with a limiter in front, e.g. Cloudflare). |
| `UNKNOWN_IP_FACTOR` | `@intecion/ipal-kit` | `20` — the default factor of the no-IP bucket. |

**Types:** `ClientIpOptions` — `clientIp` options; `RateLimitStore` — store contract (`hit(id, cost, windowMs)` → `{ count, resetAt }`).

## Slug (`slug`) — details: `node_modules/@intecion/ipal-kit/docs/slug.md`

| Export | Import from | What it does / when |
|---|---|---|
| `buildSlugField({ from?, name?, localized?, required?, overrides? })` | `@intecion/ipal-kit` | Slug field generated from `title` (by default) only when empty, per language — never overwrites a manual one. For the collection's `fields`. |
| `toSlug(input)` | `@intecion/ipal-kit` | String → URL slug (diacritics, e.g. "Strona główna" → `strona-glowna`). |

## Stats (`stats`) — details: `node_modules/@intecion/ipal-kit/docs/stats.md`

| Export | Import from | What it does / when |
|---|---|---|
| `PageStats({ locale?, endpoint? })` | `@intecion/ipal-kit/client` | Page view beacon to `/api/ipal/hit` (anonymous without consent, with analytics consent the `ipal_vid` cookie). Mount once in the layout inside `<ConsentProvider>` or via `stats` in `<SiteProviders>`. |
| `STATS_SLUG` | `@intecion/ipal-kit` | `'stats-visits'` — slug of the visits collection (added by `ipalKit({ stats })`). |
| `VISITOR_COOKIE` | `@intecion/ipal-kit/client` | `'ipal_vid'` — visitor ID cookie (only after analytics consent). |
| `StatsView` | `@intecion/ipal-kit/admin` | `/admin/stats` view (30 days, top pages, referrers, devices, visitor history). Injected by the plugin; after turning the option on, `pnpm generate:importmap`. |
| `StatsWidget` | `@intecion/ipal-kit/admin` | Dashboard card with a 30-day chart (`stats.dashboard`). Injected by the plugin; after turning the option on, `pnpm generate:importmap`. |
| `StatsNavLink` | `@intecion/ipal-kit/admin` | Link to `/admin/stats` in the panel nav. Injected by the plugin; after turning the option on, `pnpm generate:importmap`. |

**Types:** `StatsOptions` — the `ipalKit({ stats })` option (`dashboard`, `retentionDays`, `timeZone`); `StatsVisit`, `StatsPage` — visit document and a page view in it; `PageStatsProps` (`/client`) — `PageStats` props.

## Media and storage (`storage`) — details: `node_modules/@intecion/ipal-kit/docs/storage.md`

| Export | Import from | What it does / when |
|---|---|---|
| `buildR2Storage(collections, { s3Storage })` | `@intecion/ipal-kit` | Cloudflare R2 storage plugin from env (`R2_*`); without env a no-op (local disk). The project injects `s3Storage` from `@payloadcms/storage-s3`. For `plugins` in the config. |
| `buildImagesConfig({ publicUrl?, serverUrl?, extraHosts?, production? })` | `@intecion/ipal-kit` | Default `images` for `next.config.ts`: AVIF/WebP, `remotePatterns` for R2 and media from the app, 31-day cache. |
| `MediaPreconnect()` | `@intecion/ipal-kit/rsc` | `<link rel="preconnect">` + `dns-prefetch` to the `R2_PUBLIC_URL` domain; nothing when the env is missing. `SiteProviders` already renders it (`preconnect={false}` turns it off); by hand: top of `<body>`, never an explicit `<head>`. |
| `YouTubeEmbed({ videoId, title, playLabel, poster?, note?, classNames? })` | `@intecion/ipal-kit/client` | Lightweight YouTube: poster + button, the `youtube-nocookie` player only after a click (no cookies or JS on load). Unstyled. |

**Types:** `ImagesConfig` — `buildImagesConfig` result.

## Light/dark theme (`theme`) — details: `node_modules/@intecion/ipal-kit/docs/theme.md`

| Export | Import from | What it does / when |
|---|---|---|
| `ThemeScript({ allowToggle?, defaultTheme? })` | `@intecion/ipal-kit/rsc` | Inline script that sets `data-theme` on `<html>` before paint (no flash). First in `<body>` or `theme` in `<SiteProviders>`; `<html suppressHydrationWarning>`. |
| `ThemeSwitcher({ label?, classNames?, renderIcon?, storageKey? })` | `@intecion/ipal-kit/client` | Unstyled switcher (`<button role="switch">`, light/dark icons); style the active icon in CSS (`[data-theme=dark]`). |
| `useTheme({ storageKey? })` | `@intecion/ipal-kit/client` | Hook `{ theme, setTheme, toggle }`; `theme` = null on the server — do not style from it. Key: the one on `<html data-theme-storage>`, else `theme`. |
| `applyTheme(theme, { persist?, storageKey?, transitionMs? })` | `@intecion/ipal-kit/client` | Sets the theme on `<html>` and remembers it in localStorage. |
| `documentThemeStorageKey()` | `@intecion/ipal-kit/client` | The key the page uses: `<html data-theme-storage>` (set by `ThemeScript` for a custom key), else `'theme'`. |
| `migrateThemeStorage(key?)` | `@intecion/ipal-kit/client` | Moves an old `ipal-theme` choice to `key` when `key` is empty, removes `ipal-theme`; never throws. `ThemeScript` does it before the first paint. |
| `readDocumentTheme()` | `@intecion/ipal-kit/client` | Current theme from `<html>` or null. |
| `themeConfigFrom(settings, storageKey?)` | `@intecion/ipal-kit` | Theme options from the SiteSettings document (what `getSiteShell(locale).theme` holds). |
| `themeScript({ allowToggle, defaultTheme, storageKey? })` | `@intecion/ipal-kit` | The script content that `ThemeScript` renders — when you insert it yourself. |
| `isTheme(value)` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | Type guard `'light' \| 'dark'`. |
| `isThemeSetting(value)` | `@intecion/ipal-kit` | Type guard `'system' \| 'light' \| 'dark'`. |
| `THEME_ATTRIBUTE` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | `'data-theme'` — attribute on `<html>` (Tailwind `dark` variant). |
| `THEME_STORAGE_KEY` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | `'theme'` — default localStorage key with the visitor's choice (the next-themes key; `ipalKit({ theme: { storageKey } })` changes it). |
| `LEGACY_THEME_STORAGE_KEY` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | `'ipal-theme'` — the key before; a choice under it is moved once. |
| `THEME_STORAGE_ATTRIBUTE` | `@intecion/ipal-kit`, `@intecion/ipal-kit/client` | `'data-theme-storage'` — on `<html>` when the key is not the default. |
| `THEME_SWITCHING_ATTRIBUTE` | `@intecion/ipal-kit/client` | `'data-theme-switching'` — briefly on `<html>` while switching (for the colour transition). |

**Types:** `ThemeOptions` (root, `ipalKit({ theme })`), `Theme`, `ThemeSetting`, `ThemeConfig` (root, `/client`) — theme, setting from the panel and theme options; `ThemeScriptProps` (`/rsc`), `ThemeSwitcherProps`, `ThemeSwitcherClassNames` (`/client`) — component props.

## Project starter (`starter`) — details: `node_modules/@intecion/ipal-kit/docs/project-starter.md`

Bin: `ipal-kit create <domain>` (`pnpm --config.auto-install-peers=false dlx @intecion/ipal-kit@<version> create …`).
`@intecion/ipal-kit/starter` uses Node built-ins only (no Payload) — the building blocks of the command.

| Export | Import from | What it does / when |
|---|---|---|
| `runCreateCli(args, log?)`, `CREATE_USAGE` | `@intecion/ipal-kit/starter` | The command (`ipal-kit create`) — returns the exit code. |
| `parseCreateArgs(args)`, `normalizeDomain(input)`, `localEnv(example)` | `@intecion/ipal-kit/starter` | Its pieces: options, `https://www.X.pl/` → `x.pl` (punycode), `.env` with a fresh `PAYLOAD_SECRET`. |
| `validateAnswers(input)`, `STARTER_TOPICS` | `@intecion/ipal-kit/starter` | The architecture answers (`StarterAnswers`): every missing / invalid one as a line; `[]` = valid. |
| `flagsFromAnswers(answers)` | `@intecion/ipal-kit/starter` | The `@starter:if` flags the answers turn on (`twoFactor`, `posts`, `crawl`, `r2`, `enforceCsp: false`, `demo: false`…). |
| `askAnswers(ask)` | `@intecion/ipal-kit/starter` | The questions with any `ask(question) → Promise<string>` (terminal, chat bridge). |
| `collectBundle(dir)`, `packBundle(bundle)`, `unpackBundle(buffer)`, `bundleFlags(bundle)` | `@intecion/ipal-kit/starter` | `reference/` → the bundle (fails on a fake value in a kept file) → gzip and back; the flags the markers use. |
| `renderSite(bundle, answers, ctx)`, `placeholderValues(answers, ctx)` | `@intecion/ipal-kit/starter` | The new site's files (path → content), in memory; the value of every `{{token}}`. |
| `applyVariants(text, flags, file?)`, `variantFlags(text)` | `@intecion/ipal-kit/starter` | `@starter:if` / `else` / `endif` blocks (nesting; `//: ` / `#: ` lines uncommented inside kept blocks). |
| `applyPlaceholders(text, fakes, values)`, `leftoverFakes(text, fakes)` | `@intecion/ipal-kit/starter` | Fake values → the site's values (longest first); what is left. |
| `assertManifest(value)`, `fileRole(path, manifest)`, `matchGlob(path, glob)`, `ALWAYS_SKIPPED` | `@intecion/ipal-kit/starter` | `starter.manifest.json`: drop / generate / template / keep. |
| `renderI18nConfig`, `renderTokens`, `renderDesignMd`, `renderAgentsMd`, `renderDecisions`, `renderDoctorConfig` | `@intecion/ipal-kit/starter` | Files and sections written from the answers (languages, brand, DESIGN.md, AGENTS.md decisions, ipal-doctor.json). |
| `rewriteFonts(layout, answers)`, `fontExport(name)`, `rewritePackageJson(text, rules, ctx, answers)` | `@intecion/ipal-kit/starter` | next/font calls → the answered fonts; the manifest's package.json rewrite. |
| `lockfileWithoutPlugin(lock)` | `@intecion/ipal-kit/starter` | The reference lockfile without the plugin (shipped with the bundle). |
| `secretFindings(files)` | `@intecion/ipal-kit/starter` | The pre-commit check: `.env*`, assigned secrets, private keys. |

**Types:** `StarterAnswers`, `AnalyticsTool`, `ContentCollection` — the answers; `StarterBundle`, `StarterManifest`, `FileRole`,
`StarterFlags`, `SiteContext` — the bundle, the manifest, the flags and the site context (all `/starter`).

## Design tokens (`tokens`) — details: `node_modules/@intecion/ipal-kit/docs/design-tokens.md`

CSS: `@intecion/ipal-kit/tokens.css` (neutral `--ipal-*` defaults, light/dark, `[data-surface="inverse"]`), `@intecion/ipal-kit/tailwind.css`
(Tailwind 4 preset: `bg-surface`, `text-fg`, `py-section`…), `@intecion/ipal-kit/a11y.css` (widget CSS). Bin: `ipal-tokens`
(`src/design/tokens.ts` → `src/design/tokens.css`, WCAG contrast; `--check`, `--report`, `--warn-only`, `--in`, `--out`).
``@intecion/ipal-kit/tokens`` imports nothing from Payload/React — safe in `src/design/tokens.ts`, `next/og`, e-mail templates.

| Export | Import from | What it does / when |
|---|---|---|
| `defineTokens(input)` | `@intecion/ipal-kit/tokens`, `@intecion/ipal-kit` | The brand in `src/design/tokens.ts`; checks every role/size name, returns the input. |
| `tokensToCss(input, { source? })` | `@intecion/ipal-kit/tokens` | The brand CSS (`ipal-tokens` writes it): only what differs from the defaults. |
| `defaultTokensCss()` | `@intecion/ipal-kit/tokens` | The content of `tokens.css`. |
| `contrastReport(input?)` | `@intecion/ipal-kit/tokens` | WCAG rows (`ContrastRow`) for every text/surface pair in both themes and the inverse scope. |
| `contrastRatio(fg, bg)`, `parseColor(css, lookup?)` | `@intecion/ipal-kit/tokens` | Colour maths for your own checks (hex, rgb, hsl, oklch, `color-mix(in oklch)`, `var()`). |
| `resolveColors(input)` | `@intecion/ipal-kit/tokens` | Final colour values per theme — for `next/og`, e-mail, `theme-color`. |
| `fluidClamp(min, max, range?)` | `@intecion/ipal-kit/tokens` | The fluid.css `clamp()` for your own sizes; `FLUID_SCALE` (the shipped pairs), `FLUID_RANGES` (`standard` 360→1280, `wide` 360→1920). |
| `IPAL_TOKENS` | `@intecion/ipal-kit/tokens`, `@intecion/ipal-kit` | Every token as `var(--ipal-…)`, keyed by name: `IPAL_TOKENS.primary`. |
| `ipalVar(name, fallback?)` | `@intecion/ipal-kit/tokens`, `@intecion/ipal-kit` | `var(--ipal-<name>[, fallback])`. |
| `IPAL_BREAKPOINTS` | `@intecion/ipal-kit/tokens`, `@intecion/ipal-kit` | `{ sm: 40, md: 48, lg: 64, xl: 80, '2xl': 96 }` (rem) — for `sizes=` / `matchMedia`. |
| `COLOR_DEFAULTS`, `STATIC_DEFAULTS`, `FLUID_TOKENS`, `INVERSE_SCOPE`, `LEGACY_DARK_ROLES` | `@intecion/ipal-kit/tokens` | The catalogue: colour defaults per theme, theme-independent defaults, fluid names, inverse re-map, the old `-dark` twins. |
| `LIGHT_SELECTOR`, `DARK_SELECTOR`, `INVERSE_SELECTOR` | `@intecion/ipal-kit/tokens` | `:root, [data-theme="light"]`, `:root[data-theme="dark"], [data-theme="dark"]` (a theme on any element), `[data-surface="inverse"]`. |

**Types:** `TokensInput`, `IpalTokenName` (root, `/tokens`), `ColorInput`, `ColorRole`, `ContrastRow`, `FluidRange`, `RemValue` (`/tokens`).

## ipal-doctor (`doctor`) — details: `node_modules/@intecion/ipal-kit/docs/doctor.md`

Bin: `ipal-doctor` (`pnpm exec ipal-doctor [dir] [--json] [--md] [--strict] [--fail-on] [--offline] [--url] [--staging]
[--admin-route] [--deep] [--env-file] [--only] [--skip] [--sites]`). `@intecion/ipal-kit/doctor` is Node only.

| Export | Import from | What it does / when |
|---|---|---|
| `runDoctor(options)` | `@intecion/ipal-kit/doctor` | Runs every rule on one project folder → `DoctorReport` (schema 1). Options: `root`, `packageRoot`, `offline`, `url`, `staging`, `adminRoute`, `deep`, `deepStatus`, `envFile`, `only`, `skip`, `rules`, `config`, `today`, `writeSeen`. Never throws for a failing rule. |
| `runDoctorCli(argv, { packageRoot, cwd?, log? })` | `@intecion/ipal-kit/doctor` | The command; returns the exit code (0 / 1 / 2 / 3). `parseDoctorArgs`, `expandSites` (`'../*-web'`), `DOCTOR_USAGE`. |
| `doctorRules` | `@intecion/ipal-kit/doctor` | Every built-in rule (`DoctorRule`: `id`, `group`, `source`, `docs`, `check(ctx)`) — filter, wrap or extend; own rules through `extraRules` in `ipal-doctor.json`. |
| `applySettings(findings, ctx)`, `globToRegExp(glob)`, `AUDIT_SKIP_RULES` | `@intecion/ipal-kit/doctor` | `ipal-doctor.json` `rules` (`off`, `severity`, `reason`, `until`, `files`) and `ipal-audit-skip` lines applied to findings. |
| `createDoctorContext(options)`, `loadDoctorConfig(root)`, `parseEnvFile(text)`, `readAuditSkips(agentsMd)`, `bareHost(url)` | `@intecion/ipal-kit/doctor` | What a rule reads about the project (files only, values never leave it). |
| `formatReport(report, { color })`, `formatDriftTable(reports)` | `@intecion/ipal-kit/doctor` | Human report; the rule × site Markdown table. |
| `planSkills({ dest, source })` | `@intecion/ipal-kit/doctor` | What `ipal-skills` would change: `missing`, `stale`, `retired` ipal-* folders. |
| `parseToolOutput(text)`, `AUDIT_RULE_MAP` | `@intecion/ipal-kit/doctor` | Reads `[ERROR] title (n) — rule` output of `audit.sh` / `seo-check.mjs`; audit titles that are a doctor rule. |
| `DEFAULT_SRC_ALLOW` | `@intecion/ipal-kit/doctor` | Top-level `src/` entries the convention allows (`layout.allow` extends it). |
| `findFrontend(ctx)` | `@intecion/ipal-kit/doctor` | The folder of the site's pages (`FrontendLayout`: `dir`, `multi`, `ambiguous`, `missingOverride`) — found by structure (any route group with the catch-all page, a localized one first); `layout.frontend` in `ipal-doctor.json` wins. |
| `createLiveFetcher(url, { adminRoute, staging })` | `@intecion/ipal-kit/doctor` | Cached GET-only fetcher for the live rules. |
| `runDeepProbe(ctx)` | `@intecion/ipal-kit/doctor` | `pnpm exec payload run …/dist/modules/doctor/probe.js` in the project → `DoctorStatus`. |
| `collectDoctorStatus(payload)` | `@intecion/ipal-kit/doctor` | Read-only counts: `usersWithout2fa`, `pendingCookies`, `plugin`, `node`. |
| `buildDoctorEndpoint({ tokenVar, access })` | `@intecion/ipal-kit/doctor` | `GET /ipal/doctor` (`/api/ipal/doctor`): 404 until the token variable (default `IPAL_DOCTOR_TOKEN`, ≥ 32 chars) is set, Bearer token or `access`, rate-limited. Added by `ipalKit` unless `doctor: false`. |

**Types:** `DoctorRule`, `DoctorFinding`, `RuleFinding`, `DoctorReport`, `DoctorConfig`, `DoctorRuleSetting`, `DoctorSeverity`,
`DoctorSource`, `DoctorStatus`, `DoctorContext`, `RunDoctorOptions`, `DoctorEndpointOptions`, `FrontendLayout`.

## Turnstile (`turnstile`) — details: `node_modules/@intecion/ipal-kit/docs/turnstile.md`

| Export | Import from | What it does / when |
|---|---|---|
| `getTurnstileConfig(payload)` | `@intecion/ipal-kit` | `{ enabled, siteKey }` from Site integrations (env fallback); enabled only when both keys are set. In the server layout → `TurnstileProvider`. |
| `TurnstileProvider({ siteKey, children })` | `@intecion/ipal-kit/client` | Provides the site key to the whole app; with `siteKey` null the widgets render nothing. |
| `useTurnstile()` | `@intecion/ipal-kit/client` | In a form: `{ token, TurnstileWidget, reset, … }`; pass the token to `submitForm`. Requires the provider. |
| `useOptionalTurnstile()` | `@intecion/ipal-kit/client` | Like `useTurnstile`, but without a provider it returns `enabled: false` instead of throwing — for shared components. |
| `Turnstile({ siteKey, onToken, theme? })` | `@intecion/ipal-kit/client` | Raw widget with an explicit key — when you do not use the provider. |
| `verifyTurnstile({ token, payload, ip?, onConfigError?, hostnames? })` | `@intecion/ipal-kit/server` | Server-side token verification → `boolean` (`degraded` lets it through by default; `hostnames` = token must be solved on one of them, unset = not checked). `submitForm` does this itself — call it only in your own actions. |
| `checkTurnstile({ token, payload, ip? })` | `@intecion/ipal-kit/server` | As above, but returns `{ outcome: 'pass' \| 'reject' \| 'degraded', code? }` and updates the integration status in the panel. |

**Types:** `TurnstileConfig` (root) — `getTurnstileConfig` result; `TurnstileCheck`, `TurnstileOutcome` (`/server`) — verification result; `TurnstileProps`, `TurnstileTheme` (`/client`) — widget props and theme.

