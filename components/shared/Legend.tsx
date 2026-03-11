import { StyleSheet, Text } from 'react-native'
import { useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

type LegendProps = {
    title: string
    color: string
}
const Legend = ({ title, color }: LegendProps) => {
    const { theme } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView row>
            <ThemedView style={[Styles.prefix, { backgroundColor: color }]} />
            <Spacer width={5} />
            <Text style={Styles.title}>{title}</Text>
        </ThemedView>
    )
}

export default Legend

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        prefix: {
            height: 12,
            width: 12,
            borderRadius: Spacing.radiusXsm,
        },
        title: {
            ...Typography.bodySm,
            color: theme.text.normal,
        },
    })
