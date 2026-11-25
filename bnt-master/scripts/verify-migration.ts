/** Integration checks on an isolated SQLite copy. Mail is captured in memory. */
import assert from 'node:assert/strict'
import { DatabaseSync, backup } from 'node:sqlite'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import baseConfig from '@payload-config'
import { submitForm } from '@intecion/ipal-kit/server'
import { heading } from './content-helpers'

const source = process.env.DATABASE_URI
if (!source?.startsWith('file:') || process.env.NODE_ENV === 'production') throw Error('Local SQLite only')
const directory = await mkdtemp(path.join(tmpdir(), 'bnt-cms-verification-'))
const database = path.join(directory, 'verify.db')
const db = new DatabaseSync(source.slice(5))
await backup(db, database); db.close()
const config = await baseConfig
config.db = { ...sqliteAdapter({ client: { url: `file:${database}` }, push: false }), allowIDOnCreate: false, defaultIDType: 'number', name: 'sqlite' }
const captured: { to: unknown; subject: unknown }[] = []
config.email = () => ({ name: 'local-test-capture', defaultFromAddress: 'test@example.invalid', defaultFromName: 'Local test', sendEmail: async message => { captured.push({ to: message.to, subject: message.subject }); return { sent: true, messageId: `local-${captured.length}` } } })
const payload = await getPayload({ config })
const context = { ipalMigration: true, ipalSkipIndexNow: true, disableRevalidate: true }
try {
 for (const [collection, count] of [['services', 5], ['projects', 14]] as const) {
  const entries = await payload.find({ collection, locale: 'pl', limit: 100, depth: 0 })
  assert.equal(entries.totalDocs, count)
  assert(entries.docs.every(doc => doc.slug && doc.layout?.length && (collection === 'services' || doc.media)))
  console.log(`${collection}: ${count} complete layouts and addresses; project covers retained`)
 }
 const created = await payload.create({ collection: 'pages', data: { title: 'Test edycji CMS', slug: 'test-edycji-cms', noindex: true, layout: [{ blockType: 'hero', header: heading('Nagłówek testowy') }] }, context })
 const edited = await payload.update({ collection: 'pages', id: created.id, data: { title: 'Zmieniony tytuł', layout: [{ blockType: 'hero', header: heading('Zmieniony nagłówek') }, { blockType: 'faq', header: heading('Pytania'), items: [{ question: 'Pytanie testowe', answer: 'Odpowiedź testowa' }] }] }, context })
 assert(edited.layout)
 assert.equal(edited.title, 'Zmieniony tytuł'); assert.equal(edited.layout.length, 2)
 await payload.update({ collection: 'pages', id: created.id, data: { layout: [...edited.layout].reverse() }, context })
 const reordered = await payload.findByID({ collection: 'pages', id: created.id })
 assert(reordered.layout)
 assert.equal(reordered.layout[0].blockType, 'faq')
 await payload.delete({ collection: 'pages', id: created.id, context })
 console.log('CMS: create, edit, add, reorder and delete sections/page passed')
 const form = (await payload.find({ collection: 'forms', where: { title: { equals: 'Kontakt BNT' } }, limit: 1 })).docs[0]
 assert(form)
 const data = { name: 'Test lokalny', email: 'test@example.invalid', phone: '123456789', subject: 'inne', message: 'Kontrolna wiadomość lokalna.', consent: true }
 const submit = (values: Record<string, unknown>, ip: string) => submitForm({ payload, formId: String(form.id), data: values, ip, locale: 'pl' })
 const invalid = await submit({ ...data, email: '' }, '192.0.2.10')
 assert(!invalid.success && invalid.reason === 'validation')
 const noConsent = await submit({ ...data, consent: false }, '192.0.2.11')
 assert(!noConsent.success && noConsent.reason === 'consent')
 const success = await submit(data, '192.0.2.12')
 assert(success.success)
 assert.equal(captured.length, 2)
 const record = await payload.findByID({ collection: 'form-submissions', id: success.submissionId })
 assert(record.submissionData?.some(field => field.field === 'email' && field.value === data.email))
 console.log('Form: required validation, consent, persistence and both captured messages passed (no external delivery)')
 let rateLimited = false
 for (let i = 0; i < 6; i++) { const result = await submit({ ...data, consent: false }, '192.0.2.13'); if (!result.success && result.reason === 'rate_limited') rateLimited = true }
 assert(rateLimited)
 console.log('Form: six rapid attempts trigger rate limit')
} finally { await payload.destroy(); await rm(directory, { recursive: true, force: true }) }
