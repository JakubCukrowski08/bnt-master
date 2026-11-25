---
name: ipal-block
description: Builds or refactors one page section (Payload block + React component) in an ipal-kit project the correct way — first a block of the plugin's block library (libraryBlocks / createBlockRegistry, 15 ready sections) or its variant or options, and only when none fits an own block with a clean editor panel (repeatable things as "+ Add …" arrays with rowLabel, never cta1/cta2 slots, short `{ en, pl }` labels per docs/dev/admin-ux.md, no empty spare fields), shared fields from the plugin (buildSectionHeaderField, buildLinksField, buildLinkField, buildSectionSettingsField), UI primitives (Section, SectionHeader, Media, CMSLink), fixed field vocabulary, max ~80 lines of JSX, subcomponents for repeated items, registry wiring. Use when creating a new section/block (hero, features, CTA, FAQ, gallery, pricing, testimonials…), changing a block's fields, or fixing a block with ctaLabel/buttonUrl/pdfUrl fields or a monolithic component.
---

# ipal-block

**ipal-kit first (hard rule, AGENT.md "ipal-kit first"):** anything the plugin covers is built with the
plugin's feature. It does not work or is not enough → report it with **ipal-plugin-gap** and wait for the owner's
decision on that part; no hand-built replacement, no silent workaround. **Code rules:** AGENT.md "Code rules"
(one job per file/component/function, no duplicates, typed, texts from the panel, a check for new behaviour).

One section per use of this skill. Details and ready code:
`node_modules/@intecion/ipal-kit/docs/agent/AGENT.md` §6.

## 0. Library block first (docs/block-library.md)
See every block and variant rendered (also on `muted` and `inverted`) on the reference site's Blocks page — seed
`src/seed/showcase.ts` in `docs/agent/reference-site/INDEX.md`; wiring: `src/blocks/configs.ts`, `src/blocks/registry.ts` there.
The plugin ships 15 blocks: `hero`, `textMedia`, `featureGrid`, `cta`, `richText`, `faq`, `contact`, `gallery`,
`testimonials`, `stats`, `steps`, `logos`, `team`, `pricing`, `entryList` (variants: `blockLibraryManifest`).
1. Does a library block or one of its variants fit the section? → turn it on in `src/blocks/configs.ts`
   (`blockOptions` → `libraryBlocks`), no component code. Done after step 3 below.
2. Almost fits → its options, not a copy: `fields: (defaults) => …` (`replaceField`, `removeField`), `variants`
   (own `{ label: { en, pl }, value }` + `components` / `classNames` in the registry), `settings: { backgrounds }`,
   `links`, `maxItems`. Another look of one part → `createBlockRegistry(content, { classNames: { faq: { item: '…' } } })`;
   another primitive everywhere → `ui: { Media }`.
3. The project must own it completely → `pnpm exec ipal-blocks eject <block>` (same slug and data, no migration),
   then the ejected builder in `pageBlocks` and `components: { <slug>: <Name>Block }` in the registry.
4. Nothing fits → an own block (below), with the library's builders (`buildItemsField`, `buildMediaField`,
   `buildVariantField`, `buildContentField`, `defineLibraryBlock`) and primitives (`Section`, `SectionHeader`, `Media`,
   `CMSLink`, `Card` from `@intecion/ipal-kit/blocks/rsc`), added to `extra` in `createBlockRegistry`.
   Record the reason in AGENTS.md → "Project decisions" (`ipal-doctor` warns about own blocks that copy a library block).

**Check (library block):** `pnpm generate:types` → `pnpm payload generate:importmap` → Postgres/SQLite
`pnpm payload migrate:create`; add the block to a page in the panel (en and pl labels, ≤ 6 fields), the page shows
the section with `data-ipal-block="<slug>"`.

