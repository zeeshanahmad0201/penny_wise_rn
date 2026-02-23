import { StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import { Typography } from '@constants/Typography'
import Spacing from '@constants/Spacing'

// models
import { Transaction, TransactionType } from '@models/Transaction'

// data
import { categories } from '@data/categories'

// utils
import { withOpacity } from '@utils/colorUtils'
import { Colors } from '@constants/Colors'

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isIncome = transaction.type === TransactionType.income
    const typeMeta = isIncome ? categories.income : categories.expense
    const category = typeMeta.at(transaction.categoryIndex)
    const defaultColor = '#000'

    return (
        <ThemedView row>
            {/* Prefix */}
            <ThemedView
                style={[
                    Styles.iconBg,
                    {
                        backgroundColor: withOpacity(category?.color ?? defaultColor, 0.15),
                    },
                ]}
            >
                <Ionicons
                    size={Spacing.iconMd}
                    name={category?.icon ?? 'accessibility-sharp'}
                    color={category?.color ?? defaultColor}
                />
            </ThemedView>

            {/* Content */}
            <Spacer width={15} />
            <ThemedView style={Styles.content}>
                <Text style={Styles.title} ellipsizeMode="tail" numberOfLines={1}>
                    {category?.label}
                </Text>

                {transaction.note && (
                    <>
                        <Text style={Styles.description} numberOfLines={1} ellipsizeMode="tail">
                            {transaction.note}
                        </Text>
                    </>
                )}
            </ThemedView>

            {/* Suffix */}
            <ThemedView style={Styles.suffix}>
                <Text style={[Styles.amount, isIncome ? Styles.income : Styles.expense]}>
                    Rs{transaction.amount.toFixed(2)}
                </Text>

                <Spacer height={3} />

                <Text style={Styles.date}>{format(transaction.createdAt, 'MMM d')}</Text>
            </ThemedView>
        </ThemedView>
    )
}

export default TransactionItem

const Styles = StyleSheet.create({
    iconBg: {
        borderRadius: Spacing.radiusSm,
        width: Spacing.iconXLg,
        height: Spacing.iconXLg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    title: {
        ...Typography.bodyLg,
    },
    description: {
        ...Typography.bodyMd,
        color: Colors.text.muted,
    },
    amount: {
        ...Typography.titleMd,
    },
    income: {
        color: Colors.success,
    },
    expense: {
        color: Colors.error,
    },
    suffix: {
        alignItems: 'flex-end',
    },
    date: {
        ...Typography.labelSm,
        color: Colors.text.subtle,
    },
})
