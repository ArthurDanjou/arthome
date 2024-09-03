CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT '',
	`name_visible` integer DEFAULT true,
	`icon` text DEFAULT 'i-ph:circle-wavy-question-duotone',
	`color` text DEFAULT 'gray',
	`user_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tabs` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT '',
	`primary` integer DEFAULT false,
	`icon` text DEFAULT 'i-ph:circle-wavy-question-duotone',
	`color` text DEFAULT 'gray',
	`link` text DEFAULT '',
	`category_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`github_id` text,
	`github_token` text,
	`google_id` text,
	`google_token` text,
	`description` text DEFAULT '',
	`avatar` text DEFAULT '',
	`private` integer DEFAULT false,
	`language` text DEFAULT 'en-EN',
	`location` text DEFAULT 'unknown',
	`subscription` text DEFAULT 'free',
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_google_id_unique` ON `users` (`google_id`);