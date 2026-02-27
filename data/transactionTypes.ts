// constants
import { SegmentedOption } from '@components/ui/SegmentedControl'
import { Colors } from '@constants/Colors'

// models
import { TransactionType } from '@models/Transaction'

export const transactionTypes: SegmentedOption[] = [
    {
        key: TransactionType.income,
        value: TransactionType.income,
        selectedColor: Colors.success,
    },
    {
        key: TransactionType.expense,
        value: TransactionType.expense,
        selectedColor: Colors.error,
    },
]
