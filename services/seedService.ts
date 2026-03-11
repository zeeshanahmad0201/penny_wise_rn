import * as Crypto from 'expo-crypto'
import { format, subMonths, setDate } from 'date-fns'
import db, { TABLE_TRANSACTIONS } from '@services/database'
import { TransactionType } from '@models/Transaction'
import { DateFormat } from '@constants/DateFormat'

type SeedTransaction = {
    amount: number
    type: TransactionType
    categoryIndex: number
    note?: string
    dayOfMonth: number
    monthsAgo: number
}

const seedData: SeedTransaction[] = [
    // 5 months ago
    { amount: 85000, type: TransactionType.income, categoryIndex: 0, note: 'Monthly salary', dayOfMonth: 1, monthsAgo: 5 },
    { amount: 1200, type: TransactionType.expense, categoryIndex: 0, note: 'Dinner with family', dayOfMonth: 3, monthsAgo: 5 },
    { amount: 3500, type: TransactionType.expense, categoryIndex: 4, note: 'Electricity bill', dayOfMonth: 5, monthsAgo: 5 },
    { amount: 800, type: TransactionType.expense, categoryIndex: 1, note: 'Uber rides', dayOfMonth: 8, monthsAgo: 5 },
    { amount: 5000, type: TransactionType.expense, categoryIndex: 2, note: 'Clothes shopping', dayOfMonth: 12, monthsAgo: 5 },
    { amount: 15000, type: TransactionType.income, categoryIndex: 1, note: 'Freelance project', dayOfMonth: 15, monthsAgo: 5 },
    { amount: 2500, type: TransactionType.expense, categoryIndex: 6, note: 'Weekly groceries', dayOfMonth: 18, monthsAgo: 5 },
    { amount: 1500, type: TransactionType.expense, categoryIndex: 7, note: 'Netflix & Spotify', dayOfMonth: 20, monthsAgo: 5 },

    // 4 months ago
    { amount: 85000, type: TransactionType.income, categoryIndex: 0, note: 'Monthly salary', dayOfMonth: 1, monthsAgo: 4 },
    { amount: 4200, type: TransactionType.expense, categoryIndex: 5, note: 'Doctor visit', dayOfMonth: 4, monthsAgo: 4 },
    { amount: 950, type: TransactionType.expense, categoryIndex: 0, note: 'Lunch meetings', dayOfMonth: 7, monthsAgo: 4 },
    { amount: 3000, type: TransactionType.expense, categoryIndex: 4, note: 'Internet bill', dayOfMonth: 10, monthsAgo: 4 },
    { amount: 8000, type: TransactionType.expense, categoryIndex: 3, note: 'Concert tickets', dayOfMonth: 14, monthsAgo: 4 },
    { amount: 2800, type: TransactionType.expense, categoryIndex: 6, note: 'Grocery run', dayOfMonth: 17, monthsAgo: 4 },
    { amount: 5000, type: TransactionType.income, categoryIndex: 4, note: 'Tax refund', dayOfMonth: 22, monthsAgo: 4 },
    { amount: 1800, type: TransactionType.expense, categoryIndex: 1, note: 'Fuel', dayOfMonth: 25, monthsAgo: 4 },

    // 3 months ago
    { amount: 85000, type: TransactionType.income, categoryIndex: 0, note: 'Monthly salary', dayOfMonth: 1, monthsAgo: 3 },
    { amount: 20000, type: TransactionType.income, categoryIndex: 1, note: 'Freelance website', dayOfMonth: 5, monthsAgo: 3 },
    { amount: 1100, type: TransactionType.expense, categoryIndex: 0, note: 'Coffee & snacks', dayOfMonth: 6, monthsAgo: 3 },
    { amount: 6500, type: TransactionType.expense, categoryIndex: 2, note: 'New shoes', dayOfMonth: 9, monthsAgo: 3 },
    { amount: 3500, type: TransactionType.expense, categoryIndex: 4, note: 'Phone bill', dayOfMonth: 12, monthsAgo: 3 },
    { amount: 2200, type: TransactionType.expense, categoryIndex: 6, note: 'Supermarket', dayOfMonth: 16, monthsAgo: 3 },
    { amount: 4500, type: TransactionType.expense, categoryIndex: 8, note: 'Online course', dayOfMonth: 20, monthsAgo: 3 },
    { amount: 1500, type: TransactionType.expense, categoryIndex: 7, note: 'Subscriptions', dayOfMonth: 23, monthsAgo: 3 },

    // 2 months ago
    { amount: 85000, type: TransactionType.income, categoryIndex: 0, note: 'Monthly salary', dayOfMonth: 1, monthsAgo: 2 },
    { amount: 3200, type: TransactionType.expense, categoryIndex: 5, note: 'Gym membership', dayOfMonth: 3, monthsAgo: 2 },
    { amount: 1400, type: TransactionType.expense, categoryIndex: 0, note: 'Restaurant', dayOfMonth: 7, monthsAgo: 2 },
    { amount: 9500, type: TransactionType.expense, categoryIndex: 3, note: 'Weekend trip', dayOfMonth: 11, monthsAgo: 2 },
    { amount: 10000, type: TransactionType.income, categoryIndex: 3, note: 'Birthday gift', dayOfMonth: 14, monthsAgo: 2 },
    { amount: 3000, type: TransactionType.expense, categoryIndex: 6, note: 'Groceries', dayOfMonth: 18, monthsAgo: 2 },
    { amount: 4200, type: TransactionType.expense, categoryIndex: 4, note: 'Utility bills', dayOfMonth: 22, monthsAgo: 2 },
    { amount: 2000, type: TransactionType.expense, categoryIndex: 1, note: 'Car service', dayOfMonth: 26, monthsAgo: 2 },

    // 1 month ago
    { amount: 85000, type: TransactionType.income, categoryIndex: 0, note: 'Monthly salary', dayOfMonth: 1, monthsAgo: 1 },
    { amount: 25000, type: TransactionType.income, categoryIndex: 1, note: 'Freelance app', dayOfMonth: 8, monthsAgo: 1 },
    { amount: 1600, type: TransactionType.expense, categoryIndex: 0, note: 'Team lunch', dayOfMonth: 5, monthsAgo: 1 },
    { amount: 7500, type: TransactionType.expense, categoryIndex: 2, note: 'Gadget purchase', dayOfMonth: 10, monthsAgo: 1 },
    { amount: 3500, type: TransactionType.expense, categoryIndex: 4, note: 'Bills', dayOfMonth: 13, monthsAgo: 1 },
    { amount: 2600, type: TransactionType.expense, categoryIndex: 6, note: 'Weekly groceries', dayOfMonth: 17, monthsAgo: 1 },
    { amount: 5000, type: TransactionType.expense, categoryIndex: 3, note: 'Movie & dinner', dayOfMonth: 21, monthsAgo: 1 },
    { amount: 1500, type: TransactionType.expense, categoryIndex: 7, note: 'Subscriptions', dayOfMonth: 25, monthsAgo: 1 },

    // current month
    { amount: 85000, type: TransactionType.income, categoryIndex: 0, note: 'Monthly salary', dayOfMonth: 1, monthsAgo: 0 },
    { amount: 1200, type: TransactionType.expense, categoryIndex: 0, note: 'Groceries', dayOfMonth: 2, monthsAgo: 0 },
    { amount: 3500, type: TransactionType.expense, categoryIndex: 4, note: 'Electricity bill', dayOfMonth: 4, monthsAgo: 0 },
    { amount: 2000, type: TransactionType.expense, categoryIndex: 1, note: 'Transport', dayOfMonth: 6, monthsAgo: 0 },
]

export const seedDummyData = async (): Promise<void> => {
    const now = new Date()

    for (const item of seedData) {
        const date = setDate(subMonths(now, item.monthsAgo), item.dayOfMonth)
        const id = Crypto.randomUUID()

        await db.runAsync(
            `INSERT INTO ${TABLE_TRANSACTIONS} (id, amount, type, category_index, note, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id,
                item.amount,
                item.type,
                item.categoryIndex,
                item.note ?? null,
                format(date, DateFormat.storage),
            ]
        )
    }
}
