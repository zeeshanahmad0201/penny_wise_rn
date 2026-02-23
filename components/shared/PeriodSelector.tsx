import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// components
import ThemedView from '@components/base/ThemedView'

// constants
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

type PeriodSelectorProps = {
    onPrevious: () => void
    onNext: () => void
    hasPrevious?: boolean
    hasNext?: boolean
}

const PeriodSelector = ({
    onPrevious,
    onNext,
    hasPrevious = true,
    hasNext = true,
}: PeriodSelectorProps) => {
    return (
        <ThemedView row>
            {/* Previous */}
            {hasPrevious && (
                <TouchableOpacity onPress={onPrevious}>
                    <Ionicons name="arrow-back-circle-outline" size={Spacing.iconLg} />
                </TouchableOpacity>
            )}

            {/* Current Month */}
            <Text style={Styles.title}>February 2026</Text>

            {/* Next */}
            {hasNext && (
                <TouchableOpacity onPress={onNext}>
                    <Ionicons name="arrow-forward-circle-outline" size={Spacing.iconLg} />
                </TouchableOpacity>
            )}
        </ThemedView>
    )
}

export default PeriodSelector

const Styles = StyleSheet.create({
    title: {
        ...Typography.titleMd,
        flex: 1,
        textAlign: 'center',
    },
})
