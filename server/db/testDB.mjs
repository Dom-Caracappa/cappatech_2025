import { db } from "./drizzle.mjs";
import { contactFormSubmissions } from "./schema.mjs";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testDb() {
    try {
        // Check if the database directory exists
        const dbDir = path.resolve(__dirname, "../../db");
        if (!fs.existsSync(dbDir)) {
            console.log(`Creating database directory: ${dbDir}`);
            fs.mkdirSync(dbDir, { recursive: true });
        }

        // Check if the database file exists
        const dbPath = path.resolve(dbDir, "contact-form.db");
        if (!fs.existsSync(dbPath)) {
            console.log(`Database file does not exist: ${dbPath}`);
            console.log("You may need to run migrations first");
        } else {
            console.log(`Database file exists: ${dbPath}`);
        }

        // Test database connection and query
        console.log("Attempting to query database...");
        const result = await db.select().from(contactFormSubmissions);
        console.log("Database connection successful");
        console.log("Query results:", result);
    } catch (error) {
        console.error("Database connection or query failed:", error);

        // More detailed error logging for debugging
        if (error.code === "URL_INVALID") {
            console.error("Invalid URL format. Check your database path configuration.");
        } else if (error.code === "FILE_NOT_FOUND") {
            console.error("Database file not found. Make sure the path is correct and the file exists.");
        } else if (error.message?.includes("no such table")) {
            console.error("Table not found. You may need to run migrations to create the schema.");
        }
    }
}

// Run the test
testDb();
