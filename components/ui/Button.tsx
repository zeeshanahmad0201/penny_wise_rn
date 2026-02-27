import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

type ButtonProps = TouchableOpacityProps & {
    title: string
    disabled?: boolean
    onPress?: () => void
}

const Button = ({ title, disabled = false, onPress, ...props }: ButtonProps) => {
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

const Styles = StyleSheet.create({
    container: {
        height: 55,
        backgroundColor: Colors.primary,
        borderRadius: Spacing.radiusSm,
        marginVertical: Spacing.paddingMd,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerDisabled: {
        backgroundColor: Colors.text.subtle,
    },
    title: {
        ...Typography.labelLg,
        color: Colors.onPrimary,
    },
    titleDisabled: {
        color: Colors.text.muted,
    },
})
