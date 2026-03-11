import { StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'
import { Border } from '@constants/Border'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

// utils
import { formatAmount } from '@utils/formatUtils'

const MetricCard = ({
    title,
    amount = 0,
    isIncome: income = true,
}: {
    title: string
    amount?: number
    isIncome?: boolean
}) => {
    const { theme, currency } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView style={Styles.container}>
            <ThemedView row style={Styles.header}>
                <ThemedView style={Styles.iconBg}>
                    <Ionicons
                        name={income ? 'arrow-up' : 'arrow-down'}
                        size={Spacing.iconSm}
                        style={Styles.icon}
                    />
                </ThemedView>
                <Spacer height="100%" width={10} />
                <Text style={Styles.title}>{title}</Text>
            </ThemedView>
            <Spacer height={5} />
            <Text style={Styles.amount}>
                {currency.symbol}
                {formatAmount(amount)}
            </Text>
        </ThemedView>
    )
}

export default MetricCard

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            borderColor: theme.white.normal,
            borderWidth: Border.borderWidth,
            flex: 1,
            padding: Spacing.spacingMd,
            backgroundColor: theme.white.subtle,
            borderRadius: Spacing.radiusSm,
        },
        header: {
            alignItems: 'center',
        },
        iconBg: {
            backgroundColor: theme.white.muted,
            padding: Spacing.spacingSm,
            borderRadius: Spacing.radiusFull,
        },
        icon: {
            color: theme.onPrimary,
        },
        title: {
            ...Typography.labelMd,
            color: theme.onPrimary,
        },
        amount: {
            ...Typography.titleLg,
            color: theme.onPrimary,
        },
    })
