import { Image, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRef, useState } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'
import MetricCard from '@components/shared/MetricCard'
import PeriodSelector from '@components/shared/PeriodSelector'
import WeekItem from '@components/shared/WeekItem'
import AppBottomSheet from '@components/ui/BottomSheet'
import AddTransaction from '@components/shared/AddTransaction'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'
import BottomSheet from '@gorhom/bottom-sheet'

// assets
import AppIcon from '@assets/icon.png'
import FAB from '@components/base/FAB'

const Home = () => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [sheetKey, setSheetKey] = useState(0)

    return (
        <ThemedView main style={{ paddingHorizontal: 0 }}>
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
                <Ionicons name="settings" size={Spacing.iconMd} color={Colors.iconColor} />
            </ThemedView>

            <ThemedView style={Styles.content}>
                {/* Balance Card */}
                <Spacer height={20} />
                <ThemedView style={Styles.balanceCard}>
                    <Text style={Styles.balanceTitle}>Total Balance</Text>
                    <Spacer height={20} />
                    <Text style={Styles.balance}>Rs0.00</Text>
                    <Spacer height={15} />
                    <ThemedView row>
                        {/* Income Metric */}
                        <MetricCard title="Income" />

                        <Spacer height="100%" width={10} />

                        {/* Expense Metric */}
                        <MetricCard title="Expense" income={false} />
                    </ThemedView>
                </ThemedView>

                {/* Period Selector */}
                <Spacer height={20} />
                <PeriodSelector onNext={() => {}} onPrevious={() => {}} />

                {/* Transactions */}
                <Spacer height={20} />
                <WeekItem />
            </ThemedView>

            {/* FAB */}
            <FAB icon="add" onPress={() => bottomSheetRef.current?.expand()} />
            <AppBottomSheet
                ref={bottomSheetRef}
                onChange={(index) => {
                    if (index === -1) setSheetKey((prev) => prev + 1)
                }}
            >
                <AddTransaction key={sheetKey} />
            </AppBottomSheet>
        </ThemedView>
    )
}

export default Home

const Styles = StyleSheet.create({
    appBar: {
        paddingVertical: Spacing.pageVerticalPadding,
        paddingHorizontal: Spacing.pageHorizontalPadding,
        alignItems: 'center',
    },
    appBarLogo: {
        borderRadius: Spacing.radiusSm,
        backgroundColor: Colors.primary,
        width: Spacing.iconLg,
        height: Spacing.iconLg,
    },
    appBarTitle: {
        ...Typography.titleMd,
        flex: 1,
    },
    content: {
        marginHorizontal: Spacing.pageHorizontalPadding,
    },
    balanceCard: {
        backgroundColor: Colors.primary,
        padding: Spacing.pageHorizontalPadding,
        borderRadius: Spacing.radiusMd,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
    },
    balanceTitle: {
        ...Typography.bodyMd,
        color: Colors.onPrimary,
    },
    balance: {
        ...Typography.displayLg,
        color: Colors.onPrimary,
    },
})
