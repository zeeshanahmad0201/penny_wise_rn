import { DateFormat } from '@constants/DateFormat'
import { Transaction, WeekGroup } from '@models/Transaction'
import { endOfWeek, format, isSameWeek, startOfWeek } from 'date-fns'

export const buildWeekGroups = (rows: Transaction[]): WeekGroup[] => {
    if (rows.length === 0) return []

    const groups: WeekGroup[] = []

    for (const transaction of rows) {
        const lastGroup = groups[groups.length - 1]

        // rows are sorted DESC, so consecutive same-week transactions are adjacent
        // compare against first transaction in last group to determine week bounday
        if (lastGroup && isSameWeek(transaction.createdAt, lastGroup.transactions[0].createdAt)) {
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
}
