import { StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import Spacing from '@constants/Spacing'
import { Colors } from '@constants/Colors'
import { Typography } from '@constants/Typography'

const MetricCard = ({
    title,
    amount = 0,
    isIncome: income = true,
}: {
    title: string
    amount?: number
    isIncome?: boolean
}) => {
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
            <Text style={Styles.amount}>Rs{amount ?? '0.00'}</Text>
        </ThemedView>
    )
}

export default MetricCard

const Styles = StyleSheet.create({
    container: {
        borderColor: Colors.white.normal,
        borderWidth: Spacing.borderWidth,
        flex: 1,
        padding: Spacing.spacingMd,
        backgroundColor: Colors.white.subtle,
        borderRadius: Spacing.radiusSm,
    },
    header: {
        alignItems: 'center',
    },
    iconBg: {
        backgroundColor: Colors.white.muted,
        padding: Spacing.spacingSm,
        borderRadius: Spacing.radiusFull,
    },
    icon: {
        color: Colors.onPrimary,
    },
    title: {
        ...Typography.labelMd,
        color: Colors.onPrimary,
    },
    amount: {
        ...Typography.titleLg,
        color: Colors.onPrimary,
    },
})
