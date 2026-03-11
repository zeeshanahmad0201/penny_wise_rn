import { Text, StyleSheet } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { format, parse } from 'date-fns'
import { Fragment, useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import MonthSelector from '@components/shared/MonthSelector'
import Spacer from '@components/base/Spacer'
import BreakdownTile from '@components/shared/BreakdownTile'

// constants
import { Typography } from '@constants/Typography'
import Spacing from '@constants/Spacing'
import { Border } from '@constants/Border'
import { Elevation } from '@constants/Elevation'
import { DateFormat } from '@constants/DateFormat'

// hooks
import useAnalytics from '@hooks/useAnalytics'

// utils
import { getCategory } from '@utils/categoryUtils'
import EmptyState from './EmptyState'
import { Theme, useTheme } from '@context/ThemeContext'

const CategoryBreakdown = () => {
    const { transactions, selectedMonth, updateSelectedMonth } = useAnalytics()
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])

    const total = transactions.reduce((sum, item) => sum + item.amount, 0)

    const handleSelect = (monthYear: string) => {
        const newSelectedMonth = parse(monthYear, DateFormat.monthYear, new Date())
        updateSelectedMonth(newSelectedMonth)
    }

    const categoryTotals = transactions.map((transaction) => ({
        amount: transaction.amount,
        category: getCategory(transaction.type, transaction.categoryIndex),
    }))

    const pieData = categoryTotals.map((item) => ({
        value: item.amount,
        color: item.category.color,
    }))

    return (
        <ThemedView>
            {/* Month Picker */}
            <MonthSelector
                onSelect={handleSelect}
                selectedMonthYear={format(selectedMonth, DateFormat.monthYear)}
            />

            <Spacer height={25} />

            {/* Breakdown */}
            <ThemedView style={Styles.container}>
                {transactions.length === 0 ? (
                    <EmptyState
                        icon="receipt-outline"
                        title={'No transactions found!'}
                        message={`You have not added any transactions for ${format(selectedMonth, DateFormat.monthYear)}`}
                    />
                ) : (
                    <>
                        <ThemedView row>
                            <Text style={Styles.title}>Category Breakdown</Text>
                            <Text style={Styles.subtitle}>
                                {format(selectedMonth, DateFormat.monthYear)}
                            </Text>
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
                                                Rs{total}
                                            </Text>
                                        </ThemedView>
                                    )
                                }}
                            />

                            <Spacer />

                            {transactions.map((transaction, index) => (
                                <Fragment key={transaction.id}>
                                    <BreakdownTile
                                        category={getCategory(
                                            transaction.type,
                                            transaction.categoryIndex
                                        )}
                                        amount={transaction.amount}
                                        percentage={
                                            total === 0
                                                ? 0
                                                : parseFloat(
                                                      ((transaction.amount / total) * 100).toFixed(
                                                          2
                                                      )
                                                  )
                                        }
                                    />
                                    {index !== transactions.length - 1 && <Spacer />}
                                </Fragment>
                            ))}
                        </ThemedView>
                    </>
                )}
            </ThemedView>
        </ThemedView>
    )
}

export default CategoryBreakdown

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
            flex: 1,
            color: theme.text.normal,
        },
        subtitle: {
            ...Typography.bodySm,
            color: theme.text.muted,
        },
        pieContainer: {
            alignItems: 'center',
        },
        pieTitle: {
            ...Typography.titleMd,
        },
        pieSubtitle: {
            ...Typography.bodySm,
            color: theme.text.muted,
        },
    })
