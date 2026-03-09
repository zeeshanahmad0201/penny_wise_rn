import { create } from 'zustand'

// models
import { Transaction, WeekGroup } from '@models/Transaction'
import { MonthSummary, Summary } from '@models/Summary'

type TransactionStore = {
    transactions: Transaction[]
    weekGroups: WeekGroup[]
    summary: Summary
    last6MonthsSummary: MonthSummary[]
    selectedMonth: Date

    setTransactions: (transactions: Transaction[]) => void
    setWeekGroups: (weekGroups: WeekGroup[]) => void
    setSummary: (summary: Summary) => void
    setLast6MonthsSummary: (summaries: MonthSummary[]) => void
    setSelectedMonth: (month: Date) => void
}

const useTransactionsStore = create<TransactionStore>((set) => ({
    transactions: [],
    weekGroups: [],
    last6MonthsSummary: [],
    summary: { income: 0, expense: 0 },
    selectedMonth: new Date(),

    setTransactions: (transactions) => set({ transactions }),
    setWeekGroups: (weekGroups) => set({ weekGroups }),
    setSummary: (summary) => set({ summary }),
    setLast6MonthsSummary: (summaries) => set({ last6MonthsSummary: summaries }),
    setSelectedMonth: (month) => set({ selectedMonth: month }),
}))

export default useTransactionsStore
