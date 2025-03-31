import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { schema } from "./schema";

// shared db

const rootDir = process.cwd();
const dbPath = path.resolve(rootDir, "server/db/contact-form.db");

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  console.log(`Creating database directory: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
}

console.log("Using database path:", dbPath);

const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });
