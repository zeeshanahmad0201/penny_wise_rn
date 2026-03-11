import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ReactElement, useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

// utils
import { withOpacity } from '@utils/colorUtils'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

type SettingTileProps = {
    prefixIcon: keyof typeof Ionicons.glyphMap
    prefixColor?: string
    title: string
    subtitle: string
    suffixIcon?: keyof typeof Ionicons.glyphMap | ReactElement
    onPress: () => void
}

const SettingTile = ({
    prefixIcon,
    prefixColor,
    title,
    subtitle,
    suffixIcon = 'chevron-forward',
    onPress,
}: SettingTileProps) => {
    const { theme } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    prefixColor = prefixColor ?? theme.iconColor

    return (
        <TouchableOpacity onPress={onPress} style={Styles.container}>
            <ThemedView row>
                {/* Prefix Icon */}
                <ThemedView
                    style={[Styles.iconBg, { backgroundColor: withOpacity(prefixColor, 0.15) }]}
                >
                    <Ionicons name={prefixIcon} size={Spacing.iconMd} color={prefixColor} />
                </ThemedView>

                <Spacer width={15} />

                {/* Title */}
                <ThemedView style={Styles.titleContainer}>
                    <Text style={Styles.title}>{title}</Text>
                    <Text style={Styles.subtitle}>{subtitle}</Text>
                </ThemedView>

                {/* Suffix Icon */}
                {typeof suffixIcon === 'string' ? (
                    <Ionicons name={suffixIcon} size={Spacing.iconXsm} color={theme.text.muted} />
                ) : (
                    suffixIcon
                )}
            </ThemedView>
        </TouchableOpacity>
    )
}

export default SettingTile

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            paddingVertical: Spacing.spacingMd,
            paddingHorizontal: Spacing.spacingMd,
        },
        iconBg: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Spacing.radiusSm,
            width: 40,
            height: 40,
        },
        titleContainer: {
            flex: 1,
        },
        title: {
            ...Typography.titleMd,
            color: theme.text.normal,
        },
        subtitle: {
            ...Typography.bodySm,
            color: theme.text.muted,
        },
    })
