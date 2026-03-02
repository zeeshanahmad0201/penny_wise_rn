import { StyleSheet, Text } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
} from 'react-native-reanimated'
import { useEffect } from 'react'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

type InlineAlertProps = {
    message: string
    type: 'error' | 'success'
}

const InlineAlert = ({ message, type }: InlineAlertProps) => {
    const opacity = useSharedValue(0)
    const height = useSharedValue(0)
    const show = !!message

    useEffect(() => {
        opacity.value = withTiming(show ? 1 : 0, { duration: 300 })
        height.value = withSpring(show ? 50 : 0)
    }, [show, opacity, height])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        height: height.value,
        overflow: 'hidden',
    }))

    const bgColor = {
        error: Colors.error,
        success: Colors.success,
    }[type]

    return (
        <Animated.View style={[Styles.container, animatedStyle, { backgroundColor: bgColor }]}>
            <Text style={Styles.errorMsg}>{message}</Text>
        </Animated.View>
    )
}

export default InlineAlert

const Styles = StyleSheet.create({
    container: {
        paddingVertical: Spacing.spacingMd,
        paddingHorizontal: Spacing.spacingSm,
        marginVertical: Spacing.spacingSm,
    },
    errorMsg: {
        ...Typography.labelMd,
        color: Colors.white.normal,
    },
})
