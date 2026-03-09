import { categories } from '@data/categories'
import { Category } from '@models/Category'
import { TransactionType } from '@models/Transaction'

export const getCategory = (type: TransactionType, categoryIndex: number): Category => {
    return type === TransactionType.income
        ? categories.income[categoryIndex]
        : categories.expense[categoryIndex]
}
