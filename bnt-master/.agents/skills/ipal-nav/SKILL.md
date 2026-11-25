---
name: ipal-nav
description: Builds the site header, footer, mobile menu and company data in an ipal-kit project — Header/Footer/Company globals with buildLinkField from the plugin, server-side link resolution (resolveNav from the plugin), a small client MobileNav, legal links from System pages, revalidation on change. Use when creating or changing navigation, menu, header, footer, contact details, social links or the company global.
---

# ipal-nav

Ready code: `resources/nav-code.md` (this skill). Rules: AGENT.md §6.8.
Requires the UI primitives from `../ipal-block/resources/section-code.md` (like the ipal-block skill, step 0).

## Plan (write it down, then go straight to code — AGENT.md §0a)
- menu items (one submenu level, no deeper), CTA in the header (`links`),
- footer columns, note,
- `Company` model for the market in AGENTS.md (PL: NIP/REGON, AU: ABN, US: EIN…),
- a11y labels (menu button etc.) — fields in the admin panel.

## Code
1. `src/globals/Header.ts`, `Footer.ts` — from §6.8; `Company.ts` — company data
   (localized texts), `access.read: () => true`.
2. On every global: `hooks: { afterChange: [buildGlobalRevalidateHook({ revalidatePath })] }`
   (`revalidatePath` from `next/cache`, hooks.md) — it calls `revalidatePath('/', 'layout')` and already
   skips the call outside the Next server (seed, migration) and with `context.disableRevalidate`.
   `buildRevalidateHook` is for collections. The plugin's own globals refresh themselves with
   `ipalKit({ revalidatePath })`.
3. Menu: `await resolveNav(header.navItems, locale)` from `lib/content` (plugin) — links
   resolved on the server to `{ href, label, internal, newTab, targetProps, children }`.
   Do not create `lib/navigation.ts`.
4. `src/components/layout/Header.tsx`, `Footer.tsx` (server), `MobileNav.tsx`
   (`'use client'`, open state only, data via props, `import type { NavItem } from '@intecion/ipal-kit'`).
5. **Legal links in the footer** from the System pages roles: `getSystemLinks(locale)` (href + page
   title) — not as manual items. Copyright year from code, name from `Company`.
6. Logo from Site settings via `<Media>` — do not duplicate the field in Header.
7. Wire it in `src/app/(frontend)/[locale]/layout.tsx` (fetch the globals through
   cached getters in `lib/`, pass them as props).

## Verification
The **ipal-audit** skill. By hand: a menu item added in the panel is visible right after
saving; the mobile menu works with the keyboard (Tab, Enter, Esc).
