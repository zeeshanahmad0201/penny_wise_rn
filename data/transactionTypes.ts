// constants
import { SegmentedOption } from '@components/ui/SegmentedControl'

// models
import { TransactionType } from '@models/Transaction'

export const transactionTypes: SegmentedOption[] = [
    {
        key: TransactionType.income,
        value: TransactionType.income,
        selectedColor: '#10B981',
    },
    {
        key: TransactionType.expense,
        value: TransactionType.expense,
        selectedColor: '#EF4444',
    },
]
