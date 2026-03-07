import { FlatList } from 'react-native'

import MonthTile from './MonthTile'
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import Spacer from '@components/base/Spacer'
import { Elevation } from '@constants/Elevation'
import { Border } from '@constants/Border'
import ThemedView from '@components/base/ThemedView'

const MonthSelector = () => {
    const months = ['February 2026', 'January 2026', 'December 2025', 'November 2025', 'Oct 2025']
    return (
        <ThemedView style={Styles.container}>
            <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                    <MonthTile title={item} onPress={() => {}} isActive={index === 0} />
                )}
                ItemSeparatorComponent={() => <Spacer width={5} height={0} />}
                horizontal
            />
        </ThemedView>
    )
}

export default MonthSelector

const Styles = {
    container: {
        backgroundColor: Colors.white.normal,
        padding: Spacing.spacingMd,
        borderRadius: Spacing.radiusSm,
        borderWidth: Border.width,
        borderColor: Border.color,
        ...Elevation.sm,
    },
}
