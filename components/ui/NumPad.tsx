import { StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { useMemo } from 'react'

// components
import ThemedView from '@components/base/ThemedView'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'
import { Ionicons } from '@expo/vector-icons'

// context
import { Theme, useTheme } from '@context/ThemeContext'

type NumPadProps = {
    onNumberPress: (value: string) => void
    onClear: () => void
}

const COLUMNS = 3
const GAP = 8
const SCREEN_WIDTH = Dimensions.get('window').width
const HORIZONTAL_PADDING = Spacing.pageHorizontalSpacing * 2
const ITEM_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING - GAP * COLUMNS) / COLUMNS
const ITEM_HEIGHT = 50

const NumPad = ({ onNumberPress, onClear }: NumPadProps) => {
    const { theme } = useTheme()
    const Styles = useMemo(() => createStyles(theme), [theme])

    const actions: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫']

    return (
        <ThemedView style={Styles.container}>
            {actions.map((item, index) => {
                const isSpecial = item === '.' || item === '⌫'
                const isBackspace = item === '⌫'
                return (
                    <TouchableOpacity
                        key={index}
                        style={Styles.button}
                        onPress={() => (isBackspace ? onClear() : onNumberPress(item))}
                    >
                        {isBackspace ? (
                            <Ionicons name="backspace" size={Spacing.iconMd} color={theme.text.normal} />
                        ) : (
                            <Text style={isSpecial ? Styles.labelSpecial : Styles.label}>
                                {item}
                            </Text>
                        )}
                    </TouchableOpacity>
                )
            })}
        </ThemedView>
    )
}

export default NumPad

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: GAP,
            justifyContent: 'center',
        },
        button: {
            backgroundColor: theme.background,
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: Spacing.radiusSm,
        },
        label: {
            ...Typography.headlineSm,
            color: theme.text.normal,
        },
        labelSpecial: {
            ...Typography.headlineSm,
            color: theme.text.normal,
            paddingBottom: 10,
        },
    })
