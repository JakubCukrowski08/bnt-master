# Section code — ready files for the project

> Resources of the **ipal-block** skill. The rules (why, and what not to do) are in
> `node_modules/@intecion/ipal-kit/docs/agent/AGENT.md` §6 — this file is only the code
> to create in the project **1:1**. Links (`buildLinkField`, `buildLinksField`,
> `resolveLink`), section fields (`buildSectionHeaderField`, `buildSectionSettingsField`) and the menu
> (`resolveNav`) come from the plugin — do not copy them.

## Layer 1 — shared fields

**Link / CTA — from the plugin, do not copy the code** (`docs/links.md`):

```ts
import { buildLinkField, buildLinksField } from '@intecion/ipal-kit'

buildLinksField()                                            // 0–2 section buttons → `links` field
buildLinksField({ maxRows: 3, appearances: ['primary', 'secondary'] })
buildLinkField()                                             // single link → `link` field
buildLinkField({ disableLabel: true, appearances: false })   // whole card clickable
```

One link shape: type (`internal` page / `external` URL, mailto, tel, #anchor /
`file` upload), `label` (localized), `newTab`, `appearance`. `payload-types.ts`
gets a `CmsLink` type (without style: `CmsLinkPlain`, without label: `CmsLinkNoLabel`; all
fit `CmsLink`; custom name: `interfaceName`). Options: `relationTo` (default `'pages'`), `uploadTo`
(default `'media'`), `required`.


**Files and images:** `{ name: 'media', type: 'upload', relationTo: 'media' }`.
The `media` collection accepts PDF (`upload.mimeTypes: ['image/*', 'application/pdf',
'video/mp4']`), has `alt` (required, localized) and `normalizeFilenameHook`.
"Download price list (PDF)" is a **link of type `file`**, not a separate `pdf`/`pdfUrl` field.

**Section header and settings — from the plugin, do not copy the code** (`docs/blocks.md`):

```ts
import { buildSectionHeaderField, buildSectionSettingsField } from '@intecion/ipal-kit'

buildSectionHeaderField()      // `header` group: eyebrow, heading, intro (localized) — type SectionHeaderData
buildSectionSettingsField()    // sidebar `settings`: anchor, background (default/muted/inverted) — type SectionSettings
buildSectionSettingsField({ backgrounds: [{ label: 'Default', value: 'default' }, { label: 'Brand', value: 'brand' }] })
```

Every section has `buildSectionSettingsField()` — no `bgColor`, `darkMode`,
`sectionId` in individual blocks. Field labels in English (the panel is EN).

## Layer 2 — UI primitives

`src/components/ui/CMSLink.tsx` — **every** link/button from the panel:

```tsx
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { CmsLink } from '@/payload-types'
import { resolveLink } from '@/lib/content'
import { buttonClass } from './Button'
import type { LinkAppearance } from '@intecion/ipal-kit'

type Props = {
  link: CmsLink | null | undefined
  locale: string
  className?: string
  /** For wrapping links (cards): content instead of link.label. */
  children?: ReactNode
}

// href, new tab, rel, internal/external — from the plugin. Here: the element and the classes.
export async function CMSLink({ link, locale, className, children }: Props) {
  const l = await resolveLink(link, locale)
  const content = children ?? l?.label
  if (!l || !content) return null
  const cls = [l.appearance ? buttonClass(l.appearance as LinkAppearance) : '', className].filter(Boolean).join(' ') || undefined
  return l.internal
    ? <Link href={l.href} className={cls} {...l.targetProps}>{content}</Link>
    : <a href={l.href} className={cls} {...l.targetProps}>{content}</a>
}
```

`src/components/ui/Button.tsx` — variants as a map, not a ternary:

```ts
import type { LinkAppearance } from '@intecion/ipal-kit'

// design-token utilities only (design-tokens.md) — a brand changes src/design/tokens.ts, never this file
const BASE = 'inline-flex items-center gap-2 rounded-control px-5 py-2.5 font-medium transition-colors duration-fast ease-out'
const VARIANTS: Record<LinkAppearance, string> = {
  primary: `${BASE} bg-primary text-on-primary hover:bg-primary-hover`,
  secondary: `${BASE} bg-secondary text-on-secondary hover:bg-secondary-hover`,
  link: 'text-link underline-offset-4 hover:text-link-hover hover:underline',
}

export function buttonClass(appearance: LinkAppearance): string {
  return VARIANTS[appearance]
}
```

`src/components/ui/Media.tsx` — **every** image/video from the panel. The plugin handles speed
(`mediaImageProps`, `videoProps`), the look stays here:

