import Database from 'better-sqlite3';

const db = new Database('database/contact-form.db', { fileMustExist: true });

export function getMessages() {
    return db.prepare("SELECT * FROM messages").all();
}
