import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// constants
import Spacing from '@constants/Spacing'
import { Theme, useTheme } from '@context/ThemeContext'
import { useMemo } from 'react'

type FABViewProps = {
    icon: keyof typeof Ionicons.glyphMap
    size?: number
    onPress: () => void
}

const FAB = ({ icon, size = Spacing.iconLg, onPress: onPress }: FABViewProps) => {
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])
    return (
        <TouchableOpacity style={Styles.fab} onPress={onPress}>
            <Ionicons name={icon} size={size} color={theme.onPrimary} />
        </TouchableOpacity>
    )
}

export default FAB

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        fab: {
            position: 'absolute',
            bottom: Spacing.pageHorizontalSpacing,
            right: Spacing.pageHorizontalSpacing,
            width: 56,
            height: 56,
            borderRadius: Spacing.radiusSm,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.primary,
        },
    })
