import { getPayload } from 'payload'
import config from '@payload-config'
import map from './legacy-data/map.json'
import { rich, heading } from './content-helpers'
if (process.env.NODE_ENV === 'production' || !process.env.DATABASE_URI?.startsWith('file:')) throw Error('This additive migration is local only.')
const payload = await getPayload({ config })
const context = { ipalMigration: true, ipalSkipIndexNow: true, disableRevalidate: true }
try {
 const cookies = await payload.find({ collection: 'pages', where: { slug: { equals: 'polityka-cookies' } }, limit: 1 })
 const page = cookies.docs[0]
 if (page && !page.layout?.some(b => b.blockType === 'cookieTable')) await payload.update({ collection: 'pages', id: page.id, data: { layout: [...(page.layout ?? []), { blockType: 'cookieTable', header: heading('Aktualna lista cookies') }] }, context })
 const contact = (await payload.find({ collection: 'pages', where: { slug: { equals: 'kontakt' } }, limit: 1 })).docs[0]
 if (contact && !contact.layout?.some(b => b.blockType === 'consentMap')) await payload.update({ collection: 'pages', id: contact.id, data: { layout: [...(contact.layout ?? []), { blockType: 'consentMap', embed: map.embed, header: heading('Obszar działania'), consentLabel: 'Otwórz ustawienia zgody, aby wyświetlić mapę', mapLabel: 'Obszar działania BNT Budownictwo — Wrocław' }, { blockType: 'featureGrid', header: heading('Najczęstsze pytania'), items: [{ heading: 'Konkretne zapytanie', text: 'Napisz, jaki zakres prac Cię interesuje, na jakim etapie jest inwestycja i gdzie jest realizowana.' }, { heading: 'Zakres dopasowany do projektu', text: 'Zakres wsparcia omawiamy w odniesieniu do dokumentacji, etapu realizacji i potrzeb inwestora.' }, { heading: 'Wrocław i Dolny Śląsk', text: 'Usługi kierujemy do inwestorów realizujących projekty we Wrocławiu i na terenie województwa dolnośląskiego.' }] }] }, context })
 const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'start' } }, limit: 1 })).docs[0]
 const projects = await payload.find({ collection: 'projects', where: { featured: { equals: true } }, sort: 'sortOrder', limit: 4 })
 if (home?.layout) {
  const list = home.layout.find(b => b.blockType === 'entryList' && b.entryCollection === 'projects')
  if (list?.blockType === 'entryList' && !list.entries?.length && projects.docs.length) {
   list.mode = 'selected'; list.entries = projects.docs.map(doc => ({ relationTo: 'projects' as const, value: doc.id }))
   await payload.update({ collection: 'pages', id: home.id, data: { layout: home.layout }, context })
  }
 }
 const hero = (await payload.find({ collection: 'media', where: { legacyPath: { equals: '/images/site-hero.jpg' } }, limit: 1 })).docs[0]
 let icon = (await payload.find({ collection: 'media', where: { legacyPath: { equals: '/brand/favicon.png' } }, limit: 1 })).docs[0]
 if (!icon) icon = await payload.create({ collection: 'media', data: { alt: 'BNT Budownictwo', legacyPath: '/brand/favicon.png', optimizeOnUpload: false }, filePath: 'public/brand/favicon.png', context })
 const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
 if (icon && !settings.favicon) await payload.updateGlobal({ slug: 'site-settings', data: { favicon: icon.id }, context })
 if (hero && !settings.defaultShareImage) await payload.updateGlobal({ slug: 'site-settings', data: { defaultShareImage: hero.id }, context })
 console.log('Added missing cookie table, consent-gated map, contact guidance and featured-project selection. Existing sections retained.')
} finally { await payload.destroy() }
