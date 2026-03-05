import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

// components
import ThemedView from '@components/base/ThemedView'
import SegmentedControl, { SegmentedOption } from '@components/ui/SegmentedControl'
import Spacer from '@components/base/Spacer'
import CategoryItem from '@components/shared/CategoryItem'
import NumPadContainer, { TransactionPayload } from '@components/shared/NumPadContainer'
import InlineAlert from '@components/shared/InlineAlert'

// data
import { transactionTypes } from '@data/transactionTypes'
import { categories } from '@data/categories'

// models
import { Transaction, TransactionType } from '@models/Transaction'
import { Category } from '@models/Category'

// constants
import Spacing from '@constants/Spacing'

// hooks
import useTransactions from '@hooks/useTransactions'

type AddTransactionProps = {
    onClose: () => void
    transaction?: Transaction
}

const AddTransaction = ({ onClose, transaction }: AddTransactionProps) => {
    const [option, selectOption] = useState<SegmentedOption>(transactionTypes[0])
    const [category, selectCategory] = useState<Category | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)

    const isIncome = option.key === TransactionType.income
    const filteredCategories = isIncome ? categories.income : categories.expense

    useEffect(() => {
        if (transaction) {
            const cats =
                transaction.type === TransactionType.income ? categories.income : categories.expense
            selectCategory(cats[transaction!.categoryIndex])
            const trOption =
                transaction.type === TransactionType.income
                    ? transactionTypes[0]
                    : transactionTypes[1]
            selectOption(trOption)
        }
    }, [transaction])

    const { addTransaction, editTransaction, deleteTransaction } = useTransactions()

    const handleSubmit = async ({ amount, date, notes }: TransactionPayload) => {
        setError(null)

        if (!category) {
            setError('Please select a category to continue')
            return
        }

        try {
            setLoading(true)
            const newTransaction = {
                amount,
                notes,
                createdAt: date,
                categoryIndex: filteredCategories.indexOf(category),
                type: isIncome ? TransactionType.income : TransactionType.expense,
            }
            if (transaction) {
                await editTransaction({
                    id: transaction.id,
                    ...newTransaction,
                })
            } else {
                await addTransaction(newTransaction)
            }

            onClose()
        } catch (error: any) {
            setError(error instanceof Error ? error.message : 'Something went wrong!')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!transaction) return
        setError(null)
        try {
            setLoading(true)
            await deleteTransaction(transaction.id)
            onClose()
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ThemedView style={Styles.container}>
            <ThemedView style={Styles.header}>
                {/* Type Selector */}
                <SegmentedControl
                    options={transactionTypes}
                    selected={option}
                    onSelect={(option) => {
                        selectOption(option)
                        selectCategory(null)
                    }}
                />
            </ThemedView>

            {/* Error */}
            {error && <InlineAlert type="error" message={error} />}

            {/* Categories */}
            <Spacer height={10} />
            <BottomSheetScrollView
                contentContainerStyle={Styles.categoriesGrid}
                style={Styles.list}
            >
                {filteredCategories.map((item, index) => (
                    <CategoryItem
                        key={index}
                        category={item}
                        selected={item === category}
                        onPress={() => selectCategory(item)}
                    />
                ))}
            </BottomSheetScrollView>

            {/* Numpad Container */}
            <NumPadContainer
                isVisible={!!category}
                isIncome={isIncome}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                defaultAmount={transaction?.amount.toString()}
                defaultDate={transaction?.createdAt}
                defaultNotes={transaction?.notes}
                onDelete={transaction && handleDelete}
            />
        </ThemedView>
    )
}

export default AddTransaction

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: Spacing.pageHorizontalSpacing,
        paddingVertical: Spacing.pageVerticalSpacing,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.spacingMd,
        padding: Spacing.pageHorizontalSpacing,
    },
    list: {
        flex: 1,
    },
})
