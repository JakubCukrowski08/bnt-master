# Navigation code — Header, Footer, mobile menu

> Resources of the **ipal-nav** skill. Rules: `node_modules/@intecion/ipal-kit/docs/agent/AGENT.md` §6.8.
> Requires the UI primitives from `../ipal-block/resources/section-code.md` (CMSLink, Media).

## Header and Footer (navigation globals)

Navigation, footer and company data are **project globals** (the model depends on the client
and the country), built from the same shared fields as sections. Logo and name live in
Site settings — do not duplicate them in Header.

```ts
// src/globals/Header.ts
import type { GlobalConfig } from 'payload'
import { buildLinkField, buildLinksField, rowLabel } from '@intecion/ipal-kit'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      labels: { singular: 'Menu item', plural: 'Menu items' },
      maxRows: 8,
      admin: { initCollapsed: true, components: rowLabel('link.label', 'Menu item') },
      fields: [
        buildLinkField({ appearances: false }),
        {
          name: 'subItems',          // one submenu level — we do not build deeper
          type: 'array',
          labels: { singular: 'Submenu item', plural: 'Submenu' },
          maxRows: 10,
          admin: { initCollapsed: true, components: rowLabel('link.label', 'Submenu item') },
          fields: [buildLinkField({ appearances: false })],
        },
      ],
    },
    buildLinksField({ maxRows: 1 }),     // CTA button in the header
    {
      name: 'menuLabel',
      type: 'text',
      localized: true,
      admin: { description: 'Accessible label of the mobile menu button, e.g. "Menu".' },
    },
  ],
}
```

```ts
// src/globals/Footer.ts
import type { GlobalConfig } from 'payload'
import { buildLinkField, rowLabel } from '@intecion/ipal-kit'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      maxRows: 4,
      admin: { initCollapsed: true, components: rowLabel('heading', 'Column') },
      fields: [
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Link', plural: 'Links' },
          admin: { initCollapsed: true, components: rowLabel('link.label', 'Link') },
          fields: [buildLinkField({ appearances: false })],
        },
      ],
    },
    { name: 'note', type: 'textarea', localized: true },   // e.g. "All rights reserved"
  ],
}
```

- **Legal links in the footer** (privacy policy, cookies, terms): `await getSystemLinks(locale)` from `lib/content`
  — href and label (page title) from System pages; do not add them by hand to `columns`, do not write labels in code.
- Highlighted menu item / button in a different colour = a style in the admin panel:
  `buildLinkField({ appearances: ['default', { label: 'Highlighted', value: 'highlight' }] })` → a class in the project.
- **Company data** (name, address, NIP/ABN, phone) — the project's `company` global;
  the footer and JSON-LD read from it. Compute the copyright year in code
  (`new Date().getFullYear()`), take the name from the global.
- **Refreshing:** a global changes on every page → `buildGlobalRevalidateHook` in `afterChange`
  (hooks.md; it calls `revalidatePath('/', 'layout')`, skips seeds/migrations and `context.disableRevalidate`;
  `buildRevalidateHook` is for collections):

```ts
// src/globals/Header.ts (and Footer, Company)
import { buildGlobalRevalidateHook } from '@intecion/ipal-kit'
import { revalidatePath } from 'next/cache'

hooks: {
  afterChange: [buildGlobalRevalidateHook({ revalidatePath })],
},
```

The plugin resolves the menu from the global: `await resolveNav(header.navItems, locale)` from `lib/content`
→ `{ href, label, internal, newTab, targetProps, children }[]` (dead links skipped, any
depth). This is plain data — it goes straight to the client `MobileNav`. Do not create `lib/navigation.ts`.


```tsx
// src/components/layout/Header.tsx — server
import Link from 'next/link'
import type { Header as HeaderData } from '@/payload-types'
import { resolveNav } from '@/lib/content'
import { CMSLink } from '@/components/ui/CMSLink'
import { MobileNav } from './MobileNav'

export async function Header({ header, locale }: { header: HeaderData; locale: string }) {
  const items = await resolveNav(header.navItems, locale)
  return (
    <header className="border-b">
      <nav className="container flex items-center justify-between py-4">
        {/* logo: Site settings → <Media> */}
        <ul className="hidden gap-6 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} {...item.targetProps}>{item.label}</Link>
            </li>
          ))}
        </ul>
        {header.links?.map(({ id, link }) => <CMSLink key={id} link={link} locale={locale} />)}
        <MobileNav items={items} menuLabel={header.menuLabel ?? ''} />
      </nav>
    </header>
  )
}
```

```tsx
// src/components/layout/MobileNav.tsx — client, open state only
'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { NavItem } from '@intecion/ipal-kit'   // TYPE import — does not pull in server code

export function MobileNav({ items, menuLabel }: { items: NavItem[]; menuLabel: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button type="button" aria-expanded={open} aria-label={menuLabel} onClick={() => setOpen(!open)}>
        <span aria-hidden>☰</span>
      </button>
      {open && (
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

Fetch Header/Footer in `[locale]/layout.tsx` (through a cached getter in
`lib/`) and pass them as props — the layout is the only place that assembles them.

`Footer` component — content inside `NoSnippet` (otherwise Google shows the footer address as
the description of every subpage; seo.md → "Descriptions in Google"):

```tsx
import { NoSnippet } from '@intecion/ipal-kit/rsc'

<footer className="…">
  <NoSnippet className="…">{/* company data, links, legal links */}</NoSnippet>
</footer>
```

