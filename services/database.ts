import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('pennywise.db')

export const TABLE_TRANSACTIONS = 'transactions'

export const initDatabase = () => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS ${TABLE_TRANSACTIONS} (
            id TEXT PRIMARY KEY NOT NULL,
            amount REAL NOT NULL,
            category_index INTEGER NOT NULL,
            type TEXT NOT NULL,
            note TEXT,
            created_at TEXT NOT NULL
        );
        `)
}

export const dropDatabase = () => {
    db.execSync(`DROP TABLE IF EXISTS ${TABLE_TRANSACTIONS}`)
    initDatabase()
}

export default db
