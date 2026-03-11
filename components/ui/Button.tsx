import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useMemo } from 'react'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

// context
import { Theme, useTheme } from '@context/ThemeContext'

type ButtonProps = TouchableOpacityProps & {
    title: string
    disabled?: boolean
    onPress?: () => void
}

const Button = ({ title, disabled = false, onPress, ...props }: ButtonProps) => {
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])

    const isDisabled = disabled || onPress === undefined

    return (
        <TouchableOpacity
            {...props}
            onPress={onPress}
            disabled={isDisabled}
            style={[Styles.container, isDisabled && Styles.containerDisabled, props.style]}
        >
            <Text style={[Styles.title, isDisabled && Styles.titleDisabled]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            height: 55,
            backgroundColor: theme.primary,
            borderRadius: Spacing.radiusSm,
            marginVertical: Spacing.spacingMd,
            justifyContent: 'center',
            alignItems: 'center',
        },
        containerDisabled: {
            backgroundColor: theme.text.subtle,
        },
        title: {
            ...Typography.labelLg,
            color: theme.onPrimary,
        },
        titleDisabled: {
            color: theme.text.muted,
        },
    })
