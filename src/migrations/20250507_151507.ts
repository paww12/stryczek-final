import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_product_category" AS ENUM('Desery', 'Wypieki', 'Ciasta');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
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
  
  CREATE TABLE IF NOT EXISTS "logo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "navbar_image" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "navbar_text" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "hero_description" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"subcontent" jsonb,
  	"image_id" integer,
  	"image2_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_photo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "opinion" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"opinion" varchar NOT NULL,
  	"stars" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "product_allergens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"allergen" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "product" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"alt" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" "enum_product_category" NOT NULL,
  	"prices_full" numeric,
  	"prices_half" numeric,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "gallery_top" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "gallery_main" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"logo_id" integer,
  	"navbar_image_id" integer,
  	"navbar_text_id" integer,
  	"hero_description_id" integer,
  	"news_id" integer,
  	"about_me_photo_id" integer,
  	"opinion_id" integer,
  	"product_id" integer,
  	"gallery_top_id" integer,
  	"gallery_main_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "logo" ADD CONSTRAINT "logo_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navbar_image" ADD CONSTRAINT "navbar_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news" ADD CONSTRAINT "news_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_photo" ADD CONSTRAINT "about_me_photo_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product_allergens" ADD CONSTRAINT "product_allergens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product" ADD CONSTRAINT "product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "gallery_top" ADD CONSTRAINT "gallery_top_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "gallery_main" ADD CONSTRAINT "gallery_main_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "gallery_main" ADD CONSTRAINT "gallery_main_link_id_product_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."product"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logo_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."logo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navbar_image_fk" FOREIGN KEY ("navbar_image_id") REFERENCES "public"."navbar_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navbar_text_fk" FOREIGN KEY ("navbar_text_id") REFERENCES "public"."navbar_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_description_fk" FOREIGN KEY ("hero_description_id") REFERENCES "public"."hero_description"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_me_photo_fk" FOREIGN KEY ("about_me_photo_id") REFERENCES "public"."about_me_photo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_opinion_fk" FOREIGN KEY ("opinion_id") REFERENCES "public"."opinion"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_top_fk" FOREIGN KEY ("gallery_top_id") REFERENCES "public"."gallery_top"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_main_fk" FOREIGN KEY ("gallery_main_id") REFERENCES "public"."gallery_main"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "logo_image_idx" ON "logo" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "logo_updated_at_idx" ON "logo" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "logo_created_at_idx" ON "logo" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "navbar_image_image_idx" ON "navbar_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "navbar_image_updated_at_idx" ON "navbar_image" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "navbar_image_created_at_idx" ON "navbar_image" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "navbar_text_updated_at_idx" ON "navbar_text" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "navbar_text_created_at_idx" ON "navbar_text" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "hero_description_updated_at_idx" ON "hero_description" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "hero_description_created_at_idx" ON "hero_description" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "news_image_idx" ON "news" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "news_image2_idx" ON "news" USING btree ("image2_id");
  CREATE INDEX IF NOT EXISTS "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "about_me_photo_photo_idx" ON "about_me_photo" USING btree ("photo_id");
  CREATE INDEX IF NOT EXISTS "about_me_photo_updated_at_idx" ON "about_me_photo" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "about_me_photo_created_at_idx" ON "about_me_photo" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "opinion_updated_at_idx" ON "opinion" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "opinion_created_at_idx" ON "opinion" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "product_allergens_order_idx" ON "product_allergens" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "product_allergens_parent_id_idx" ON "product_allergens" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "product_image_idx" ON "product" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "product_slug_idx" ON "product" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "product_updated_at_idx" ON "product" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "product_created_at_idx" ON "product" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "gallery_top_image_idx" ON "gallery_top" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "gallery_top_updated_at_idx" ON "gallery_top" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "gallery_top_created_at_idx" ON "gallery_top" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "gallery_main_image_idx" ON "gallery_main" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "gallery_main_link_idx" ON "gallery_main" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "gallery_main_updated_at_idx" ON "gallery_main" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "gallery_main_created_at_idx" ON "gallery_main" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_logo_id_idx" ON "payload_locked_documents_rels" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_navbar_image_id_idx" ON "payload_locked_documents_rels" USING btree ("navbar_image_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_navbar_text_id_idx" ON "payload_locked_documents_rels" USING btree ("navbar_text_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hero_description_id_idx" ON "payload_locked_documents_rels" USING btree ("hero_description_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_about_me_photo_id_idx" ON "payload_locked_documents_rels" USING btree ("about_me_photo_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_opinion_id_idx" ON "payload_locked_documents_rels" USING btree ("opinion_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_product_id_idx" ON "payload_locked_documents_rels" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_top_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_top_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_main_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_main_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "logo" CASCADE;
  DROP TABLE "navbar_image" CASCADE;
  DROP TABLE "navbar_text" CASCADE;
  DROP TABLE "hero_description" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "about_me_photo" CASCADE;
  DROP TABLE "opinion" CASCADE;
  DROP TABLE "product_allergens" CASCADE;
  DROP TABLE "product" CASCADE;
  DROP TABLE "gallery_top" CASCADE;
  DROP TABLE "gallery_main" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_product_category";`)
}
