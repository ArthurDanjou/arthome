ALTER TABLE "users" RENAME COLUMN "timezone" TO "language";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "language" SET DEFAULT 'english';