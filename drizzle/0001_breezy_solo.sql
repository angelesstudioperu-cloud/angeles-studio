CREATE TABLE `portfolio_item_tags` (
	`portfolio_item_id` text NOT NULL,
	`tag_id` text NOT NULL,
	PRIMARY KEY(`portfolio_item_id`, `tag_id`),
	FOREIGN KEY (`portfolio_item_id`) REFERENCES `portfolio_items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `portfolio_tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ix_portfolio_item_tags_tag` ON `portfolio_item_tags` (`tag_id`,`portfolio_item_id`);--> statement-breakpoint
CREATE TABLE `portfolio_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`slug` text NOT NULL,
	`label` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_portfolio_tags_kind_slug` ON `portfolio_tags` (`kind`,`slug`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_appointment_requests` (
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
	`quoted_price_max_cents` integer,
	`is_first_visit` integer DEFAULT false NOT NULL,
	`removal_needed` integer DEFAULT false NOT NULL,
	`patch_test_acknowledged_at` text,
	`inspiration_item_ids_json` text DEFAULT '[]' NOT NULL,
	`consented_at` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`bancary_external_id` text,
	`purge_after` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`branch_id`,`service_id`) REFERENCES `branch_services`(`branch_id`,`service_id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "ck_appointment_requests_price" CHECK("__new_appointment_requests"."quoted_price_cents" >= 0),
	CONSTRAINT "ck_appointment_requests_price_range" CHECK("__new_appointment_requests"."quoted_price_max_cents" IS NULL OR "__new_appointment_requests"."quoted_price_max_cents" >= "__new_appointment_requests"."quoted_price_cents")
);
--> statement-breakpoint
INSERT INTO `__new_appointment_requests`("id", "branch_id", "service_id", "status", "preferred_date", "preferred_window", "customer_name", "customer_phone_e164", "notes", "quoted_price_cents", "quoted_price_max_cents", "is_first_visit", "removal_needed", "patch_test_acknowledged_at", "inspiration_item_ids_json", "consented_at", "idempotency_key", "bancary_external_id", "purge_after", "created_at", "updated_at") SELECT "id", "branch_id", "service_id", "status", "preferred_date", "preferred_window", "customer_name", "customer_phone_e164", "notes", "quoted_price_cents", "quoted_price_max_cents", "is_first_visit", "removal_needed", "patch_test_acknowledged_at", "inspiration_item_ids_json", "consented_at", "idempotency_key", "bancary_external_id", "purge_after", "created_at", "updated_at" FROM `appointment_requests`;--> statement-breakpoint
DROP TABLE `appointment_requests`;--> statement-breakpoint
ALTER TABLE `__new_appointment_requests` RENAME TO `appointment_requests`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `ux_appointment_requests_idempotency` ON `appointment_requests` (`branch_id`,`idempotency_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `ux_appointment_requests_bancary_id` ON `appointment_requests` (`bancary_external_id`);--> statement-breakpoint
CREATE INDEX `ix_appointment_requests_status_created` ON `appointment_requests` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `ix_appointment_requests_purge` ON `appointment_requests` (`purge_after`);--> statement-breakpoint
CREATE TABLE `__new_branch_services` (
	`branch_id` text NOT NULL,
	`service_id` text NOT NULL,
	`price_from_cents` integer NOT NULL,
	`price_to_cents` integer,
	`available` integer DEFAULT true NOT NULL,
	`booking_mode` text DEFAULT 'request' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`branch_id`, `service_id`),
	FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "ck_branch_services_price" CHECK("__new_branch_services"."price_from_cents" >= 0),
	CONSTRAINT "ck_branch_services_price_range" CHECK("__new_branch_services"."price_to_cents" IS NULL OR "__new_branch_services"."price_to_cents" >= "__new_branch_services"."price_from_cents")
);
--> statement-breakpoint
INSERT INTO `__new_branch_services`("branch_id", "service_id", "price_from_cents", "price_to_cents", "available", "booking_mode", "sort_order") SELECT "branch_id", "service_id", "price_from_cents", "price_to_cents", "available", "booking_mode", "sort_order" FROM `branch_services`;--> statement-breakpoint
DROP TABLE `branch_services`;--> statement-breakpoint
ALTER TABLE `__new_branch_services` RENAME TO `branch_services`;--> statement-breakpoint
CREATE INDEX `ix_branch_services_public` ON `branch_services` (`branch_id`,`available`,`sort_order`);--> statement-breakpoint
CREATE TABLE `__new_services` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`short_description` text NOT NULL,
	`description` text,
	`finish_options_json` text DEFAULT '[]' NOT NULL,
	`aftercare_summary` text NOT NULL,
	`duration_minutes` integer NOT NULL,
	`recommended_maintenance_days` integer,
	`requires_patch_test` integer DEFAULT false NOT NULL,
	`deposit_cents` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`bancary_external_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "ck_services_duration" CHECK("__new_services"."duration_minutes" > 0),
	CONSTRAINT "ck_services_maintenance" CHECK("__new_services"."recommended_maintenance_days" IS NULL OR "__new_services"."recommended_maintenance_days" > 0),
	CONSTRAINT "ck_services_deposit" CHECK("__new_services"."deposit_cents" >= 0)
);
--> statement-breakpoint
INSERT INTO `__new_services`("id", "category_id", "slug", "name", "kind", "short_description", "description", "finish_options_json", "aftercare_summary", "duration_minutes", "recommended_maintenance_days", "requires_patch_test", "deposit_cents", "published", "bancary_external_id", "created_at", "updated_at") SELECT "id", "category_id", "slug", "name", "kind", "short_description", "description", "finish_options_json", "aftercare_summary", "duration_minutes", "recommended_maintenance_days", "requires_patch_test", "deposit_cents", "published", "bancary_external_id", "created_at", "updated_at" FROM `services`;--> statement-breakpoint
DROP TABLE `services`;--> statement-breakpoint
ALTER TABLE `__new_services` RENAME TO `services`;--> statement-breakpoint
CREATE UNIQUE INDEX `ux_services_slug` ON `services` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `ux_services_bancary_external_id` ON `services` (`bancary_external_id`);--> statement-breakpoint
CREATE INDEX `ix_services_category_public` ON `services` (`category_id`,`published`);