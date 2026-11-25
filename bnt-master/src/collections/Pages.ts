import { adminOnly, adminOrEditor } from '@intecion/ipal-kit'
import type { CollectionConfig } from 'payload'

import {
  buildNoindexField,
  buildPreventDeleteSystemPage,
  buildRevalidateHook,
  buildSlugField,
  buildSummaryField,
  rowLabel,
  trackSlugHistoryHook,
} from '@intecion/ipal-kit'
import { revalidatePath } from 'next/cache'

import { pageBlocks } from '@/blocks/configs'
import { i18nConfig } from '@/i18n.config'

const revalidate = buildRevalidateHook({ config: i18nConfig, revalidatePath })

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { defaultColumns: ['title', 'slug', 'updatedAt'], useAsTitle: 'title' },
  access: { read: () => true, create: adminOrEditor, update: adminOrEditor, delete: adminOnly },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    buildSlugField({ from: 'title' }),
    { name: 'layout', type: 'blocks', blocks: pageBlocks, minRows: 1 },
    buildSummaryField(), // aiSummary — GEO (llms.txt, MCP)
    buildNoindexField(),
    { name: 'slugHistory', type: 'array', admin: { components: rowLabel('slug', 'Old address'), readOnly: true }, fields: [{ name: 'slug', type: 'text' }], labels: { plural: 'Old addresses', singular: 'Old address' } },
  ],
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
    beforeChange: [trackSlugHistoryHook],
    beforeDelete: [buildPreventDeleteSystemPage({ settingsSlug: 'site-settings' })],
  },
}
