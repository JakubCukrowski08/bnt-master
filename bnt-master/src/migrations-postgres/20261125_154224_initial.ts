import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('pl');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('split', 'background', 'centered', 'page');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_text_media_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_text_media_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_text_media_variant" AS ENUM('mediaRight', 'mediaLeft');
  CREATE TYPE "public"."enum_pages_blocks_text_media_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_items_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_variant" AS ENUM('cards', 'list', 'numbered');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('band', 'card', 'split');
  CREATE TYPE "public"."enum_pages_blocks_cta_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_variant" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_faq_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_faq_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_faq_variant" AS ENUM('single', 'twoColumn');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_contact_variant" AS ENUM('formWithDetails', 'formOnly');
  CREATE TYPE "public"."enum_pages_blocks_contact_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_gallery_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_gallery_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_gallery_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum_pages_blocks_gallery_variant" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_stats_variant" AS ENUM('row', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_steps_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_steps_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_steps_variant" AS ENUM('numbered', 'timeline');
  CREATE TYPE "public"."enum_pages_blocks_steps_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_entry_list_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_pages_blocks_entry_list_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_entry_list_entry_collection" AS ENUM('services', 'projects');
  CREATE TYPE "public"."enum_pages_blocks_entry_list_mode" AS ENUM('latest', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_entry_list_variant" AS ENUM('cards', 'list');
  CREATE TYPE "public"."enum_pages_blocks_entry_list_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_cookie_table_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_consent_map_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_hero_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('split', 'background', 'centered', 'page');
  CREATE TYPE "public"."enum_services_blocks_hero_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_text_media_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_text_media_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_text_media_variant" AS ENUM('mediaRight', 'mediaLeft');
  CREATE TYPE "public"."enum_services_blocks_text_media_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_items_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_variant" AS ENUM('cards', 'list', 'numbered');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_cta_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_cta_variant" AS ENUM('band', 'card', 'split');
  CREATE TYPE "public"."enum_services_blocks_cta_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_rich_text_variant" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_services_blocks_rich_text_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_faq_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_faq_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_faq_variant" AS ENUM('single', 'twoColumn');
  CREATE TYPE "public"."enum_services_blocks_faq_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_contact_variant" AS ENUM('formWithDetails', 'formOnly');
  CREATE TYPE "public"."enum_services_blocks_contact_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_gallery_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_gallery_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_gallery_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum_services_blocks_gallery_variant" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_services_blocks_gallery_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_stats_variant" AS ENUM('row', 'cards');
  CREATE TYPE "public"."enum_services_blocks_stats_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_steps_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_steps_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_steps_variant" AS ENUM('numbered', 'timeline');
  CREATE TYPE "public"."enum_services_blocks_steps_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_entry_list_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_services_blocks_entry_list_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_entry_list_entry_collection" AS ENUM('services', 'projects');
  CREATE TYPE "public"."enum_services_blocks_entry_list_mode" AS ENUM('latest', 'selected');
  CREATE TYPE "public"."enum_services_blocks_entry_list_variant" AS ENUM('cards', 'list');
  CREATE TYPE "public"."enum_services_blocks_entry_list_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_cookie_table_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_services_blocks_consent_map_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_hero_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_hero_variant" AS ENUM('split', 'background', 'centered', 'page');
  CREATE TYPE "public"."enum_projects_blocks_hero_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_text_media_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_text_media_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_text_media_variant" AS ENUM('mediaRight', 'mediaLeft');
  CREATE TYPE "public"."enum_projects_blocks_text_media_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_items_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_variant" AS ENUM('cards', 'list', 'numbered');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_cta_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_cta_variant" AS ENUM('band', 'card', 'split');
  CREATE TYPE "public"."enum_projects_blocks_cta_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_variant" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_faq_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_faq_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_faq_variant" AS ENUM('single', 'twoColumn');
  CREATE TYPE "public"."enum_projects_blocks_faq_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_contact_variant" AS ENUM('formWithDetails', 'formOnly');
  CREATE TYPE "public"."enum_projects_blocks_contact_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_gallery_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_gallery_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_gallery_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum_projects_blocks_gallery_variant" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_projects_blocks_gallery_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_stats_variant" AS ENUM('row', 'cards');
  CREATE TYPE "public"."enum_projects_blocks_stats_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_steps_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_steps_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_steps_variant" AS ENUM('numbered', 'timeline');
  CREATE TYPE "public"."enum_projects_blocks_steps_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_entry_list_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_projects_blocks_entry_list_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_entry_list_entry_collection" AS ENUM('services', 'projects');
  CREATE TYPE "public"."enum_projects_blocks_entry_list_mode" AS ENUM('latest', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_entry_list_variant" AS ENUM('cards', 'list');
  CREATE TYPE "public"."enum_projects_blocks_entry_list_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_cookie_table_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_projects_blocks_consent_map_settings_background" AS ENUM('default', 'muted', 'inverted');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('user', 'editor', 'admin');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_redirect_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_cookie_review_storage" AS ENUM('cookie', 'localStorage', 'sessionStorage');
  CREATE TYPE "public"."enum_cookie_review_category" AS ENUM('necessary', 'functional', 'analytics', 'marketing');
  CREATE TYPE "public"."enum_cookie_review_status" AS ENUM('draft', 'accepted', 'rejected');
  CREATE TYPE "public"."enum_cookie_review_source" AS ENUM('integration', 'project', 'database', 'unknown', 'manual');
  CREATE TYPE "public"."enum_cookie_review_change" AS ENUM('new', 'changed', 'gone');
  CREATE TYPE "public"."enum_header_nav_items_sub_items_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_header_links_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_header_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_footer_columns_items_link_type" AS ENUM('internal', 'external', 'file');
  CREATE TYPE "public"."enum_site_settings_ai_crawlers_rules_access" AS ENUM('allow', 'disallow');
  CREATE TYPE "public"."enum_site_settings_title_order" AS ENUM('page-first', 'site-first');
  CREATE TYPE "public"."enum_site_settings_title_separator" AS ENUM('pipe', 'endash', 'hyphen', 'middot', 'slash');
  CREATE TYPE "public"."enum_site_settings_default_theme" AS ENUM('light', 'dark', 'system');
  CREATE TYPE "public"."enum_site_settings_ai_crawlers_policy" AS ENUM('default', 'allow', 'block-training', 'disallow');
  CREATE TYPE "public"."enum_site_integrations_turnstile_status_state" AS ENUM('ok', 'degraded');
  CREATE TYPE "public"."enum_site_integrations_email_transport" AS ENUM('smtp', 'graph');
  CREATE TYPE "public"."enum_site_integrations_email_status_state" AS ENUM('ok', 'degraded');
  CREATE TYPE "public"."enum_cookie_settings_categories_key" AS ENUM('necessary', 'functional', 'analytics', 'marketing');
  CREATE TYPE "public"."enum_cookie_settings_cookies_storage" AS ENUM('cookie', 'localStorage', 'sessionStorage');
  CREATE TYPE "public"."enum_cookie_settings_cookies_category" AS ENUM('necessary', 'functional', 'analytics', 'marketing');
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"poster_id" integer,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'split',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_hero_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_text_media_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_text_media_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_text_media_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"variant" "enum_pages_blocks_text_media_variant" DEFAULT 'mediaRight',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_text_media_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_media_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"link_type" "enum_pages_blocks_feature_grid_items_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items_locales" (
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_grid_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_feature_grid_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_feature_grid_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_feature_grid_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT 'three',
  	"variant" "enum_pages_blocks_feature_grid_variant" DEFAULT 'cards',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_feature_grid_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"variant" "enum_pages_blocks_cta_variant" DEFAULT 'band',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_cta_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"table_of_contents_show" boolean,
  	"variant" "enum_pages_blocks_rich_text_variant" DEFAULT 'narrow',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_rich_text_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb NOT NULL,
  	"table_of_contents_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_faq_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_faq_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_faq_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_faq_variant" DEFAULT 'single',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_faq_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"variant" "enum_pages_blocks_contact_variant" DEFAULT 'formWithDetails',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_contact_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_items_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_gallery_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_gallery_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_gallery_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_gallery_columns" DEFAULT 'three',
  	"variant" "enum_pages_blocks_gallery_variant" DEFAULT 'grid',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_gallery_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_items_locales" (
  	"value" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_stats_variant" DEFAULT 'row',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_stats_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_steps_items_locales" (
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_steps_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_steps_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_steps_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_steps_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_steps_variant" DEFAULT 'numbered',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_steps_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_entry_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_entry_list_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_pages_blocks_entry_list_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_entry_list_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_entry_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entry_collection" "enum_pages_blocks_entry_list_entry_collection" DEFAULT 'services' NOT NULL,
  	"mode" "enum_pages_blocks_entry_list_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"variant" "enum_pages_blocks_entry_list_variant" DEFAULT 'cards',
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_entry_list_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_entry_list_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cookie_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_cookie_table_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cookie_table_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_consent_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed" varchar NOT NULL,
  	"settings_anchor" varchar,
  	"settings_background" "enum_pages_blocks_consent_map_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_consent_map_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"consent_label" varchar NOT NULL,
  	"map_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_slug_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_title_override" varchar,
  	"slug" varchar NOT NULL,
  	"ai_summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "services_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_hero_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"poster_id" integer,
  	"variant" "enum_services_blocks_hero_variant" DEFAULT 'split',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_hero_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_hero_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_text_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_text_media_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_text_media_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_text_media_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_text_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"variant" "enum_services_blocks_text_media_variant" DEFAULT 'mediaRight',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_text_media_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_text_media_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"link_type" "enum_services_blocks_feature_grid_items_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer
  );
  
  CREATE TABLE "services_blocks_feature_grid_items_locales" (
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_feature_grid_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_feature_grid_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_feature_grid_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_feature_grid_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_services_blocks_feature_grid_columns" DEFAULT 'three',
  	"variant" "enum_services_blocks_feature_grid_variant" DEFAULT 'cards',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_feature_grid_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_feature_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_cta_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"variant" "enum_services_blocks_cta_variant" DEFAULT 'band',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_cta_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"table_of_contents_show" boolean,
  	"variant" "enum_services_blocks_rich_text_variant" DEFAULT 'narrow',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_rich_text_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb NOT NULL,
  	"table_of_contents_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_faq_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_faq_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_faq_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_faq_variant" DEFAULT 'single',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_faq_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"variant" "enum_services_blocks_contact_variant" DEFAULT 'formWithDetails',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_contact_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL
  );
  
  CREATE TABLE "services_blocks_gallery_items_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_gallery_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_gallery_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_gallery_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_gallery_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_services_blocks_gallery_columns" DEFAULT 'three',
  	"variant" "enum_services_blocks_gallery_variant" DEFAULT 'grid',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_gallery_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_gallery_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats_items_locales" (
  	"value" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_stats_variant" DEFAULT 'row',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_stats_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "services_blocks_steps_items_locales" (
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_steps_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_steps_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_steps_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_steps_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_steps_variant" DEFAULT 'numbered',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_steps_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_entry_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_entry_list_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_services_blocks_entry_list_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_entry_list_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_entry_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entry_collection" "enum_services_blocks_entry_list_entry_collection" DEFAULT 'services' NOT NULL,
  	"mode" "enum_services_blocks_entry_list_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"variant" "enum_services_blocks_entry_list_variant" DEFAULT 'cards',
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_entry_list_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_entry_list_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cookie_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_cookie_table_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cookie_table_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_consent_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed" varchar NOT NULL,
  	"settings_anchor" varchar,
  	"settings_background" "enum_services_blocks_consent_map_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_consent_map_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"consent_label" varchar NOT NULL,
  	"map_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_slug_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"legacy_slug" varchar,
  	"media_id" integer,
  	"short_desc" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"legacy_id" varchar,
  	"lead" varchar,
  	"intro_section" jsonb,
  	"callout_section" jsonb,
  	"grid_section" jsonb,
  	"dark_section" jsonb,
  	"sections" jsonb,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_title_override" varchar,
  	"slug" varchar NOT NULL,
  	"ai_summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "projects_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_hero_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"poster_id" integer,
  	"variant" "enum_projects_blocks_hero_variant" DEFAULT 'split',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_hero_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_hero_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_text_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_text_media_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_text_media_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_text_media_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_text_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"variant" "enum_projects_blocks_text_media_variant" DEFAULT 'mediaRight',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_text_media_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_text_media_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"link_type" "enum_projects_blocks_feature_grid_items_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer
  );
  
  CREATE TABLE "projects_blocks_feature_grid_items_locales" (
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_feature_grid_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_feature_grid_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_feature_grid_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_feature_grid_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_projects_blocks_feature_grid_columns" DEFAULT 'three',
  	"variant" "enum_projects_blocks_feature_grid_variant" DEFAULT 'cards',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_feature_grid_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_feature_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_cta_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"variant" "enum_projects_blocks_cta_variant" DEFAULT 'band',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_cta_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_cta_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"table_of_contents_show" boolean,
  	"variant" "enum_projects_blocks_rich_text_variant" DEFAULT 'narrow',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_rich_text_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb NOT NULL,
  	"table_of_contents_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_faq_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_faq_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_faq_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_faq_variant" DEFAULT 'single',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_faq_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"variant" "enum_projects_blocks_contact_variant" DEFAULT 'formWithDetails',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_contact_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery_items_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_gallery_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_gallery_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_gallery_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_projects_blocks_gallery_columns" DEFAULT 'three',
  	"variant" "enum_projects_blocks_gallery_variant" DEFAULT 'grid',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_gallery_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_stats_items_locales" (
  	"value" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_stats_variant" DEFAULT 'row',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_stats_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "projects_blocks_steps_items_locales" (
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_steps_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_steps_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_steps_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_steps_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_projects_blocks_steps_variant" DEFAULT 'numbered',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_steps_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_entry_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_projects_blocks_entry_list_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_projects_blocks_entry_list_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_entry_list_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_entry_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entry_collection" "enum_projects_blocks_entry_list_entry_collection" DEFAULT 'services' NOT NULL,
  	"mode" "enum_projects_blocks_entry_list_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"variant" "enum_projects_blocks_entry_list_variant" DEFAULT 'cards',
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_entry_list_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_entry_list_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_cookie_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_cookie_table_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_cookie_table_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_consent_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed" varchar NOT NULL,
  	"settings_anchor" varchar,
  	"settings_background" "enum_projects_blocks_consent_map_settings_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_consent_map_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"consent_label" varchar NOT NULL,
  	"map_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_slug_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"legacy_slug" varchar,
  	"media_id" integer,
  	"short_desc" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"featured" boolean,
  	"legacy_id" varchar,
  	"type" varchar,
  	"year" numeric,
  	"location" varchar,
  	"full_desc" varchar,
  	"stats" jsonb,
  	"features" jsonb,
  	"gallery" jsonb,
  	"main_img" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_title_override" varchar,
  	"slug" varchar NOT NULL,
  	"ai_summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"legacy_path" varchar,
  	"optimize_on_upload" boolean DEFAULT false,
  	"placeholder_blur_data_u_r_l" varchar,
  	"placeholder_color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"totp_secret" varchar,
  	"totp_setup_from" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"placeholder" varchar,
  	"required" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox_group_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox_group_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"min_selected" numeric,
  	"max_selected" numeric,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_checkbox_group_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_date" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" timestamp(3) with time zone,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_date_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_radio_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_radio_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_radio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_radio_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_step_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_time" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"show_when_field" varchar,
  	"show_when_values" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_time_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_type" "enum_forms_redirect_type" DEFAULT 'reference',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "consent_records" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"consent_id" varchar NOT NULL,
  	"version" numeric NOT NULL,
  	"choices_necessary" boolean,
  	"choices_functional" boolean,
  	"choices_analytics" boolean,
  	"choices_marketing" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cookie_review" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"storage" "enum_cookie_review_storage" DEFAULT 'cookie' NOT NULL,
  	"category" "enum_cookie_review_category",
  	"vendor" varchar,
  	"domain" varchar,
  	"set_before_consent" boolean,
  	"status" "enum_cookie_review_status" DEFAULT 'draft' NOT NULL,
  	"source" "enum_cookie_review_source" DEFAULT 'manual',
  	"source_detail" varchar,
  	"listed" boolean,
  	"change" "enum_cookie_review_change",
  	"needs_description" boolean DEFAULT false,
  	"last_scanned_at" timestamp(3) with time zone,
  	"key" varchar,
  	"suggested" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cookie_review_locales" (
  	"purpose" varchar,
  	"retention" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"consent_records_id" integer,
  	"cookie_review_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_items_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer
  );
  
  CREATE TABLE "header_nav_items_sub_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer,
  	"link_appearance" "enum_header_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"menu_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_items_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_file_id" integer
  );
  
  CREATE TABLE "footer_columns_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "company_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "company" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"legal_name" varchar,
  	"tax_id" varchar,
  	"address_street" varchar,
  	"address_postal_code" varchar,
  	"address_city" varchar,
  	"address_country" varchar DEFAULT 'PL',
  	"phone" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_locales" (
  	"phone_label" varchar,
  	"email_label" varchar,
  	"tax_id_label" varchar DEFAULT 'NIP',
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_ai_crawlers_rules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"user_agent" varchar NOT NULL,
  	"access" "enum_site_settings_ai_crawlers_rules_access" DEFAULT 'disallow' NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"default_share_image_id" integer,
  	"title_order" "enum_site_settings_title_order" DEFAULT 'page-first',
  	"title_separator" "enum_site_settings_title_separator" DEFAULT 'pipe',
  	"default_theme" "enum_site_settings_default_theme" DEFAULT 'light' NOT NULL,
  	"allow_theme_toggle" boolean DEFAULT true,
  	"homepage_id" integer,
  	"not_found_id" integer,
  	"privacy_policy_id" integer,
  	"cookie_policy_id" integer,
  	"terms_of_service_id" integer,
  	"services_archive_id" integer,
  	"projects_archive_id" integer,
  	"search_verification_google" varchar,
  	"search_verification_bing" varchar,
  	"search_verification_yandex" varchar,
  	"ai_crawlers_policy" "enum_site_settings_ai_crawlers_policy" DEFAULT 'default',
  	"email_logo_id" integer,
  	"email_accent_color" varchar,
  	"construction_enabled" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar NOT NULL,
  	"site_description" varchar,
  	"theme_toggle_label" varchar,
  	"llms_intro" varchar,
  	"email_footer" varchar,
  	"construction_title" varchar,
  	"construction_message" varchar,
  	"construction_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "site_integrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ga4_measurement_id" varchar,
  	"gtm_container_id" varchar,
  	"meta_pixel_id" varchar,
  	"clarity_project_id" varchar,
  	"linked_in_partner_id" varchar,
  	"tiktok_pixel_id" varchar,
  	"turnstile_site_key" varchar,
  	"turnstile_secret_key" varchar,
  	"turnstile_status_state" "enum_site_integrations_turnstile_status_state",
  	"turnstile_status_code" varchar,
  	"turnstile_status_message" varchar,
  	"turnstile_status_since" timestamp(3) with time zone,
  	"turnstile_status_checked_at" timestamp(3) with time zone,
  	"email_transport" "enum_site_integrations_email_transport" DEFAULT 'smtp',
  	"smtp_from_address" varchar,
  	"smtp_from_name" varchar,
  	"smtp_host" varchar,
  	"smtp_port" numeric DEFAULT 587,
  	"smtp_user" varchar,
  	"smtp_password" varchar,
  	"email_status_state" "enum_site_integrations_email_status_state",
  	"email_status_code" varchar,
  	"email_status_message" varchar,
  	"email_status_since" timestamp(3) with time zone,
  	"email_status_checked_at" timestamp(3) with time zone,
  	"index_now_key" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cookie_settings_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_cookie_settings_categories_key" NOT NULL
  );
  
  CREATE TABLE "cookie_settings_categories_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cookie_settings_cookies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"storage" "enum_cookie_settings_cookies_storage" DEFAULT 'cookie',
  	"category" "enum_cookie_settings_cookies_category" DEFAULT 'necessary' NOT NULL,
  	"provider" varchar
  );
  
  CREATE TABLE "cookie_settings_cookies_locales" (
  	"purpose" varchar,
  	"duration" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cookie_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"policy_version" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cookie_settings_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"message" varchar,
  	"privacy_link_label" varchar,
  	"buttons_accept_all" varchar,
  	"buttons_reject" varchar,
  	"buttons_settings" varchar,
  	"buttons_save_preferences" varchar,
  	"buttons_back" varchar,
  	"buttons_close" varchar,
  	"settings_title" varchar,
  	"settings_description" varchar,
  	"always_active_label" varchar,
  	"detail_labels_cookies" varchar,
  	"detail_labels_provider" varchar,
  	"detail_labels_purpose" varchar,
  	"detail_labels_duration" varchar,
  	"detail_labels_storage" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "notifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "notifications_locales" (
  	"form_success" varchar,
  	"form_error" varchar,
  	"form_validation" varchar,
  	"form_consent" varchar,
  	"form_turnstile" varchar,
  	"form_rate_limited" varchar,
  	"form_not_found" varchar,
  	"form_file_too_large" varchar,
  	"form_file_type" varchar,
  	"form_file_refused" varchar,
  	"form_file_count" varchar,
  	"form_file_not_sent" varchar,
  	"form_file_optional" varchar,
  	"form_file_remove" varchar,
  	"form_next" varchar,
  	"form_back" varchar,
  	"form_step_of" varchar,
  	"lightbox_open" varchar,
  	"lightbox_dialog" varchar,
  	"lightbox_previous" varchar,
  	"lightbox_next" varchar,
  	"lightbox_close" varchar,
  	"lightbox_counter" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links_locales" ADD CONSTRAINT "pages_blocks_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_links" ADD CONSTRAINT "pages_blocks_text_media_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_links" ADD CONSTRAINT "pages_blocks_text_media_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_links" ADD CONSTRAINT "pages_blocks_text_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_links_locales" ADD CONSTRAINT "pages_blocks_text_media_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_media_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media" ADD CONSTRAINT "pages_blocks_text_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media" ADD CONSTRAINT "pages_blocks_text_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_locales" ADD CONSTRAINT "pages_blocks_text_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD CONSTRAINT "pages_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_links" ADD CONSTRAINT "pages_blocks_feature_grid_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_links" ADD CONSTRAINT "pages_blocks_feature_grid_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_links" ADD CONSTRAINT "pages_blocks_feature_grid_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_links_locales" ADD CONSTRAINT "pages_blocks_feature_grid_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_locales" ADD CONSTRAINT "pages_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_links" ADD CONSTRAINT "pages_blocks_faq_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_links" ADD CONSTRAINT "pages_blocks_faq_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_links" ADD CONSTRAINT "pages_blocks_faq_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_links_locales" ADD CONSTRAINT "pages_blocks_faq_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items" ADD CONSTRAINT "pages_blocks_gallery_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items" ADD CONSTRAINT "pages_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items_locales" ADD CONSTRAINT "pages_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_links" ADD CONSTRAINT "pages_blocks_gallery_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_links" ADD CONSTRAINT "pages_blocks_gallery_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_links" ADD CONSTRAINT "pages_blocks_gallery_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_links_locales" ADD CONSTRAINT "pages_blocks_gallery_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items" ADD CONSTRAINT "pages_blocks_steps_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items" ADD CONSTRAINT "pages_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items_locales" ADD CONSTRAINT "pages_blocks_steps_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_links" ADD CONSTRAINT "pages_blocks_steps_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_links" ADD CONSTRAINT "pages_blocks_steps_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_links" ADD CONSTRAINT "pages_blocks_steps_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_links_locales" ADD CONSTRAINT "pages_blocks_steps_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_locales" ADD CONSTRAINT "pages_blocks_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_entry_list_links" ADD CONSTRAINT "pages_blocks_entry_list_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_entry_list_links" ADD CONSTRAINT "pages_blocks_entry_list_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_entry_list_links" ADD CONSTRAINT "pages_blocks_entry_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_entry_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_entry_list_links_locales" ADD CONSTRAINT "pages_blocks_entry_list_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_entry_list_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_entry_list" ADD CONSTRAINT "pages_blocks_entry_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_entry_list_locales" ADD CONSTRAINT "pages_blocks_entry_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_entry_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cookie_table" ADD CONSTRAINT "pages_blocks_cookie_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cookie_table_locales" ADD CONSTRAINT "pages_blocks_cookie_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cookie_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consent_map" ADD CONSTRAINT "pages_blocks_consent_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consent_map_locales" ADD CONSTRAINT "pages_blocks_consent_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_consent_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_slug_history" ADD CONSTRAINT "pages_slug_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_links" ADD CONSTRAINT "services_blocks_hero_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_links" ADD CONSTRAINT "services_blocks_hero_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_links" ADD CONSTRAINT "services_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_links_locales" ADD CONSTRAINT "services_blocks_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_locales" ADD CONSTRAINT "services_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_media_links" ADD CONSTRAINT "services_blocks_text_media_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_text_media_links" ADD CONSTRAINT "services_blocks_text_media_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_text_media_links" ADD CONSTRAINT "services_blocks_text_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_text_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_media_links_locales" ADD CONSTRAINT "services_blocks_text_media_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_text_media_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_media" ADD CONSTRAINT "services_blocks_text_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_text_media" ADD CONSTRAINT "services_blocks_text_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_text_media_locales" ADD CONSTRAINT "services_blocks_text_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_text_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items" ADD CONSTRAINT "services_blocks_feature_grid_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items" ADD CONSTRAINT "services_blocks_feature_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items" ADD CONSTRAINT "services_blocks_feature_grid_items_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items" ADD CONSTRAINT "services_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items_locales" ADD CONSTRAINT "services_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_links" ADD CONSTRAINT "services_blocks_feature_grid_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_links" ADD CONSTRAINT "services_blocks_feature_grid_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_links" ADD CONSTRAINT "services_blocks_feature_grid_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_links_locales" ADD CONSTRAINT "services_blocks_feature_grid_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid" ADD CONSTRAINT "services_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_locales" ADD CONSTRAINT "services_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links" ADD CONSTRAINT "services_blocks_cta_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links" ADD CONSTRAINT "services_blocks_cta_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links" ADD CONSTRAINT "services_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links_locales" ADD CONSTRAINT "services_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_locales" ADD CONSTRAINT "services_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text_locales" ADD CONSTRAINT "services_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items" ADD CONSTRAINT "services_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items_locales" ADD CONSTRAINT "services_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_links" ADD CONSTRAINT "services_blocks_faq_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_links" ADD CONSTRAINT "services_blocks_faq_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_links" ADD CONSTRAINT "services_blocks_faq_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_links_locales" ADD CONSTRAINT "services_blocks_faq_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_locales" ADD CONSTRAINT "services_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact" ADD CONSTRAINT "services_blocks_contact_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_contact" ADD CONSTRAINT "services_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_locales" ADD CONSTRAINT "services_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_items" ADD CONSTRAINT "services_blocks_gallery_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_items" ADD CONSTRAINT "services_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_items_locales" ADD CONSTRAINT "services_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_links" ADD CONSTRAINT "services_blocks_gallery_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_links" ADD CONSTRAINT "services_blocks_gallery_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_links" ADD CONSTRAINT "services_blocks_gallery_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_links_locales" ADD CONSTRAINT "services_blocks_gallery_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery" ADD CONSTRAINT "services_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_locales" ADD CONSTRAINT "services_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items_locales" ADD CONSTRAINT "services_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_locales" ADD CONSTRAINT "services_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_items" ADD CONSTRAINT "services_blocks_steps_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_items" ADD CONSTRAINT "services_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_items_locales" ADD CONSTRAINT "services_blocks_steps_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_links" ADD CONSTRAINT "services_blocks_steps_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_links" ADD CONSTRAINT "services_blocks_steps_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_links" ADD CONSTRAINT "services_blocks_steps_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_links_locales" ADD CONSTRAINT "services_blocks_steps_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_steps_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps" ADD CONSTRAINT "services_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_locales" ADD CONSTRAINT "services_blocks_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_entry_list_links" ADD CONSTRAINT "services_blocks_entry_list_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_entry_list_links" ADD CONSTRAINT "services_blocks_entry_list_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_entry_list_links" ADD CONSTRAINT "services_blocks_entry_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_entry_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_entry_list_links_locales" ADD CONSTRAINT "services_blocks_entry_list_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_entry_list_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_entry_list" ADD CONSTRAINT "services_blocks_entry_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_entry_list_locales" ADD CONSTRAINT "services_blocks_entry_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_entry_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cookie_table" ADD CONSTRAINT "services_blocks_cookie_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cookie_table_locales" ADD CONSTRAINT "services_blocks_cookie_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cookie_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_consent_map" ADD CONSTRAINT "services_blocks_consent_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_consent_map_locales" ADD CONSTRAINT "services_blocks_consent_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_consent_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_slug_history" ADD CONSTRAINT "services_slug_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links" ADD CONSTRAINT "projects_blocks_hero_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links" ADD CONSTRAINT "projects_blocks_hero_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links" ADD CONSTRAINT "projects_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_links_locales" ADD CONSTRAINT "projects_blocks_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_locales" ADD CONSTRAINT "projects_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_media_links" ADD CONSTRAINT "projects_blocks_text_media_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_media_links" ADD CONSTRAINT "projects_blocks_text_media_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_media_links" ADD CONSTRAINT "projects_blocks_text_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_media_links_locales" ADD CONSTRAINT "projects_blocks_text_media_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_media_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_media" ADD CONSTRAINT "projects_blocks_text_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_media" ADD CONSTRAINT "projects_blocks_text_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_media_locales" ADD CONSTRAINT "projects_blocks_text_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD CONSTRAINT "projects_blocks_feature_grid_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD CONSTRAINT "projects_blocks_feature_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD CONSTRAINT "projects_blocks_feature_grid_items_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD CONSTRAINT "projects_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items_locales" ADD CONSTRAINT "projects_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_links" ADD CONSTRAINT "projects_blocks_feature_grid_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_links" ADD CONSTRAINT "projects_blocks_feature_grid_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_links" ADD CONSTRAINT "projects_blocks_feature_grid_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_links_locales" ADD CONSTRAINT "projects_blocks_feature_grid_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid" ADD CONSTRAINT "projects_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_locales" ADD CONSTRAINT "projects_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_links" ADD CONSTRAINT "projects_blocks_cta_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_links" ADD CONSTRAINT "projects_blocks_cta_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_links" ADD CONSTRAINT "projects_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_links_locales" ADD CONSTRAINT "projects_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta" ADD CONSTRAINT "projects_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta" ADD CONSTRAINT "projects_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta_locales" ADD CONSTRAINT "projects_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD CONSTRAINT "projects_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items" ADD CONSTRAINT "projects_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items_locales" ADD CONSTRAINT "projects_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_links" ADD CONSTRAINT "projects_blocks_faq_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_links" ADD CONSTRAINT "projects_blocks_faq_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_links" ADD CONSTRAINT "projects_blocks_faq_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_links_locales" ADD CONSTRAINT "projects_blocks_faq_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq" ADD CONSTRAINT "projects_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_locales" ADD CONSTRAINT "projects_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact" ADD CONSTRAINT "projects_blocks_contact_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact" ADD CONSTRAINT "projects_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_locales" ADD CONSTRAINT "projects_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_items" ADD CONSTRAINT "projects_blocks_gallery_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_items" ADD CONSTRAINT "projects_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_items_locales" ADD CONSTRAINT "projects_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_links" ADD CONSTRAINT "projects_blocks_gallery_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_links" ADD CONSTRAINT "projects_blocks_gallery_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_links" ADD CONSTRAINT "projects_blocks_gallery_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_links_locales" ADD CONSTRAINT "projects_blocks_gallery_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_locales" ADD CONSTRAINT "projects_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items_locales" ADD CONSTRAINT "projects_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_locales" ADD CONSTRAINT "projects_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_items" ADD CONSTRAINT "projects_blocks_steps_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_items" ADD CONSTRAINT "projects_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_items_locales" ADD CONSTRAINT "projects_blocks_steps_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_links" ADD CONSTRAINT "projects_blocks_steps_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_links" ADD CONSTRAINT "projects_blocks_steps_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_links" ADD CONSTRAINT "projects_blocks_steps_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_links_locales" ADD CONSTRAINT "projects_blocks_steps_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_steps_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps" ADD CONSTRAINT "projects_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_steps_locales" ADD CONSTRAINT "projects_blocks_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_entry_list_links" ADD CONSTRAINT "projects_blocks_entry_list_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_entry_list_links" ADD CONSTRAINT "projects_blocks_entry_list_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_entry_list_links" ADD CONSTRAINT "projects_blocks_entry_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_entry_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_entry_list_links_locales" ADD CONSTRAINT "projects_blocks_entry_list_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_entry_list_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_entry_list" ADD CONSTRAINT "projects_blocks_entry_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_entry_list_locales" ADD CONSTRAINT "projects_blocks_entry_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_entry_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cookie_table" ADD CONSTRAINT "projects_blocks_cookie_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cookie_table_locales" ADD CONSTRAINT "projects_blocks_cookie_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_cookie_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_consent_map" ADD CONSTRAINT "projects_blocks_consent_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_consent_map_locales" ADD CONSTRAINT "projects_blocks_consent_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_consent_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_slug_history" ADD CONSTRAINT "projects_slug_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_group_options" ADD CONSTRAINT "forms_blocks_checkbox_group_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_group_options_locales" ADD CONSTRAINT "forms_blocks_checkbox_group_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox_group_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_group" ADD CONSTRAINT "forms_blocks_checkbox_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_group_locales" ADD CONSTRAINT "forms_blocks_checkbox_group_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_date" ADD CONSTRAINT "forms_blocks_date_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_date_locales" ADD CONSTRAINT "forms_blocks_date_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_date"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio_options" ADD CONSTRAINT "forms_blocks_radio_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_radio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio_options_locales" ADD CONSTRAINT "forms_blocks_radio_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_radio_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio" ADD CONSTRAINT "forms_blocks_radio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio_locales" ADD CONSTRAINT "forms_blocks_radio_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_radio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_step" ADD CONSTRAINT "forms_blocks_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_step_locales" ADD CONSTRAINT "forms_blocks_step_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_step"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_time" ADD CONSTRAINT "forms_blocks_time_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_time_locales" ADD CONSTRAINT "forms_blocks_time_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_time"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cookie_review_locales" ADD CONSTRAINT "cookie_review_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_review"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consent_records_fk" FOREIGN KEY ("consent_records_id") REFERENCES "public"."consent_records"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cookie_review_fk" FOREIGN KEY ("cookie_review_id") REFERENCES "public"."cookie_review"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items_locales" ADD CONSTRAINT "header_nav_items_sub_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_sub_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_links" ADD CONSTRAINT "header_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_links" ADD CONSTRAINT "header_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_links" ADD CONSTRAINT "header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_links_locales" ADD CONSTRAINT "header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_items" ADD CONSTRAINT "footer_columns_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_items" ADD CONSTRAINT "footer_columns_items_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_items" ADD CONSTRAINT "footer_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_items_locales" ADD CONSTRAINT "footer_columns_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_socials" ADD CONSTRAINT "company_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_locales" ADD CONSTRAINT "company_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_same_as" ADD CONSTRAINT "site_settings_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_ai_crawlers_rules" ADD CONSTRAINT "site_settings_ai_crawlers_rules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_share_image_id_media_id_fk" FOREIGN KEY ("default_share_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_homepage_id_pages_id_fk" FOREIGN KEY ("homepage_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_not_found_id_pages_id_fk" FOREIGN KEY ("not_found_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_privacy_policy_id_pages_id_fk" FOREIGN KEY ("privacy_policy_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_cookie_policy_id_pages_id_fk" FOREIGN KEY ("cookie_policy_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_terms_of_service_id_pages_id_fk" FOREIGN KEY ("terms_of_service_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_services_archive_id_pages_id_fk" FOREIGN KEY ("services_archive_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_projects_archive_id_pages_id_fk" FOREIGN KEY ("projects_archive_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_email_logo_id_media_id_fk" FOREIGN KEY ("email_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_settings_categories" ADD CONSTRAINT "cookie_settings_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_settings_categories_locales" ADD CONSTRAINT "cookie_settings_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_settings_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_settings_cookies" ADD CONSTRAINT "cookie_settings_cookies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_settings_cookies_locales" ADD CONSTRAINT "cookie_settings_cookies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_settings_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_settings_locales" ADD CONSTRAINT "cookie_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notifications_locales" ADD CONSTRAINT "notifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_link_link_page_idx" ON "pages_blocks_hero_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_hero_links_link_link_file_idx" ON "pages_blocks_hero_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_links_locales_locale_parent_id_unique" ON "pages_blocks_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_links_locales_parent_id_idx" ON "pages_blocks_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_hero_poster_idx" ON "pages_blocks_hero" USING btree ("poster_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_media_links_order_idx" ON "pages_blocks_text_media_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_media_links_parent_id_idx" ON "pages_blocks_text_media_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_media_links_link_link_page_idx" ON "pages_blocks_text_media_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_text_media_links_link_link_file_idx" ON "pages_blocks_text_media_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_text_media_links_locales_locale_parent_id_uniqu" ON "pages_blocks_text_media_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_media_links_locales_parent_id_idx" ON "pages_blocks_text_media_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_media_order_idx" ON "pages_blocks_text_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_media_parent_id_idx" ON "pages_blocks_text_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_media_path_idx" ON "pages_blocks_text_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_media_media_idx" ON "pages_blocks_text_media" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_text_media_locales_locale_parent_id_unique" ON "pages_blocks_text_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_media_locales_parent_id_idx" ON "pages_blocks_text_media_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_media_idx" ON "pages_blocks_feature_grid_items" USING btree ("media_id");
  CREATE INDEX "pages_blocks_feature_grid_items_link_link_page_idx" ON "pages_blocks_feature_grid_items" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_feature_grid_items_link_link_file_idx" ON "pages_blocks_feature_grid_items" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_items_locales_locale_parent_id_uni" ON "pages_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_locales_parent_id_idx" ON "pages_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_links_order_idx" ON "pages_blocks_feature_grid_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_links_parent_id_idx" ON "pages_blocks_feature_grid_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_links_link_link_page_idx" ON "pages_blocks_feature_grid_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_feature_grid_links_link_link_file_idx" ON "pages_blocks_feature_grid_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_links_locales_locale_parent_id_uni" ON "pages_blocks_feature_grid_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_links_locales_parent_id_idx" ON "pages_blocks_feature_grid_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_locales_locale_parent_id_unique" ON "pages_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_locales_parent_id_idx" ON "pages_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_link_link_page_idx" ON "pages_blocks_cta_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_cta_links_link_link_file_idx" ON "pages_blocks_cta_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_links_locales_parent_id_idx" ON "pages_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_media_idx" ON "pages_blocks_cta" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_locales_parent_id_idx" ON "pages_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_links_order_idx" ON "pages_blocks_faq_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_links_parent_id_idx" ON "pages_blocks_faq_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_links_link_link_page_idx" ON "pages_blocks_faq_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_faq_links_link_link_file_idx" ON "pages_blocks_faq_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_links_locales_locale_parent_id_unique" ON "pages_blocks_faq_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_links_locales_parent_id_idx" ON "pages_blocks_faq_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_idx" ON "pages_blocks_contact" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_locales_parent_id_idx" ON "pages_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_order_idx" ON "pages_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_items_parent_id_idx" ON "pages_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_media_idx" ON "pages_blocks_gallery_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_items_locales_locale_parent_id_unique" ON "pages_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_locales_parent_id_idx" ON "pages_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_links_order_idx" ON "pages_blocks_gallery_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_links_parent_id_idx" ON "pages_blocks_gallery_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_links_link_link_page_idx" ON "pages_blocks_gallery_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_gallery_links_link_link_file_idx" ON "pages_blocks_gallery_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_links_locales_locale_parent_id_unique" ON "pages_blocks_gallery_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_links_locales_parent_id_idx" ON "pages_blocks_gallery_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_locales_parent_id_idx" ON "pages_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locales_parent_id_idx" ON "pages_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stats_locales_locale_parent_id_unique" ON "pages_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_locales_parent_id_idx" ON "pages_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_items_order_idx" ON "pages_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_items_parent_id_idx" ON "pages_blocks_steps_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_items_media_idx" ON "pages_blocks_steps_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_steps_items_locales_locale_parent_id_unique" ON "pages_blocks_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_steps_items_locales_parent_id_idx" ON "pages_blocks_steps_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_links_order_idx" ON "pages_blocks_steps_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_links_parent_id_idx" ON "pages_blocks_steps_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_links_link_link_page_idx" ON "pages_blocks_steps_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_steps_links_link_link_file_idx" ON "pages_blocks_steps_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_steps_links_locales_locale_parent_id_unique" ON "pages_blocks_steps_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_steps_links_locales_parent_id_idx" ON "pages_blocks_steps_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_steps_locales_locale_parent_id_unique" ON "pages_blocks_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_steps_locales_parent_id_idx" ON "pages_blocks_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_entry_list_links_order_idx" ON "pages_blocks_entry_list_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_entry_list_links_parent_id_idx" ON "pages_blocks_entry_list_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_entry_list_links_link_link_page_idx" ON "pages_blocks_entry_list_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_entry_list_links_link_link_file_idx" ON "pages_blocks_entry_list_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "pages_blocks_entry_list_links_locales_locale_parent_id_uniqu" ON "pages_blocks_entry_list_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_entry_list_links_locales_parent_id_idx" ON "pages_blocks_entry_list_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_entry_list_order_idx" ON "pages_blocks_entry_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_entry_list_parent_id_idx" ON "pages_blocks_entry_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_entry_list_path_idx" ON "pages_blocks_entry_list" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_entry_list_locales_locale_parent_id_unique" ON "pages_blocks_entry_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_entry_list_locales_parent_id_idx" ON "pages_blocks_entry_list_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cookie_table_order_idx" ON "pages_blocks_cookie_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_cookie_table_parent_id_idx" ON "pages_blocks_cookie_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cookie_table_path_idx" ON "pages_blocks_cookie_table" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cookie_table_locales_locale_parent_id_unique" ON "pages_blocks_cookie_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cookie_table_locales_parent_id_idx" ON "pages_blocks_cookie_table_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consent_map_order_idx" ON "pages_blocks_consent_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_consent_map_parent_id_idx" ON "pages_blocks_consent_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consent_map_path_idx" ON "pages_blocks_consent_map" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_consent_map_locales_locale_parent_id_unique" ON "pages_blocks_consent_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_consent_map_locales_parent_id_idx" ON "pages_blocks_consent_map_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_slug_history_order_idx" ON "pages_slug_history" USING btree ("_order");
  CREATE INDEX "pages_slug_history_parent_id_idx" ON "pages_slug_history" USING btree ("_parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "services_blocks_hero_links_order_idx" ON "services_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_links_parent_id_idx" ON "services_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_links_link_link_page_idx" ON "services_blocks_hero_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_hero_links_link_link_file_idx" ON "services_blocks_hero_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_hero_links_locales_locale_parent_id_unique" ON "services_blocks_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_links_locales_parent_id_idx" ON "services_blocks_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_media_idx" ON "services_blocks_hero" USING btree ("media_id");
  CREATE INDEX "services_blocks_hero_poster_idx" ON "services_blocks_hero" USING btree ("poster_id");
  CREATE UNIQUE INDEX "services_blocks_hero_locales_locale_parent_id_unique" ON "services_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_locales_parent_id_idx" ON "services_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_media_links_order_idx" ON "services_blocks_text_media_links" USING btree ("_order");
  CREATE INDEX "services_blocks_text_media_links_parent_id_idx" ON "services_blocks_text_media_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_media_links_link_link_page_idx" ON "services_blocks_text_media_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_text_media_links_link_link_file_idx" ON "services_blocks_text_media_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_text_media_links_locales_locale_parent_id_un" ON "services_blocks_text_media_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_text_media_links_locales_parent_id_idx" ON "services_blocks_text_media_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_media_order_idx" ON "services_blocks_text_media" USING btree ("_order");
  CREATE INDEX "services_blocks_text_media_parent_id_idx" ON "services_blocks_text_media" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_text_media_path_idx" ON "services_blocks_text_media" USING btree ("_path");
  CREATE INDEX "services_blocks_text_media_media_idx" ON "services_blocks_text_media" USING btree ("media_id");
  CREATE UNIQUE INDEX "services_blocks_text_media_locales_locale_parent_id_unique" ON "services_blocks_text_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_text_media_locales_parent_id_idx" ON "services_blocks_text_media_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_items_order_idx" ON "services_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_items_parent_id_idx" ON "services_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_items_media_idx" ON "services_blocks_feature_grid_items" USING btree ("media_id");
  CREATE INDEX "services_blocks_feature_grid_items_link_link_page_idx" ON "services_blocks_feature_grid_items" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_feature_grid_items_link_link_file_idx" ON "services_blocks_feature_grid_items" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_feature_grid_items_locales_locale_parent_id_" ON "services_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_feature_grid_items_locales_parent_id_idx" ON "services_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_links_order_idx" ON "services_blocks_feature_grid_links" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_links_parent_id_idx" ON "services_blocks_feature_grid_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_links_link_link_page_idx" ON "services_blocks_feature_grid_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_feature_grid_links_link_link_file_idx" ON "services_blocks_feature_grid_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_feature_grid_links_locales_locale_parent_id_" ON "services_blocks_feature_grid_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_feature_grid_links_locales_parent_id_idx" ON "services_blocks_feature_grid_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_order_idx" ON "services_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_parent_id_idx" ON "services_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_path_idx" ON "services_blocks_feature_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_feature_grid_locales_locale_parent_id_unique" ON "services_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_feature_grid_locales_parent_id_idx" ON "services_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_links_order_idx" ON "services_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_links_parent_id_idx" ON "services_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_links_link_link_page_idx" ON "services_blocks_cta_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_cta_links_link_link_file_idx" ON "services_blocks_cta_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_cta_links_locales_locale_parent_id_unique" ON "services_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_cta_links_locales_parent_id_idx" ON "services_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_media_idx" ON "services_blocks_cta" USING btree ("media_id");
  CREATE UNIQUE INDEX "services_blocks_cta_locales_locale_parent_id_unique" ON "services_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_cta_locales_parent_id_idx" ON "services_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_rich_text_locales_locale_parent_id_unique" ON "services_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_rich_text_locales_parent_id_idx" ON "services_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_items_order_idx" ON "services_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_items_parent_id_idx" ON "services_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_faq_items_locales_locale_parent_id_unique" ON "services_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_items_locales_parent_id_idx" ON "services_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_links_order_idx" ON "services_blocks_faq_links" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_links_parent_id_idx" ON "services_blocks_faq_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_links_link_link_page_idx" ON "services_blocks_faq_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_faq_links_link_link_file_idx" ON "services_blocks_faq_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_faq_links_locales_locale_parent_id_unique" ON "services_blocks_faq_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_links_locales_parent_id_idx" ON "services_blocks_faq_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_faq_locales_locale_parent_id_unique" ON "services_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_faq_locales_parent_id_idx" ON "services_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_order_idx" ON "services_blocks_contact" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_parent_id_idx" ON "services_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_path_idx" ON "services_blocks_contact" USING btree ("_path");
  CREATE INDEX "services_blocks_contact_form_idx" ON "services_blocks_contact" USING btree ("form_id");
  CREATE UNIQUE INDEX "services_blocks_contact_locales_locale_parent_id_unique" ON "services_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_contact_locales_parent_id_idx" ON "services_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_items_order_idx" ON "services_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_items_parent_id_idx" ON "services_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_items_media_idx" ON "services_blocks_gallery_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "services_blocks_gallery_items_locales_locale_parent_id_uniqu" ON "services_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_gallery_items_locales_parent_id_idx" ON "services_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_links_order_idx" ON "services_blocks_gallery_links" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_links_parent_id_idx" ON "services_blocks_gallery_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_links_link_link_page_idx" ON "services_blocks_gallery_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_gallery_links_link_link_file_idx" ON "services_blocks_gallery_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_gallery_links_locales_locale_parent_id_uniqu" ON "services_blocks_gallery_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_gallery_links_locales_parent_id_idx" ON "services_blocks_gallery_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_order_idx" ON "services_blocks_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_parent_id_idx" ON "services_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_path_idx" ON "services_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_gallery_locales_locale_parent_id_unique" ON "services_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_gallery_locales_parent_id_idx" ON "services_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_blocks_stats_items_locales_locale_parent_id_unique" ON "services_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_items_locales_parent_id_idx" ON "services_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_stats_locales_locale_parent_id_unique" ON "services_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_stats_locales_parent_id_idx" ON "services_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_items_order_idx" ON "services_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "services_blocks_steps_items_parent_id_idx" ON "services_blocks_steps_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_items_media_idx" ON "services_blocks_steps_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "services_blocks_steps_items_locales_locale_parent_id_unique" ON "services_blocks_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_steps_items_locales_parent_id_idx" ON "services_blocks_steps_items_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_links_order_idx" ON "services_blocks_steps_links" USING btree ("_order");
  CREATE INDEX "services_blocks_steps_links_parent_id_idx" ON "services_blocks_steps_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_links_link_link_page_idx" ON "services_blocks_steps_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_steps_links_link_link_file_idx" ON "services_blocks_steps_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_steps_links_locales_locale_parent_id_unique" ON "services_blocks_steps_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_steps_links_locales_parent_id_idx" ON "services_blocks_steps_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_order_idx" ON "services_blocks_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_steps_parent_id_idx" ON "services_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_path_idx" ON "services_blocks_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_steps_locales_locale_parent_id_unique" ON "services_blocks_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_steps_locales_parent_id_idx" ON "services_blocks_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_entry_list_links_order_idx" ON "services_blocks_entry_list_links" USING btree ("_order");
  CREATE INDEX "services_blocks_entry_list_links_parent_id_idx" ON "services_blocks_entry_list_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_entry_list_links_link_link_page_idx" ON "services_blocks_entry_list_links" USING btree ("link_page_id");
  CREATE INDEX "services_blocks_entry_list_links_link_link_file_idx" ON "services_blocks_entry_list_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "services_blocks_entry_list_links_locales_locale_parent_id_un" ON "services_blocks_entry_list_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_entry_list_links_locales_parent_id_idx" ON "services_blocks_entry_list_links_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_entry_list_order_idx" ON "services_blocks_entry_list" USING btree ("_order");
  CREATE INDEX "services_blocks_entry_list_parent_id_idx" ON "services_blocks_entry_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_entry_list_path_idx" ON "services_blocks_entry_list" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_entry_list_locales_locale_parent_id_unique" ON "services_blocks_entry_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_entry_list_locales_parent_id_idx" ON "services_blocks_entry_list_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cookie_table_order_idx" ON "services_blocks_cookie_table" USING btree ("_order");
  CREATE INDEX "services_blocks_cookie_table_parent_id_idx" ON "services_blocks_cookie_table" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cookie_table_path_idx" ON "services_blocks_cookie_table" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_cookie_table_locales_locale_parent_id_unique" ON "services_blocks_cookie_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_cookie_table_locales_parent_id_idx" ON "services_blocks_cookie_table_locales" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_consent_map_order_idx" ON "services_blocks_consent_map" USING btree ("_order");
  CREATE INDEX "services_blocks_consent_map_parent_id_idx" ON "services_blocks_consent_map" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_consent_map_path_idx" ON "services_blocks_consent_map" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_consent_map_locales_locale_parent_id_unique" ON "services_blocks_consent_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_consent_map_locales_parent_id_idx" ON "services_blocks_consent_map_locales" USING btree ("_parent_id");
  CREATE INDEX "services_slug_history_order_idx" ON "services_slug_history" USING btree ("_order");
  CREATE INDEX "services_slug_history_parent_id_idx" ON "services_slug_history" USING btree ("_parent_id");
  CREATE INDEX "services_media_idx" ON "services" USING btree ("media_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_meta_meta_image_idx" ON "services_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "services_slug_idx" ON "services_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_projects_id_idx" ON "services_rels" USING btree ("projects_id");
  CREATE INDEX "projects_blocks_hero_links_order_idx" ON "projects_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_links_parent_id_idx" ON "projects_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_links_link_link_page_idx" ON "projects_blocks_hero_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_hero_links_link_link_file_idx" ON "projects_blocks_hero_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_hero_links_locales_locale_parent_id_unique" ON "projects_blocks_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_links_locales_parent_id_idx" ON "projects_blocks_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_order_idx" ON "projects_blocks_hero" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_parent_id_idx" ON "projects_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_path_idx" ON "projects_blocks_hero" USING btree ("_path");
  CREATE INDEX "projects_blocks_hero_media_idx" ON "projects_blocks_hero" USING btree ("media_id");
  CREATE INDEX "projects_blocks_hero_poster_idx" ON "projects_blocks_hero" USING btree ("poster_id");
  CREATE UNIQUE INDEX "projects_blocks_hero_locales_locale_parent_id_unique" ON "projects_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_locales_parent_id_idx" ON "projects_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_media_links_order_idx" ON "projects_blocks_text_media_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_media_links_parent_id_idx" ON "projects_blocks_text_media_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_media_links_link_link_page_idx" ON "projects_blocks_text_media_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_text_media_links_link_link_file_idx" ON "projects_blocks_text_media_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_text_media_links_locales_locale_parent_id_un" ON "projects_blocks_text_media_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_text_media_links_locales_parent_id_idx" ON "projects_blocks_text_media_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_media_order_idx" ON "projects_blocks_text_media" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_media_parent_id_idx" ON "projects_blocks_text_media" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_media_path_idx" ON "projects_blocks_text_media" USING btree ("_path");
  CREATE INDEX "projects_blocks_text_media_media_idx" ON "projects_blocks_text_media" USING btree ("media_id");
  CREATE UNIQUE INDEX "projects_blocks_text_media_locales_locale_parent_id_unique" ON "projects_blocks_text_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_text_media_locales_parent_id_idx" ON "projects_blocks_text_media_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_items_order_idx" ON "projects_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_items_parent_id_idx" ON "projects_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_items_media_idx" ON "projects_blocks_feature_grid_items" USING btree ("media_id");
  CREATE INDEX "projects_blocks_feature_grid_items_link_link_page_idx" ON "projects_blocks_feature_grid_items" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_feature_grid_items_link_link_file_idx" ON "projects_blocks_feature_grid_items" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_feature_grid_items_locales_locale_parent_id_" ON "projects_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_items_locales_parent_id_idx" ON "projects_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_links_order_idx" ON "projects_blocks_feature_grid_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_links_parent_id_idx" ON "projects_blocks_feature_grid_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_links_link_link_page_idx" ON "projects_blocks_feature_grid_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_feature_grid_links_link_link_file_idx" ON "projects_blocks_feature_grid_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_feature_grid_links_locales_locale_parent_id_" ON "projects_blocks_feature_grid_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_links_locales_parent_id_idx" ON "projects_blocks_feature_grid_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_order_idx" ON "projects_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_parent_id_idx" ON "projects_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_path_idx" ON "projects_blocks_feature_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_feature_grid_locales_locale_parent_id_unique" ON "projects_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_locales_parent_id_idx" ON "projects_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_links_order_idx" ON "projects_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_cta_links_parent_id_idx" ON "projects_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_links_link_link_page_idx" ON "projects_blocks_cta_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_cta_links_link_link_file_idx" ON "projects_blocks_cta_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_cta_links_locales_locale_parent_id_unique" ON "projects_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_cta_links_locales_parent_id_idx" ON "projects_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_order_idx" ON "projects_blocks_cta" USING btree ("_order");
  CREATE INDEX "projects_blocks_cta_parent_id_idx" ON "projects_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_path_idx" ON "projects_blocks_cta" USING btree ("_path");
  CREATE INDEX "projects_blocks_cta_media_idx" ON "projects_blocks_cta" USING btree ("media_id");
  CREATE UNIQUE INDEX "projects_blocks_cta_locales_locale_parent_id_unique" ON "projects_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_cta_locales_parent_id_idx" ON "projects_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_rich_text_locales_locale_parent_id_unique" ON "projects_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_rich_text_locales_parent_id_idx" ON "projects_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_items_order_idx" ON "projects_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_items_parent_id_idx" ON "projects_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_faq_items_locales_locale_parent_id_unique" ON "projects_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_items_locales_parent_id_idx" ON "projects_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_links_order_idx" ON "projects_blocks_faq_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_links_parent_id_idx" ON "projects_blocks_faq_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_links_link_link_page_idx" ON "projects_blocks_faq_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_faq_links_link_link_file_idx" ON "projects_blocks_faq_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_faq_links_locales_locale_parent_id_unique" ON "projects_blocks_faq_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_links_locales_parent_id_idx" ON "projects_blocks_faq_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_order_idx" ON "projects_blocks_faq" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_parent_id_idx" ON "projects_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_path_idx" ON "projects_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_faq_locales_locale_parent_id_unique" ON "projects_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_locales_parent_id_idx" ON "projects_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_order_idx" ON "projects_blocks_contact" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_parent_id_idx" ON "projects_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_path_idx" ON "projects_blocks_contact" USING btree ("_path");
  CREATE INDEX "projects_blocks_contact_form_idx" ON "projects_blocks_contact" USING btree ("form_id");
  CREATE UNIQUE INDEX "projects_blocks_contact_locales_locale_parent_id_unique" ON "projects_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_contact_locales_parent_id_idx" ON "projects_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_items_order_idx" ON "projects_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_items_parent_id_idx" ON "projects_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_items_media_idx" ON "projects_blocks_gallery_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "projects_blocks_gallery_items_locales_locale_parent_id_uniqu" ON "projects_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_items_locales_parent_id_idx" ON "projects_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_links_order_idx" ON "projects_blocks_gallery_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_links_parent_id_idx" ON "projects_blocks_gallery_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_links_link_link_page_idx" ON "projects_blocks_gallery_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_gallery_links_link_link_file_idx" ON "projects_blocks_gallery_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_gallery_links_locales_locale_parent_id_uniqu" ON "projects_blocks_gallery_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_links_locales_parent_id_idx" ON "projects_blocks_gallery_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_gallery_locales_locale_parent_id_unique" ON "projects_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_locales_parent_id_idx" ON "projects_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_stats_items_locales_locale_parent_id_unique" ON "projects_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_items_locales_parent_id_idx" ON "projects_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_stats_locales_locale_parent_id_unique" ON "projects_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_locales_parent_id_idx" ON "projects_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_steps_items_order_idx" ON "projects_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_steps_items_parent_id_idx" ON "projects_blocks_steps_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_steps_items_media_idx" ON "projects_blocks_steps_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "projects_blocks_steps_items_locales_locale_parent_id_unique" ON "projects_blocks_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_steps_items_locales_parent_id_idx" ON "projects_blocks_steps_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_steps_links_order_idx" ON "projects_blocks_steps_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_steps_links_parent_id_idx" ON "projects_blocks_steps_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_steps_links_link_link_page_idx" ON "projects_blocks_steps_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_steps_links_link_link_file_idx" ON "projects_blocks_steps_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_steps_links_locales_locale_parent_id_unique" ON "projects_blocks_steps_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_steps_links_locales_parent_id_idx" ON "projects_blocks_steps_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_steps_order_idx" ON "projects_blocks_steps" USING btree ("_order");
  CREATE INDEX "projects_blocks_steps_parent_id_idx" ON "projects_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_steps_path_idx" ON "projects_blocks_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_steps_locales_locale_parent_id_unique" ON "projects_blocks_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_steps_locales_parent_id_idx" ON "projects_blocks_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_entry_list_links_order_idx" ON "projects_blocks_entry_list_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_entry_list_links_parent_id_idx" ON "projects_blocks_entry_list_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_entry_list_links_link_link_page_idx" ON "projects_blocks_entry_list_links" USING btree ("link_page_id");
  CREATE INDEX "projects_blocks_entry_list_links_link_link_file_idx" ON "projects_blocks_entry_list_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "projects_blocks_entry_list_links_locales_locale_parent_id_un" ON "projects_blocks_entry_list_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_entry_list_links_locales_parent_id_idx" ON "projects_blocks_entry_list_links_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_entry_list_order_idx" ON "projects_blocks_entry_list" USING btree ("_order");
  CREATE INDEX "projects_blocks_entry_list_parent_id_idx" ON "projects_blocks_entry_list" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_entry_list_path_idx" ON "projects_blocks_entry_list" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_entry_list_locales_locale_parent_id_unique" ON "projects_blocks_entry_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_entry_list_locales_parent_id_idx" ON "projects_blocks_entry_list_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cookie_table_order_idx" ON "projects_blocks_cookie_table" USING btree ("_order");
  CREATE INDEX "projects_blocks_cookie_table_parent_id_idx" ON "projects_blocks_cookie_table" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cookie_table_path_idx" ON "projects_blocks_cookie_table" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_cookie_table_locales_locale_parent_id_unique" ON "projects_blocks_cookie_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_cookie_table_locales_parent_id_idx" ON "projects_blocks_cookie_table_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_consent_map_order_idx" ON "projects_blocks_consent_map" USING btree ("_order");
  CREATE INDEX "projects_blocks_consent_map_parent_id_idx" ON "projects_blocks_consent_map" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_consent_map_path_idx" ON "projects_blocks_consent_map" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_consent_map_locales_locale_parent_id_unique" ON "projects_blocks_consent_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_consent_map_locales_parent_id_idx" ON "projects_blocks_consent_map_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_slug_history_order_idx" ON "projects_slug_history" USING btree ("_order");
  CREATE INDEX "projects_slug_history_parent_id_idx" ON "projects_slug_history" USING btree ("_parent_id");
  CREATE INDEX "projects_media_idx" ON "projects" USING btree ("media_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "projects_slug_idx" ON "projects_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE UNIQUE INDEX "media_legacy_path_idx" ON "media" USING btree ("legacy_path");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_checkbox_locales_parent_id_idx" ON "forms_blocks_checkbox_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_country_locales_parent_id_idx" ON "forms_blocks_country_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_locales_parent_id_idx" ON "forms_blocks_email_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_locales_parent_id_idx" ON "forms_blocks_message_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_locales_parent_id_idx" ON "forms_blocks_number_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_locales_parent_id_idx" ON "forms_blocks_select_options_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_locales_parent_id_idx" ON "forms_blocks_select_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_state_locales_parent_id_idx" ON "forms_blocks_state_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_locales_parent_id_idx" ON "forms_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_locales_parent_id_idx" ON "forms_blocks_textarea_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_group_options_order_idx" ON "forms_blocks_checkbox_group_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_group_options_parent_id_idx" ON "forms_blocks_checkbox_group_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_group_options_locales_locale_parent_id" ON "forms_blocks_checkbox_group_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_checkbox_group_options_locales_parent_id_idx" ON "forms_blocks_checkbox_group_options_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_group_order_idx" ON "forms_blocks_checkbox_group" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_group_parent_id_idx" ON "forms_blocks_checkbox_group" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_group_path_idx" ON "forms_blocks_checkbox_group" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_group_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_group_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_checkbox_group_locales_parent_id_idx" ON "forms_blocks_checkbox_group_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_date_order_idx" ON "forms_blocks_date" USING btree ("_order");
  CREATE INDEX "forms_blocks_date_parent_id_idx" ON "forms_blocks_date" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_date_path_idx" ON "forms_blocks_date" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_date_locales_locale_parent_id_unique" ON "forms_blocks_date_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_date_locales_parent_id_idx" ON "forms_blocks_date_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_options_order_idx" ON "forms_blocks_radio_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_options_parent_id_idx" ON "forms_blocks_radio_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_radio_options_locales_locale_parent_id_unique" ON "forms_blocks_radio_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_radio_options_locales_parent_id_idx" ON "forms_blocks_radio_options_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_order_idx" ON "forms_blocks_radio" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_parent_id_idx" ON "forms_blocks_radio" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_path_idx" ON "forms_blocks_radio" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_radio_locales_locale_parent_id_unique" ON "forms_blocks_radio_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_radio_locales_parent_id_idx" ON "forms_blocks_radio_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_step_order_idx" ON "forms_blocks_step" USING btree ("_order");
  CREATE INDEX "forms_blocks_step_parent_id_idx" ON "forms_blocks_step" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_step_path_idx" ON "forms_blocks_step" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_step_locales_locale_parent_id_unique" ON "forms_blocks_step_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_step_locales_parent_id_idx" ON "forms_blocks_step_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_time_order_idx" ON "forms_blocks_time" USING btree ("_order");
  CREATE INDEX "forms_blocks_time_parent_id_idx" ON "forms_blocks_time" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_time_path_idx" ON "forms_blocks_time" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_time_locales_locale_parent_id_unique" ON "forms_blocks_time_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_time_locales_parent_id_idx" ON "forms_blocks_time_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_emails_locales_parent_id_idx" ON "forms_emails_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_locales_parent_id_idx" ON "forms_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "consent_records_consent_id_idx" ON "consent_records" USING btree ("consent_id");
  CREATE INDEX "consent_records_updated_at_idx" ON "consent_records" USING btree ("updated_at");
  CREATE INDEX "consent_records_created_at_idx" ON "consent_records" USING btree ("created_at");
  CREATE INDEX "cookie_review_status_idx" ON "cookie_review" USING btree ("status");
  CREATE INDEX "cookie_review_change_idx" ON "cookie_review" USING btree ("change");
  CREATE UNIQUE INDEX "cookie_review_key_idx" ON "cookie_review" USING btree ("key");
  CREATE INDEX "cookie_review_updated_at_idx" ON "cookie_review" USING btree ("updated_at");
  CREATE INDEX "cookie_review_created_at_idx" ON "cookie_review" USING btree ("created_at");
  CREATE UNIQUE INDEX "cookie_review_locales_locale_parent_id_unique" ON "cookie_review_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cookie_review_locales_parent_id_idx" ON "cookie_review_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_consent_records_id_idx" ON "payload_locked_documents_rels" USING btree ("consent_records_id");
  CREATE INDEX "payload_locked_documents_rels_cookie_review_id_idx" ON "payload_locked_documents_rels" USING btree ("cookie_review_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_sub_items_order_idx" ON "header_nav_items_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_items_parent_id_idx" ON "header_nav_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_sub_items_link_link_page_idx" ON "header_nav_items_sub_items" USING btree ("link_page_id");
  CREATE INDEX "header_nav_items_sub_items_link_link_file_idx" ON "header_nav_items_sub_items" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "header_nav_items_sub_items_locales_locale_parent_id_unique" ON "header_nav_items_sub_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_sub_items_locales_parent_id_idx" ON "header_nav_items_sub_items_locales" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_link_page_idx" ON "header_nav_items" USING btree ("link_page_id");
  CREATE INDEX "header_nav_items_link_link_file_idx" ON "header_nav_items" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_locales_parent_id_idx" ON "header_nav_items_locales" USING btree ("_parent_id");
  CREATE INDEX "header_links_order_idx" ON "header_links" USING btree ("_order");
  CREATE INDEX "header_links_parent_id_idx" ON "header_links" USING btree ("_parent_id");
  CREATE INDEX "header_links_link_link_page_idx" ON "header_links" USING btree ("link_page_id");
  CREATE INDEX "header_links_link_link_file_idx" ON "header_links" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "header_links_locales_locale_parent_id_unique" ON "header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_links_locales_parent_id_idx" ON "header_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_locales_parent_id_idx" ON "header_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_items_order_idx" ON "footer_columns_items" USING btree ("_order");
  CREATE INDEX "footer_columns_items_parent_id_idx" ON "footer_columns_items" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_items_link_link_page_idx" ON "footer_columns_items" USING btree ("link_page_id");
  CREATE INDEX "footer_columns_items_link_link_file_idx" ON "footer_columns_items" USING btree ("link_file_id");
  CREATE UNIQUE INDEX "footer_columns_items_locales_locale_parent_id_unique" ON "footer_columns_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_items_locales_parent_id_idx" ON "footer_columns_items_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_locales_parent_id_idx" ON "footer_columns_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_locales_parent_id_idx" ON "footer_locales" USING btree ("_parent_id");
  CREATE INDEX "company_socials_order_idx" ON "company_socials" USING btree ("_order");
  CREATE INDEX "company_socials_parent_id_idx" ON "company_socials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "company_locales_locale_parent_id_unique" ON "company_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "company_locales_parent_id_idx" ON "company_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_same_as_order_idx" ON "site_settings_same_as" USING btree ("_order");
  CREATE INDEX "site_settings_same_as_parent_id_idx" ON "site_settings_same_as" USING btree ("_parent_id");
  CREATE INDEX "site_settings_ai_crawlers_rules_order_idx" ON "site_settings_ai_crawlers_rules" USING btree ("_order");
  CREATE INDEX "site_settings_ai_crawlers_rules_parent_id_idx" ON "site_settings_ai_crawlers_rules" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_share_image_idx" ON "site_settings" USING btree ("default_share_image_id");
  CREATE INDEX "site_settings_homepage_idx" ON "site_settings" USING btree ("homepage_id");
  CREATE INDEX "site_settings_not_found_idx" ON "site_settings" USING btree ("not_found_id");
  CREATE INDEX "site_settings_privacy_policy_idx" ON "site_settings" USING btree ("privacy_policy_id");
  CREATE INDEX "site_settings_cookie_policy_idx" ON "site_settings" USING btree ("cookie_policy_id");
  CREATE INDEX "site_settings_terms_of_service_idx" ON "site_settings" USING btree ("terms_of_service_id");
  CREATE INDEX "site_settings_services_archive_idx" ON "site_settings" USING btree ("services_archive_id");
  CREATE INDEX "site_settings_projects_archive_idx" ON "site_settings" USING btree ("projects_archive_id");
  CREATE INDEX "site_settings_email_email_logo_idx" ON "site_settings" USING btree ("email_logo_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
  CREATE INDEX "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
  CREATE INDEX "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
  CREATE INDEX "site_settings_rels_pages_id_idx" ON "site_settings_rels" USING btree ("pages_id");
  CREATE INDEX "cookie_settings_categories_order_idx" ON "cookie_settings_categories" USING btree ("_order");
  CREATE INDEX "cookie_settings_categories_parent_id_idx" ON "cookie_settings_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cookie_settings_categories_locales_locale_parent_id_unique" ON "cookie_settings_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cookie_settings_categories_locales_parent_id_idx" ON "cookie_settings_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "cookie_settings_cookies_order_idx" ON "cookie_settings_cookies" USING btree ("_order");
  CREATE INDEX "cookie_settings_cookies_parent_id_idx" ON "cookie_settings_cookies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cookie_settings_cookies_locales_locale_parent_id_unique" ON "cookie_settings_cookies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cookie_settings_cookies_locales_parent_id_idx" ON "cookie_settings_cookies_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cookie_settings_locales_locale_parent_id_unique" ON "cookie_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cookie_settings_locales_parent_id_idx" ON "cookie_settings_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "notifications_locales_locale_parent_id_unique" ON "notifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notifications_locales_parent_id_idx" ON "notifications_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_text_media_links" CASCADE;
  DROP TABLE "pages_blocks_text_media_links_locales" CASCADE;
  DROP TABLE "pages_blocks_text_media" CASCADE;
  DROP TABLE "pages_blocks_text_media_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_links" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_links_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_links" CASCADE;
  DROP TABLE "pages_blocks_faq_links_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_items" CASCADE;
  DROP TABLE "pages_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_links" CASCADE;
  DROP TABLE "pages_blocks_gallery_links_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_steps_items" CASCADE;
  DROP TABLE "pages_blocks_steps_items_locales" CASCADE;
  DROP TABLE "pages_blocks_steps_links" CASCADE;
  DROP TABLE "pages_blocks_steps_links_locales" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages_blocks_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_entry_list_links" CASCADE;
  DROP TABLE "pages_blocks_entry_list_links_locales" CASCADE;
  DROP TABLE "pages_blocks_entry_list" CASCADE;
  DROP TABLE "pages_blocks_entry_list_locales" CASCADE;
  DROP TABLE "pages_blocks_cookie_table" CASCADE;
  DROP TABLE "pages_blocks_cookie_table_locales" CASCADE;
  DROP TABLE "pages_blocks_consent_map" CASCADE;
  DROP TABLE "pages_blocks_consent_map_locales" CASCADE;
  DROP TABLE "pages_slug_history" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "services_blocks_hero_links" CASCADE;
  DROP TABLE "services_blocks_hero_links_locales" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_hero_locales" CASCADE;
  DROP TABLE "services_blocks_text_media_links" CASCADE;
  DROP TABLE "services_blocks_text_media_links_locales" CASCADE;
  DROP TABLE "services_blocks_text_media" CASCADE;
  DROP TABLE "services_blocks_text_media_locales" CASCADE;
  DROP TABLE "services_blocks_feature_grid_items" CASCADE;
  DROP TABLE "services_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "services_blocks_feature_grid_links" CASCADE;
  DROP TABLE "services_blocks_feature_grid_links_locales" CASCADE;
  DROP TABLE "services_blocks_feature_grid" CASCADE;
  DROP TABLE "services_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "services_blocks_cta_links" CASCADE;
  DROP TABLE "services_blocks_cta_links_locales" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_cta_locales" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_rich_text_locales" CASCADE;
  DROP TABLE "services_blocks_faq_items" CASCADE;
  DROP TABLE "services_blocks_faq_items_locales" CASCADE;
  DROP TABLE "services_blocks_faq_links" CASCADE;
  DROP TABLE "services_blocks_faq_links_locales" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_faq_locales" CASCADE;
  DROP TABLE "services_blocks_contact" CASCADE;
  DROP TABLE "services_blocks_contact_locales" CASCADE;
  DROP TABLE "services_blocks_gallery_items" CASCADE;
  DROP TABLE "services_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "services_blocks_gallery_links" CASCADE;
  DROP TABLE "services_blocks_gallery_links_locales" CASCADE;
  DROP TABLE "services_blocks_gallery" CASCADE;
  DROP TABLE "services_blocks_gallery_locales" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats_items_locales" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_stats_locales" CASCADE;
  DROP TABLE "services_blocks_steps_items" CASCADE;
  DROP TABLE "services_blocks_steps_items_locales" CASCADE;
  DROP TABLE "services_blocks_steps_links" CASCADE;
  DROP TABLE "services_blocks_steps_links_locales" CASCADE;
  DROP TABLE "services_blocks_steps" CASCADE;
  DROP TABLE "services_blocks_steps_locales" CASCADE;
  DROP TABLE "services_blocks_entry_list_links" CASCADE;
  DROP TABLE "services_blocks_entry_list_links_locales" CASCADE;
  DROP TABLE "services_blocks_entry_list" CASCADE;
  DROP TABLE "services_blocks_entry_list_locales" CASCADE;
  DROP TABLE "services_blocks_cookie_table" CASCADE;
  DROP TABLE "services_blocks_cookie_table_locales" CASCADE;
  DROP TABLE "services_blocks_consent_map" CASCADE;
  DROP TABLE "services_blocks_consent_map_locales" CASCADE;
  DROP TABLE "services_slug_history" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "projects_blocks_hero_links" CASCADE;
  DROP TABLE "projects_blocks_hero_links_locales" CASCADE;
  DROP TABLE "projects_blocks_hero" CASCADE;
  DROP TABLE "projects_blocks_hero_locales" CASCADE;
  DROP TABLE "projects_blocks_text_media_links" CASCADE;
  DROP TABLE "projects_blocks_text_media_links_locales" CASCADE;
  DROP TABLE "projects_blocks_text_media" CASCADE;
  DROP TABLE "projects_blocks_text_media_locales" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_items" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_links" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_links_locales" CASCADE;
  DROP TABLE "projects_blocks_feature_grid" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "projects_blocks_cta_links" CASCADE;
  DROP TABLE "projects_blocks_cta_links_locales" CASCADE;
  DROP TABLE "projects_blocks_cta" CASCADE;
  DROP TABLE "projects_blocks_cta_locales" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects_blocks_rich_text_locales" CASCADE;
  DROP TABLE "projects_blocks_faq_items" CASCADE;
  DROP TABLE "projects_blocks_faq_items_locales" CASCADE;
  DROP TABLE "projects_blocks_faq_links" CASCADE;
  DROP TABLE "projects_blocks_faq_links_locales" CASCADE;
  DROP TABLE "projects_blocks_faq" CASCADE;
  DROP TABLE "projects_blocks_faq_locales" CASCADE;
  DROP TABLE "projects_blocks_contact" CASCADE;
  DROP TABLE "projects_blocks_contact_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_items" CASCADE;
  DROP TABLE "projects_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_links" CASCADE;
  DROP TABLE "projects_blocks_gallery_links_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats_items_locales" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_stats_locales" CASCADE;
  DROP TABLE "projects_blocks_steps_items" CASCADE;
  DROP TABLE "projects_blocks_steps_items_locales" CASCADE;
  DROP TABLE "projects_blocks_steps_links" CASCADE;
  DROP TABLE "projects_blocks_steps_links_locales" CASCADE;
  DROP TABLE "projects_blocks_steps" CASCADE;
  DROP TABLE "projects_blocks_steps_locales" CASCADE;
  DROP TABLE "projects_blocks_entry_list_links" CASCADE;
  DROP TABLE "projects_blocks_entry_list_links_locales" CASCADE;
  DROP TABLE "projects_blocks_entry_list" CASCADE;
  DROP TABLE "projects_blocks_entry_list_locales" CASCADE;
  DROP TABLE "projects_blocks_cookie_table" CASCADE;
  DROP TABLE "projects_blocks_cookie_table_locales" CASCADE;
  DROP TABLE "projects_blocks_consent_map" CASCADE;
  DROP TABLE "projects_blocks_consent_map_locales" CASCADE;
  DROP TABLE "projects_slug_history" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_blocks_checkbox_group_options" CASCADE;
  DROP TABLE "forms_blocks_checkbox_group_options_locales" CASCADE;
  DROP TABLE "forms_blocks_checkbox_group" CASCADE;
  DROP TABLE "forms_blocks_checkbox_group_locales" CASCADE;
  DROP TABLE "forms_blocks_date" CASCADE;
  DROP TABLE "forms_blocks_date_locales" CASCADE;
  DROP TABLE "forms_blocks_radio_options" CASCADE;
  DROP TABLE "forms_blocks_radio_options_locales" CASCADE;
  DROP TABLE "forms_blocks_radio" CASCADE;
  DROP TABLE "forms_blocks_radio_locales" CASCADE;
  DROP TABLE "forms_blocks_step" CASCADE;
  DROP TABLE "forms_blocks_step_locales" CASCADE;
  DROP TABLE "forms_blocks_time" CASCADE;
  DROP TABLE "forms_blocks_time_locales" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "consent_records" CASCADE;
  DROP TABLE "cookie_review" CASCADE;
  DROP TABLE "cookie_review_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_sub_items" CASCADE;
  DROP TABLE "header_nav_items_sub_items_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header_links" CASCADE;
  DROP TABLE "header_links_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_items" CASCADE;
  DROP TABLE "footer_columns_items_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "company_socials" CASCADE;
  DROP TABLE "company" CASCADE;
  DROP TABLE "company_locales" CASCADE;
  DROP TABLE "site_settings_same_as" CASCADE;
  DROP TABLE "site_settings_ai_crawlers_rules" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "site_settings_rels" CASCADE;
  DROP TABLE "site_integrations" CASCADE;
  DROP TABLE "cookie_settings_categories" CASCADE;
  DROP TABLE "cookie_settings_categories_locales" CASCADE;
  DROP TABLE "cookie_settings_cookies" CASCADE;
  DROP TABLE "cookie_settings_cookies_locales" CASCADE;
  DROP TABLE "cookie_settings" CASCADE;
  DROP TABLE "cookie_settings_locales" CASCADE;
  DROP TABLE "notifications" CASCADE;
  DROP TABLE "notifications_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_background";
  DROP TYPE "public"."enum_pages_blocks_text_media_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_text_media_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_text_media_variant";
  DROP TYPE "public"."enum_pages_blocks_text_media_settings_background";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_settings_background";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_settings_background";
  DROP TYPE "public"."enum_pages_blocks_rich_text_variant";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_pages_blocks_faq_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_faq_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_faq_variant";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_background";
  DROP TYPE "public"."enum_pages_blocks_contact_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_settings_background";
  DROP TYPE "public"."enum_pages_blocks_gallery_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_gallery_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_variant";
  DROP TYPE "public"."enum_pages_blocks_gallery_settings_background";
  DROP TYPE "public"."enum_pages_blocks_stats_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_background";
  DROP TYPE "public"."enum_pages_blocks_steps_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_steps_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_steps_variant";
  DROP TYPE "public"."enum_pages_blocks_steps_settings_background";
  DROP TYPE "public"."enum_pages_blocks_entry_list_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_entry_list_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_entry_list_entry_collection";
  DROP TYPE "public"."enum_pages_blocks_entry_list_mode";
  DROP TYPE "public"."enum_pages_blocks_entry_list_variant";
  DROP TYPE "public"."enum_pages_blocks_entry_list_settings_background";
  DROP TYPE "public"."enum_pages_blocks_cookie_table_settings_background";
  DROP TYPE "public"."enum_pages_blocks_consent_map_settings_background";
  DROP TYPE "public"."enum_services_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_services_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  DROP TYPE "public"."enum_services_blocks_hero_settings_background";
  DROP TYPE "public"."enum_services_blocks_text_media_links_link_type";
  DROP TYPE "public"."enum_services_blocks_text_media_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_text_media_variant";
  DROP TYPE "public"."enum_services_blocks_text_media_settings_background";
  DROP TYPE "public"."enum_services_blocks_feature_grid_items_link_type";
  DROP TYPE "public"."enum_services_blocks_feature_grid_links_link_type";
  DROP TYPE "public"."enum_services_blocks_feature_grid_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_services_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_services_blocks_feature_grid_settings_background";
  DROP TYPE "public"."enum_services_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_services_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_cta_variant";
  DROP TYPE "public"."enum_services_blocks_cta_settings_background";
  DROP TYPE "public"."enum_services_blocks_rich_text_variant";
  DROP TYPE "public"."enum_services_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_services_blocks_faq_links_link_type";
  DROP TYPE "public"."enum_services_blocks_faq_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_faq_variant";
  DROP TYPE "public"."enum_services_blocks_faq_settings_background";
  DROP TYPE "public"."enum_services_blocks_contact_variant";
  DROP TYPE "public"."enum_services_blocks_contact_settings_background";
  DROP TYPE "public"."enum_services_blocks_gallery_links_link_type";
  DROP TYPE "public"."enum_services_blocks_gallery_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_gallery_columns";
  DROP TYPE "public"."enum_services_blocks_gallery_variant";
  DROP TYPE "public"."enum_services_blocks_gallery_settings_background";
  DROP TYPE "public"."enum_services_blocks_stats_variant";
  DROP TYPE "public"."enum_services_blocks_stats_settings_background";
  DROP TYPE "public"."enum_services_blocks_steps_links_link_type";
  DROP TYPE "public"."enum_services_blocks_steps_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_steps_variant";
  DROP TYPE "public"."enum_services_blocks_steps_settings_background";
  DROP TYPE "public"."enum_services_blocks_entry_list_links_link_type";
  DROP TYPE "public"."enum_services_blocks_entry_list_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_entry_list_entry_collection";
  DROP TYPE "public"."enum_services_blocks_entry_list_mode";
  DROP TYPE "public"."enum_services_blocks_entry_list_variant";
  DROP TYPE "public"."enum_services_blocks_entry_list_settings_background";
  DROP TYPE "public"."enum_services_blocks_cookie_table_settings_background";
  DROP TYPE "public"."enum_services_blocks_consent_map_settings_background";
  DROP TYPE "public"."enum_projects_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_hero_variant";
  DROP TYPE "public"."enum_projects_blocks_hero_settings_background";
  DROP TYPE "public"."enum_projects_blocks_text_media_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_text_media_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_text_media_variant";
  DROP TYPE "public"."enum_projects_blocks_text_media_settings_background";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_items_link_type";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_settings_background";
  DROP TYPE "public"."enum_projects_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_cta_variant";
  DROP TYPE "public"."enum_projects_blocks_cta_settings_background";
  DROP TYPE "public"."enum_projects_blocks_rich_text_variant";
  DROP TYPE "public"."enum_projects_blocks_rich_text_settings_background";
  DROP TYPE "public"."enum_projects_blocks_faq_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_faq_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_faq_variant";
  DROP TYPE "public"."enum_projects_blocks_faq_settings_background";
  DROP TYPE "public"."enum_projects_blocks_contact_variant";
  DROP TYPE "public"."enum_projects_blocks_contact_settings_background";
  DROP TYPE "public"."enum_projects_blocks_gallery_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_gallery_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_gallery_columns";
  DROP TYPE "public"."enum_projects_blocks_gallery_variant";
  DROP TYPE "public"."enum_projects_blocks_gallery_settings_background";
  DROP TYPE "public"."enum_projects_blocks_stats_variant";
  DROP TYPE "public"."enum_projects_blocks_stats_settings_background";
  DROP TYPE "public"."enum_projects_blocks_steps_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_steps_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_steps_variant";
  DROP TYPE "public"."enum_projects_blocks_steps_settings_background";
  DROP TYPE "public"."enum_projects_blocks_entry_list_links_link_type";
  DROP TYPE "public"."enum_projects_blocks_entry_list_links_link_appearance";
  DROP TYPE "public"."enum_projects_blocks_entry_list_entry_collection";
  DROP TYPE "public"."enum_projects_blocks_entry_list_mode";
  DROP TYPE "public"."enum_projects_blocks_entry_list_variant";
  DROP TYPE "public"."enum_projects_blocks_entry_list_settings_background";
  DROP TYPE "public"."enum_projects_blocks_cookie_table_settings_background";
  DROP TYPE "public"."enum_projects_blocks_consent_map_settings_background";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_redirect_type";
  DROP TYPE "public"."enum_cookie_review_storage";
  DROP TYPE "public"."enum_cookie_review_category";
  DROP TYPE "public"."enum_cookie_review_status";
  DROP TYPE "public"."enum_cookie_review_source";
  DROP TYPE "public"."enum_cookie_review_change";
  DROP TYPE "public"."enum_header_nav_items_sub_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_links_link_type";
  DROP TYPE "public"."enum_header_links_link_appearance";
  DROP TYPE "public"."enum_footer_columns_items_link_type";
  DROP TYPE "public"."enum_site_settings_ai_crawlers_rules_access";
  DROP TYPE "public"."enum_site_settings_title_order";
  DROP TYPE "public"."enum_site_settings_title_separator";
  DROP TYPE "public"."enum_site_settings_default_theme";
  DROP TYPE "public"."enum_site_settings_ai_crawlers_policy";
  DROP TYPE "public"."enum_site_integrations_turnstile_status_state";
  DROP TYPE "public"."enum_site_integrations_email_transport";
  DROP TYPE "public"."enum_site_integrations_email_status_state";
  DROP TYPE "public"."enum_cookie_settings_categories_key";
  DROP TYPE "public"."enum_cookie_settings_cookies_storage";
  DROP TYPE "public"."enum_cookie_settings_cookies_category";`)
}
