import { StyleSheet, Text } from 'react-native'

// components
import TransactionItem from '@components/shared/TransactionItem'
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import { Colors } from '@constants/Colors'
import { Typography } from '@constants/Typography'

// models
import { WeekGroup } from '@models/Transaction'
import Spacing from '@constants/Spacing'

type WeekItemProps = {
    weekGroup: WeekGroup
}

const WeekItem = ({ weekGroup }: WeekItemProps) => {
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
                            <TransactionItem transaction={transaction} />

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

const Styles = StyleSheet.create({
    weekRange: {
        ...Typography.labelSm,
        color: Colors.text.subtle,
    },
    content: {
        backgroundColor: Colors.white.normal,
        padding: Spacing.spacingMd,
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
