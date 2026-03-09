import { StyleSheet, Text } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { format, parse } from 'date-fns'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'
import Legend from '@components/shared/Legend'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Elevation } from '@constants/Elevation'
import { Border } from '@constants/Border'
import { Typography } from '@constants/Typography'

// hooks
import useAnalytics from '@hooks/useAnalytics'
import { DateFormat } from '@constants/DateFormat'

const SpendingChart = () => {
    const { last6MonthsSummary } = useAnalytics()

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
                data={last6MonthsSummary.flatMap((item) => [
                    {
                        value: item.income,
                        label: format(parse(item.month, 'yyyy-MM', new Date()), DateFormat.month),
                        frontColor: Colors.success,
                        spacing: 2,
                        labelWidth: 40,
                    },
                    { value: item.expense, frontColor: Colors.error },
                ])}
            />

            <Spacer height={15} />

            <ThemedView style={Styles.divider} />

            <Spacer height={10} />

            <ThemedView row centeredContent>
                <Legend title="Income" color={Colors.success} />
                <Spacer width={20} height={0} />
                <Legend title="Expense" color={Colors.error} />
            </ThemedView>
        </ThemedView>
    )
}

export default SpendingChart

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white.normal,
        padding: Spacing.spacingMd,
        borderRadius: Spacing.radiusSm,
        ...Border,
        ...Elevation.sm,
    },
    title: {
        ...Typography.titleSm,
    },
    divider: {
        backgroundColor: Border.borderColor,
        height: 1,
    },
})
