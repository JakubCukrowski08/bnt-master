# Migration completed locally — 2026-11-25

## Delivered

- Payload 3.94.1 + ipal-kit 1.16.6, Next 16.4.6, React 19.3.1, Node 22.23.5.
- All 16 ipal skills and 5 bundled external skills installed and read.
- Editable pages, library sections, company/header/footer, builder form, SEO, system pages, consent and media.
- 5 services, 14 projects, original text and photographs retained. 49 imported media records plus a new typographic BNT favicon. Old source fields and database backups retained.
- 23 public URLs without a language prefix. Default OG image and favicon set through the CMS.
- SQLite migration chain tested on an empty database; slug UP/DOWN tested with all 19 original addresses. PostgreSQL baseline generated separately, not yet applied to PostgreSQL.

## Verified

- Full ipal audit including TypeScript/build: 0 errors, 2 justified collection warnings.
- Browser: all 23 URLs HTTP 200, self canonical, OG image, no incorrect /pl links; 404, robots, llms/full, Markdown, manifest, health and MCP pass; no runtime errors.
- Four main pages: no horizontal overflow at 360, 768 and 1280px.
- Consent checks: 0 violations, 0 warnings. Map absent before functional consent. Empty required fields block browser submission before a request.
- Isolated CMS test: create/edit/add/reorder/delete page sections. Form: validation, consent, persistence, both messages captured locally, rate limit. No messages sent to external recipients.
- Isolated panel test: first-user registration, TOTP setup, page heading/title edits; company, menu, footer, cookie texts; SEO title, form submit label and media alt. Test database, account and authentication state removed.
- Locale coverage: 0 gaps.
- Dependencies: no high/critical findings, 6 moderate transitive findings.

## Deployment inputs

Create the real administrator at `/admin` and set up 2FA. Supply the production domain, hosting/database, R2 keys, SMTP and Turnstile keys. Verify real mail delivery after SMTP configuration. Fill approved privacy/cookie policies and missing legal company details in the panel. Analytics remain off until IDs are provided. A PostgreSQL data transfer and migration test are required if deploying with that adapter. No production deployment occurred.

## For ipal-kit

- Entry-link locale prefix: owner-approved single-file workaround in [src/lib/content.ts](../src/lib/content.ts), marked for removal after upstream fix; see [request](./plugin-requests/2026-11-24-single-language-entry-links.md). node_modules unchanged.
- SEO checker contradicts the plugin's intentional single-language hreflang behavior; [request](./plugin-requests/2026-11-25-single-language-seo-check.md). No checker suppression or invented alternate-language metadata.
- Remaining 19 SEO warnings concern short source texts, which were preserved rather than expanded with invented company claims.

## Reproduce

`pnpm verify:migration` — isolated local database and in-memory email capture.

`pnpm verify:browser` — running production build at localhost:3000.

`pnpm ipal:audit` — full code/build verification.

## Full SEO checker output

```text
ipal-seo-check — http://localhost:3000 (Googlebot UA)

[ERROR] missing / non-self hreflang (23) — createPageMetadata builds alternates from locale:"all" slugs
  http://localhost:3000/kontakt
  http://localhost:3000/realizacje
  http://localhost:3000/uslugi
  http://localhost:3000/
  http://localhost:3000/realizacje/brzozowe-zacisze-etap-1
  http://localhost:3000/uslugi/uslugi-inzynieryjne-budowlane
  http://localhost:3000/realizacje/brzozowe-zacisze-etap-2
  http://localhost:3000/uslugi/nadzor-inwestorski
  http://localhost:3000/realizacje/brzozowe-zacisze-etap-3
  http://localhost:3000/uslugi/kierowanie-nadzorowanie-budowy
  … and 13 more

[WARNING] thin pages (< 150 words) (19) — add real content from the brief or merge pages (AGENT.md §0c)
  http://localhost:3000/uslugi (104 words)
  http://localhost:3000/realizacje/brzozowe-zacisze-etap-1 (90 words)
  http://localhost:3000/realizacje/brzozowe-zacisze-etap-2 (91 words)
  http://localhost:3000/uslugi/nadzor-inwestorski (115 words)
  http://localhost:3000/realizacje/brzozowe-zacisze-etap-3 (91 words)
  http://localhost:3000/uslugi/kierowanie-nadzorowanie-budowy (105 words)
  http://localhost:3000/realizacje/brzozowe-zacisze-etap-4 (112 words)
  http://localhost:3000/uslugi/inwestor-zastepczy (114 words)
  http://localhost:3000/realizacje/kepa-park (133 words)
  http://localhost:3000/uslugi/nadzory-budowlane (109 words)
  … and 9 more

[INFO] no verification meta tag (fine with DNS / domain verification) (2) — only for URL-prefix verification: paste the code in Site Settings → Search engines
  Google Search Console
  Bing Webmaster Tools

root: 200 · sitemap: 23 URL(s), 4 locale group(s) · checked: 23 page(s)
ipal-seo-check: 23 error(s), 19 warning(s)

```
