export enum TransactionType {
    income = 'Income',
    expense = 'Expense',
}

export type Transaction = {
    id: string
    amount: number
    categoryIndex: number
    type: TransactionType
    note?: string
    createdAt: Date
}
