import * as FileSystem from 'expo-file-system/legacy'
import * as Sharing from 'expo-sharing'
import { format } from 'date-fns'

// models
import { Transaction } from '@models/Transaction'

// constants
import { DateFormat } from '@constants/DateFormat'

// utils
import { getCategory } from '@utils/categoryUtils'

const CSV_HEADERS = 'Date,Type,Category,Amount,Notes'

const transactionsToCSV = (transactions: Transaction[]): string => {
    const rows = transactions.map((t) => {
        const date = format(t.createdAt, DateFormat.storage)
        const category = getCategory(t.type, t.categoryIndex).label
        const notes = t.notes ? `"${t.notes.replace(/"/g, '""')}"` : ''
        return `${date},${t.type},${category},${t.amount},${notes}`
    })

    return [CSV_HEADERS, ...rows].join('\n')
}

export const exportToCSV = async (transactions: Transaction[]): Promise<void> => {
    const csv = transactionsToCSV(transactions)
    const fileName = `pennywise_${format(new Date(), 'yyyy-MM-dd')}.csv`
    const fileUri = FileSystem.documentDirectory + fileName

    await FileSystem.writeAsStringAsync(fileUri, csv, {
        encoding: FileSystem.EncodingType.UTF8,
    })

    await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Transactions',
    })
}
