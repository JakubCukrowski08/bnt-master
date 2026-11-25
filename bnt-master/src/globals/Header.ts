import { adminOnly, adminOrEditor } from '@intecion/ipal-kit'
import type { GlobalConfig } from 'payload'

import { buildGlobalRevalidateHook, buildLinkField, buildLinksField, rowLabel } from '@intecion/ipal-kit'
import { revalidatePath } from 'next/cache'

/** ipal-nav: menu with one submenu level, a CTA button, the mobile menu label. Logo comes from Site settings. */
export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true, update: adminOrEditor },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      admin: { components: rowLabel('link.label', 'Menu item'), initCollapsed: true },
      fields: [
        buildLinkField({ appearances: false }),
        {
          name: 'subItems',
          type: 'array',
          admin: { components: rowLabel('link.label', 'Submenu item'), initCollapsed: true },
          fields: [buildLinkField({ appearances: false })],
          labels: { plural: 'Submenu', singular: 'Submenu item' },
          maxRows: 10,
        },
      ],
      labels: { plural: 'Menu items', singular: 'Menu item' },
      maxRows: 8,
    },
    buildLinksField({ maxRows: 1 }),
    { name: 'menuLabel', type: 'text', admin: { description: 'Accessible label of the mobile menu button, e.g. "Menu".' }, localized: true },
  ],
  hooks: { afterChange: [buildGlobalRevalidateHook({ revalidatePath })] },
}