```tsx
import Image from 'next/image'
import { mediaImageProps, MEDIA_SIZES, videoProps, type VideoMode } from '@intecion/ipal-kit'
import type { Media as MediaDoc } from '@/payload-types'

type Props = {
  resource: MediaDoc | string | number | null | undefined
  /** Width ON SCREEN — MEDIA_SIZES.half / .third / a custom string. Without it the full width downloads. */
  sizes?: string
  /** Only the first visible image of the page (hero, LCP). The rest load lazily. */
  priority?: boolean
  className?: string
  /** Video: 'background' (muted loop) or 'player' (controls, loads on click). */
  videoMode?: VideoMode
  /** Video poster — upload from the panel. */
  poster?: MediaDoc | string | number | null
}

export function Media({ resource, sizes = MEDIA_SIZES.full, priority = false, className, videoMode = 'player', poster }: Props) {
  const video = videoProps(resource, { mode: videoMode, poster })
  if (video) return <video {...video} className={className} />
  const img = mediaImageProps(resource, { priority, sizes })
  if (!img) return null // PDF / file — a link of type 'file' (CMSLink), not <Media>
  return <Image {...img} className={className} />
}
```

Media in the collection: `upload: { focalPoint: true, … }` (focal point → `object-position`) and
hooks from the plugin: `hooks.beforeOperation: [normalizeFilenameHook, buildOptimizeUploadHook(), buildMediaPlaceholderHook()]`,
fields `buildOptimizeUploadField()` (consent to optimize an oversized file) and
`buildMediaPlaceholderField()` (blurred preview + color while loading).

`Section.tsx` and `SectionHeader.tsx`:

```tsx
// src/components/ui/Section.tsx
import type { ReactNode } from 'react'
import type { SectionSettings } from '@/payload-types'

const BACKGROUNDS: Record<NonNullable<SectionSettings['background']>, string> = {
  default: 'bg-bg text-fg',
  muted: 'bg-surface-muted text-fg',
  inverted: 'bg-inverse',
}

export function Section({ settings, children }: { settings?: SectionSettings | null; children: ReactNode }) {
  const background = settings?.background ?? 'default'
  return (
    <section
      id={settings?.anchor || undefined}
      // inverse: the tokens inside are re-mapped, so cards/links keep text-fg, text-link (design-tokens.md)
      data-surface={background === 'inverted' ? 'inverse' : undefined}
      className={`py-section ${BACKGROUNDS[background]}`}
    >
      <div className="mx-auto max-w-container px-gutter">{children}</div>
    </section>
  )
}
```

```tsx
// src/components/ui/SectionHeader.tsx
import type { SectionHeaderData } from '@/payload-types'

export function SectionHeader({ header, as: H = 'h2' }: { header?: SectionHeaderData | null; as?: 'h1' | 'h2' }) {
  if (!header?.heading && !header?.eyebrow && !header?.intro) return null
  return (
    <header className="mb-stack max-w-measure">
      {header.eyebrow && <p className="mb-2 text-sm font-medium text-fg-muted">{header.eyebrow}</p>}
      {header.heading && <H className={H === 'h1' ? 'text-h1' : 'text-h2'}>{header.heading}</H>}
      {header.intro && <p className="mt-4 text-lead">{header.intro}</p>}
    </header>
  )
}
```

**`locale` for every block — once, in the page route:**

```tsx
const enhanceProps = () => ({ locale })   // Turnstile: <TurnstileProvider> in the layout, not props
<RenderBlocks blocks={doc.layout as never} components={blockRegistry} enhanceProps={enhanceProps} />
```

## Layer 3 — section = composition

```ts
// src/blocks/Hero/config.ts
import type { Block } from 'payload'
import { buildLinksField } from '@intecion/ipal-kit'
import { buildSectionHeaderField, buildSectionSettingsField } from '@intecion/ipal-kit'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    buildSectionHeaderField(),
    { name: 'media', type: 'upload', relationTo: 'media' },
    buildLinksField(),
    buildSectionSettingsField(),
  ],
}
```

```tsx
// src/blocks/Hero/Component.tsx — the whole component
import type { HeroBlock } from '@/payload-types'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Media } from '@/components/ui/Media'
import { CMSLink } from '@/components/ui/CMSLink'

export function Hero({ header, media, links, settings, locale }: HeroBlock & { locale: string }) {
  return (
    <Section settings={settings}>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <SectionHeader header={header} as="h1" />
          {links?.length ? (
            <div className="flex flex-wrap gap-3">
              {links.map(({ id, link }) => <CMSLink key={id} link={link} locale={locale} />)}
            </div>
          ) : null}
        </div>
        <Media resource={media} priority sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
    </Section>
  )
}
```

A section with repeatable items — an array item is a subcomponent:

