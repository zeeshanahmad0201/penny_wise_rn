import useAnalyticsStore from '@stores/analyticsStore'
import { useCallback, useEffect } from 'react'
import { getLast6Months, getTransactionsByMonth } from '@services/transactionService'

const useAnalytics = () => {
    const {
        last6MonthsSummary,
        selectedMonth,
        transactions,
        setLast6MonthsSummary,
        setSelectedMonth,
        setTransactions,
    } = useAnalyticsStore()

    const loadTransactions = useCallback(
        async (date: Date) => {
            const transactions = await getTransactionsByMonth(
                date.getFullYear(),
                date.getMonth() + 1
            )
            setTransactions(transactions)
        },
        [setTransactions]
    )

    const loadSummaries = useCallback(async () => {
        const summaries = await getLast6Months()
        setLast6MonthsSummary(summaries)
    }, [setLast6MonthsSummary])

    const loadData = useCallback(async () => {
        const now = new Date()
        setSelectedMonth(now)

        await loadTransactions(now)
        await loadSummaries()
    }, [loadTransactions, setSelectedMonth, loadSummaries])

    useEffect(() => {
        loadData()
    }, [loadData])

    const updateSelectedMonth = async (date: Date) => {
        setSelectedMonth(date)
        await loadTransactions(date)
    }

    return {
        last6MonthsSummary,
        selectedMonth,
        transactions,
        updateSelectedMonth,
    }
}

export default useAnalytics
