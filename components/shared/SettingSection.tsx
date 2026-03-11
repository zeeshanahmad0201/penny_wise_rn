import { Text, StyleSheet } from 'react-native'
import { Fragment, ReactElement, useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import { Typography } from '@constants/Typography'
import Spacer from '@components/base/Spacer'

// constants
import { Border } from '@constants/Border'
import { Elevation } from '@constants/Elevation'
import Spacing from '@constants/Spacing'

// context
import { Theme, useTheme } from '@context/ThemeContext'

type SettingSectionProps = {
    title: string
    tiles: ReactElement[]
}

const SettingSection = ({ title, tiles }: SettingSectionProps) => {
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])

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

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        title: {
            ...Typography.labelMd,
            color: theme.text.muted,
        },
        section: {
            backgroundColor: theme.white.normal,
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
