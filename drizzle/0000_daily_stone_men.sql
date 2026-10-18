CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`company` text NOT NULL,
	`service` text NOT NULL,
	`staff_count` integer,
	`start_date` text,
	`profile` text,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `inquiry_email_created` ON `inquiries` (`email`,`created_at`);