import { create } from 'zustand'

// models
import { Transaction, WeekGroup } from '@models/Transaction'
import { Summary } from '@models/Summary'

type TransactionStore = {
    transactions: Transaction[]
    weekGroups: WeekGroup[]
    summary: Summary
    selectedMonth: Date

    setTransactions: (transactions: Transaction[]) => void
    setWeekGroups: (weekGroups: WeekGroup[]) => void
    setSummary: (summary: Summary) => void
    setSelectedMonth: (month: Date) => void
    clear: () => void
}

const useTransactionsStore = create<TransactionStore>((set) => ({
    transactions: [],
    weekGroups: [],
    summary: { income: 0, expense: 0 },
    selectedMonth: new Date(),

    setTransactions: (transactions) => set({ transactions }),
    setWeekGroups: (weekGroups) => set({ weekGroups }),
    setSummary: (summary) => set({ summary }),
    setSelectedMonth: (month) => set({ selectedMonth: month }),
    clear: () =>
        set({
            transactions: [],
            weekGroups: [],
            summary: { income: 0, expense: 0 },
            selectedMonth: new Date(),
        }),
}))

export default useTransactionsStore
