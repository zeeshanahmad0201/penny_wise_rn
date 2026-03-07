import { StyleSheet, Text } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

// components
import ThemedView from '@components/base/ThemedView'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Elevation } from '@constants/Elevation'
import { Border } from '@constants/Border'
import { Typography } from '@constants/Typography'
import Spacer from '@components/base/Spacer'
import Legend from '@components/shared/Legend'

const SpendingChart = () => {
    const data = [
        { month: 'Oct', income: 3000, expense: 1500 },
        { month: 'Nov', income: 2000, expense: 2500 },
        { month: 'Dec', income: 4000, expense: 1000 },
        { month: 'Jan', income: 1500, expense: 3000 },
        { month: 'Feb', income: 3500, expense: 2000 },
        { month: 'Mar', income: 2500, expense: 1800 },
    ]

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
                data={data.flatMap((item) => [
                    {
                        value: item.income,
                        label: item.month,
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
        borderWidth: Border.width,
        borderColor: Border.color,
        ...Elevation.sm,
    },
    title: {
        ...Typography.titleSm,
    },
    divider: {
        backgroundColor: Border.color,
        height: 1,
    },
})
