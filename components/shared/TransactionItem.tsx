import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import { Typography } from '@constants/Typography'
import Spacing from '@constants/Spacing'
import { DateFormat } from '@constants/DateFormat'

// models
import { Transaction, TransactionType } from '@models/Transaction'

// data
import { categories } from '@data/categories'

// utils
import { withOpacity } from '@utils/colorUtils'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

type TransactionItemProps = {
    transaction: Transaction
    onPress: () => void
}

const TransactionItem = ({ transaction, onPress }: TransactionItemProps) => {
    const isIncome = transaction.type === TransactionType.income
    const typeMeta = isIncome ? categories.income : categories.expense
    const category = typeMeta.at(transaction.categoryIndex)

    const { theme, currency } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    const defaultColor = theme.text.normal

    return (
        <TouchableOpacity onPress={onPress}>
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
                        name={category?.icon ?? 'help-circle-outline'}
                        color={category?.color ?? defaultColor}
                    />
                </ThemedView>

                {/* Content */}
                <Spacer width={15} />
                <ThemedView style={Styles.content}>
                    <Text style={Styles.title} ellipsizeMode="tail" numberOfLines={1}>
                        {category?.label}
                    </Text>

                    {transaction.notes && (
                        <Text style={Styles.notes} numberOfLines={1} ellipsizeMode="tail">
                            {transaction.notes}
                        </Text>
                    )}
                </ThemedView>

                {/* Suffix */}
                <ThemedView style={Styles.suffix}>
                    <Text
                        style={[Styles.amount, isIncome ? Styles.income : Styles.expense]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {currency.symbol}
                        {transaction.amount.toFixed(2)}
                    </Text>

                    <Spacer height={3} />

                    <Text style={Styles.date}>
                        {format(transaction.createdAt, DateFormat.monthDay)}
                    </Text>
                </ThemedView>
            </ThemedView>
        </TouchableOpacity>
    )
}

export default TransactionItem

const createStyles = (theme: Theme) =>
    StyleSheet.create({
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
            color: theme.text.normal,
        },
        notes: {
            ...Typography.bodySm,
            color: theme.text.muted,
        },
        amount: {
            ...Typography.titleMd,
        },
        income: {
            color: theme.success,
        },
        expense: {
            color: theme.error,
        },
        suffix: {
            alignItems: 'flex-end',
        },
        date: {
            ...Typography.labelSm,
            color: theme.text.subtle,
        },
    })
