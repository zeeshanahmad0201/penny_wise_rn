import { Text, StyleSheet } from 'react-native'

// components
import ThemedView from '@components/base/ThemedView'
import MonthSelector from '@components/shared/MonthSelector'

// constants
import { Typography } from '@constants/Typography'
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Border } from '@constants/Border'
import { Elevation } from '@constants/Elevation'
import { PieChart } from 'react-native-gifted-charts'
import Spacer from '@components/base/Spacer'
import BreakdownTile from './BreakdownTile'
import { categories } from '@data/categories'

const CategoryBreakdown = () => {
    const pieData = [
        { value: 54, color: '#177AD5', text: '54%' },
        { value: 40, color: '#79D2DE', text: '30%' },
        { value: 20, color: '#ED6665', text: '26%' },
    ]

    return (
        <ThemedView>
            {/* Month Picker */}
            <MonthSelector />

            <Spacer height={25} />

            {/* Breakdown */}
            <ThemedView style={Styles.container}>
                <ThemedView row>
                    <Text style={Styles.title}>Category Breakdown</Text>
                    <Text style={Styles.subtitle}>February 2026</Text>
                </ThemedView>

                <Spacer height={30} />

                <ThemedView style={Styles.pieContainer}>
                    <PieChart
                        donut
                        data={pieData}
                        radius={70}
                        innerRadius={50}
                        centerLabelComponent={() => {
                            return (
                                <ThemedView centeredContent>
                                    <Text style={Styles.pieSubtitle}>Total</Text>
                                    <Text
                                        style={Styles.pieTitle}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                    >
                                        Rs1000
                                    </Text>
                                </ThemedView>
                            )
                        }}
                    />

                    <Spacer />

                    <BreakdownTile category={categories.income[0]} amount={100} percentage={23} />
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

export default CategoryBreakdown

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
        flex: 1,
    },
    subtitle: {
        ...Typography.bodySm,
        color: Colors.text.muted,
    },
    pieContainer: {
        alignItems: 'center',
    },
    pieTitle: {
        ...Typography.titleMd,
    },
    pieSubtitle: {
        ...Typography.bodySm,
        color: Colors.text.muted,
    },
})
