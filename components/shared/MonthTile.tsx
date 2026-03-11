import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useMemo } from 'react'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'
import { Theme, useTheme } from '@context/ThemeContext'

type MonthTileProps = {
    title: string
    isActive?: boolean
    onPress: () => void
}

const MonthTile = ({ title, isActive = false, onPress }: MonthTileProps) => {
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <TouchableOpacity
            style={[
                Styles.container,
                { backgroundColor: isActive ? theme.success : theme.background },
            ]}
            onPress={onPress}
        >
            <Text
                style={[Styles.title, { color: isActive ? theme.onPrimary : theme.text.normal }]}
                numberOfLines={1}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default MonthTile

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: Spacing.spacingMd,
            borderRadius: Spacing.radiusSm,
        },
        title: {
            ...Typography.bodyMd,
        },
    })
