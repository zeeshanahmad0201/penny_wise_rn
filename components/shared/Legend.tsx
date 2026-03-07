import { StyleSheet, Text } from 'react-native'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

type LegendProps = {
    title: string
    color: string
}
const Legend = ({ title, color }: LegendProps) => {
    return (
        <ThemedView row>
            <ThemedView style={[Styles.prefix, { backgroundColor: color }]} />
            <Spacer width={5} />
            <Text style={Styles.title}>{title}</Text>
        </ThemedView>
    )
}

export default Legend

const Styles = StyleSheet.create({
    prefix: {
        height: 12,
        width: 12,
        borderRadius: Spacing.radiusXsm,
    },
    title: {
        ...Typography.bodySm,
    },
})
