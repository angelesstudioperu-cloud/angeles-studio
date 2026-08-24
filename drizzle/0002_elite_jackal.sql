PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_services` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`is_add_on` integer DEFAULT false NOT NULL,
	`parent_service_id` text,
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
	FOREIGN KEY (`parent_service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "ck_services_duration" CHECK("__new_services"."duration_minutes" > 0),
	CONSTRAINT "ck_services_maintenance" CHECK("__new_services"."recommended_maintenance_days" IS NULL OR "__new_services"."recommended_maintenance_days" > 0),
	CONSTRAINT "ck_services_deposit" CHECK("__new_services"."deposit_cents" >= 0),
	CONSTRAINT "ck_services_add_on_parent" CHECK("__new_services"."is_add_on" = 0 OR "__new_services"."parent_service_id" IS NOT NULL)
);
--> statement-breakpoint
INSERT INTO `__new_services`("id", "category_id", "slug", "name", "kind", "is_add_on", "parent_service_id", "short_description", "description", "finish_options_json", "aftercare_summary", "duration_minutes", "recommended_maintenance_days", "requires_patch_test", "deposit_cents", "published", "bancary_external_id", "created_at", "updated_at") SELECT "id", "category_id", "slug", "name", "kind", "is_add_on", "parent_service_id", "short_description", "description", "finish_options_json", "aftercare_summary", "duration_minutes", "recommended_maintenance_days", "requires_patch_test", "deposit_cents", "published", "bancary_external_id", "created_at", "updated_at" FROM `services`;--> statement-breakpoint
DROP TABLE `services`;--> statement-breakpoint
ALTER TABLE `__new_services` RENAME TO `services`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `ux_services_slug` ON `services` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `ux_services_bancary_external_id` ON `services` (`bancary_external_id`);--> statement-breakpoint
CREATE INDEX `ix_services_category_public` ON `services` (`category_id`,`published`);