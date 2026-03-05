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
import InlineAlert from '@components/shared/InlineAlert'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'
import { DateFormat } from '@constants/DateFormat'

export type NumPadContainerProps = {
    isVisible: boolean
    isIncome: boolean
    onSubmit: (payload: TransactionPayload) => void
    isLoading: boolean
    defaultAmount?: string
    defaultNotes?: string
    defaultDate?: Date
    onDelete?: () => void
}

export type TransactionPayload = {
    amount: number
    date: Date
    notes: string
}

const NumPadContainer = ({
    isVisible,
    isIncome,
    onSubmit,
    isLoading,
    defaultAmount,
    defaultNotes,
    defaultDate,
    onDelete,
}: NumPadContainerProps) => {
    const [amount, setAmount] = useState<string>('0')
    const [notes, setNotes] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [error, setError] = useState<string | null>(null)

    const translateY = useSharedValue(300)
    const isValidAmount = !!amount && amount !== '0'

    useEffect(() => {
        translateY.value = isVisible ? withSpring(0) : withTiming(1000)
    }, [isVisible, translateY])

    useEffect(() => {
        if (defaultAmount) setAmount(defaultAmount)
        if (defaultNotes) setNotes(defaultNotes)
        if (defaultDate) setDate(defaultDate)
    }, [defaultAmount, defaultNotes, defaultDate])

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

    const handleSubmit = () => {
        setError(null)
        if (!isValidAmount) {
            setError('Please enter a valid amount')
            return
        }

        onSubmit({
            amount: parseFloat(amount),
            notes,
            date,
        })
    }

    return (
        <Animated.View style={animatedStyle}>
            <ThemedView style={Styles.container}>
                {/* Error */}
                {error && <InlineAlert type="error" message={error} />}

                {/* Amount Display */}
                <ThemedView style={Styles.amountContainer}>
                    <Text
                        style={[Styles.amount, { color: isIncome ? Colors.success : Colors.error }]}
                    >
                        Rs{amount}
                    </Text>
                </ThemedView>

                <Spacer height={10} />

                <ThemedView row>
                    {/* Note */}
                    <TextInput
                        value={notes}
                        placeholder="Note (optional)"
                        onChangeText={(value) => setNotes(value)}
                        autoCapitalize="words"
                        style={Styles.input}
                    />

                    {/* Date Picker */}
                    <DateTimePickerModal
                        isVisible={show}
                        mode="date"
                        date={date}
                        maximumDate={new Date()}
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
                            <Text style={Styles.datePickerText}>
                                {format(date, DateFormat.dayMonth)}
                            </Text>
                        </ThemedView>
                    </TouchableOpacity>
                </ThemedView>

                <Spacer height={10} />

                {/* Numpad */}
                <NumPad onClear={onClear} onNumberPress={handleNumberPress} />

                <ThemedView row style={Styles.buttonContainer}>
                    {/* Save */}
                    <Button
                        title={isLoading ? 'Saving...' : 'Save'}
                        onPress={handleSubmit}
                        style={[
                            Styles.button,
                            isValidAmount && {
                                backgroundColor: isIncome ? Colors.success : Colors.error,
                            },
                        ]}
                        disabled={!isValidAmount || isLoading}
                    />

                    {onDelete && (
                        <TouchableOpacity onPress={onDelete}>
                            {/* Delete */}
                            <Ionicons
                                name="trash-outline"
                                size={Spacing.iconMd}
                                color={Colors.white.normal}
                                style={Styles.delete}
                            />
                        </TouchableOpacity>
                    )}
                </ThemedView>

                <Spacer height={10} />
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
        paddingVertical: Spacing.spacingMd,
    },
    amountContainer: {
        backgroundColor: Colors.background,
        marginHorizontal: Spacing.pageHorizontalSpacing,
        borderRadius: Spacing.radiusSm,
        padding: Spacing.spacingMd,
    },
    amount: {
        ...Typography.headlineLg,
        textAlign: 'center',
    },
    input: {
        ...Typography.labelMd,
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.spacingMd,
        paddingVertical: Spacing.spacingMd,
        borderRadius: Spacing.radiusSm,
        marginLeft: Spacing.pageHorizontalSpacing,
        marginRight: Spacing.spacingSm,
    },
    datePicker: {
        paddingHorizontal: Spacing.spacingMd,
        paddingVertical: Spacing.spacingMd,
        backgroundColor: Colors.background,
        marginRight: Spacing.pageHorizontalSpacing,
        borderRadius: Spacing.radiusSm,
    },
    datePickerText: {
        ...Typography.labelMd,
    },
    buttonContainer: {
        marginHorizontal: Spacing.pageHorizontalSpacing,
    },
    button: {
        flex: 1,
        marginRight: Spacing.spacingSm,
    },
    delete: {
        backgroundColor: Colors.error,
        padding: Spacing.spacingMd,
        borderRadius: Spacing.radiusSm,
    },
})
