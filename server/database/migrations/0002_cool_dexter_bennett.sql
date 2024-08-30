ALTER TABLE "tabs" ADD COLUMN "primary" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "tabs" DROP COLUMN IF EXISTS "name_visible";