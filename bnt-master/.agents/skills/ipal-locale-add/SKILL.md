---
name: ipal-locale-add
description: Adds a new language to an ipal-kit site (or turns a single-language site into a multilingual one) end to end — i18n.config, routing, Postgres migration, slugs and titles per page, globals (Header, Footer, Site settings, Cookie banner, Notifications), forms, SEO (hreflang, sitemap), language switcher — and proves completeness with a coverage script and ipal-seo-check. Use when the user asks for a new language/locale/translation version of the site.
---

# ipal-locale-add

A new language is **configuration + content**. Front-end code barely changes —
routing, hreflang, sitemap, the switcher and consent read locales from one source.
The typical failure is not code but **a missing slug/title in the new language → 404** and
empty global texts (cookie banner in English from the fallback).

## 0. Settle (collect into one list of questions if the brief does not say)
- language code (`de`, `en`, `uk`…) and the switcher label (`Deutsch`);
- **who translates the content**: the client in the admin panel / you write a draft for approval /
  placeholders stay. No answer → a draft marked in the report as
  "to be verified by the client", never published as final;
- whether every page should exist in the new language (default: yes).
- RTL (Arabic, Hebrew) → `rtl: true` on the locale + check the styles (`dir`, `ms-/me-` instead of `ml-/mr-`).

## 1. Single-language project → multilingual (only if it had 1 locale)
This is a structural rebuild (i18n.md → "Moving from single- to multi-language"):
- `app/(frontend)/[[...slug]]` → `app/(frontend)/[locale]/[[...slug]]`, the layout reads `locale` from `params`;
- `generateStaticParams` returns `{ locale, slug }` pairs for `getConfiguredLocales()`;
- `proxy.ts` with `createProxy(i18nConfig, { NextResponse })` (redirect `/` → `/pl`);
- old addresses without a prefix → 301 redirects to `/pl/...` (redirects in the panel or `next.config`);
- `LanguageSwitcher` in the Header + `AlternateLinksProvider` in the layout + `AlternateLinksUpdater` on pages.

## 2. Configuration (multilingual project)
1. `src/i18n.config.ts` — add `{ code: 'de', label: 'Deutsch' }`. This is the only
   place; `ipalKit({ i18n: i18nConfig })`, the proxy, the switcher and the sitemap take it from here.
   **Do not** change `defaultLocale` along the way (it changes every canonical URL).
2. Postgres: `pnpm payload migrate:create add-locale-de` → review it (`_locales` enum,
   `_locales` tables) → `pnpm payload migrate`. Mongo: nothing.
3. `pnpm payload generate:types` · restart dev (Payload builds localization at startup).
4. `grep -rn "'pl'\|'en'\|\[\"pl\"" src/ --include=*.ts*` — every hardcoded language list
   in project code (label maps, `if (locale === 'en')`) is a bug: move it to the panel
   or to `i18n.config`.

## 3. Content — what MUST have a value in the new language
Run the gap report (read-only):
```bash
pnpm payload run .agents/skills/ipal-locale-add/scripts/locale-coverage.ts
LOCALE=de pnpm payload run .agents/skills/ipal-locale-add/scripts/locale-coverage.ts
```
It prints: documents without a `slug`/title in a given language (= 404, missing from the sitemap and
hreflang) and empty localized global fields that are filled in the defaultLocale.

Fill them in this order (panel or a Local API script with `locale: 'de'`):
| What | Where | Effect if missing |
|---|---|---|
| slug + title of every page | Pages (and other collections with a URL) | 404 in the new language |
| Homepage/404/policy | System pages (shared relations) + their slug in `de` | `/de` → 404, empty policy link |
| Header / Footer — link labels | navigation globals | empty menu items |
| Site settings — name, description, OG | Site settings | title/OG from the fallback |
| Cookie banner — all texts + `privacyLinkLabel`, Detail labels, Cookies (`purpose`, `duration`) | Cookie banner | banner / `detailed` window in another language (GDPR: consent must be understandable); scan + import with `--lang <code>` (ipal-consent-check) |
| Notifications — `form.*` | Notifications | form messages from the English fallback |
| Forms — field labels, confirmation, Emails | Forms (every form) | form in the wrong language |
| SEO tab — meta title/description | every page | duplicates/gaps in seo-check |
| Media — `alt` (if localized) | Media | a11y |

Slugs in the new language: words in that language, lowercase, no diacritics
(`ueber-uns`, not `über-uns`). The home page is the page assigned in System pages → Homepage —
fill in its slug in `de` like any page (coverage checks it), but its address is always `/de`.
When writing through the Local API: `payload.update({ collection, id, locale: 'de', fallbackLocale: false, data })`:
- **`fallbackLocale: false` is mandatory** — without it (with `fallback: true`) Payload
  saves the Polish text as the German translation in every field you did not provide;
- **blocks/arrays: keep the row `id`s from the defaultLocale read**, otherwise new
  rows are created. Ready-made mechanism: `ipal-site/resources/seed-content.template.ts`
  (`{ pl, en, de }` values side by side, `SEED_UPDATE=1` for existing pages).

## 4. Check
1. `locale-coverage` → `0 gap(s)` (or a list of deliberately empty fields in the report).
2. `pnpm build && pnpm start` → `ipal-seo-check http://localhost:3000`:
   hreflang `de` on PL/EN pages, x-default, `/de/...` in the sitemap, no 404.
3. `ipal-consent-check http://localhost:3000/de` — banner in German, consent works.
4. By hand: the language switcher on a subpage (not home) lands on the counterpart, not on `/de`.
5. `ipal-audit --quick` — zero new hardcoded values.

## Report
New language: code, number of pages translated / empty, who translated (a draft
= "awaiting client approval"), coverage + seo-check result, list of fields for the
client to fill in.
