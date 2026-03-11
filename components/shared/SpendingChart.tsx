import { StyleSheet, Text } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { format, parse } from 'date-fns'
import { useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'
import Legend from '@components/shared/Legend'

// constants
import Spacing from '@constants/Spacing'
import { Elevation } from '@constants/Elevation'
import { Border } from '@constants/Border'
import { Typography } from '@constants/Typography'
import { DateFormat } from '@constants/DateFormat'

// hooks
import useAnalytics from '@hooks/useAnalytics'

// context
import { Theme, useTheme } from '@context/ThemeContext'

const SpendingChart = () => {
    const { last6MonthsSummary } = useAnalytics()
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView style={Styles.container}>
            <Text style={Styles.title}>Income vs Expenses</Text>

            <Spacer />

            <BarChart
                barWidth={16}
                spacing={24}
                roundedTop
                hideAxesAndRules
                initialSpacing={Spacing.spacingSm}
                endSpacing={0}
                yAxisLabelWidth={0}
                isAnimated
                xAxisLabelTextStyle={{ color: theme.text.normal }}
                data={last6MonthsSummary.flatMap((item) => [
                    {
                        value: item.income,
                        label: format(parse(item.month, 'yyyy-MM', new Date()), DateFormat.month),
                        frontColor: theme.success,
                        spacing: 2,
                        labelWidth: 40,
                    },
                    { value: item.expense, frontColor: theme.error },
                ])}
            />

            <Spacer height={15} />

            <ThemedView style={Styles.divider} />

            <Spacer height={10} />

            <ThemedView row centeredContent>
                <Legend title="Income" color={theme.success} />
                <Spacer width={20} height={0} />
                <Legend title="Expense" color={theme.error} />
            </ThemedView>
        </ThemedView>
    )
}

export default SpendingChart

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.white.normal,
            padding: Spacing.spacingMd,
            borderRadius: Spacing.radiusSm,
            ...Border,
            ...Elevation.sm,
        },
        title: {
            ...Typography.titleSm,
            color: theme.text.normal,
        },
        divider: {
            backgroundColor: Border.borderColor,
            height: 1,
        },
    })
