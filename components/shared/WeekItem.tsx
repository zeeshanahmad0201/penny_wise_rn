import { StyleSheet, Text } from 'react-native'
import { useMemo } from 'react'

// components
import TransactionItem from '@components/shared/TransactionItem'
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import { Typography } from '@constants/Typography'
import Spacing from '@constants/Spacing'
import { Border } from '@constants/Border'

// models
import { Transaction, WeekGroup } from '@models/Transaction'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

type WeekItemProps = {
    weekGroup: WeekGroup
    onTransactionPress: (transaction: Transaction) => void
}

const WeekItem = ({ weekGroup, onTransactionPress }: WeekItemProps) => {
    const { theme } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView>
            {/* Week Range */}
            <Text style={Styles.weekRange}>{weekGroup.label}</Text>

            <Spacer height={15} />

            {/* Content */}
            <ThemedView style={Styles.content}>
                {weekGroup.transactions.map((transaction, index) => {
                    return (
                        <ThemedView key={transaction.id}>
                            <TransactionItem
                                transaction={transaction}
                                onPress={() => onTransactionPress(transaction)}
                            />

                            {/* Show separator except the last */}
                            {index !== weekGroup.transactions.length - 1 && (
                                <ThemedView style={Styles.separator} />
                            )}
                        </ThemedView>
                    )
                })}
            </ThemedView>
        </ThemedView>
    )
}

export default WeekItem

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        weekRange: {
            ...Typography.labelSm,
            color: theme.text.subtle,
        },
        content: {
            backgroundColor: theme.white.normal,
            padding: Spacing.spacingMd,
            borderRadius: Spacing.radiusSm,
            ...Border,
        },
        separator: {
            marginVertical: 15,
            height: 0.25,
            width: '100%',
            backgroundColor: theme.text.subtle,
        },
    })
