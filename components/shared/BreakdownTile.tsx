import { StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import Spacing from '@constants/Spacing'

// utils
import { withOpacity } from '@utils/colorUtils'

// models
import { Category } from '@models/Category'
import { Typography } from '@constants/Typography'

import { Theme, useTheme } from '@context/ThemeContext'

type BreakdownTileProps = {
    category: Category
    amount: number
    percentage: number
}

const BreakdownTile = ({ category, amount, percentage }: BreakdownTileProps) => {
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView row style={Styles.container}>
            {/* Icon */}
            <ThemedView
                style={[Styles.iconBg, { backgroundColor: withOpacity(category.color, 0.15) }]}
            >
                <Ionicons name={category.icon} size={Spacing.iconXsm} color={category.color} />
            </ThemedView>

            <Text style={Styles.label}>{category.label}</Text>

            <ThemedView>
                <Text style={Styles.amount}>Rs{amount}</Text>
                <Text style={Styles.percentage}>{percentage}%</Text>
            </ThemedView>
        </ThemedView>
    )
}

export default BreakdownTile

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            marginHorizontal: Spacing.spacingSm,
        },
        iconBg: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Spacing.radiusXsm,
            width: 24,
            height: 24,
        },
        label: {
            ...Typography.bodySm,
            flex: 1,
            paddingLeft: 10,
            color: theme.text.normal,
        },
        amount: {
            ...Typography.labelMd,
            color: theme.text.normal,
        },
        percentage: {
            ...Typography.bodySm,
            color: theme.text.muted,
        },
    })
