import { FlatList, StyleSheet } from 'react-native'

// components
import Spacer from '@components/base/Spacer'
import ThemedView from '@components/base/ThemedView'
import MonthTile from '@components/shared/MonthTile'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Elevation } from '@constants/Elevation'
import { Border } from '@constants/Border'
import { format, subMonths } from 'date-fns'
import { DateFormat } from '@constants/DateFormat'

type MonthSelectorProps = {
    onSelect: (monthYear: string) => void
    selectedMonthYear: string
}

const MonthSelector = ({ onSelect, selectedMonthYear }: MonthSelectorProps) => {
    const now = new Date()
    const months = Array.from({ length: 6 }, (_, index) =>
        format(subMonths(now, index), DateFormat.monthYear)
    )
    const selectedIndex = months.indexOf(selectedMonthYear)

    return (
        <ThemedView style={Styles.container}>
            <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                    <MonthTile
                        title={item}
                        onPress={() => onSelect(item)}
                        isActive={index === selectedIndex}
                    />
                )}
                ItemSeparatorComponent={() => <Spacer width={5} height={0} />}
                horizontal
            />
        </ThemedView>
    )
}

export default MonthSelector

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white.normal,
        padding: Spacing.spacingMd,
        borderRadius: Spacing.radiusSm,
        ...Border,
        ...Elevation.sm,
    },
})
