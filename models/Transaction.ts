export enum TransactionType {
    income = 'income',
    expense = 'expense',
}

export type Transaction = {
    id: string
    amount: number
    categoryIndex: number
    type: TransactionType
    note?: string
    createdAt: Date
}
