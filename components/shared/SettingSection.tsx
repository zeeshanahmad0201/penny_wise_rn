import { Text, StyleSheet } from 'react-native'
import { Fragment, ReactElement } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import { Typography } from '@constants/Typography'
import { Colors } from '@constants/Colors'
import Spacer from '@components/base/Spacer'
import { Border } from '@constants/Border'
import { Elevation } from '@constants/Elevation'
import Spacing from '@constants/Spacing'

type SettingSectionProps = {
    title: string
    tiles: ReactElement[]
}

const SettingSection = ({ title, tiles }: SettingSectionProps) => {
    return (
        <ThemedView>
            <Text style={Styles.title}>{title}</Text>

            <Spacer height={5} />

            <ThemedView style={Styles.section}>
                {tiles.map((tile, index) => (
                    <Fragment key={index}>
                        {tile}
                        {index !== tiles.length - 1 && <ThemedView style={Styles.separator} />}
                    </Fragment>
                ))}
            </ThemedView>
        </ThemedView>
    )
}

export default SettingSection

const Styles = StyleSheet.create({
    title: {
        ...Typography.labelLg,
        color: Colors.text.muted,
    },
    section: {
        backgroundColor: Colors.white.normal,
        paddingVertical: Spacing.spacingSm,
        ...Border,
        ...Elevation.sm,
        borderRadius: Spacing.radiusSm,
    },
    separator: {
        height: 1,
        backgroundColor: Border.borderColor,
    },
})
