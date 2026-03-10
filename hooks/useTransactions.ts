import { useEffect, useCallback } from 'react'
import { endOfWeek, format, isSameWeek, startOfWeek } from 'date-fns'

// models
import { NewTransaction, Transaction, WeekGroup } from '@models/Transaction'

// services
import {
    getSummary,
    getTransactionsByMonth,
    insertTransaction,
    removeTransaction,
    updateTransaction,
    getAllTransactions,
    deleteAll,
} from '@services/transactionService'

// state
import useTransactionsStore from '@stores/transactionStore'

// constants
import { DateFormat } from '@constants/DateFormat'

const useTransactions = () => {
    const {
        transactions,
        weekGroups,
        summary,
        selectedMonth,
        setSelectedMonth,
        setTransactions,
        setWeekGroups,
        setSummary,
        clear,
    } = useTransactionsStore()

    const buildWeekGroups = useCallback((rows: Transaction[]): WeekGroup[] => {
        if (rows.length === 0) return []

        const groups: WeekGroup[] = []

        for (const transaction of rows) {
            const lastGroup = groups[groups.length - 1]

            // rows are sorted DESC, so consecutive same-week transactions are adjacent
            // compare against first transaction in last group to determine week bounday
            if (
                lastGroup &&
                isSameWeek(transaction.createdAt, lastGroup.transactions[0].createdAt)
            ) {
                lastGroup.transactions.push(transaction)
            } else {
                const date = transaction.createdAt
                const label = `${format(startOfWeek(date), DateFormat.monthDay)} - ${format(endOfWeek(date), DateFormat.monthDay)}`

                groups.push({
                    label,
                    transactions: [transaction],
                })
            }
        }

        return groups
    }, [])

    const loadData = useCallback(async () => {
        const year = selectedMonth.getFullYear()
        const month = selectedMonth.getMonth() + 1

        const [rows, monthSummary] = await Promise.all([
            getTransactionsByMonth(year, month),
            getSummary(year, month),
        ])

        setTransactions(rows)
        setSummary(monthSummary)
        setWeekGroups(buildWeekGroups(rows))
    }, [selectedMonth, setSummary, setTransactions, setWeekGroups, buildWeekGroups])

    useEffect(() => {
        loadData()
    }, [loadData])

    const addTransaction = async (transaction: NewTransaction) => {
        await insertTransaction(transaction)
        setSelectedMonth(transaction.createdAt) // triggers useEffect that triggers loadData
    }

    const deleteTransaction = async (id: string) => {
        await removeTransaction(id)
        await loadData()
    }

    const editTransaction = async (transaction: Transaction) => {
        await updateTransaction(transaction)
        await loadData()
    }

    const resetAll = async () => {
        await deleteAll()
        clear()
        await loadData()
    }

    return {
        transactions,
        weekGroups,
        summary,
        selectedMonth,
        setSelectedMonth,
        addTransaction,
        deleteTransaction,
        editTransaction,
        getAllTransactions,
        resetAll,
    }
}

export default useTransactions
