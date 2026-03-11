import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text } from 'react-native'
import { useMemo } from 'react'

// components
import Spacer from '@components/base/Spacer'
import ThemedView from '@components/base/ThemedView'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

type SummaryCardProps = {
    title: string
    amount: number
    subtitle: string
    isIncome?: boolean
}

const SummaryCard = ({ isIncome = false, title, amount, subtitle }: SummaryCardProps) => {
    const { theme, currency } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView
            style={[Styles.container, { backgroundColor: isIncome ? theme.success : theme.error }]}
        >
            {/* Icon and title */}
            <ThemedView row>
                <Ionicons name={isIncome ? 'arrow-up' : 'arrow-down'} color={theme.onPrimary} />
                <Spacer width={5} height={0} />
                <Text style={Styles.title}>{title}</Text>
            </ThemedView>

            {/* Amount */}
            <Spacer height={5} />
            <Text style={Styles.amount}>
                {currency.symbol}
                {amount}
            </Text>

            {/* Subtitle */}
            <Spacer height={5} />
            <Text style={Styles.subtitle}>{subtitle}</Text>
        </ThemedView>
    )
}

export default SummaryCard

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: Spacing.spacingMd,
            borderRadius: Spacing.radiusSm,
            justifyContent: 'space-between',
        },
        title: {
            ...Typography.bodySm,
            flex: 1,
            color: theme.onPrimary,
        },
        amount: {
            ...Typography.headlineLg,
            color: theme.onPrimary,
        },
        subtitle: {
            ...Typography.labelSm,
            color: theme.onPrimary,
        },
    })
