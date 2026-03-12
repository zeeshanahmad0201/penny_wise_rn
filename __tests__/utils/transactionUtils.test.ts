/**
 * @jest-environment node
 */
import { buildWeekGroups } from '@utils/transactionUtils'
import { Transaction, TransactionType } from '@models/Transaction'

// Helper to build a fake transaction with just the fields we care about
const makeTransaction = (id: string, date: Date): Transaction => ({
    id,
    amount: 100,
    categoryIndex: 0,
    type: TransactionType.expense,
    createdAt: date,
})

describe('buildWeekGroups', () => {
    it('should return empty array for no transactions', () => {
        const weekGroups = buildWeekGroups([])

        expect(weekGroups.length).toBe(0)
    })

    it('should group transactions in the same week into one group', () => {
        const transactions = [
            makeTransaction('1', new Date('2026-03-10')), // Tuesday
            makeTransaction('2', new Date('2026-03-11')), // Wednesday — same week
        ]

        const weekGroups = buildWeekGroups(transactions)

        expect(weekGroups.length).toBe(1)
        expect(weekGroups[0].transactions.length).toBe(2)
    })

    it('should create separate groups for different weeks', () => {
        const transactions = [
            makeTransaction('1', new Date('2026-03-10')), // week 1
            makeTransaction('2', new Date('2026-03-01')), // week 2
        ]

        const weekGroups = buildWeekGroups(transactions)

        expect(weekGroups.length).toBe(2)
        expect(weekGroups[0].transactions.length).toBe(1)
        expect(weekGroups[1].transactions.length).toBe(1)
    })
})
