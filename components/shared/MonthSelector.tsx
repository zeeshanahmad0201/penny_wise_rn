import { FlatList, StyleSheet } from 'react-native'
import { useMemo } from 'react'

// components
import Spacer from '@components/base/Spacer'
import ThemedView from '@components/base/ThemedView'
import MonthTile from '@components/shared/MonthTile'

// constants
import Spacing from '@constants/Spacing'
import { Elevation } from '@constants/Elevation'
import { Border } from '@constants/Border'
import { format, subMonths } from 'date-fns'
import { DateFormat } from '@constants/DateFormat'

// context
import { Theme, useAppPrefs } from '@context/PrefsContext'

type MonthSelectorProps = {
    onSelect: (monthYear: string) => void
    selectedMonthYear: string
}

const MonthSelector = ({ onSelect, selectedMonthYear }: MonthSelectorProps) => {
    const { theme } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

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

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.white.normal,
            padding: Spacing.spacingMd,
            borderRadius: Spacing.radiusSm,
            ...Border,
            ...Elevation.sm,
        },
    })
