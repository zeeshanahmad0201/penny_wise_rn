/**
 * @jest-environment node
 */

// Mock the database module
import { insertTransaction } from '@services/transactionService'
import db from '@services/database'
import { TransactionType } from '@models/Transaction'

jest.mock('@services/database', () => ({
    __esModule: true,
    default: {
        runAsync: jest.fn(), // fake function that does nothing but records calls
    },
    TABLE_TRANSACTIONS: 'transactions',
}))

// Mock expo-crypto so UUID is predictable
jest.mock('expo-crypto', () => ({
    randomUUID: () => 'test-uuid-123',
}))

describe('insertTransaction', () => {
    beforeEach(() => {
        jest.clearAllMocks() // reset call history before each test
    })

    it('should call db.runAsync with correct SQL and values', async () => {
        const transaction = {
            amount: 500,
            type: TransactionType.expense,
            categoryIndex: 2,
            notes: 'Groceries',
            createdAt: new Date('2026-03-10'),
        }

        await insertTransaction(transaction)

        // db.runAsync should have been called once
        expect(db.runAsync).toHaveBeenCalledTimes(1)

        // it should have been called with INSERT SQL containing our mocked UUID
        expect(db.runAsync).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO'),
            expect.arrayContaining(['test-uuid-123', 500])
        )
    })

    it('should throw an error if db fails', async () => {
        // make runAsync reject with an error
        ;(db.runAsync as jest.Mock).mockRejectedValueOnce(new Error('DB error'))

        const transaction = {
            amount: 500,
            type: TransactionType.expense,
            categoryIndex: 2,
            notes: 'Groceries',
            createdAt: new Date('2026-03-10'),
        }

        await expect(insertTransaction(transaction)).rejects.toThrow(
            'Failed to save transaction. Please try again'
        )
    })
})
