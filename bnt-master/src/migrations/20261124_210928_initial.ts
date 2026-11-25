import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_links_order_idx\` ON \`pages_blocks_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_links_parent_id_idx\` ON \`pages_blocks_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_links_link_link_page_idx\` ON \`pages_blocks_hero_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_links_link_link_file_idx\` ON \`pages_blocks_hero_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_links_locales_locale_parent_id_unique\` ON \`pages_blocks_hero_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_links_locales_parent_id_idx\` ON \`pages_blocks_hero_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`poster_id\` integer,
  	\`variant\` text DEFAULT 'split',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_media_idx\` ON \`pages_blocks_hero\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_poster_idx\` ON \`pages_blocks_hero\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_locales_locale_parent_id_unique\` ON \`pages_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_locales_parent_id_idx\` ON \`pages_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_media_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_links_order_idx\` ON \`pages_blocks_text_media_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_links_parent_id_idx\` ON \`pages_blocks_text_media_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_links_link_link_page_idx\` ON \`pages_blocks_text_media_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_links_link_link_file_idx\` ON \`pages_blocks_text_media_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_media_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_media_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_media_links_locales_locale_parent_id_uniqu\` ON \`pages_blocks_text_media_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_links_locales_parent_id_idx\` ON \`pages_blocks_text_media_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`variant\` text DEFAULT 'mediaRight',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_order_idx\` ON \`pages_blocks_text_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_parent_id_idx\` ON \`pages_blocks_text_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_path_idx\` ON \`pages_blocks_text_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_media_idx\` ON \`pages_blocks_text_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_text_media_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_text_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_text_media_locales_locale_parent_id_unique\` ON \`pages_blocks_text_media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_text_media_locales_parent_id_idx\` ON \`pages_blocks_text_media_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_items_order_idx\` ON \`pages_blocks_feature_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_items_parent_id_idx\` ON \`pages_blocks_feature_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_items_media_idx\` ON \`pages_blocks_feature_grid_items\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_items_link_link_page_idx\` ON \`pages_blocks_feature_grid_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_items_link_link_file_idx\` ON \`pages_blocks_feature_grid_items\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid_items_locales\` (
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_grid_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_feature_grid_items_locales_locale_parent_id_uni\` ON \`pages_blocks_feature_grid_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_items_locales_parent_id_idx\` ON \`pages_blocks_feature_grid_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_links_order_idx\` ON \`pages_blocks_feature_grid_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_links_parent_id_idx\` ON \`pages_blocks_feature_grid_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_links_link_link_page_idx\` ON \`pages_blocks_feature_grid_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_links_link_link_file_idx\` ON \`pages_blocks_feature_grid_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_grid_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_feature_grid_links_locales_locale_parent_id_uni\` ON \`pages_blocks_feature_grid_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_links_locales_parent_id_idx\` ON \`pages_blocks_feature_grid_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT 'three',
  	\`variant\` text DEFAULT 'cards',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_order_idx\` ON \`pages_blocks_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_parent_id_idx\` ON \`pages_blocks_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_path_idx\` ON \`pages_blocks_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_feature_grid_locales_locale_parent_id_unique\` ON \`pages_blocks_feature_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_locales_parent_id_idx\` ON \`pages_blocks_feature_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_order_idx\` ON \`pages_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_parent_id_idx\` ON \`pages_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_link_link_page_idx\` ON \`pages_blocks_cta_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_link_link_file_idx\` ON \`pages_blocks_cta_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_links_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_locales_parent_id_idx\` ON \`pages_blocks_cta_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`variant\` text DEFAULT 'band',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_media_idx\` ON \`pages_blocks_cta\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_locales_parent_id_idx\` ON \`pages_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`table_of_contents_show\` integer,
  	\`variant\` text DEFAULT 'narrow',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_order_idx\` ON \`pages_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_parent_id_idx\` ON \`pages_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_path_idx\` ON \`pages_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text NOT NULL,
  	\`table_of_contents_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_rich_text_locales_locale_parent_id_unique\` ON \`pages_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_locales_parent_id_idx\` ON \`pages_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_order_idx\` ON \`pages_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_parent_id_idx\` ON \`pages_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_items_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_locales_parent_id_idx\` ON \`pages_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_links_order_idx\` ON \`pages_blocks_faq_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_links_parent_id_idx\` ON \`pages_blocks_faq_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_links_link_link_page_idx\` ON \`pages_blocks_faq_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_links_link_link_file_idx\` ON \`pages_blocks_faq_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_links_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_links_locales_parent_id_idx\` ON \`pages_blocks_faq_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'single',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_locales_parent_id_idx\` ON \`pages_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`variant\` text DEFAULT 'formWithDetails',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_order_idx\` ON \`pages_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_parent_id_idx\` ON \`pages_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_path_idx\` ON \`pages_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_idx\` ON \`pages_blocks_contact\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_contact_locales_locale_parent_id_unique\` ON \`pages_blocks_contact_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_locales_parent_id_idx\` ON \`pages_blocks_contact_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_items_order_idx\` ON \`pages_blocks_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_items_parent_id_idx\` ON \`pages_blocks_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_items_media_idx\` ON \`pages_blocks_gallery_items\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_items_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_gallery_items_locales_locale_parent_id_unique\` ON \`pages_blocks_gallery_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_items_locales_parent_id_idx\` ON \`pages_blocks_gallery_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_links_order_idx\` ON \`pages_blocks_gallery_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_links_parent_id_idx\` ON \`pages_blocks_gallery_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_links_link_link_page_idx\` ON \`pages_blocks_gallery_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_links_link_link_file_idx\` ON \`pages_blocks_gallery_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_gallery_links_locales_locale_parent_id_unique\` ON \`pages_blocks_gallery_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_links_locales_parent_id_idx\` ON \`pages_blocks_gallery_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT 'three',
  	\`variant\` text DEFAULT 'grid',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_gallery_locales_locale_parent_id_unique\` ON \`pages_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_locales_parent_id_idx\` ON \`pages_blocks_gallery_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_order_idx\` ON \`pages_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_parent_id_idx\` ON \`pages_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items_locales\` (
  	\`value\` text NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_stats_items_locales_locale_parent_id_unique\` ON \`pages_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_locales_parent_id_idx\` ON \`pages_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'row',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_stats_locales_locale_parent_id_unique\` ON \`pages_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_locales_parent_id_idx\` ON \`pages_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_items_order_idx\` ON \`pages_blocks_steps_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_items_parent_id_idx\` ON \`pages_blocks_steps_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_items_media_idx\` ON \`pages_blocks_steps_items\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_items_locales\` (
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_steps_items_locales_locale_parent_id_unique\` ON \`pages_blocks_steps_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_items_locales_parent_id_idx\` ON \`pages_blocks_steps_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_links_order_idx\` ON \`pages_blocks_steps_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_links_parent_id_idx\` ON \`pages_blocks_steps_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_links_link_link_page_idx\` ON \`pages_blocks_steps_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_links_link_link_file_idx\` ON \`pages_blocks_steps_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_steps_links_locales_locale_parent_id_unique\` ON \`pages_blocks_steps_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_links_locales_parent_id_idx\` ON \`pages_blocks_steps_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'numbered',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_order_idx\` ON \`pages_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_parent_id_idx\` ON \`pages_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_path_idx\` ON \`pages_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_steps_locales_locale_parent_id_unique\` ON \`pages_blocks_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_locales_parent_id_idx\` ON \`pages_blocks_steps_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_entry_list_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_entry_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_links_order_idx\` ON \`pages_blocks_entry_list_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_links_parent_id_idx\` ON \`pages_blocks_entry_list_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_links_link_link_page_idx\` ON \`pages_blocks_entry_list_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_links_link_link_file_idx\` ON \`pages_blocks_entry_list_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_entry_list_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_entry_list_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_entry_list_links_locales_locale_parent_id_uniqu\` ON \`pages_blocks_entry_list_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_links_locales_parent_id_idx\` ON \`pages_blocks_entry_list_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_entry_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entry_collection\` text DEFAULT 'services' NOT NULL,
  	\`mode\` text DEFAULT 'latest',
  	\`limit\` numeric DEFAULT 3,
  	\`variant\` text DEFAULT 'cards',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_order_idx\` ON \`pages_blocks_entry_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_parent_id_idx\` ON \`pages_blocks_entry_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_path_idx\` ON \`pages_blocks_entry_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_entry_list_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_entry_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_entry_list_locales_locale_parent_id_unique\` ON \`pages_blocks_entry_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_list_locales_parent_id_idx\` ON \`pages_blocks_entry_list_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_slug_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_slug_history_order_idx\` ON \`pages_slug_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_history_parent_id_idx\` ON \`pages_slug_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`noindex\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`meta_title_override\` text,
  	\`slug\` text NOT NULL,
  	\`ai_summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages_locales\` (\`slug\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_locales_parent_id_idx\` ON \`pages_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_services_id_idx\` ON \`pages_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_projects_id_idx\` ON \`pages_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_links_order_idx\` ON \`services_blocks_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_links_parent_id_idx\` ON \`services_blocks_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_links_link_link_page_idx\` ON \`services_blocks_hero_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_links_link_link_file_idx\` ON \`services_blocks_hero_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_hero_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_hero_links_locales_locale_parent_id_unique\` ON \`services_blocks_hero_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_links_locales_parent_id_idx\` ON \`services_blocks_hero_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`poster_id\` integer,
  	\`variant\` text DEFAULT 'split',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_order_idx\` ON \`services_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_parent_id_idx\` ON \`services_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_path_idx\` ON \`services_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_media_idx\` ON \`services_blocks_hero\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_poster_idx\` ON \`services_blocks_hero\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_hero_locales_locale_parent_id_unique\` ON \`services_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_locales_parent_id_idx\` ON \`services_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_text_media_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_text_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_links_order_idx\` ON \`services_blocks_text_media_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_links_parent_id_idx\` ON \`services_blocks_text_media_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_links_link_link_page_idx\` ON \`services_blocks_text_media_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_links_link_link_file_idx\` ON \`services_blocks_text_media_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_text_media_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_text_media_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_text_media_links_locales_locale_parent_id_un\` ON \`services_blocks_text_media_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_links_locales_parent_id_idx\` ON \`services_blocks_text_media_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_text_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`variant\` text DEFAULT 'mediaRight',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_order_idx\` ON \`services_blocks_text_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_parent_id_idx\` ON \`services_blocks_text_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_path_idx\` ON \`services_blocks_text_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_media_idx\` ON \`services_blocks_text_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_text_media_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_text_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_text_media_locales_locale_parent_id_unique\` ON \`services_blocks_text_media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_text_media_locales_parent_id_idx\` ON \`services_blocks_text_media_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_feature_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_items_order_idx\` ON \`services_blocks_feature_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_items_parent_id_idx\` ON \`services_blocks_feature_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_items_media_idx\` ON \`services_blocks_feature_grid_items\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_items_link_link_page_idx\` ON \`services_blocks_feature_grid_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_items_link_link_file_idx\` ON \`services_blocks_feature_grid_items\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_feature_grid_items_locales\` (
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_feature_grid_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_feature_grid_items_locales_locale_parent_id_\` ON \`services_blocks_feature_grid_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_items_locales_parent_id_idx\` ON \`services_blocks_feature_grid_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_feature_grid_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_links_order_idx\` ON \`services_blocks_feature_grid_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_links_parent_id_idx\` ON \`services_blocks_feature_grid_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_links_link_link_page_idx\` ON \`services_blocks_feature_grid_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_links_link_link_file_idx\` ON \`services_blocks_feature_grid_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_feature_grid_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_feature_grid_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_feature_grid_links_locales_locale_parent_id_\` ON \`services_blocks_feature_grid_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_links_locales_parent_id_idx\` ON \`services_blocks_feature_grid_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT 'three',
  	\`variant\` text DEFAULT 'cards',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_order_idx\` ON \`services_blocks_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_parent_id_idx\` ON \`services_blocks_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_path_idx\` ON \`services_blocks_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_feature_grid_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_feature_grid_locales_locale_parent_id_unique\` ON \`services_blocks_feature_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_feature_grid_locales_parent_id_idx\` ON \`services_blocks_feature_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_links_order_idx\` ON \`services_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_links_parent_id_idx\` ON \`services_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_links_link_link_page_idx\` ON \`services_blocks_cta_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_links_link_link_file_idx\` ON \`services_blocks_cta_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_cta_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_cta_links_locales_locale_parent_id_unique\` ON \`services_blocks_cta_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_links_locales_parent_id_idx\` ON \`services_blocks_cta_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`variant\` text DEFAULT 'band',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_order_idx\` ON \`services_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_parent_id_idx\` ON \`services_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_path_idx\` ON \`services_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_media_idx\` ON \`services_blocks_cta\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_cta_locales_locale_parent_id_unique\` ON \`services_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_locales_parent_id_idx\` ON \`services_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`table_of_contents_show\` integer,
  	\`variant\` text DEFAULT 'narrow',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_order_idx\` ON \`services_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_parent_id_idx\` ON \`services_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_path_idx\` ON \`services_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_rich_text_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text NOT NULL,
  	\`table_of_contents_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_rich_text_locales_locale_parent_id_unique\` ON \`services_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_rich_text_locales_parent_id_idx\` ON \`services_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_order_idx\` ON \`services_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_parent_id_idx\` ON \`services_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_faq_items_locales_locale_parent_id_unique\` ON \`services_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_locales_parent_id_idx\` ON \`services_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_links_order_idx\` ON \`services_blocks_faq_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_links_parent_id_idx\` ON \`services_blocks_faq_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_links_link_link_page_idx\` ON \`services_blocks_faq_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_links_link_link_file_idx\` ON \`services_blocks_faq_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_faq_links_locales_locale_parent_id_unique\` ON \`services_blocks_faq_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_links_locales_parent_id_idx\` ON \`services_blocks_faq_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'single',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_order_idx\` ON \`services_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_parent_id_idx\` ON \`services_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_path_idx\` ON \`services_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_faq_locales_locale_parent_id_unique\` ON \`services_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_locales_parent_id_idx\` ON \`services_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`variant\` text DEFAULT 'formWithDetails',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_contact_order_idx\` ON \`services_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_contact_parent_id_idx\` ON \`services_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_contact_path_idx\` ON \`services_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_contact_form_idx\` ON \`services_blocks_contact\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_contact_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_contact_locales_locale_parent_id_unique\` ON \`services_blocks_contact_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_contact_locales_parent_id_idx\` ON \`services_blocks_contact_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_items_order_idx\` ON \`services_blocks_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_items_parent_id_idx\` ON \`services_blocks_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_items_media_idx\` ON \`services_blocks_gallery_items\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_items_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_gallery_items_locales_locale_parent_id_uniqu\` ON \`services_blocks_gallery_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_items_locales_parent_id_idx\` ON \`services_blocks_gallery_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_links_order_idx\` ON \`services_blocks_gallery_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_links_parent_id_idx\` ON \`services_blocks_gallery_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_links_link_link_page_idx\` ON \`services_blocks_gallery_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_links_link_link_file_idx\` ON \`services_blocks_gallery_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_gallery_links_locales_locale_parent_id_uniqu\` ON \`services_blocks_gallery_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_links_locales_parent_id_idx\` ON \`services_blocks_gallery_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT 'three',
  	\`variant\` text DEFAULT 'grid',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_order_idx\` ON \`services_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_parent_id_idx\` ON \`services_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_path_idx\` ON \`services_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_gallery_locales_locale_parent_id_unique\` ON \`services_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_locales_parent_id_idx\` ON \`services_blocks_gallery_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_items_order_idx\` ON \`services_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_items_parent_id_idx\` ON \`services_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats_items_locales\` (
  	\`value\` text NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_stats_items_locales_locale_parent_id_unique\` ON \`services_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_items_locales_parent_id_idx\` ON \`services_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'row',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_order_idx\` ON \`services_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_parent_id_idx\` ON \`services_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_path_idx\` ON \`services_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stats_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_stats_locales_locale_parent_id_unique\` ON \`services_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stats_locales_parent_id_idx\` ON \`services_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_steps_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_items_order_idx\` ON \`services_blocks_steps_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_items_parent_id_idx\` ON \`services_blocks_steps_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_items_media_idx\` ON \`services_blocks_steps_items\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_steps_items_locales\` (
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_steps_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_steps_items_locales_locale_parent_id_unique\` ON \`services_blocks_steps_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_items_locales_parent_id_idx\` ON \`services_blocks_steps_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_steps_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_links_order_idx\` ON \`services_blocks_steps_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_links_parent_id_idx\` ON \`services_blocks_steps_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_links_link_link_page_idx\` ON \`services_blocks_steps_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_links_link_link_file_idx\` ON \`services_blocks_steps_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_steps_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_steps_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_steps_links_locales_locale_parent_id_unique\` ON \`services_blocks_steps_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_links_locales_parent_id_idx\` ON \`services_blocks_steps_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'numbered',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_order_idx\` ON \`services_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_parent_id_idx\` ON \`services_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_path_idx\` ON \`services_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_steps_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_steps_locales_locale_parent_id_unique\` ON \`services_blocks_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_steps_locales_parent_id_idx\` ON \`services_blocks_steps_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_entry_list_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_entry_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_links_order_idx\` ON \`services_blocks_entry_list_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_links_parent_id_idx\` ON \`services_blocks_entry_list_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_links_link_link_page_idx\` ON \`services_blocks_entry_list_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_links_link_link_file_idx\` ON \`services_blocks_entry_list_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_entry_list_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_entry_list_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_entry_list_links_locales_locale_parent_id_un\` ON \`services_blocks_entry_list_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_links_locales_parent_id_idx\` ON \`services_blocks_entry_list_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_entry_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entry_collection\` text DEFAULT 'services' NOT NULL,
  	\`mode\` text DEFAULT 'latest',
  	\`limit\` numeric DEFAULT 3,
  	\`variant\` text DEFAULT 'cards',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_order_idx\` ON \`services_blocks_entry_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_parent_id_idx\` ON \`services_blocks_entry_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_path_idx\` ON \`services_blocks_entry_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_entry_list_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_entry_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_blocks_entry_list_locales_locale_parent_id_unique\` ON \`services_blocks_entry_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_entry_list_locales_parent_id_idx\` ON \`services_blocks_entry_list_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_slug_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_slug_history_order_idx\` ON \`services_slug_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_slug_history_parent_id_idx\` ON \`services_slug_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`media_id\` integer,
  	\`short_desc\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`legacy_id\` text,
  	\`lead\` text,
  	\`intro_section\` text,
  	\`callout_section\` text,
  	\`grid_section\` text,
  	\`dark_section\` text,
  	\`sections\` text,
  	\`noindex\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_media_idx\` ON \`services\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`services_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`meta_title_override\` text,
  	\`ai_summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_meta_meta_image_idx\` ON \`services_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`services_locales_locale_parent_id_unique\` ON \`services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_locales_parent_id_idx\` ON \`services_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_rels_order_idx\` ON \`services_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_parent_idx\` ON \`services_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_path_idx\` ON \`services_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_services_id_idx\` ON \`services_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_projects_id_idx\` ON \`services_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_links_order_idx\` ON \`projects_blocks_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_links_parent_id_idx\` ON \`projects_blocks_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_links_link_link_page_idx\` ON \`projects_blocks_hero_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_links_link_link_file_idx\` ON \`projects_blocks_hero_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_hero_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_hero_links_locales_locale_parent_id_unique\` ON \`projects_blocks_hero_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_links_locales_parent_id_idx\` ON \`projects_blocks_hero_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`poster_id\` integer,
  	\`variant\` text DEFAULT 'split',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_order_idx\` ON \`projects_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_parent_id_idx\` ON \`projects_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_path_idx\` ON \`projects_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_media_idx\` ON \`projects_blocks_hero\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_poster_idx\` ON \`projects_blocks_hero\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_hero_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_hero_locales_locale_parent_id_unique\` ON \`projects_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_hero_locales_parent_id_idx\` ON \`projects_blocks_hero_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_text_media_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_text_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_links_order_idx\` ON \`projects_blocks_text_media_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_links_parent_id_idx\` ON \`projects_blocks_text_media_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_links_link_link_page_idx\` ON \`projects_blocks_text_media_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_links_link_link_file_idx\` ON \`projects_blocks_text_media_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_text_media_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_text_media_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_text_media_links_locales_locale_parent_id_un\` ON \`projects_blocks_text_media_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_links_locales_parent_id_idx\` ON \`projects_blocks_text_media_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_text_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`variant\` text DEFAULT 'mediaRight',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_order_idx\` ON \`projects_blocks_text_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_parent_id_idx\` ON \`projects_blocks_text_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_path_idx\` ON \`projects_blocks_text_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_media_idx\` ON \`projects_blocks_text_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_text_media_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_text_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_text_media_locales_locale_parent_id_unique\` ON \`projects_blocks_text_media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_text_media_locales_parent_id_idx\` ON \`projects_blocks_text_media_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_feature_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_items_order_idx\` ON \`projects_blocks_feature_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_items_parent_id_idx\` ON \`projects_blocks_feature_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_items_media_idx\` ON \`projects_blocks_feature_grid_items\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_items_link_link_page_idx\` ON \`projects_blocks_feature_grid_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_items_link_link_file_idx\` ON \`projects_blocks_feature_grid_items\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_feature_grid_items_locales\` (
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_feature_grid_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_feature_grid_items_locales_locale_parent_id_\` ON \`projects_blocks_feature_grid_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_items_locales_parent_id_idx\` ON \`projects_blocks_feature_grid_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_feature_grid_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_links_order_idx\` ON \`projects_blocks_feature_grid_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_links_parent_id_idx\` ON \`projects_blocks_feature_grid_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_links_link_link_page_idx\` ON \`projects_blocks_feature_grid_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_links_link_link_file_idx\` ON \`projects_blocks_feature_grid_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_feature_grid_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_feature_grid_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_feature_grid_links_locales_locale_parent_id_\` ON \`projects_blocks_feature_grid_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_links_locales_parent_id_idx\` ON \`projects_blocks_feature_grid_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT 'three',
  	\`variant\` text DEFAULT 'cards',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_order_idx\` ON \`projects_blocks_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_parent_id_idx\` ON \`projects_blocks_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_path_idx\` ON \`projects_blocks_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_feature_grid_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_feature_grid_locales_locale_parent_id_unique\` ON \`projects_blocks_feature_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_feature_grid_locales_parent_id_idx\` ON \`projects_blocks_feature_grid_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_links_order_idx\` ON \`projects_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_links_parent_id_idx\` ON \`projects_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_links_link_link_page_idx\` ON \`projects_blocks_cta_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_links_link_link_file_idx\` ON \`projects_blocks_cta_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cta_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_cta_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_cta_links_locales_locale_parent_id_unique\` ON \`projects_blocks_cta_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_links_locales_parent_id_idx\` ON \`projects_blocks_cta_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`variant\` text DEFAULT 'band',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_order_idx\` ON \`projects_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_parent_id_idx\` ON \`projects_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_path_idx\` ON \`projects_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_media_idx\` ON \`projects_blocks_cta\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_cta_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_cta_locales_locale_parent_id_unique\` ON \`projects_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_cta_locales_parent_id_idx\` ON \`projects_blocks_cta_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`table_of_contents_show\` integer,
  	\`variant\` text DEFAULT 'narrow',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_order_idx\` ON \`projects_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_parent_id_idx\` ON \`projects_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_path_idx\` ON \`projects_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_rich_text_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text NOT NULL,
  	\`table_of_contents_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_rich_text_locales_locale_parent_id_unique\` ON \`projects_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_rich_text_locales_parent_id_idx\` ON \`projects_blocks_rich_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_items_order_idx\` ON \`projects_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_items_parent_id_idx\` ON \`projects_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_faq_items_locales_locale_parent_id_unique\` ON \`projects_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_items_locales_parent_id_idx\` ON \`projects_blocks_faq_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_links_order_idx\` ON \`projects_blocks_faq_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_links_parent_id_idx\` ON \`projects_blocks_faq_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_links_link_link_page_idx\` ON \`projects_blocks_faq_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_links_link_link_file_idx\` ON \`projects_blocks_faq_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_faq_links_locales_locale_parent_id_unique\` ON \`projects_blocks_faq_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_links_locales_parent_id_idx\` ON \`projects_blocks_faq_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'single',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_order_idx\` ON \`projects_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_parent_id_idx\` ON \`projects_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_path_idx\` ON \`projects_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_faq_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_faq_locales_locale_parent_id_unique\` ON \`projects_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_faq_locales_parent_id_idx\` ON \`projects_blocks_faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`variant\` text DEFAULT 'formWithDetails',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_contact_order_idx\` ON \`projects_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_contact_parent_id_idx\` ON \`projects_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_contact_path_idx\` ON \`projects_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_contact_form_idx\` ON \`projects_blocks_contact\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_contact_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_contact_locales_locale_parent_id_unique\` ON \`projects_blocks_contact_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_contact_locales_parent_id_idx\` ON \`projects_blocks_contact_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_items_order_idx\` ON \`projects_blocks_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_items_parent_id_idx\` ON \`projects_blocks_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_items_media_idx\` ON \`projects_blocks_gallery_items\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery_items_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_gallery_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_gallery_items_locales_locale_parent_id_uniqu\` ON \`projects_blocks_gallery_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_items_locales_parent_id_idx\` ON \`projects_blocks_gallery_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_links_order_idx\` ON \`projects_blocks_gallery_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_links_parent_id_idx\` ON \`projects_blocks_gallery_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_links_link_link_page_idx\` ON \`projects_blocks_gallery_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_links_link_link_file_idx\` ON \`projects_blocks_gallery_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_gallery_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_gallery_links_locales_locale_parent_id_uniqu\` ON \`projects_blocks_gallery_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_links_locales_parent_id_idx\` ON \`projects_blocks_gallery_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columns\` text DEFAULT 'three',
  	\`variant\` text DEFAULT 'grid',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_order_idx\` ON \`projects_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_parent_id_idx\` ON \`projects_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_path_idx\` ON \`projects_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_gallery_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_gallery_locales_locale_parent_id_unique\` ON \`projects_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_gallery_locales_parent_id_idx\` ON \`projects_blocks_gallery_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_items_order_idx\` ON \`projects_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_items_parent_id_idx\` ON \`projects_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats_items_locales\` (
  	\`value\` text NOT NULL,
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_stats_items_locales_locale_parent_id_unique\` ON \`projects_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_items_locales_parent_id_idx\` ON \`projects_blocks_stats_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'row',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_order_idx\` ON \`projects_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_parent_id_idx\` ON \`projects_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_path_idx\` ON \`projects_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_stats_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_stats_locales_locale_parent_id_unique\` ON \`projects_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_stats_locales_parent_id_idx\` ON \`projects_blocks_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_steps_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_items_order_idx\` ON \`projects_blocks_steps_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_items_parent_id_idx\` ON \`projects_blocks_steps_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_items_media_idx\` ON \`projects_blocks_steps_items\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_steps_items_locales\` (
  	\`heading\` text NOT NULL,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_steps_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_steps_items_locales_locale_parent_id_unique\` ON \`projects_blocks_steps_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_items_locales_parent_id_idx\` ON \`projects_blocks_steps_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_steps_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_links_order_idx\` ON \`projects_blocks_steps_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_links_parent_id_idx\` ON \`projects_blocks_steps_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_links_link_link_page_idx\` ON \`projects_blocks_steps_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_links_link_link_file_idx\` ON \`projects_blocks_steps_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_steps_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_steps_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_steps_links_locales_locale_parent_id_unique\` ON \`projects_blocks_steps_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_links_locales_parent_id_idx\` ON \`projects_blocks_steps_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'numbered',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_order_idx\` ON \`projects_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_parent_id_idx\` ON \`projects_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_path_idx\` ON \`projects_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_steps_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_steps_locales_locale_parent_id_unique\` ON \`projects_blocks_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_steps_locales_parent_id_idx\` ON \`projects_blocks_steps_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_entry_list_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_entry_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_links_order_idx\` ON \`projects_blocks_entry_list_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_links_parent_id_idx\` ON \`projects_blocks_entry_list_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_links_link_link_page_idx\` ON \`projects_blocks_entry_list_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_links_link_link_file_idx\` ON \`projects_blocks_entry_list_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_entry_list_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_entry_list_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_entry_list_links_locales_locale_parent_id_un\` ON \`projects_blocks_entry_list_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_links_locales_parent_id_idx\` ON \`projects_blocks_entry_list_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_entry_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entry_collection\` text DEFAULT 'services' NOT NULL,
  	\`mode\` text DEFAULT 'latest',
  	\`limit\` numeric DEFAULT 3,
  	\`variant\` text DEFAULT 'cards',
  	\`settings_anchor\` text,
  	\`settings_background\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_order_idx\` ON \`projects_blocks_entry_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_parent_id_idx\` ON \`projects_blocks_entry_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_path_idx\` ON \`projects_blocks_entry_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`projects_blocks_entry_list_locales\` (
  	\`header_eyebrow\` text,
  	\`header_heading\` text,
  	\`header_intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_blocks_entry_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_blocks_entry_list_locales_locale_parent_id_unique\` ON \`projects_blocks_entry_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_blocks_entry_list_locales_parent_id_idx\` ON \`projects_blocks_entry_list_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_slug_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_slug_history_order_idx\` ON \`projects_slug_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_slug_history_parent_id_idx\` ON \`projects_slug_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`media_id\` integer,
  	\`short_desc\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`featured\` integer,
  	\`legacy_id\` text,
  	\`type\` text,
  	\`year\` numeric,
  	\`location\` text,
  	\`full_desc\` text,
  	\`stats\` text,
  	\`features\` text,
  	\`gallery\` text,
  	\`main_img\` text,
  	\`noindex\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_media_idx\` ON \`projects\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`projects_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`meta_title_override\` text,
  	\`ai_summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_meta_meta_image_idx\` ON \`projects_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_locales_locale_parent_id_unique\` ON \`projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_locales_parent_id_idx\` ON \`projects_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_services_id_idx\` ON \`projects_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_projects_id_idx\` ON \`projects_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`legacy_path\` text,
  	\`optimize_on_upload\` integer DEFAULT false,
  	\`placeholder_blur_data_u_r_l\` text,
  	\`placeholder_color\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_legacy_path_idx\` ON \`media\` (\`legacy_path\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_locales_parent_id_idx\` ON \`media_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`totp_secret\` text,
  	\`totp_setup_from\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_locales_locale_parent_id_unique\` ON \`forms_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_locales_parent_id_idx\` ON \`forms_blocks_checkbox_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_country\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_country_locales_locale_parent_id_unique\` ON \`forms_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_locales_parent_id_idx\` ON \`forms_blocks_country_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email_locales\` (
  	\`label\` text,
  	\`placeholder\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_email\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_email_locales_locale_parent_id_unique\` ON \`forms_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_locales_parent_id_idx\` ON \`forms_blocks_email_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_message\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_message_locales_locale_parent_id_unique\` ON \`forms_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_locales_parent_id_idx\` ON \`forms_blocks_message_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number_locales\` (
  	\`label\` text,
  	\`placeholder\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_number_locales_locale_parent_id_unique\` ON \`forms_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_locales_parent_id_idx\` ON \`forms_blocks_number_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_options_locales_locale_parent_id_unique\` ON \`forms_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_locales_parent_id_idx\` ON \`forms_blocks_select_options_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_locales_locale_parent_id_unique\` ON \`forms_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_locales_parent_id_idx\` ON \`forms_blocks_select_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_state\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_state_locales_locale_parent_id_unique\` ON \`forms_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_locales_parent_id_idx\` ON \`forms_blocks_state_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_text_locales_locale_parent_id_unique\` ON \`forms_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_locales_parent_id_idx\` ON \`forms_blocks_text_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_textarea\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_textarea_locales_locale_parent_id_unique\` ON \`forms_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_locales_parent_id_idx\` ON \`forms_blocks_textarea_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_group_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_group_options_order_idx\` ON \`forms_blocks_checkbox_group_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_group_options_parent_id_idx\` ON \`forms_blocks_checkbox_group_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_group_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox_group_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_group_options_locales_locale_parent_id\` ON \`forms_blocks_checkbox_group_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_group_options_locales_parent_id_idx\` ON \`forms_blocks_checkbox_group_options_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_group\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`min_selected\` numeric,
  	\`max_selected\` numeric,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_group_order_idx\` ON \`forms_blocks_checkbox_group\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_group_parent_id_idx\` ON \`forms_blocks_checkbox_group\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_group_path_idx\` ON \`forms_blocks_checkbox_group\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_group_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_group_locales_locale_parent_id_unique\` ON \`forms_blocks_checkbox_group_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_group_locales_parent_id_idx\` ON \`forms_blocks_checkbox_group_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_date\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` text,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_order_idx\` ON \`forms_blocks_date\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_parent_id_idx\` ON \`forms_blocks_date\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_path_idx\` ON \`forms_blocks_date\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_date_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_date\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_date_locales_locale_parent_id_unique\` ON \`forms_blocks_date_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_locales_parent_id_idx\` ON \`forms_blocks_date_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_radio_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_radio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_radio_options_order_idx\` ON \`forms_blocks_radio_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_radio_options_parent_id_idx\` ON \`forms_blocks_radio_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_radio_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_radio_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_radio_options_locales_locale_parent_id_unique\` ON \`forms_blocks_radio_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_radio_options_locales_parent_id_idx\` ON \`forms_blocks_radio_options_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_radio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_radio_order_idx\` ON \`forms_blocks_radio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_radio_parent_id_idx\` ON \`forms_blocks_radio\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_radio_path_idx\` ON \`forms_blocks_radio\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_radio_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_radio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_radio_locales_locale_parent_id_unique\` ON \`forms_blocks_radio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_radio_locales_parent_id_idx\` ON \`forms_blocks_radio_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_step\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_step_order_idx\` ON \`forms_blocks_step\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_step_parent_id_idx\` ON \`forms_blocks_step\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_step_path_idx\` ON \`forms_blocks_step\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_step_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_step\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_step_locales_locale_parent_id_unique\` ON \`forms_blocks_step_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_step_locales_parent_id_idx\` ON \`forms_blocks_step_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_time\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`show_when_field\` text,
  	\`show_when_values\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_time_order_idx\` ON \`forms_blocks_time\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_time_parent_id_idx\` ON \`forms_blocks_time\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_time_path_idx\` ON \`forms_blocks_time\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_time_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_time\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_time_locales_locale_parent_id_unique\` ON \`forms_blocks_time_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_time_locales_parent_id_idx\` ON \`forms_blocks_time_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_emails\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_emails_locales_locale_parent_id_unique\` ON \`forms_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_locales_parent_id_idx\` ON \`forms_emails_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`redirect_type\` text DEFAULT 'reference',
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_locales\` (
  	\`submit_button_label\` text,
  	\`confirmation_message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_locales_locale_parent_id_unique\` ON \`forms_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_locales_parent_id_idx\` ON \`forms_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_rels_order_idx\` ON \`forms_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_parent_idx\` ON \`forms_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_path_idx\` ON \`forms_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_pages_id_idx\` ON \`forms_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`consent_records\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`consent_id\` text NOT NULL,
  	\`version\` numeric NOT NULL,
  	\`choices_necessary\` integer,
  	\`choices_functional\` integer,
  	\`choices_analytics\` integer,
  	\`choices_marketing\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`consent_records_consent_id_idx\` ON \`consent_records\` (\`consent_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_updated_at_idx\` ON \`consent_records\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_created_at_idx\` ON \`consent_records\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cookie_review\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`storage\` text DEFAULT 'cookie' NOT NULL,
  	\`category\` text,
  	\`vendor\` text,
  	\`domain\` text,
  	\`set_before_consent\` integer,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`source\` text DEFAULT 'manual',
  	\`source_detail\` text,
  	\`listed\` integer,
  	\`change\` text,
  	\`needs_description\` integer DEFAULT false,
  	\`last_scanned_at\` text,
  	\`key\` text,
  	\`suggested\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`cookie_review_status_idx\` ON \`cookie_review\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`cookie_review_change_idx\` ON \`cookie_review\` (\`change\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`cookie_review_key_idx\` ON \`cookie_review\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`cookie_review_updated_at_idx\` ON \`cookie_review\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cookie_review_created_at_idx\` ON \`cookie_review\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cookie_review_locales\` (
  	\`purpose\` text,
  	\`retention\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cookie_review\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cookie_review_locales_locale_parent_id_unique\` ON \`cookie_review_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cookie_review_locales_parent_id_idx\` ON \`cookie_review_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`services_id\` integer,
  	\`projects_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`consent_records_id\` integer,
  	\`cookie_review_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consent_records_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cookie_review_id\`) REFERENCES \`cookie_review\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_consent_records_id_idx\` ON \`payload_locked_documents_rels\` (\`consent_records_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cookie_review_id_idx\` ON \`payload_locked_documents_rels\` (\`cookie_review_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_sub_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_sub_items_order_idx\` ON \`header_nav_items_sub_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_sub_items_parent_id_idx\` ON \`header_nav_items_sub_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_sub_items_link_link_page_idx\` ON \`header_nav_items_sub_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_sub_items_link_link_file_idx\` ON \`header_nav_items_sub_items\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_sub_items_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items_sub_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_items_sub_items_locales_locale_parent_id_unique\` ON \`header_nav_items_sub_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_sub_items_locales_parent_id_idx\` ON \`header_nav_items_sub_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_link_link_page_idx\` ON \`header_nav_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_link_link_file_idx\` ON \`header_nav_items\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_items_locales_locale_parent_id_unique\` ON \`header_nav_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_locales_parent_id_idx\` ON \`header_nav_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_links_order_idx\` ON \`header_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_links_parent_id_idx\` ON \`header_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_links_link_link_page_idx\` ON \`header_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`header_links_link_link_file_idx\` ON \`header_links\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`header_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_links_locales_locale_parent_id_unique\` ON \`header_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_links_locales_parent_id_idx\` ON \`header_links_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_locales\` (
  	\`menu_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_locales_locale_parent_id_unique\` ON \`header_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_locales_parent_id_idx\` ON \`header_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_file_id\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_items_order_idx\` ON \`footer_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_items_parent_id_idx\` ON \`footer_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_items_link_link_page_idx\` ON \`footer_columns_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_items_link_link_file_idx\` ON \`footer_columns_items\` (\`link_file_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_items_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_columns_items_locales_locale_parent_id_unique\` ON \`footer_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_items_locales_parent_id_idx\` ON \`footer_columns_items_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_columns_locales_locale_parent_id_unique\` ON \`footer_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_locales_parent_id_idx\` ON \`footer_columns_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_locales\` (
  	\`note\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_locales_locale_parent_id_unique\` ON \`footer_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_locales_parent_id_idx\` ON \`footer_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`company_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`company_socials_order_idx\` ON \`company_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`company_socials_parent_id_idx\` ON \`company_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`company\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`legal_name\` text,
  	\`tax_id\` text,
  	\`address_street\` text,
  	\`address_postal_code\` text,
  	\`address_city\` text,
  	\`address_country\` text DEFAULT 'PL',
  	\`phone\` text,
  	\`email\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`company_locales\` (
  	\`phone_label\` text,
  	\`email_label\` text,
  	\`tax_id_label\` text DEFAULT 'NIP',
  	\`hours\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`company_locales_locale_parent_id_unique\` ON \`company_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`company_locales_parent_id_idx\` ON \`company_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_same_as\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_same_as_order_idx\` ON \`site_settings_same_as\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_same_as_parent_id_idx\` ON \`site_settings_same_as\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_ai_crawlers_rules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`user_agent\` text NOT NULL,
  	\`access\` text DEFAULT 'disallow' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_ai_crawlers_rules_order_idx\` ON \`site_settings_ai_crawlers_rules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_ai_crawlers_rules_parent_id_idx\` ON \`site_settings_ai_crawlers_rules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`favicon_id\` integer,
  	\`default_share_image_id\` integer,
  	\`title_order\` text DEFAULT 'page-first',
  	\`title_separator\` text DEFAULT 'pipe',
  	\`default_theme\` text DEFAULT 'light' NOT NULL,
  	\`allow_theme_toggle\` integer DEFAULT true,
  	\`homepage_id\` integer,
  	\`not_found_id\` integer,
  	\`privacy_policy_id\` integer,
  	\`cookie_policy_id\` integer,
  	\`terms_of_service_id\` integer,
  	\`services_archive_id\` integer,
  	\`projects_archive_id\` integer,
  	\`search_verification_google\` text,
  	\`search_verification_bing\` text,
  	\`search_verification_yandex\` text,
  	\`ai_crawlers_policy\` text DEFAULT 'default',
  	\`email_logo_id\` integer,
  	\`email_accent_color\` text,
  	\`construction_enabled\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`default_share_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`homepage_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`not_found_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`privacy_policy_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cookie_policy_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`terms_of_service_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`services_archive_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`projects_archive_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`email_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_favicon_idx\` ON \`site_settings\` (\`favicon_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_default_share_image_idx\` ON \`site_settings\` (\`default_share_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_homepage_idx\` ON \`site_settings\` (\`homepage_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_not_found_idx\` ON \`site_settings\` (\`not_found_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_privacy_policy_idx\` ON \`site_settings\` (\`privacy_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_cookie_policy_idx\` ON \`site_settings\` (\`cookie_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_terms_of_service_idx\` ON \`site_settings\` (\`terms_of_service_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_services_archive_idx\` ON \`site_settings\` (\`services_archive_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_projects_archive_idx\` ON \`site_settings\` (\`projects_archive_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_email_email_logo_idx\` ON \`site_settings\` (\`email_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_locales\` (
  	\`site_name\` text NOT NULL,
  	\`site_description\` text,
  	\`theme_toggle_label\` text,
  	\`llms_intro\` text,
  	\`email_footer\` text,
  	\`construction_title\` text,
  	\`construction_message\` text,
  	\`construction_button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_locales_parent_id_idx\` ON \`site_settings_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_rels_order_idx\` ON \`site_settings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_parent_idx\` ON \`site_settings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_path_idx\` ON \`site_settings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_pages_id_idx\` ON \`site_settings_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`site_integrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ga4_measurement_id\` text,
  	\`gtm_container_id\` text,
  	\`meta_pixel_id\` text,
  	\`clarity_project_id\` text,
  	\`linked_in_partner_id\` text,
  	\`tiktok_pixel_id\` text,
  	\`turnstile_site_key\` text,
  	\`turnstile_secret_key\` text,
  	\`turnstile_status_state\` text,
  	\`turnstile_status_code\` text,
  	\`turnstile_status_message\` text,
  	\`turnstile_status_since\` text,
  	\`turnstile_status_checked_at\` text,
  	\`email_transport\` text DEFAULT 'smtp',
  	\`smtp_from_address\` text,
  	\`smtp_from_name\` text,
  	\`smtp_host\` text,
  	\`smtp_port\` numeric DEFAULT 587,
  	\`smtp_user\` text,
  	\`smtp_password\` text,
  	\`email_status_state\` text,
  	\`email_status_code\` text,
  	\`email_status_message\` text,
  	\`email_status_since\` text,
  	\`email_status_checked_at\` text,
  	\`index_now_key\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`cookie_settings_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cookie_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cookie_settings_categories_order_idx\` ON \`cookie_settings_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cookie_settings_categories_parent_id_idx\` ON \`cookie_settings_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cookie_settings_categories_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cookie_settings_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cookie_settings_categories_locales_locale_parent_id_unique\` ON \`cookie_settings_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cookie_settings_categories_locales_parent_id_idx\` ON \`cookie_settings_categories_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cookie_settings_cookies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`storage\` text DEFAULT 'cookie',
  	\`category\` text DEFAULT 'necessary' NOT NULL,
  	\`provider\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cookie_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cookie_settings_cookies_order_idx\` ON \`cookie_settings_cookies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cookie_settings_cookies_parent_id_idx\` ON \`cookie_settings_cookies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cookie_settings_cookies_locales\` (
  	\`purpose\` text,
  	\`duration\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cookie_settings_cookies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cookie_settings_cookies_locales_locale_parent_id_unique\` ON \`cookie_settings_cookies_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cookie_settings_cookies_locales_parent_id_idx\` ON \`cookie_settings_cookies_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cookie_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`policy_version\` numeric DEFAULT 1 NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`cookie_settings_locales\` (
  	\`eyebrow\` text,
  	\`title\` text,
  	\`message\` text,
  	\`privacy_link_label\` text,
  	\`buttons_accept_all\` text,
  	\`buttons_reject\` text,
  	\`buttons_settings\` text,
  	\`buttons_save_preferences\` text,
  	\`buttons_back\` text,
  	\`buttons_close\` text,
  	\`settings_title\` text,
  	\`settings_description\` text,
  	\`always_active_label\` text,
  	\`detail_labels_cookies\` text,
  	\`detail_labels_provider\` text,
  	\`detail_labels_purpose\` text,
  	\`detail_labels_duration\` text,
  	\`detail_labels_storage\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cookie_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cookie_settings_locales_locale_parent_id_unique\` ON \`cookie_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cookie_settings_locales_parent_id_idx\` ON \`cookie_settings_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`notifications\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`notifications_locales\` (
  	\`form_success\` text,
  	\`form_error\` text,
  	\`form_validation\` text,
  	\`form_consent\` text,
  	\`form_turnstile\` text,
  	\`form_rate_limited\` text,
  	\`form_not_found\` text,
  	\`form_file_too_large\` text,
  	\`form_file_type\` text,
  	\`form_file_refused\` text,
  	\`form_file_count\` text,
  	\`form_file_not_sent\` text,
  	\`form_file_optional\` text,
  	\`form_file_remove\` text,
  	\`form_next\` text,
  	\`form_back\` text,
  	\`form_step_of\` text,
  	\`lightbox_open\` text,
  	\`lightbox_dialog\` text,
  	\`lightbox_previous\` text,
  	\`lightbox_next\` text,
  	\`lightbox_close\` text,
  	\`lightbox_counter\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`notifications_locales_locale_parent_id_unique\` ON \`notifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`notifications_locales_parent_id_idx\` ON \`notifications_locales\` (\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_media_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_media_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_media\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_text_media_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_entry_list_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_entry_list_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_entry_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_entry_list_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_slug_history\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_text_media_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_text_media_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_text_media\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_text_media_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_feature_grid_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_feature_grid_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_feature_grid_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_feature_grid_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_feature_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_contact_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_steps_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_steps_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_steps_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_steps_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_entry_list_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_entry_list_links_locales\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_entry_list\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_entry_list_locales\`;`)
  await db.run(sql`DROP TABLE \`services_slug_history\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_locales\`;`)
  await db.run(sql`DROP TABLE \`services_rels\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_text_media_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_text_media_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_text_media\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_text_media_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_feature_grid_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_feature_grid_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_feature_grid_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_feature_grid_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_feature_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cta_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_contact_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_steps_items\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_steps_items_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_steps_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_steps_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_entry_list_links\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_entry_list_links_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_entry_list\`;`)
  await db.run(sql`DROP TABLE \`projects_blocks_entry_list_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_slug_history\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects_locales\`;`)
  await db.run(sql`DROP TABLE \`projects_rels\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_group_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_group_options_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_group\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_group_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_date\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_date_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_radio_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_radio_options_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_radio\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_radio_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_step\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_step_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_time\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_time_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms_emails_locales\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`forms_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_rels\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`consent_records\`;`)
  await db.run(sql`DROP TABLE \`cookie_review\`;`)
  await db.run(sql`DROP TABLE \`cookie_review_locales\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_sub_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_sub_items_locales\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_locales\`;`)
  await db.run(sql`DROP TABLE \`header_links\`;`)
  await db.run(sql`DROP TABLE \`header_links_locales\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_items\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_locales\`;`)
  await db.run(sql`DROP TABLE \`company_socials\`;`)
  await db.run(sql`DROP TABLE \`company\`;`)
  await db.run(sql`DROP TABLE \`company_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_same_as\`;`)
  await db.run(sql`DROP TABLE \`site_settings_ai_crawlers_rules\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_rels\`;`)
  await db.run(sql`DROP TABLE \`site_integrations\`;`)
  await db.run(sql`DROP TABLE \`cookie_settings_categories\`;`)
  await db.run(sql`DROP TABLE \`cookie_settings_categories_locales\`;`)
  await db.run(sql`DROP TABLE \`cookie_settings_cookies\`;`)
  await db.run(sql`DROP TABLE \`cookie_settings_cookies_locales\`;`)
  await db.run(sql`DROP TABLE \`cookie_settings\`;`)
  await db.run(sql`DROP TABLE \`cookie_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`notifications\`;`)
  await db.run(sql`DROP TABLE \`notifications_locales\`;`)
}
