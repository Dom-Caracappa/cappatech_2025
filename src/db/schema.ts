import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { sql } from 'drizzle-orm';

const sqlite = new Database('contact-form.db'); // SQLite file
export const db = drizzle(sqlite);

export const createTable = () => {
    db.run(sql`
    CREATE TABLE IF NOT EXISTS contact_form (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
