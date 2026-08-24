import { sql } from 'drizzle-orm';
import {
  check,
  foreignKey,
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

// Public website data only. Bancary remains the source of truth for clients,
// confirmed appointments, payments, inventory, payroll and staff scheduling.

export const branches = sqliteTable('branches', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  status: text('status', { enum: ['draft', 'active', 'temporarily_closed', 'closed'] }).notNull().default('draft'),
  timezone: text('timezone').notNull().default('America/Lima'),
  addressLine1: text('address_line_1').notNull(),
  addressLine2: text('address_line_2'),
  district: text('district').notNull(),
  city: text('city').notNull().default('Lima'),
  countryCode: text('country_code').notNull().default('PE'),
  latitudeE6: integer('latitude_e6'),
  longitudeE6: integer('longitude_e6'),
  phoneE164: text('phone_e164').notNull(),
  whatsappE164: text('whatsapp_e164').notNull(),
  email: text('email').notNull(),
  openingHoursJson: text('opening_hours_json').notNull().default('{}'),
  bancaryExternalId: text('bancary_external_id'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex('ux_branches_slug').on(table.slug),
  uniqueIndex('ux_branches_bancary_external_id').on(table.bancaryExternalId),
  index('ix_branches_status').on(table.status),
  check('ck_branches_country_code', sql`length(${table.countryCode}) = 2`),
]);

export const serviceCategories = sqliteTable('service_categories', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
}, (table) => [
  uniqueIndex('ux_service_categories_slug').on(table.slug),
  index('ix_service_categories_public').on(table.published, table.sortOrder),
]);

export const services = sqliteTable('services', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').notNull().references(() => serviceCategories.id, { onDelete: 'restrict' }),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  kind: text('kind', { enum: ['nails', 'lash_lift', 'lash_extensions'] }).notNull(),
  isAddOn: integer('is_add_on', { mode: 'boolean' }).notNull().default(false),
  parentServiceId: text('parent_service_id'),
  shortDescription: text('short_description').notNull(),
  description: text('description'),
  finishOptionsJson: text('finish_options_json').notNull().default('[]'),
  aftercareSummary: text('aftercare_summary').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  recommendedMaintenanceDays: integer('recommended_maintenance_days'),
  requiresPatchTest: integer('requires_patch_test', { mode: 'boolean' }).notNull().default(false),
  depositCents: integer('deposit_cents').notNull().default(0),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  bancaryExternalId: text('bancary_external_id'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  foreignKey({
    columns: [table.parentServiceId],
    foreignColumns: [table.id],
    name: 'fk_services_parent_service',
  }).onDelete('set null'),
  uniqueIndex('ux_services_slug').on(table.slug),
  uniqueIndex('ux_services_bancary_external_id').on(table.bancaryExternalId),
  index('ix_services_category_public').on(table.categoryId, table.published),
  check('ck_services_duration', sql`${table.durationMinutes} > 0`),
  check('ck_services_maintenance', sql`${table.recommendedMaintenanceDays} IS NULL OR ${table.recommendedMaintenanceDays} > 0`),
  check('ck_services_deposit', sql`${table.depositCents} >= 0`),
  check('ck_services_add_on_parent', sql`${table.isAddOn} = 0 OR ${table.parentServiceId} IS NOT NULL`),
]);

export const branchServices = sqliteTable('branch_services', {
  branchId: text('branch_id').notNull().references(() => branches.id, { onDelete: 'cascade' }),
  serviceId: text('service_id').notNull().references(() => services.id, { onDelete: 'cascade' }),
  priceFromCents: integer('price_from_cents').notNull(),
  priceToCents: integer('price_to_cents'),
  available: integer('available', { mode: 'boolean' }).notNull().default(true),
  bookingMode: text('booking_mode', { enum: ['request', 'whatsapp', 'bancary'] }).notNull().default('request'),
  sortOrder: integer('sort_order').notNull().default(0),
}, (table) => [
  primaryKey({ columns: [table.branchId, table.serviceId], name: 'pk_branch_services' }),
  index('ix_branch_services_public').on(table.branchId, table.available, table.sortOrder),
  check('ck_branch_services_price', sql`${table.priceFromCents} >= 0`),
  check('ck_branch_services_price_range', sql`${table.priceToCents} IS NULL OR ${table.priceToCents} >= ${table.priceFromCents}`),
]);

