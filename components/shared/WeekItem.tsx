import { StyleSheet, Text, FlatList } from 'react-native'
import { subDays } from 'date-fns'

// components
import TransactionItem from '@components/shared/TransactionItem'
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import { Colors } from '@constants/Colors'
import { Typography } from '@constants/Typography'

// models
import { Transaction, TransactionType } from '@models/Transaction'
import Spacing from '@constants/Spacing'

const WeekItem = () => {
    const transactions: Transaction[] = [
        {
            id: '1',
            amount: 100,
            categoryIndex: 0,
            type: TransactionType.income,
            createdAt: subDays(new Date(), 7),
            note: 'Monthly Credit',
        },
        {
            id: '2',
            amount: 50,
            categoryIndex: 0,
            type: TransactionType.expense,
            createdAt: subDays(new Date(), 1),
            note: 'Pizza',
        },
    ]

    return (
        <ThemedView>
            {/* Week Range */}
            <Text style={Styles.weekRange}>Feb 16 - Feb 22</Text>

            <Spacer height={15} />
            {/* Content */}
            <ThemedView style={Styles.content}>
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionItem transaction={item} />}
                    ItemSeparatorComponent={() => <ThemedView style={Styles.separator} />}
                    ListEmptyComponent={() => <Text>No Transactions Found!</Text>}
                />
            </ThemedView>
        </ThemedView>
    )
}

export default WeekItem

const Styles = StyleSheet.create({
    weekRange: {
        ...Typography.labelSm,
        color: Colors.text.subtle,
    },
    content: {
        backgroundColor: Colors.white.normal,
        padding: Spacing.paddingMd,
        borderRadius: Spacing.radiusSm,
        borderWidth: Spacing.borderWidth,
        borderColor: Colors.text.subtle,
    },
    separator: {
        marginVertical: 15,
        height: 0.25,
        width: '100%',
        backgroundColor: Colors.text.subtle,
    },
})
