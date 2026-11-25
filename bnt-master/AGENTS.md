# AGENTS

**Project:** BNT Budownictwo — migration of an existing Next.js website to Payload CMS 3 and ipal-kit.

## Project decisions

- The owner explicitly requested ipal-kit compliance and installation/loading of all its skills on 2026-11-24.
- All 16 ipal skills and all 5 bundled external skills are installed. ipal-kit rules take precedence over external guidance.
- On 2026-11-24 the owner instructed “rob to” after the architecture questions and compliance explanation. This authorizes autonomous implementation choices for the migration; do not ask the same questions again. Keep Polish as the only locale and existing URLs without a prefix. Preserve the BNT identity and content. Use PostgreSQL for the production-ready adapter and SQLite for the current local migration. Wire R2 with local development fallback, SMTP from the panel to the existing company inbox, 2FA, BNT white-label/Intecion credit, detailed consent with advanced mode and full SEO/GEO/AI access. Leave analytics IDs disabled until provided. Production domain, credentials and hosting account are deployment inputs, not guessed values.
- Production launch status and production data access have not been established. No production deployment, destructive migration, full production seed or exception to the mandatory set is authorized.
- Current local baseline (observed, not an architecture decision): Polish routes without a locale prefix, SQLite, local/public images, 5 imported services and 14 imported projects, Next 16.4.6, React 19.3.1, Payload 3.94.1, ipal-kit 1.16.6.
- The frontend now lives in src/. The rebuilt production server starts successfully. Latest quick audit: 0 errors and 2 justified collection warnings. Consent check on the homepage: 0 violations, 0 warnings. SEO check after correction: all 23 sitemap URLs return HTTP 200, default share image is populated. Checker emits 23 false-positive hreflang errors (single-language helper deliberately omits alternates), 0 favicon/share-image warnings and 19 thin-content warnings reflecting original source. See docs/plugin-requests/2026-11-25-single-language-seo-check.md. Do not silence findings.
- On 2026-11-25 the owner said “dokoncz” after the pending link-workaround decision. Implement the proposed minimal workaround in src/lib/content.ts; it strips only the extra locale prefix for resolved internal content-entry links in single-language mode. See docs/plugin-requests/2026-11-24-single-language-entry-links.md. Do not modify node_modules. The separate SEO checker false positive remains reported; do not invent hreflang or suppress its output.
- The current local database is payload-ipal.db. Original database and source backups are retained outside the repository under /tmp/bnt-before-ipal-rebuild-20261124. Existing SQLite migration files are not suitable for PostgreSQL; adapter migration directories are now separate. All three SQLite migrations pass on an empty temporary database. Slug migration UP and DOWN preserve all 19 addresses on a copy. The existing local database has schema push disabled after reviewed additive migration; do not run the full initial migration chain against its already populated tables.

## Site map

- Home: hero, service highlights and list, benefits, process, featured projects, FAQ, regional portfolio, contact CTA.
- Services archive and 5 service detail pages.
- Projects archive and 14 project detail pages.
- Contact: enquiry form, company details, map and guidance.
- Shared header/mobile navigation and footer.
- System/legal pages and all mandatory SEO/GEO, consent, media and form features use the ipal-site/ipal-setup patterns. Legal text must be supplied by the owner; never invent it.
- Services and projects pass the collection test: multiple independently managed records, each with its own URL, present in the original site, not built into Payload. Retain their existing collection slugs to preserve imported data. Original source fields stay read-only while new layouts and upload relations are populated additively.

## Migration rules

- Keep existing content until a backed-up, reviewed migration preserves it in the new model; follow ipal-migrate-fields for fields already holding data.
- Use library blocks/options first, Pages for editable page composition, project globals for company/header/footer, and createContentHelpers as the shared routing/data layer.
- Replace the existing custom contact form and endpoint with RenderForm/createSubmitAction and a seeded builder form. Preserve the approved design through documented classNames/variants.
- Use the installed reference-site index and module docs for exact APIs. Never patch node_modules, suppress audits or invent client architecture decisions.

<!-- ipal-kit:start -->
## ipal-kit 1.16.6 — agent guide

<!-- Managed by `pnpm exec ipal-skills` — edits between the markers are overwritten. -->
This project is built on `@intecion/ipal-kit` (a Payload CMS 3 plugin). Before you write code:

1. Rules: `node_modules/@intecion/ipal-kit/docs/agent/AGENT.md`.
2. Everything the plugin provides (options, env vars, routes, layout, hooks, collections, globals, every export): the `ipal-reference` skill — `.agents/skills/ipal-reference/SKILL.md`.
3. New project or missing foundation: the `ipal-setup` skill; a whole site: `ipal-site`. All skills: `.agents/skills/`.
4. Module details: `node_modules/@intecion/ipal-kit/docs/<module>.md`.
5. ipal-kit first: if the plugin has it, use it. Broken or not enough → report it with the `ipal-plugin-gap` skill and wait for the owner — no hand-built replacement, never patch `node_modules`.
6. Before you set up a site: ask the owner the architecture questions (AGENT.md "Ask before you build") and wait for the answers; record them under "Project decisions".
7. ipal-kit docs, this guide and the skills are in English; write rules, AGENTS.md entries and gap reports in English.
<!-- ipal-kit:end -->

## Completion validation — 2026-11-25

- Full ipal audit (including generated types, TypeScript and production build): 0 errors, 2 justified collection warnings. Locale coverage: 0 gaps.
- Browser regression: 23 routes HTTP 200, correct self canonicals and OG images, no /pl card links, 404/SEO/GEO/MCP pass, no browser runtime errors, no horizontal overflow on four main pages at 360/768/1280 px. Consent checker: 0 violations/warnings.
- Isolated SQLite integration test: all 19 imported layouts/addresses retained; page create/edit/add/reorder/delete; form validation, consent gate, persistence, both e-mails captured in memory, rate limit. No real messages were sent.
- Panel tested against a disposable database: first-user registration, enforced TOTP setup, editing page title/block heading, company/header/footer/cookie globals, SEO title, form label and media alt. Temporary account/session/database removed. Main database has no test account.
- Added a generated PostgreSQL baseline in its separate directory; not applied to a live PostgreSQL server. Production configuration, legal text and first real administrator are owner deployment inputs. No deployment performed.
- Dependency audit: 0 high/critical, 6 moderate transitive findings. Do not force incompatible dependency upgrades.
