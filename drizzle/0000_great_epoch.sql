CREATE TABLE `appointment_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`branch_id` text NOT NULL,
	`service_id` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`preferred_date` text NOT NULL,
	`preferred_window` text NOT NULL,
	`customer_name` text NOT NULL,
	`customer_phone_e164` text NOT NULL,
	`notes` text,
	`quoted_price_cents` integer NOT NULL,
	`consented_at` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`bancary_external_id` text,
	`purge_after` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`branch_id`,`service_id`) REFERENCES `branch_services`(`branch_id`,`service_id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "ck_appointment_requests_price" CHECK("appointment_requests"."quoted_price_cents" >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_appointment_requests_idempotency` ON `appointment_requests` (`branch_id`,`idempotency_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `ux_appointment_requests_bancary_id` ON `appointment_requests` (`bancary_external_id`);--> statement-breakpoint
CREATE INDEX `ix_appointment_requests_status_created` ON `appointment_requests` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `ix_appointment_requests_purge` ON `appointment_requests` (`purge_after`);--> statement-breakpoint
CREATE TABLE `branch_services` (
	`branch_id` text NOT NULL,
	`service_id` text NOT NULL,
	`price_from_cents` integer NOT NULL,
	`available` integer DEFAULT true NOT NULL,
	`booking_mode` text DEFAULT 'request' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`branch_id`, `service_id`),
	FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "ck_branch_services_price" CHECK("branch_services"."price_from_cents" >= 0)
);
--> statement-breakpoint
CREATE INDEX `ix_branch_services_public` ON `branch_services` (`branch_id`,`available`,`sort_order`);--> statement-breakpoint
CREATE TABLE `branch_team_members` (
	`branch_id` text NOT NULL,
	`team_member_id` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`branch_id`, `team_member_id`),
	FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`team_member_id`) REFERENCES `team_members`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ix_branch_team_members_display` ON `branch_team_members` (`branch_id`,`featured`,`sort_order`);--> statement-breakpoint
CREATE TABLE `branches` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`timezone` text DEFAULT 'America/Lima' NOT NULL,
	`address_line_1` text NOT NULL,
	`address_line_2` text,
	`district` text NOT NULL,
	`city` text DEFAULT 'Lima' NOT NULL,
	`country_code` text DEFAULT 'PE' NOT NULL,
	`latitude_e6` integer,
	`longitude_e6` integer,
	`phone_e164` text NOT NULL,
	`whatsapp_e164` text NOT NULL,
	`email` text NOT NULL,
	`opening_hours_json` text DEFAULT '{}' NOT NULL,
	`bancary_external_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ck_branches_country_code" CHECK(length("branches"."country_code") = 2)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_branches_slug` ON `branches` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `ux_branches_bancary_external_id` ON `branches` (`bancary_external_id`);--> statement-breakpoint
CREATE INDEX `ix_branches_status` ON `branches` (`status`);--> statement-breakpoint
CREATE TABLE `integration_outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`appointment_request_id` text NOT NULL,
	`event_type` text NOT NULL,
	`payload_json` text NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`available_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`processed_at` text,
	`last_error_code` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`appointment_request_id`) REFERENCES `appointment_requests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ix_integration_outbox_pending` ON `integration_outbox` (`processed_at`,`available_at`,`id`);--> statement-breakpoint
CREATE TABLE `media_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`branch_id` text,
	`r2_key` text NOT NULL,
	`mime_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`width` integer,
	`height` integer,
	`alt_text` text NOT NULL,
	`focal_point_x` integer DEFAULT 50 NOT NULL,
	`focal_point_y` integer DEFAULT 50 NOT NULL,
	`status` text DEFAULT 'processing' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "ck_media_assets_byte_size" CHECK("media_assets"."byte_size" > 0),
	CONSTRAINT "ck_media_assets_focal_x" CHECK("media_assets"."focal_point_x" BETWEEN 0 AND 100),
	CONSTRAINT "ck_media_assets_focal_y" CHECK("media_assets"."focal_point_y" BETWEEN 0 AND 100)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_media_assets_r2_key` ON `media_assets` (`r2_key`);--> statement-breakpoint
CREATE INDEX `ix_media_assets_branch_status` ON `media_assets` (`branch_id`,`status`);--> statement-breakpoint
CREATE TABLE `portfolio_items` (
	`id` text PRIMARY KEY NOT NULL,
	`branch_id` text NOT NULL,
	`service_id` text,
	`media_id` text NOT NULL,
	`title` text NOT NULL,
	`caption` text,
	`published` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`published_at` text,
	FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`media_id`) REFERENCES `media_assets`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `ix_portfolio_branch_public` ON `portfolio_items` (`branch_id`,`published`,`sort_order`,`id`);--> statement-breakpoint
CREATE TABLE `promotions` (
	`id` text PRIMARY KEY NOT NULL,
	`branch_id` text,
	`service_id` text,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`discount_percent` integer,
	`starts_at` text NOT NULL,
	`ends_at` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "ck_promotions_discount" CHECK("promotions"."discount_percent" IS NULL OR "promotions"."discount_percent" BETWEEN 1 AND 100),
	CONSTRAINT "ck_promotions_window" CHECK("promotions"."ends_at" > "promotions"."starts_at")
);
--> statement-breakpoint
CREATE INDEX `ix_promotions_public_window` ON `promotions` (`published`,`starts_at`,`ends_at`);--> statement-breakpoint
CREATE TABLE `service_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_service_categories_slug` ON `service_categories` (`slug`);--> statement-breakpoint
CREATE INDEX `ix_service_categories_public` ON `service_categories` (`published`,`sort_order`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`short_description` text NOT NULL,
	`description` text,
	`duration_minutes` integer NOT NULL,
	`deposit_cents` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`bancary_external_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "ck_services_duration" CHECK("services"."duration_minutes" > 0),
	CONSTRAINT "ck_services_deposit" CHECK("services"."deposit_cents" >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_services_slug` ON `services` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `ux_services_bancary_external_id` ON `services` (`bancary_external_id`);--> statement-breakpoint
CREATE INDEX `ix_services_category_public` ON `services` (`category_id`,`published`);--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`display_name` text NOT NULL,
	`role` text NOT NULL,
	`bio` text,
	`portrait_media_id` text,
	`published` integer DEFAULT false NOT NULL,
	`bancary_external_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_team_members_slug` ON `team_members` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `ux_team_members_bancary_external_id` ON `team_members` (`bancary_external_id`);