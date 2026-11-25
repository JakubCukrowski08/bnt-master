---
name: ipal-collection
description: Decides whether something should be a Payload collection, a global, or a block, and builds a content collection the ipal-kit way (title, buildSlugField, SEO tab, buildNoindexField, trackSlugHistoryHook, revalidate hook, archive page from System pages, sitemap and routing via content option). Use when the user asks for a blog, news, products, portfolio, testimonials, authors, categories, or any new collection — and whenever you are about to create a file in src/collections.
---

# ipal-collection

**ipal-kit first (hard rule, AGENT.md "ipal-kit first"):** anything the plugin covers is built with the
plugin's feature. It does not work or is not enough → report it with **ipal-plugin-gap** and wait for the owner's
decision on that part; no hand-built replacement, no silent workaround. **Code rules:** AGENT.md "Code rules"
(one job per file/component/function, no duplicates, typed, texts from the panel, a check for new behaviour).

Sources: `node_modules/@intecion/ipal-kit/docs/agent/AGENT.md` §5,
`docs/content.md`, `docs/hooks.md`, `docs/seo.md`.

## 1. Test (always, before any code)
Answer these 4 questions for the user — all must be YES:
1. Is it a list of many records of the same type?
2. Does each record have **its own URL**?
3. Does the client **explicitly** require it?
4. Does Payload not have it built in?

Any NO → it is not a collection:
- one set of data (company, menu, footer, settings) → **global**,
- part of a page (FAQ, hero, testimonials in a section) → **block** (ipal-block skill),
- `users` → the plugin injects it when the project has none; create your own collection with that slug
  only to add fields (it wins over the injected one; roles and 2FA attach to it).

Exception: a list without its own URLs managed separately (e.g. testimonials used in many
blocks) — a collection **without** wiring into `content`. Justify it in the plan.

## 2. Plan (write it, then go straight to code — AGENT.md §0a)
slug (camelCase, plural), fields, relations, whether it has URLs (archive), JSON-LD.
Record the "collection vs global vs block" decision in `AGENTS.md` → "Project decisions".
Ask only when the brief leaves a business question open (e.g. "do posts have authors?").

## 3. Code
1. `src/collections/<Name>.ts`: `title` (localized), `buildSlugField({ from: 'title' })`,
   SEO tab (plugin-seo), `buildNoindexField()`, `trackSlugHistoryHook`,
   `buildRevalidateHook`, `setPublishedAtHook` (dated entries), uploads via
   `media`, links via `buildLinkField()`. Field names per AGENT.md §6.5.
   Panel (AGENT.md §6.5a): `admin.useAsTitle`, `defaultColumns` (3–4), `admin.group: 'Content'`,
   `labels` and every field `label` as `{ en, pl }` (rules: `docs/dev/admin-ux.md` in the package),
   arrays with `labels` + `rowLabel()`, settings in the sidebar.
2. With URLs: add it to `content.config.ts` → `{ slug, perPage }`.
   **No URL prefix in code** — the editor assigns the archive page in
   Site settings (`<slug>Archive`). The plugin handles routing, sitemap,
   generateStaticParams, hreflang.
3. Entry list = a block (EntriesList) with `getEntries`; the entry page uses
   `resolveRoute` (type `entry`); JSON-LD per seo.md (e.g. Article).
4. **An auth collection for visitors** (`auth: true`: customers, members) only when the client requires it
   (AGENT.md §5 "A second auth collection"): `admin: { user: 'users' }` in `buildConfig`, `access` with
   `adminOrSelfIn('<slug>')` for read / update and an explicit `create`, never in `access.staffCollections`.
   Its accounts pass none of the plugin's staff checks, and 2FA (setup required included) does not apply to them. Check: its token → `403` from
   `/api/globals/site-integrations` and `/api/form-submissions`.
5. `pnpm generate:types`, `pnpm payload generate:importmap`.
6. Postgres with migrations → `pnpm payload migrate:create`.

## 4. Check
The **ipal-audit** skill. By hand: an entry in the panel → visible at `/<locale>/<archive>/<slug>`,
in the sitemap; changing the slug → 308 from the old address.
