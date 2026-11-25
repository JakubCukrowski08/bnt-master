import { libraryBlocks, type LibraryBlocksOptions } from '@intecion/ipal-kit/blocks'
import { MapBlock } from '@/blocks/Map/config'
import { Cookies } from '@/blocks/Cookies/config'
export const blockOptions = { hero: true, textMedia: true, featureGrid: true, cta: true, richText: true, faq: true, contact: true, gallery: true, stats: true, steps: true, entryList: { maxItems: 50, collections: [{ label: { en: 'Services', pl: 'Usługi' }, value: 'services' }, { label: { en: 'Projects', pl: 'Realizacje' }, value: 'projects' }] } } satisfies LibraryBlocksOptions
export const pageBlocks = [...libraryBlocks(blockOptions), Cookies, MapBlock]
