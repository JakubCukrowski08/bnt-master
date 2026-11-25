import { adminOnly, adminOrEditor } from '@intecion/ipal-kit'
import type { GlobalConfig } from 'payload'

import { buildGlobalRevalidateHook, buildLinkField, rowLabel } from '@intecion/ipal-kit'
import { revalidatePath } from 'next/cache'

/** ipal-nav: link columns and a note. Legal links come from System pages (getSystemLinks), not from here. */
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true, update: adminOrEditor },
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { components: rowLabel('heading', 'Column'), initCollapsed: true },
      fields: [
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'items',
          type: 'array',
          admin: { components: rowLabel('link.label', 'Link'), initCollapsed: true },
          fields: [buildLinkField({ appearances: false })],
          labels: { plural: 'Links', singular: 'Link' },
        },
      ],
      labels: { plural: 'Columns', singular: 'Column' },
      maxRows: 4,
    },
    { name: 'note', type: 'textarea', localized: true },
  ],
  hooks: { afterChange: [buildGlobalRevalidateHook({ revalidatePath })] },
}
