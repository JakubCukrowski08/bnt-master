import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_cookie_table\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cookie_table_order_idx\` ON \`pages_blocks_cookie_table\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cookie_table_parent_id_idx\` ON \`pages_blocks_cookie_table\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cookie_table_path_idx\` ON \`pages_blocks_cookie_table\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cookie_table_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cookie_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cookie_table_locales_locale_parent_id_unique\` ON \`pages_blocks_cookie_table_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cookie_table_locales_parent_id_idx\` ON \`pages_blocks_cookie_table_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_consent_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`embed\` text NOT NULL,
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_consent_map_order_idx\` ON \`pages_blocks_consent_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_consent_map_parent_id_idx\` ON \`pages_blocks_consent_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_consent_map_path_idx\` ON \`pages_blocks_consent_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_consent_map_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`consent_label\` text NOT NULL,
  	\`map_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_consent_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_consent_map_locales_locale_parent_id_unique\` ON \`pages_blocks_consent_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_consent_map_locales_parent_id_idx\` ON \`pages_blocks_consent_map_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cookie_table\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_cookie_table_order_idx\` ON \`services_blocks_cookie_table\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cookie_table_parent_id_idx\` ON \`services_blocks_cookie_table\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cookie_table_path_idx\` ON \`services_blocks_cookie_table\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cookie_table_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_cookie_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_cookie_table_locales_locale_parent_id_unique\` ON \`services_blocks_cookie_table_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cookie_table_locales_parent_id_idx\` ON \`services_blocks_cookie_table_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_consent_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`embed\` text NOT NULL,
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_consent_map_order_idx\` ON \`services_blocks_consent_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_consent_map_parent_id_idx\` ON \`services_blocks_consent_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_consent_map_path_idx\` ON \`services_blocks_consent_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_consent_map_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`consent_label\` text NOT NULL,
  	\`map_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_consent_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_consent_map_locales_locale_parent_id_unique\` ON \`services_blocks_consent_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_consent_map_locales_parent_id_idx\` ON \`services_blocks_consent_map_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cookie_table\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_cookie_table_order_idx\` ON \`projects_blocks_cookie_table\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cookie_table_parent_id_idx\` ON \`projects_blocks_cookie_table\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cookie_table_path_idx\` ON \`projects_blocks_cookie_table\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cookie_table_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_cookie_table\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_cookie_table_locales_locale_parent_id_unique\` ON \`projects_blocks_cookie_table_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cookie_table_locales_parent_id_idx\` ON \`projects_blocks_cookie_table_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_consent_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`embed\` text NOT NULL,
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_consent_map_order_idx\` ON \`projects_blocks_consent_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_consent_map_parent_id_idx\` ON \`projects_blocks_consent_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_consent_map_path_idx\` ON \`projects_blocks_consent_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_consent_map_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`consent_label\` text NOT NULL,
  	\`map_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_consent_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_consent_map_locales_locale_parent_id_unique\` ON \`projects_blocks_consent_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_consent_map_locales_parent_id_idx\` ON \`projects_blocks_consent_map_locales\` (\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_cookie_table\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cookie_table_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_consent_map\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_consent_map_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cookie_table\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cookie_table_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_consent_map\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_consent_map_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cookie_table\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cookie_table_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_consent_map\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_consent_map_locales\`;`)
}
