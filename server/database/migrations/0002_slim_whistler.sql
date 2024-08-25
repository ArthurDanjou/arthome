ALTER TABLE "categories" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name_visible" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "icon" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "color" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tabs" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tabs" ALTER COLUMN "name_visible" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tabs" ALTER COLUMN "icon" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tabs" ALTER COLUMN "color" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "private" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "timezone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "location" SET DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "location" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "subscription" DROP NOT NULL;