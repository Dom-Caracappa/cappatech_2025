import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Open encrypted database with SQLCipher key
const sqlite = new Database("contact-form.db", {
    verbose: console.log, // Optional: Helps debug queries
});

sqlite.pragma(`key = '${process.env.DATABASE_SECRET_KEY}';`); // Set encryption key

// Initialize Drizzle ORM
export const db = drizzle(sqlite, { schema });

export default db;
