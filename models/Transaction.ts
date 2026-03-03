export enum TransactionType {
    income = 'Income',
    expense = 'Expense',
}

export type Transaction = {
    id: string
    amount: number
    categoryIndex: number
    type: TransactionType
    notes?: string
    createdAt: Date
}

export type NewTransaction = Omit<Transaction, 'id'>

export type WeekGroup = {
    label: string
    transactions: Transaction[]
}
