import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text } from 'react-native'

// components
import Spacer from '@components/base/Spacer'
import ThemedView from '@components/base/ThemedView'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

type SummaryCardProps = {
    title: string
    amount: number
    subtitle: string
    isIncome?: boolean
}
const SummaryCard = ({ isIncome = false, title, amount, subtitle }: SummaryCardProps) => {
    return (
        <ThemedView
            style={[
                Styles.container,
                { backgroundColor: isIncome ? Colors.success : Colors.error },
            ]}
        >
            {/* Icon and title */}
            <ThemedView row>
                <Ionicons name={isIncome ? 'arrow-up' : 'arrow-down'} color={Colors.white.normal} />
                <Spacer width={5} height={0} />
                <Text style={Styles.title}>{title}</Text>
            </ThemedView>

            {/* Amount */}
            <Spacer height={5} />
            <Text style={Styles.amount}>Rs{amount}</Text>

            {/* Subtitle */}
            <Spacer height={5} />
            <Text style={Styles.subtitle}>{subtitle}</Text>
        </ThemedView>
    )
}

export default SummaryCard

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.spacingMd,
        borderRadius: Spacing.radiusSm,
        justifyContent: 'space-between',
    },
    title: {
        ...Typography.bodySm,
        flex: 1,
        color: Colors.white.normal,
    },
    amount: {
        ...Typography.headlineLg,
        color: Colors.white.normal,
    },
    subtitle: {
        ...Typography.labelSm,
        color: Colors.white.normal,
    },
})
