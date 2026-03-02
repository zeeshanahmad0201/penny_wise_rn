import { useEffect, useCallback } from 'react'

// models
import { Transaction } from '@models/Transaction'

// services
import {
    getSummary,
    getTransactionsByMonth,
    insertTransaction,
    removeTransaction,
} from '@services/transactionService'

// state
import useTransactionsStore from '@stores/transactionStore'

const useTransactions = () => {
    const { transactions, summary, selectedMonth, setSelectedMonth, setTransactions, setSummary } =
        useTransactionsStore()

    const loadData = useCallback(async () => {
        const year = selectedMonth.getFullYear()
        const month = selectedMonth.getMonth() + 1

        const [rows, monthSummary] = await Promise.all([
            getTransactionsByMonth(year, month),
            getSummary(year, month),
        ])

        setTransactions(rows)
        setSummary(monthSummary)
    }, [selectedMonth, setSummary, setTransactions])

    useEffect(() => {
        loadData()
    }, [loadData])

    const addTransaction = async (transaction: Transaction) => {
        try {
            await insertTransaction(transaction)
            await loadData()
        } catch (error) {
            throw error
        }
    }

    const deleteTransaction = async (id: string) => {
        try {
            await removeTransaction(id)
            await loadData()
        } catch (error) {
            throw error
        }
    }

    return {
        transactions,
        summary,
        selectedMonth,
        setSelectedMonth,
        addTransaction,
        deleteTransaction,
    }
}

export default useTransactions
