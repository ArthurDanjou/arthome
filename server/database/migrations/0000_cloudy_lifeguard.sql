DO $$ BEGIN
 CREATE TYPE "public"."subscription" AS ENUM('free', 'paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '',
	"name_visible" boolean DEFAULT true,
	"icon" text DEFAULT 'i-ph:circle-wavy-question-duotone',
	"color" text DEFAULT 'gray',
	"user_id" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tabs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '',
	"primary" boolean DEFAULT false,
	"icon" text DEFAULT 'i-ph:circle-wavy-question-duotone',
	"color" text DEFAULT 'gray',
	"link" text DEFAULT '',
	"category_id" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"github_id" text,
	"github_token" text,
	"google_id" text,
	"google_token" text,
	"description" text DEFAULT '',
	"avatar" text DEFAULT '',
	"private" boolean DEFAULT false,
	"language" text DEFAULT 'en-EN',
	"location" text DEFAULT 'unknown',
	"subscription" "subscription" DEFAULT 'free',
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tabs" ADD CONSTRAINT "tabs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
