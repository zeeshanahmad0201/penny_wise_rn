import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

// components
import ThemedView from '@components/base/ThemedView'
import SegmentedControl, { SegmentedOption } from '@components/ui/SegmentedControl'
import Spacer from '@components/base/Spacer'
import CategoryItem from '@components/shared/CategoryItem'
import NumPadContainer from '@components/shared/NumPadContainer'

// data
import { transactionTypes } from '@data/transactionTypes'
import { categories } from '@data/categories'

// models
import { TransactionType } from '@models/Transaction'
import { Category } from '@models/Category'

// constants
import Spacing from '@constants/Spacing'

const AddTransaction = () => {
    const [option, selectOption] = useState<SegmentedOption>(transactionTypes[0])
    const [category, selectCategory] = useState<Category | null>(null)

    const isIncome = option.key === TransactionType.income
    const filteredCategories = isIncome ? categories.income : categories.expense

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
            {<NumPadContainer visible={!!category} isIncome={isIncome} />}
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
        gap: Spacing.paddingMd,
        padding: Spacing.pageHorizontalPadding,
    },
    list: {
        flex: 1,
    },
})
