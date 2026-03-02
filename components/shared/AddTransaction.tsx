import { useState } from 'react'
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
import { TransactionType } from '@models/Transaction'
import { Category } from '@models/Category'

// constants
import Spacing from '@constants/Spacing'

// hooks
import useTransactions from '@hooks/useTransactions'

type AddTransactionProps = {
    onClose: () => void
}

const AddTransaction = ({ onClose }: AddTransactionProps) => {
    const [option, selectOption] = useState<SegmentedOption>(transactionTypes[0])
    const [category, selectCategory] = useState<Category | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)

    const isIncome = option.key === TransactionType.income
    const filteredCategories = isIncome ? categories.income : categories.expense

    const { addTransaction } = useTransactions()

    const handleSubmit = async ({ amount, date, notes }: TransactionPayload) => {
        setError(null)

        if (!category) {
            setError('Please select a category to continue')
            return
        }

        try {
            setLoading(true)
            await addTransaction({
                amount,
                notes,
                createdAt: date,
                categoryIndex: filteredCategories.indexOf(category),
                type: isIncome ? TransactionType.income : TransactionType.expense,
            })

            // TODO: remove it once the home ui is functional
            console.log('Transaction added successfully')

            onClose()
        } catch (error: any) {
            setError(error instanceof Error ? error.message : 'Somthing went wrong!')
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
        paddingHorizontal: Spacing.pageHorizontalPadding,
        paddingVertical: Spacing.pageVerticalPadding,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.spacingMd,
        padding: Spacing.pageHorizontalPadding,
    },
    list: {
        flex: 1,
    },
})
