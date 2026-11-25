// Local SQLite only: add localized storage, copy and verify, then retire the old column.
// No emails, hooks or external services are invoked. Legacy values remain in legacy_slug.
import { DatabaseSync, backup } from 'node:sqlite'
import { resolve } from 'node:path'
const file = process.argv[2]
if (!file || !file.endsWith('.db') || process.env.NODE_ENV === 'production') throw Error('Pass a local .db path outside production.')
const db = new DatabaseSync(resolve(file))
const collections = ['services', 'projects']
const pending = collections.filter(t => db.prepare(`PRAGMA table_info(${t})`).all().some(c => c.name === 'slug'))
for (const t of pending) console.log(`${t}: ${db.prepare(`SELECT count(*) n FROM ${t}`).get().n} slugs → pl; originals retained as legacySlug`)
if (process.env.APPLY !== '1' || !pending.length) { console.log(pending.length ? 'Dry run. APPLY=1 to migrate.' : '0 changes.'); db.close(); process.exit(0) }
const target = resolve(`${file}.before-slug-localization-${Date.now()}.bak`)
await backup(db, target)
console.log(`Backup: ${target}`)
db.exec('BEGIN IMMEDIATE')
try {
 for (const t of pending) {
  db.exec(`ALTER TABLE ${t} ADD COLUMN legacy_slug text; ALTER TABLE ${t}_locales ADD COLUMN slug text NOT NULL DEFAULT '';`)
  db.exec(`UPDATE ${t} SET legacy_slug=slug; INSERT INTO ${t}_locales (_locale,_parent_id) SELECT 'pl',id FROM ${t} WHERE id NOT IN (SELECT _parent_id FROM ${t}_locales WHERE _locale='pl'); UPDATE ${t}_locales SET slug=(SELECT slug FROM ${t} WHERE id=_parent_id) WHERE _locale='pl';`)
  const missing=db.prepare(`SELECT count(*) n FROM ${t} p LEFT JOIN ${t}_locales l ON l._parent_id=p.id AND l._locale='pl' WHERE l.slug IS NULL OR l.slug<>p.slug OR p.legacy_slug<>p.slug`).get().n
  if(missing) throw Error(`${t}: ${missing} mismatches; rolling back`)
  db.exec(`DROP INDEX ${t}_slug_idx; ALTER TABLE ${t} DROP COLUMN slug; CREATE INDEX ${t}_slug_idx ON ${t}_locales (slug,_locale);`)
 }
 db.exec('COMMIT'); console.log('Verified all copied addresses; old values retained in legacy_slug.')
} catch(error) { db.exec('ROLLBACK'); throw error } finally {db.close()}
