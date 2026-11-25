import type { Block } from 'payload'
import { buildSectionHeaderField, buildSectionSettingsField } from '@intecion/ipal-kit'
export const MapBlock: Block = {
 slug: 'consentMap', interfaceName: 'ConsentMapBlock',
 labels: { singular: { en: 'Map', pl: 'Mapa' }, plural: { en: 'Maps', pl: 'Mapy' } },
 fields: [buildSectionHeaderField(),
  { name: 'embed', type: 'text', label: { en: 'Google Maps embed', pl: 'Osadzona mapa Google' }, required: true, validate: (value: unknown) => typeof value === 'string' && /^https:\/\/www\.google\.com\/maps\/embed\?/.test(value) || 'Use a Google Maps embed HTTPS address.' },
  { name: 'consentLabel', type: 'text', localized: true, label: { en: 'Consent button', pl: 'Przycisk zgody' }, required: true },
  { name: 'mapLabel', type: 'text', localized: true, label: { en: 'Map description', pl: 'Opis mapy' }, required: true },
  buildSectionSettingsField(),
 ],
}
