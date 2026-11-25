import { adminOnly, adminOrEditor } from '@intecion/ipal-kit'
import type { GlobalConfig } from 'payload'

import { buildGlobalRevalidateHook, rowLabel } from '@intecion/ipal-kit'
import { revalidatePath } from 'next/cache'

/** Company data for a PL market site: footer, contact block details, LocalBusiness JSON-LD. */
export const Company: GlobalConfig = {
  slug: 'company',
  access: { read: () => true, update: adminOrEditor },
  fields: [
    { name: 'phoneLabel', type: 'text', localized: true, label: { en: 'Phone label', pl: 'Opis telefonu' } },
    { name: 'emailLabel', type: 'text', localized: true, label: { en: 'Email label', pl: 'Opis e-maila' } },
    { name: 'name', type: 'text', required: true },
    { name: 'legalName', type: 'text' },
    { name: 'taxId', type: 'text', label: 'NIP' },
    { name: 'taxIdLabel', type: 'text', admin: { description: 'Shown before the tax ID in the footer.' }, defaultValue: 'NIP', label: 'Tax ID label', localized: true },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'PL' },
      ],
    },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'hours', type: 'text', localized: true, admin: { description: 'Shown next to the contact form, e.g. "Mon–Fri 9:00–17:00".' } },
    {
      name: 'socials',
      type: 'array',
      admin: { components: rowLabel('label', 'Profile'), initCollapsed: true },
      labels: { plural: 'Profiles', singular: 'Profile' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
  hooks: { afterChange: [buildGlobalRevalidateHook({ revalidatePath })] },
}
