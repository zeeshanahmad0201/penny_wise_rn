import { Image, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useMemo, useRef, useState } from 'react'
import { addMonths, format, subMonths } from 'date-fns'
import { FlatList } from 'react-native-gesture-handler'
import { router } from 'expo-router'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'
import MetricCard from '@components/shared/MetricCard'
import PeriodSelector from '@components/shared/PeriodSelector'
import WeekItem from '@components/shared/WeekItem'
import AppBottomSheet from '@components/ui/BottomSheet'
import AddTransaction from '@components/shared/AddTransaction'
import EmptyState from '@components/shared/EmptyState'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'
import BottomSheet from '@gorhom/bottom-sheet'
import { DateFormat } from '@constants/DateFormat'

// assets
import AppIcon from '@assets/icon.png'
import FAB from '@components/base/FAB'

// hooks
import useTransactions from '@hooks/useTransactions'

// models
import { Transaction } from '@models/Transaction'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

// utils
import { formatAmount } from '@utils/formatUtils'

const Home = () => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    // Increment key to reset AddTransaction state when sheet closes
    const [sheetKey, setSheetKey] = useState(0)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>()

    const { summary, selectedMonth, setSelectedMonth, weekGroups } = useTransactions()
    const { theme, currency } = useAppPrefs()

    const balance = summary.income - summary.expense
    const now = new Date()
    const thisMonth =
        selectedMonth.getFullYear() === now.getFullYear() &&
        selectedMonth.getMonth() === now.getMonth()

    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView
            main
            style={{ paddingHorizontal: 0 }}
            edges={['bottom', 'left', 'right', 'top']}
        >
            {/* AppBar */}
            <ThemedView row style={Styles.appBar}>
                <ThemedView style={Styles.appBarLogo}>
                    <Image
                        source={AppIcon}
                        style={{ width: '100%', height: '100%', tintColor: '#FFFFFF' }}
                    />
                </ThemedView>
                <Spacer height="100%" width={10} />
                <Text style={Styles.appBarTitle}>PennyWise</Text>

                {/* Settings */}
                <Ionicons
                    name="settings"
                    size={Spacing.iconMd}
                    color={theme.iconColor}
                    onPress={() => router.push('/settings')}
                />

                <Spacer height="100%" width={10} />

                {/* Charts */}
                <Ionicons
                    name="stats-chart-outline"
                    size={Spacing.iconMd}
                    color={theme.iconColor}
                    onPress={() => router.push('/analytics')}
                />
            </ThemedView>

            <ThemedView style={Styles.content}>
                {/* Balance Card */}
                <Spacer height={20} />
                <ThemedView style={Styles.balanceCard}>
                    <Text style={Styles.balanceTitle}>Total Balance</Text>
                    <Spacer height={20} />
                    <Text style={Styles.balance} numberOfLines={1} adjustsFontSizeToFit>
                        {currency.symbol}
                        {formatAmount(balance)}
                    </Text>
                    <Spacer height={15} />
                    <ThemedView row>
                        {/* Income Metric */}
                        <MetricCard title="Income" amount={summary.income} />

                        <Spacer height="100%" width={10} />

                        {/* Expense Metric */}
                        <MetricCard title="Expense" isIncome={false} amount={summary.expense} />
                    </ThemedView>
                </ThemedView>

                {/* Period Selector */}
                <Spacer height={20} />
                <PeriodSelector
                    title={format(selectedMonth, DateFormat.monthYear)}
                    onNext={() =>
                        thisMonth ? null : setSelectedMonth(addMonths(selectedMonth, 1))
                    }
                    onPrevious={() => setSelectedMonth(subMonths(selectedMonth, 1))}
                />

                {/* Transactions */}
                <Spacer height={20} />

                <FlatList
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => (
                        <WeekItem
                            weekGroup={item}
                            onTransactionPress={(transaction) => {
                                setSelectedTransaction(transaction)
                                bottomSheetRef.current?.expand()
                            }}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer height={15} />}
                    ListEmptyComponent={() => (
                        <EmptyState
                            icon="receipt-outline"
                            title="No transactions found!"
                            message="Tap + to add your transaction"
                        />
                    )}
                    contentContainerStyle={Styles.listContent}
                    data={weekGroups}
                    style={Styles.list}
                />
            </ThemedView>

            {/* FAB */}
            <FAB
                icon="add"
                onPress={() => {
                    setSelectedTransaction(undefined)
                    bottomSheetRef.current?.expand()
                }}
            />
            <AppBottomSheet
                ref={bottomSheetRef}
                onChange={(index) => {
                    if (index === -1) {
                        setSheetKey((prev) => prev + 1)
                        setSelectedTransaction(undefined)
                    }
                }}
            >
                <AddTransaction
                    key={sheetKey}
                    onClose={() => {
                        bottomSheetRef.current?.close()
                        setSelectedTransaction(undefined)
                    }}
                    transaction={selectedTransaction}
                />
            </AppBottomSheet>
        </ThemedView>
    )
}

export default Home

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        appBar: {
            paddingVertical: Spacing.pageVerticalSpacing,
            paddingHorizontal: Spacing.pageHorizontalSpacing,
            alignItems: 'center',
        },
        appBarLogo: {
            borderRadius: Spacing.radiusSm,
            backgroundColor: theme.primary,
            width: Spacing.iconLg,
            height: Spacing.iconLg,
        },
        appBarTitle: {
            ...Typography.titleMd,
            flex: 1,
            color: theme.text.normal,
        },
        content: {
            flex: 1,
            marginHorizontal: Spacing.pageHorizontalSpacing,
        },
        balanceCard: {
            backgroundColor: theme.primary,
            padding: Spacing.pageHorizontalSpacing,
            borderRadius: Spacing.radiusMd,
            alignItems: 'center',
            shadowColor: theme.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
        },
        balanceTitle: {
            ...Typography.bodyMd,
            color: theme.onPrimary,
        },
        balance: {
            ...Typography.displayLg,
            color: theme.onPrimary,
        },
        list: {
            flex: 1,
        },
        listContent: {
            flexGrow: 1, // alows ListEmptyComponent to fill available height
        },
    })
