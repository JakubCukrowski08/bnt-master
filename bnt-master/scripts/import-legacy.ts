/** Local, additive migration. Dry run by default; APPLY=1 after reviewing the plan and taking a backup. */
import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'
import { getPayload } from 'payload'
import { createSeeder, guardSeedExit } from '@intecion/ipal-kit/seed'
import config from '@payload-config'
import type { Page } from '@/payload-types'
import { services } from './legacy-data/services'
import { realizacje } from './legacy-data/realizacje'
import { rich, heading, pageLink } from './content-helpers'

guardSeedExit()
if (process.env.NODE_ENV === 'production' || !process.env.DATABASE_URI?.startsWith('file:')) throw Error('This import is restricted to a local SQLite database. Use a reviewed data migration on production.')
const apply = process.env.APPLY === '1'
const payload = await getPayload({ config })
const context = { ipalMigration: true, ipalSkipIndexNow: true, disableRevalidate: true }
try {
 const seed = createSeeder(payload, { dryRun: !apply })
 // First import into an empty installation; never overwrite an editor's existing records.
 await seed.upsertBySlug('services', services.map(({ id, ...data }, sortOrder) => ({ ...data, legacyId: id, sortOrder })))
 await seed.upsertBySlug('projects', realizacje.map(({ id, ...data }, sortOrder) => ({ ...data, featured: Boolean(data.featured), legacyId: id, sortOrder })))
 const source = z.object({ heading: z.string(), content: z.string().optional(), paragraphs: z.array(z.string()).optional(), items: z.array(z.string()).optional(), tags: z.array(z.string()).optional() })
 const serviceSchema = z.object({ introSection: source.nullish(), calloutSection: source.nullish(), gridSection: source.nullish(), darkSection: source.nullish(), sections: z.object({ first: z.object({ title: z.string(), items: z.array(z.string()) }), second: z.object({ title: z.string(), content: z.string() }) }).nullish() })
 const projectSchema = z.object({ stats: z.array(z.object({ label: z.string(), value: z.union([z.number(), z.string()]), isNumber: z.boolean() })).nullish(), features: z.array(z.string()).nullish(), gallery: z.array(z.string()).nullish() })
 const mediaCache = new Map<string, number>()
 async function media(legacyPath: string, alt: string): Promise<number | undefined> {
  if (mediaCache.has(legacyPath)) return mediaCache.get(legacyPath)
  const existing = await payload.find({ collection: 'media', where: { legacyPath: { equals: legacyPath } }, limit: 1 })
  if (existing.docs[0]) { mediaCache.set(legacyPath, existing.docs[0].id); return existing.docs[0].id }
  const filePath = path.resolve('public', '.' + legacyPath)
  if (!filePath.startsWith(path.resolve('public') + path.sep) || !fs.existsSync(filePath)) throw Error('Missing source image: ' + legacyPath)
  console.log((apply ? 'import image ' : 'plan image ') + legacyPath)
  if (!apply) return undefined
  const doc = await payload.create({ collection: 'media', filePath, data: { alt, legacyPath }, context })
  mediaCache.set(legacyPath, doc.id)
  return doc.id
 }
 const svc = await payload.find({ collection: 'services', pagination: false, sort: 'sortOrder' })
 for (const doc of svc.docs) {
  if (doc.layout?.length) continue
  console.log((apply ? 'migrate service ' : 'plan service ') + doc.slug)
  const data = serviceSchema.parse(doc)
  const layout: Page['layout'] = [{ blockType: 'hero', variant: 'page', header: heading(doc.title, doc.lead ?? doc.shortDesc ?? undefined), settings: { background: 'inverted' } }]
  for (const section of [data.introSection, data.calloutSection, data.gridSection, data.darkSection]) {
   if (!section) continue
   const paras = [...(section.paragraphs ?? []), ...(section.content ? [section.content] : [])]
   const items = section.items ?? section.tags
   if (paras.length) layout.push({ blockType: 'richText', header: heading(section.heading), content: rich(paras) })
   if (items?.length) layout.push({ blockType: 'featureGrid', header: paras.length ? undefined : heading(section.heading), variant: 'list', items: items.map(text => ({ heading: text })) })
  }
  if (data.sections) {
   layout.push({ blockType: 'featureGrid', header: heading(data.sections.first.title), variant: 'list', items: data.sections.first.items.map(text => ({ heading: text })) })
   layout.push({ blockType: 'richText', header: heading(data.sections.second.title), content: rich([data.sections.second.content]) })
  }
  // Relationship values are resolved to IDs below; the project never constructs a page href.
  const contact = await payload.find({ collection: 'pages', where: { slug: { equals: 'kontakt' } }, limit: 1 })
  if (contact.docs[0]) layout.push({ blockType: 'cta', header: heading('Omów swoją inwestycję'), links: [{ link: { type: 'internal', page: contact.docs[0].id, label: 'Porozmawiajmy o projekcie', appearance: 'primary' } }] })
  if (apply) await payload.update({ collection: 'services', id: doc.id, locale: 'pl', fallbackLocale: false, data: { layout, aiSummary: doc.shortDesc }, context })
 }
 const projects = await payload.find({ collection: 'projects', pagination: false, sort: 'sortOrder' })
 for (const doc of projects.docs) {
  if (doc.layout?.length) continue
  console.log((apply ? 'migrate project ' : 'plan project ') + doc.slug)
  const data = projectSchema.parse(doc)
  const cover = doc.mainImg ? await media(doc.mainImg, doc.title) : undefined
  const gallery = []
  for (const src of data.gallery ?? []) { const image = await media(src, doc.title); if (image) gallery.push({ media: image, caption: doc.title }) }
  const layout: Page['layout'] = [ { blockType: 'hero', variant: 'split', header: heading(doc.title, doc.shortDesc ?? undefined), media: cover, settings: { background: 'inverted' } } ]
  if (doc.fullDesc) layout.push({ blockType: 'richText', header: heading('O inwestycji'), content: rich([doc.fullDesc]) })
  if (data.stats?.length) layout.push({ blockType: 'stats', variant: 'row', items: data.stats.map(s => ({ heading: s.label, value: String(s.value) })) })
  if (data.features?.length) layout.push({ blockType: 'featureGrid', header: heading('Zakres i parametry'), items: data.features.map(text => ({ heading: text })), variant: 'list' })
  if (gallery.length) layout.push({ blockType: 'gallery', items: gallery, variant: 'grid', columns: 'three' })
  if (apply) await payload.update({ collection: 'projects', id: doc.id, locale: 'pl', fallbackLocale: false, data: { layout, media: cover, aiSummary: doc.shortDesc }, context })
 }
 const home = await payload.find({ collection: 'pages', where: { slug: { equals: 'start' } }, limit: 1 })
 const homePage = home.docs[0]
 const firstBlock = homePage?.layout?.[0]
 if (homePage && firstBlock?.blockType === 'hero' && !firstBlock.media) {
  const image = await media('/images/site-hero.jpg', 'Współczesna zabudowa mieszkaniowa')
  if (apply && image) { firstBlock.media = image; await payload.update({ collection: 'pages', id: homePage.id, data: { layout: homePage.layout }, context }) }
 }
 process.exitCode = seed.summary().errors ? 1 : 0
} finally { await payload.destroy() }
