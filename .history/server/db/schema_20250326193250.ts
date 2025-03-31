import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Contact form table
export const contactFormSubmissions = sqliteTable("contact_form_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  submitted_at: text("submitted_at").notNull().$default(() => new Date().toISOString()),
});

// Pricing form table
export const pricingSubmissions = sqliteTable("pricing_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  planTitle: text("plan_title").notNull(),
  submitted_at: text("submitted_at").notNull().$default(() => new Date().toISOString()),
});

// Export both in schema
export const schema = {
  contactFormSubmissions,
  pricingSubmissions,
};