```ts
// src/blocks/FeatureGrid/config.ts (fields) — import { buildLinkField, buildLinksField, rowLabel } from '@intecion/ipal-kit'
buildSectionHeaderField(),
{
  name: 'items',
  type: 'array',
  interfaceName: 'FeatureItem',
  labels: { singular: 'Feature', plural: 'Features' },   // panel: "+ Add Feature"
  minRows: 1,
  maxRows: 6,                                             // as many as the design fits
  admin: { initCollapsed: true, components: rowLabel('heading', 'Feature') },   // row = heading
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media' },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'text', type: 'textarea', localized: true },
    buildLinkField({ appearances: ['link'] }),
  ],
},
buildLinksField({ maxRows: 1 }),
buildSectionSettingsField(),
```

```tsx
// src/blocks/FeatureGrid/FeatureCard.tsx
export function FeatureCard({ item, locale }: { item: FeatureItem; locale: string }) {
  return (
    <article className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-sm">
      <Media resource={item.media} sizes="(min-width: 1024px) 33vw, 100vw" />
      <h3>{item.heading}</h3>
      {item.text && <p>{item.text}</p>}
      <CMSLink link={item.link} locale={locale} />
    </article>
  )
}

// src/blocks/FeatureGrid/Component.tsx
export function FeatureGrid({ header, items, links, settings, locale }: FeatureGridBlock & { locale: string }) {
  return (
    <Section settings={settings}>
      <SectionHeader header={header} />
      <div className="grid gap-gap md:grid-cols-3">
        {items?.map((item) => <FeatureCard key={item.id} item={item} locale={locale} />)}
      </div>
      {links?.map(({ id, link }) => <CMSLink key={id} link={link} locale={locale} className="mt-10" />)}
    </Section>
  )
}
```

**Extract a subcomponent when any of these is true:** the same JSX 2+ times;
an `items[]` element has >5 lines of markup; `Component.tsx` >80 lines of JSX; there is state/
interaction (accordion, slider, tabs → a separate `'use client'`). A subcomponent of
one section → in its folder; used in 2+ sections → `src/components/ui/`.
Icons: upload or a `select` with a map in `src/components/icons` — never SVG pasted
into a section.

## Icons

Two sources, nothing in between:
- **Any graphic from the client** → upload to `media` + `<Media>` (also the logo, brand SVG icons).
- **A fixed set of UI icons** → a `select` field + a `lucide-react` map:

```ts
// src/components/icons/names.ts — names only, imported by the block config
export const ICON_NAMES = ['phone', 'mail', 'mapPin', 'clock', 'check'] as const
export type IconName = (typeof ICON_NAMES)[number]
export const iconField = {
  name: 'icon',
  type: 'select',
  options: ICON_NAMES.map((value) => ({ label: value, value })),
} as const
```
```tsx
// src/components/icons/Icon.tsx — the map, imported only by components
import { Check, Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import type { IconName } from './names'

const ICONS: Record<IconName, LucideIcon> = { phone: Phone, mail: Mail, mapPin: MapPin, clock: Clock, check: Check }

export function Icon({ name, className }: { name?: IconName | null; className?: string }) {
  if (!name) return null
  const Component = ICONS[name]
  return <Component className={className} aria-hidden />
}
```
The names are separate so the block config (`payload.config`) does not import React
components. **Never** SVG pasted into a section's JSX.

## Style

The design-token standard (`node_modules/@intecion/ipal-kit/docs/design-tokens.md`, AGENT.md §6.11):
- **Components use only the preset's utilities** — `bg-bg`, `bg-surface`, `bg-surface-muted`, `bg-inverse`, `text-fg`,
  `text-fg-strong`, `text-fg-muted`, `text-on-primary`, `border-border`, `text-link`, `outline-focus`, `text-h1`…,
  `py-section`, `px-gutter`, `gap-gap`, `rounded-control`, `rounded-card`, `shadow-sm`, `max-w-container`.
  **Never** hex, `bg-[#ff6600]`, `var(--color-…)`, or `dark:` for colours (the roles switch with the theme).
- The brand is `src/design/tokens.ts` → `pnpm exec ipal-tokens` → `src/design/tokens.css`; `DESIGN.md` describes it.
- Fonts via `next/font` with `variable: '--font-family-body'` / `'--font-family-heading'` on `<html>`.
- No CSS Modules and no `style={{…}}` — exception: a dynamic value from data.
- Visual variants → `Record<Variant, string>` (§6.3), not ternary chains.

```css
/* src/app/(frontend)/styles.css — the same on every site */
@import "tailwindcss";
@import "@intecion/ipal-kit/fluid-wide.css";
@import "@intecion/ipal-kit/tokens.css";
@import "@intecion/ipal-kit/tailwind.css";
@import "../../design/tokens.css";   /* generated by ipal-tokens from src/design/tokens.ts */
@source "../../../node_modules/@intecion/ipal-kit/dist/**/*.js";
```

