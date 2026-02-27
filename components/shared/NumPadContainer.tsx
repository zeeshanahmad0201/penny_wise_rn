import { TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated'

// components
import ThemedView from '@components/base/ThemedView'
import NumPad from '@components/ui/NumPad'
import Button from '@components/ui/Button'
import Spacer from '@components/base/Spacer'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

export type NumPadContainerProps = {
    visible: boolean
    isIncome: boolean
}

const NumPadContainer = ({ visible, isIncome }: NumPadContainerProps) => {
    const [amount, setAmount] = useState<string>('0')
    const [notes, setNotes] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())

    const translateY = useSharedValue(300)

    useEffect(() => {
        translateY.value = visible ? withSpring(0) : withTiming(1000)
    }, [visible, translateY])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }))

    const handleNumberPress = (value: string) => {
        setAmount((prev) => {
            // 1 decimal allowed
            if (value === '.' && prev?.includes('.')) return prev

            const newAmount = prev + value

            // limit to 2 decimal places
            const dotIndex = newAmount.indexOf('.')
            if (dotIndex !== -1 && newAmount.length - dotIndex > 3) return prev

            return newAmount.startsWith('0') ? newAmount.substring(1) : newAmount
        })
    }

    const onClear = () => {
        const newAmount = amount?.slice(0, -1)
        if (!newAmount || newAmount === '0') {
            setAmount('0')
        } else {
            setAmount(newAmount.startsWith('0') ? newAmount.substring(1) : newAmount)
        }
    }

    return (
        <Animated.View style={animatedStyle}>
            <ThemedView style={Styles.container}>
                {/* Amount Display */}
                <ThemedView style={Styles.amountContainer}>
                    <Text
                        style={[Styles.amount, { color: isIncome ? Colors.success : Colors.error }]}
                    >
                        Rs{amount ?? '0'}
                    </Text>
                </ThemedView>

                <Spacer height={10} />

                <ThemedView row>
                    {/* Note */}
                    <TextInput
                        placeholder="Note (optional)"
                        onChangeText={(value) => setNotes(value)}
                        autoCapitalize="words"
                        style={Styles.input}
                    />

                    {/* Date Picker */}
                    <DateTimePickerModal
                        isVisible={show}
                        mode="date"
                        onConfirm={(selectedDate) => {
                            setDate(selectedDate)
                            setShow(false)
                        }}
                        onCancel={() => setShow(false)}
                    />
                    <TouchableOpacity style={Styles.datePicker} onPress={() => setShow(true)}>
                        <ThemedView row>
                            <Ionicons
                                name="calendar"
                                color={Colors.iconColor}
                                size={Spacing.iconSm}
                            />
                            <Spacer height="100%" width={10} />
                            <Text style={Styles.datePickerText}>{format(date, 'd MMM')}</Text>
                        </ThemedView>
                    </TouchableOpacity>
                </ThemedView>

                <Spacer height={10} />

                {/* Numpad */}
                <NumPad onClear={onClear} onNumberPress={handleNumberPress} />

                <Button
                    title="Save"
                    onPress={() => {}}
                    style={[
                        Styles.button,
                        !(!amount || amount === '0') && {
                            backgroundColor: isIncome ? Colors.success : Colors.error,
                        },
                    ]}
                    disabled={!amount || amount === '0'}
                />
            </ThemedView>
        </Animated.View>
    )
}

export default NumPadContainer

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white.normal,
        borderTopLeftRadius: Spacing.radiusSm,
        borderTopRightRadius: Spacing.radiusSm,
        shadowColor: Colors.text.muted,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        paddingVertical: Spacing.paddingMd,
    },
    amountContainer: {
        backgroundColor: Colors.background,
        marginHorizontal: Spacing.pageHorizontalPadding,
        borderRadius: Spacing.radiusSm,
        padding: Spacing.paddingMd,
    },
    amount: {
        ...Typography.headlineLg,
        textAlign: 'center',
    },
    input: {
        ...Typography.labelMd,
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.paddingMd,
        paddingVertical: Spacing.paddingMd,
        borderRadius: Spacing.radiusSm,
        marginLeft: Spacing.pageHorizontalPadding,
        marginRight: Spacing.paddingSm,
    },
    datePicker: {
        paddingHorizontal: Spacing.paddingMd,
        paddingVertical: Spacing.paddingMd,
        backgroundColor: Colors.background,
        marginRight: Spacing.pageHorizontalPadding,
        borderRadius: Spacing.radiusSm,
    },
    datePickerText: {
        ...Typography.labelMd,
    },
    button: {
        marginHorizontal: Spacing.pageHorizontalPadding,
    },
})
