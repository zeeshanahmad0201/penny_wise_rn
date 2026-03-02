import { create } from 'zustand'

// models
import { Transaction } from '@models/Transaction'
import { Summary } from '@models/Summary'

type TransactionStore = {
    transactions: Transaction[]
    summary: Summary
    selectedMonth: Date

    setTransactions: (transactions: Transaction[]) => void
    setSummary: (summary: Summary) => void
    setSelectedMonth: (month: Date) => void
}

const useTransactionsStore = create<TransactionStore>((set) => ({
    transactions: [],
    summary: { income: 0, expense: 0 },
    selectedMonth: new Date(),

    setTransactions: (transactions) => set({ transactions }),
    setSummary: (summary) => set({ summary }),
    setSelectedMonth: (month) => set({ selectedMonth: month }),
}))

export default useTransactionsStore
