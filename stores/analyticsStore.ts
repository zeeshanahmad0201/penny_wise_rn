import { create } from 'zustand'

import { MonthSummary } from '@models/Summary'
import { Transaction } from '@models/Transaction'

type AnalyticsStore = {
    last6MonthsSummary: MonthSummary[]
    selectedMonth: Date
    transactions: Transaction[]

    setLast6MonthsSummary: (summaries: MonthSummary[]) => void
    setSelectedMonth: (selectedMonth: Date) => void
    setTransactions: (transactions: Transaction[]) => void
}

const useAnalyticsStore = create<AnalyticsStore>((set) => ({
    last6MonthsSummary: [],
    selectedMonth: new Date(),
    transactions: [],

    setLast6MonthsSummary: (summaries: MonthSummary[]) => set({ last6MonthsSummary: summaries }),
    setSelectedMonth: (selectedMonth: Date) => set({ selectedMonth }),
    setTransactions: (transactions: Transaction[]) => set({ transactions }),
}))

export default useAnalyticsStore