export const teamMembers = sqliteTable('team_members', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(),
  displayName: text('display_name').notNull(),
  role: text('role').notNull(),
  bio: text('bio'),
  portraitMediaId: text('portrait_media_id'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  bancaryExternalId: text('bancary_external_id'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex('ux_team_members_slug').on(table.slug),
  uniqueIndex('ux_team_members_bancary_external_id').on(table.bancaryExternalId),
]);

export const branchTeamMembers = sqliteTable('branch_team_members', {
  branchId: text('branch_id').notNull().references(() => branches.id, { onDelete: 'cascade' }),
  teamMemberId: text('team_member_id').notNull().references(() => teamMembers.id, { onDelete: 'cascade' }),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
}, (table) => [
  primaryKey({ columns: [table.branchId, table.teamMemberId], name: 'pk_branch_team_members' }),
  index('ix_branch_team_members_display').on(table.branchId, table.featured, table.sortOrder),
]);

export const mediaAssets = sqliteTable('media_assets', {
  id: text('id').primaryKey(),
  branchId: text('branch_id').references(() => branches.id, { onDelete: 'set null' }),
  r2Key: text('r2_key').notNull(),
  mimeType: text('mime_type').notNull(),
  byteSize: integer('byte_size').notNull(),
  width: integer('width'),
  height: integer('height'),
  altText: text('alt_text').notNull(),
  focalPointX: integer('focal_point_x').notNull().default(50),
  focalPointY: integer('focal_point_y').notNull().default(50),
  status: text('status', { enum: ['processing', 'ready', 'archived'] }).notNull().default('processing'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex('ux_media_assets_r2_key').on(table.r2Key),
  index('ix_media_assets_branch_status').on(table.branchId, table.status),
  check('ck_media_assets_byte_size', sql`${table.byteSize} > 0`),
  check('ck_media_assets_focal_x', sql`${table.focalPointX} BETWEEN 0 AND 100`),
  check('ck_media_assets_focal_y', sql`${table.focalPointY} BETWEEN 0 AND 100`),
]);

export const portfolioItems = sqliteTable('portfolio_items', {
  id: text('id').primaryKey(),
  branchId: text('branch_id').notNull().references(() => branches.id, { onDelete: 'cascade' }),
  serviceId: text('service_id').references(() => services.id, { onDelete: 'set null' }),
  mediaId: text('media_id').notNull().references(() => mediaAssets.id, { onDelete: 'restrict' }),
  title: text('title').notNull(),
  caption: text('caption'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  publishedAt: text('published_at'),
}, (table) => [
  index('ix_portfolio_branch_public').on(table.branchId, table.published, table.sortOrder, table.id),
]);

export const portfolioTags = sqliteTable('portfolio_tags', {
  id: text('id').primaryKey(),
  kind: text('kind', { enum: ['technique', 'shape', 'length', 'finish', 'occasion'] }).notNull(),
  slug: text('slug').notNull(),
  label: text('label').notNull(),
}, (table) => [
  uniqueIndex('ux_portfolio_tags_kind_slug').on(table.kind, table.slug),
]);

export const portfolioItemTags = sqliteTable('portfolio_item_tags', {
  portfolioItemId: text('portfolio_item_id').notNull().references(() => portfolioItems.id, { onDelete: 'cascade' }),
  tagId: text('tag_id').notNull().references(() => portfolioTags.id, { onDelete: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.portfolioItemId, table.tagId], name: 'pk_portfolio_item_tags' }),
  index('ix_portfolio_item_tags_tag').on(table.tagId, table.portfolioItemId),
]);

export const promotions = sqliteTable('promotions', {
  id: text('id').primaryKey(),
  branchId: text('branch_id').references(() => branches.id, { onDelete: 'cascade' }),
  serviceId: text('service_id').references(() => services.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  discountPercent: integer('discount_percent'),
  startsAt: text('starts_at').notNull(),
  endsAt: text('ends_at').notNull(),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
}, (table) => [
  index('ix_promotions_public_window').on(table.published, table.startsAt, table.endsAt),
  check('ck_promotions_discount', sql`${table.discountPercent} IS NULL OR ${table.discountPercent} BETWEEN 1 AND 100`),
  check('ck_promotions_window', sql`${table.endsAt} > ${table.startsAt}`),
]);

export const appointmentRequests = sqliteTable('appointment_requests', {
  id: text('id').primaryKey(),
  branchId: text('branch_id').notNull(),
  serviceId: text('service_id').notNull(),
  status: text('status', { enum: ['received', 'sent_to_bancary', 'confirmed', 'rejected', 'cancelled', 'expired'] }).notNull().default('received'),
  preferredDate: text('preferred_date').notNull(),
  preferredWindow: text('preferred_window', { enum: ['morning', 'afternoon', 'evening'] }).notNull(),
  customerName: text('customer_name').notNull(),
  customerPhoneE164: text('customer_phone_e164').notNull(),
  notes: text('notes'),
  quotedPriceCents: integer('quoted_price_cents').notNull(),
  quotedPriceMaxCents: integer('quoted_price_max_cents'),
  isFirstVisit: integer('is_first_visit', { mode: 'boolean' }).notNull().default(false),
  removalNeeded: integer('removal_needed', { mode: 'boolean' }).notNull().default(false),
  patchTestAcknowledgedAt: text('patch_test_acknowledged_at'),
  inspirationItemIdsJson: text('inspiration_item_ids_json').notNull().default('[]'),
  consentedAt: text('consented_at').notNull(),
  idempotencyKey: text('idempotency_key').notNull(),
  bancaryExternalId: text('bancary_external_id'),
  purgeAfter: text('purge_after').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  foreignKey({
    columns: [table.branchId, table.serviceId],
    foreignColumns: [branchServices.branchId, branchServices.serviceId],
    name: 'fk_appointment_requests_branch_service',
  }).onDelete('restrict'),
  uniqueIndex('ux_appointment_requests_idempotency').on(table.branchId, table.idempotencyKey),
  uniqueIndex('ux_appointment_requests_bancary_id').on(table.bancaryExternalId),
  index('ix_appointment_requests_status_created').on(table.status, table.createdAt),
  index('ix_appointment_requests_purge').on(table.purgeAfter),
  check('ck_appointment_requests_price', sql`${table.quotedPriceCents} >= 0`),
  check('ck_appointment_requests_price_range', sql`${table.quotedPriceMaxCents} IS NULL OR ${table.quotedPriceMaxCents} >= ${table.quotedPriceCents}`),
]);

export const integrationOutbox = sqliteTable('integration_outbox', {
  id: text('id').primaryKey(),
  appointmentRequestId: text('appointment_request_id').notNull().references(() => appointmentRequests.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(),
  payloadJson: text('payload_json').notNull(),
  attempts: integer('attempts').notNull().default(0),
  availableAt: text('available_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  processedAt: text('processed_at'),
  lastErrorCode: text('last_error_code'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index('ix_integration_outbox_pending').on(table.processedAt, table.availableAt, table.id),
]);