## 0a. Prerequisites (own block)
With `createBlockRegistry` the primitives come from `@intecion/ipal-kit/blocks/rsc` — import them, no project copies.
A project without it: check that these exist: `src/components/ui/{CMSLink,Button,Media,Section,SectionHeader}.tsx`.
Old `src/fields/sectionHeader.ts` / `sectionSettings.ts` → replace with the plugin import and delete them (blocks.md, no migration).
Links (`buildLinkField`, `buildLinksField`, `resolveLink`) and section fields (`buildSectionHeaderField`, `buildSectionSettingsField`) come from the plugin — do not create them in the project.
Missing → first create them 1:1 from `resources/section-code.md` (this skill)
(and tell the user). Do not write your own versions.

## 1. Plan (write 3–5 points, then go straight to code — AGENT.md §0a)
- block slug (camelCase), folder name (PascalCase),
- the field list, **only** from the AGENT.md §6.5 vocabulary:
  `header`, `media`, `links`, `link`, `items` (+ `heading`, `text`, `content`), `settings`,
- whether `items` get a `<Name>Card.tsx` subcomponent,
- whether interaction is needed → a separate `'use client'` file (try `<details>`/`<dialog>` first),
- whether the section is a variant of an existing block (then a `variant: select` field, not a new block).

## 2. Code
File patterns (Hero, FeatureGrid + FeatureCard): `resources/section-code.md`.

1. `src/blocks/<Name>/config.ts` — `interfaceName: '<Name>Block'`, fields from the plan,
   always `buildSectionSettingsField()`. CTA = `buildLinksField()`, never `cta*`/`button*` fields.
   A downloadable file = a link of type `file`. **Panel per AGENT.md §6.5a:**
   - repeatable → an array with `labels: { singular, plural }` + `admin: { initCollapsed: true, components: rowLabel('heading', '<Singular>') }`, `maxRows` from the design;
   - no numbered fields (`cta1`, `feature2Title`, `image3`) and no spare fields "just in case";
   - EN labels of 1–3 words, `description` only when needed (≤ 80 chars, what/where, an example);
   - dependent fields use `admin.condition`, a variant = a `variant` select, > ~10 fields → `tabs`;
   - block: `labels: { singular: 'Feature grid', plural: 'Feature grids' }`.
2. `src/blocks/<Name>/Component.tsx` — named export, type from `@/payload-types`
   (`<Name>Block & { locale: string }`), structure:
   `<Section settings>` → `<SectionHeader header>` → content with `<Media>`, `<CMSLink>`,
   `items.map(<Card/>)`. No text, `href`, `<img>`, hex colors or inline SVG. Styles only through the design-token
   utilities (`bg-surface`, `text-fg`, `rounded-card`, `py-section` — AGENT.md §6.11, design-tokens.md); no `dark:` for
   colours; a different look per brand = a value in `src/design/tokens.ts`, never a change here.
3. Subcomponents go in the same folder; shared by 2+ sections → `src/components/ui/`.
   An image the visitor can enlarge (gallery, card, product, certificate) → wrap the `<Media>` in
   `<LightboxTrigger group={`<name>-${id}`} image={lightboxImage(item.image, { size: 'hero' })}>`
   (`@intecion/ipal-kit/client`; skip the trigger when `lightboxImage` returns `null`). No
   `useState` dialog, no `glightbox` — lightbox.md.
4. Add `config.ts` to `pageBlocks` (`src/blocks/configs.ts`, used by `layout` in `src/collections/Pages.ts`),
   and the component to `src/blocks/registry.ts` (`extra: { <slug>: Component }` in `createBlockRegistry`, key = slug).
5. `pnpm generate:types`.

## 3. Check
- `Component.tsx` ≤ ~80 lines of JSX.
- **Empty block test** in the panel: ≤ 6 items at the start, every label and description
  readable in English and Polish (switch the admin language in Account),
  "+ Add Button / Add Feature", collapsed rows showing their content, every field shows something.
  First `rowLabel` in the project → `pnpm payload generate:importmap`.
- Run the **ipal-audit** skill (`--quick`), fix every `[ERROR]`.
- Refactoring an existing block with renamed fields: **migrate the data first**
  (old field → new), and only then remove the old fields (AGENT.md §6.7).
