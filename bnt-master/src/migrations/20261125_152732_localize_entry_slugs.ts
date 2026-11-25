import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Data migration, not just a schema diff: retain every original address before removal.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of ['services', 'projects']) {
    await db.run(sql.raw(`ALTER TABLE ${table} ADD legacy_slug text`))
    await db.run(sql.raw(`ALTER TABLE ${table}_locales ADD slug text NOT NULL DEFAULT ''`))
    await db.run(sql.raw(`UPDATE ${table} SET legacy_slug=slug`))
    await db.run(sql.raw(`INSERT INTO ${table}_locales (_locale,_parent_id) SELECT 'pl',id FROM ${table} WHERE id NOT IN (SELECT _parent_id FROM ${table}_locales WHERE _locale='pl')`))
    await db.run(sql.raw(`UPDATE ${table}_locales SET slug=(SELECT slug FROM ${table} WHERE id=_parent_id) WHERE _locale='pl'`))
    await db.run(sql.raw(`DROP INDEX ${table}_slug_idx`))
    await db.run(sql.raw(`ALTER TABLE ${table} DROP COLUMN slug`))
    await db.run(sql.raw(`CREATE INDEX ${table}_slug_idx ON ${table}_locales (slug,_locale)`))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of ['services', 'projects']) {
    await db.run(sql.raw(`ALTER TABLE ${table} ADD slug text NOT NULL DEFAULT ''`))
    await db.run(sql.raw(`UPDATE ${table} SET slug=COALESCE((SELECT slug FROM ${table}_locales WHERE _parent_id=${table}.id AND _locale='pl'),legacy_slug)`))
    await db.run(sql.raw(`DROP INDEX ${table}_slug_idx`))
    await db.run(sql.raw(`ALTER TABLE ${table}_locales DROP COLUMN slug`))
    await db.run(sql.raw(`CREATE UNIQUE INDEX ${table}_slug_idx ON ${table} (slug)`))
    await db.run(sql.raw(`ALTER TABLE ${table} DROP COLUMN legacy_slug`))
  }
}
