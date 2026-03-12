import { useEffect, useCallback } from 'react'

// models
import { NewTransaction, Transaction } from '@models/Transaction'

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
import { buildWeekGroups } from '@utils/transactionUtils'

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
    }, [selectedMonth, setSummary, setTransactions, setWeekGroups])

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
