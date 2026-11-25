---
name: ipal-seo-check
description: Checks a running ipal-kit site the way Googlebot and AI agents see it — metadata inside <head> (not streamed to body), title, description, self canonical, hreflang with x-default, noindex pages leaking into the sitemap, error pages in the sitemap, sitemap index parts, Search Console / Bing verification tags, robots.txt, soft 404s, favicon, JSON-LD, and GEO (llms.txt, llms-full.txt, Markdown version, text/markdown alternate, MCP server, AI bots in robots, health). Use after building pages, before handing over, after deploys, after an ipal-kit upgrade, and whenever SEO, indexing, Search Console or "Google doesn't see" problems come up.
---

# ipal-seo-check

Checks the **running** app, not the code — exactly what Googlebot gets.

## Steps
1. Run the production build (dev streams differently than a build):
   ```bash
   pnpm build && pnpm start          # in a second terminal / in the background
   node .agents/skills/ipal-seo-check/scripts/seo-check.mjs http://localhost:3000
   ```
   Production: `node …/seo-check.mjs https://domain.com --max 40`.
   `--max N` = how many pages from the sitemap to check (evenly from each language). Do not read
   the script's source — the output is enough.
2. Show the full output. Fix every `[ERROR]` — each has a hint and a
   docs section. Typical causes:

| Error | Cause → fix |
|---|---|
| metadata rendered in `<body>` | no `htmlLimitedBots`, explicit `<head>` in the layout, no ISR/`generateStaticParams`, `headers()`/`searchParams` in the page tree |
| canonical not pointing to itself | `NEXT_PUBLIC_SERVER_URL` = localhost / another domain; wrong `homeSlug` |
| noindex pages listed in the sitemap | stale build; the noindex field is not from `buildNoindexField` |
| missing / non-self hreflang | page without a slug in another language; metadata not from `generatePageMetadata` |
| unknown URL returns 200 | no `notFound()` in the catch-all |
| sitemap URLs not 200 | the sitemap lists redirecting addresses (old slugs) |
| robots.txt points to localhost | `NEXT_PUBLIC_SERVER_URL` not set in the build |
| no JSON-LD structured data | no `<SiteProviders>` / `<JsonLdGraph>` in `[locale]/layout.tsx`, or an empty name in Site settings |
| `/llms.txt` / `/llms-full.txt` → 404 | no route (`export { llmsRoute as GET }` / `llmsFullRoute` from `lib/content`) |
| Markdown version `/md/…` → 404 | no `src/app/md/[locale]/[[...slug]]/route.ts`; the page is noindex/draft |
| `sitemap.xml → 503` | database unreachable while building the sitemap (`sitemapRoute` returns 503 + Retry-After instead of an empty one) — check `DATABASE_URI` / database health |
| sitemap index parts not 200 | site > `maxUrls` (10 000) → `/sitemap.xml` is an index; the `?part=N` parts must answer 200 — your own route without `part` handling, or a CDN cache with an old part count |
| MCP not answering initialize | no `src/app/api/mcp/route.ts`, or Cloudflare Access without a Bypass (mcp.md) |

3. `no verification meta tag` (INFO — not counted as an error or warning) — with domain
   verification by DNS (recommended, docs/deployment.md §6) this is the correct state; do nothing. Only for
   URL-prefix verification, paste the code in **Site settings → Search engines**.
   `robots.txt blocks AI bots` — also check Site settings → Search engines → AI assistants
   (when the project uses `getRobots`, the editor may have changed the policy).
4. Judge each `[WARNING]`: a missing description / duplicate titles are **content in the panel** —
   fill them in from the brief or list them in the report for the client.
5. Run again until `0 error(s)`.

## What the script does not check
Search Console (indexing, manual actions), Core Web Vitals, JSON-LD
correctness (it checks presence; check content in the Rich Results Test), the substance of the content.
Items skipped by client decision are read from `ipal-audit-skip:` in `AGENTS.md`.
