import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useRef } from 'react'

// components
import ThemedView from '@components/base/ThemedView'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

export type SegmentedOption = {
    key: string
    value: string
    selectedColor?: string
}

export type SegmentedControlProps = {
    options: SegmentedOption[]
    selected: SegmentedOption
    onSelect: (option: SegmentedOption) => void
}
const SegmentedControl = ({ options, selected, onSelect }: SegmentedControlProps) => {
    const pillX = useSharedValue(0)
    const pillWidth = useSharedValue(0)
    const pillColor = useSharedValue(selected.selectedColor ?? Colors.primary)
    const layouts = useRef<Map<string, { x: number; width: number }>>(new Map())

    const animatedPillStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: pillX.value }],
        width: pillWidth.value,
    }))

    const handleLayout = (key: string, x: number, width: number) => {
        layouts.current.set(key, { x: x, width: width })

        // set initial pill position
        if (selected.key === key) {
            pillX.value = x
            pillWidth.value = width
        }
    }

    const handleSelect = (option: SegmentedOption) => {
        const layout = layouts.current.get(option.key)

        if (layout) {
            pillX.value = withSpring(layout.x)
            pillWidth.value = withSpring(layout.width)
            pillColor.value = option.selectedColor ?? Colors.primary
        }

        onSelect(option)
    }

    return (
        <ThemedView row style={Styles.container}>
            {/* Sliding Pill */}
            <Animated.View style={[Styles.pill, animatedPillStyle]} />

            {/* Options */}
            {options.map((option) => (
                <TouchableOpacity
                    key={option.key}
                    style={[
                        Styles.option,
                        selected.key === option.key && {
                            backgroundColor: option.selectedColor ?? Colors.primary,
                        },
                    ]}
                    onLayout={(e) =>
                        handleLayout(option.key, e.nativeEvent.layout.x, e.nativeEvent.layout.width)
                    }
                    onPress={() => handleSelect(option)}
                >
                    <Text
                        style={[Styles.label, selected.key === option.key && Styles.labelSelected]}
                    >
                        {option.value}
                    </Text>
                </TouchableOpacity>
            ))}
        </ThemedView>
    )
}

export default SegmentedControl

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white.normal,
        borderRadius: Spacing.radiusMd,
        shadowColor: Colors.text.muted,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    option: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.paddingSm,
        paddingVertical: Spacing.pageVerticalPadding,
        borderRadius: Spacing.radiusMd,
    },
    pill: {
        position: 'absolute',
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: Spacing.radiusMd,
    },
    label: {
        ...Typography.labelLg,
        color: Colors.text.muted,
    },
    labelSelected: {
        color: Colors.white.normal,
    },
})
