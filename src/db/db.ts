import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema"; // Import the schema

// Connect to SQLite Database
const sqlite = new Database("contact-form.db");

// Initialize Drizzle ORM with the schema
export const db = drizzle(sqlite, { schema });

export default db;
