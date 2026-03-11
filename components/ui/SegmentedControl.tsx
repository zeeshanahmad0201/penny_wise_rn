import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useRef, useEffect, useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'
import { Elevation } from '@constants/Elevation'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

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
    const { theme } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    const pillX = useSharedValue(0)
    const pillWidth = useSharedValue(0)
    const pillColor = useSharedValue(selected.selectedColor ?? theme.primary)
    const layouts = useRef<Map<string, { x: number; width: number }>>(new Map())

    useEffect(() => {
        const layout = layouts.current.get(selected.key)
        if (layout) {
            pillX.value = withSpring(layout.x)
            pillWidth.value = withSpring(layout.width)
        }
    }, [selected, pillX, pillWidth])

    const animatedPillStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: pillX.value }],
        width: pillWidth.value,
    }))

    const handleLayout = (key: string, x: number, width: number) => {
        layouts.current.set(key, { x: x, width: width })

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
            pillColor.value = option.selectedColor ?? theme.primary
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
                            backgroundColor: option.selectedColor ?? theme.primary,
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

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.white.normal,
            borderRadius: Spacing.radiusMd,
            ...Elevation.sm,
        },
        option: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: Spacing.spacingSm,
            paddingVertical: Spacing.pageVerticalSpacing,
            borderRadius: Spacing.radiusMd,
        },
        pill: {
            position: 'absolute',
            height: '100%',
            backgroundColor: theme.primary,
            color: theme.onPrimary,
            borderRadius: Spacing.radiusMd,
        },
        label: {
            ...Typography.labelLg,
            color: theme.text.muted,
        },
        labelSelected: {
            color: theme.onPrimary,
        },
    })
