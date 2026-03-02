import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('pennywise.db')

export const TRANSACTIONS_TABLE = 'transactions'

export const initDatabase = () => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS ${TRANSACTIONS_TABLE} (
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
    db.execSync(`DROP TABLE IF EXISTS ${TRANSACTIONS_TABLE}`)
    initDatabase()
}

export default db
