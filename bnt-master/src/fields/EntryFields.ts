import type { CollectionConfig, Field } from 'payload'
import { adminOnly, adminOrEditor, buildSlugField, buildNoindexField, buildSummaryField, buildRevalidateHook, trackSlugHistoryHook, rowLabel } from '@intecion/ipal-kit'
import { revalidatePath } from 'next/cache'
import { i18nConfig } from '@/i18n.config'
import { pageBlocks } from '@/blocks/configs'
const text = (name: string): Field => ({ name, type: 'text', label: { en: name, pl: name }, admin: { readOnly: true } })
const json = (name: string): Field => ({ name, type: 'json', label: { en: name, pl: name }, admin: { readOnly: true } })
const revalidate = buildRevalidateHook({ config: i18nConfig, revalidatePath })
const common: Field[] = [
 { name: 'title', type: 'text', required: true, label: { en: 'Title', pl: 'Tytuł' } },
 buildSlugField({ from: 'title' }),
 { name: 'legacySlug', type: 'text', admin: { readOnly: true, hidden: true } },
 { name: 'layout', type: 'blocks', blocks: pageBlocks, label: { en: 'Sections', pl: 'Sekcje' } },
 { name: 'media', type: 'upload', relationTo: 'media', label: { en: 'Cover', pl: 'Okładka' } },
 { name: 'shortDesc', type: 'textarea', label: { en: 'Summary', pl: 'Wprowadzenie' } },
 { name: 'sortOrder', type: 'number', label: { en: 'Order', pl: 'Kolejność' }, defaultValue: 0 },
 buildSummaryField(), buildNoindexField(),
 { name: 'slugHistory', type: 'array', label: { en: 'Old addresses', pl: 'Stare adresy' }, labels: { singular: { en: 'Address', pl: 'Adres' }, plural: { en: 'Addresses', pl: 'Adresy' } }, admin: { readOnly: true, components: rowLabel('slug', 'Address') }, fields: [text('slug')] },
]
const access = { read: () => true, create: adminOrEditor, update: adminOrEditor, delete: adminOnly }
const hooks: CollectionConfig['hooks'] = { beforeChange: [trackSlugHistoryHook], afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] }

export { common, text, json, access, hooks }
