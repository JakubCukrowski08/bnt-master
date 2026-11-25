import type { Block } from 'payload'
import { buildSectionHeaderField, buildSectionSettingsField } from '@intecion/ipal-kit'
export const Cookies: Block = { slug: 'cookieTable', interfaceName: 'CookieTableBlock', labels: { singular: { en: 'Cookie table', pl: 'Tabela cookies' }, plural: { en: 'Cookie tables', pl: 'Tabele cookies' } }, fields: [buildSectionHeaderField(), buildSectionSettingsField()] }
