import * as Crypto from 'expo-crypto'
import { format, subMonths } from 'date-fns'

// services
import db, { TABLE_TRANSACTIONS } from '@services/database'

// models
import { Transaction, NewTransaction, TransactionType } from '@models/Transaction'
import { Summary, MonthSummary } from '@models/Summary'

// constants
import { DateFormat } from '@constants/DateFormat'

const buildDatePrefix = (year: number, month: number) =>
    `${year}-${String(month).padStart(2, '0')}%`

type TransactionRow = {
    id: string
    amount: number
    type: TransactionType
    category_index: number
    note: string | null
    created_at: string
}

type MonthSummaryRow = {
    month: string
    income: number
    expense: number
}

export const insertTransaction = async (transaction: NewTransaction) => {
    try {
        const id = Crypto.randomUUID()
        await db.runAsync(
            `INSERT INTO ${TABLE_TRANSACTIONS} (id, amount, type, category_index, note, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id,
                transaction.amount,
                transaction.type,
                transaction.categoryIndex,
                transaction.notes ?? null,
                format(transaction.createdAt, DateFormat.storage), // toISOString() converts to UTC - store in local time instead
            ]
        )
    } catch (error) {
        console.error('Failed to add transaction:', error)
        throw new Error('Failed to save transaction. Please try again')
    }
}

export const removeTransaction = async (id: string) => {
    try {
        await db.runAsync(`DELETE FROM ${TABLE_TRANSACTIONS} WHERE id = ?`, [id])
    } catch (error) {
        console.error('Failed to remove transaction', error)
        throw new Error('Failed to delete transaction. Please try again')
    }
}

// Returns summary of the balance
export const getSummary = async (year: number, month: number) => {
    try {
        return (
            (await db.getFirstAsync<Summary>(
                `SELECT
            SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) as expense
            FROM ${TABLE_TRANSACTIONS} WHERE created_at LIKE ?
        `,
                [buildDatePrefix(year, month)]
            )) ?? { income: 0, expense: 0 }
        )
    } catch (error) {
        console.error('Failed to fetch summary', error)
        throw new Error('Unable to obtain summary. Please try again')
    }
}

// Returns the transactions of specific month and year
export const getTransactionsByMonth = async (
    year: number,
    month: number
): Promise<Transaction[]> => {
    try {
        const rows = await db.getAllAsync<TransactionRow>(
            `SELECT * FROM ${TABLE_TRANSACTIONS} WHERE created_at LIKE ? ORDER BY created_at DESC`,
            [buildDatePrefix(year, month)]
        )

        return rows.map(
            (row): Transaction => ({
                id: row.id,
                amount: row.amount,
                categoryIndex: row.category_index,
                type: row.type,
                notes: row.note ?? undefined,
                createdAt: new Date(row.created_at),
            })
        )
    } catch (error) {
        console.error('Failed to fetch transactions: ', error)
        throw new Error('Unable to fetch transactions. Please try again')
    }
}

// Updates the transaction by id
export const updateTransaction = async (transaction: Transaction) => {
    try {
        await db.runAsync(
            `UPDATE ${TABLE_TRANSACTIONS} SET amount = ?, type = ?, category_index = ?, note = ?, created_at = ? WHERE id = ?`,
            [
                transaction.amount,
                transaction.type,
                transaction.categoryIndex,
                transaction.notes ?? null,
                format(transaction.createdAt, DateFormat.storage),
                transaction.id,
            ]
        )
    } catch (error) {
        console.error('failed to update transaction', error)
        throw new Error('Unable to update transaction. Please try again')
    }
}

// Fetch last 6 months of balance
export const getLast6Months = async (): Promise<MonthSummary[]> => {
    try {
        const now = new Date()
        const sixMonthsAgo = subMonths(now, 5)

        const response = await db.getAllAsync<MonthSummaryRow>(
            `SELECT strftime('%Y-%m', created_at) as month,
                SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) as income,
                SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) as expense
                FROM ${TABLE_TRANSACTIONS}
                WHERE created_at >= ?
                GROUP BY month
                ORDER BY month ASC
            `,
            [format(sixMonthsAgo, DateFormat.storage)]
        )

        return response.map((row) => ({
            month: row.month,
            expense: row.expense,
            income: row.income,
        }))
    } catch (error) {
        console.error('Failed to fetch data for past 6 months', error)
        throw new Error('Unable to fetch the records!')
    }
}

export const getAllTransactions = async (): Promise<Transaction[]> => {
    try {
        const rows = await db.getAllAsync<TransactionRow>(`SELECT * FROM ${TABLE_TRANSACTIONS}`)

        return rows.map((row) => ({
            id: row.id,
            amount: row.amount,
            categoryIndex: row.category_index,
            type: row.type,
            notes: row.note ?? undefined,
            createdAt: new Date(row.created_at),
        }))
    } catch (error: any) {
        console.log('Failed to fetch transactions: ', error)
        throw new Error('Unable to fetch all transactions at this moment! Please try again.')
    }
}
