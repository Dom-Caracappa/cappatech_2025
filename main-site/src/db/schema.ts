import { sqliteTable, text, integer } from "drizzle-orm/sqlite";

// Define the contact form table
export const contactForm = sqliteTable("contact_form", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  submittedAt: text("submitted_at").default("CURRENT_TIMESTAMP"),
});