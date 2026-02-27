import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// components
import ThemedView from '@components/base/ThemedView'

// models
import { Category } from '@models/Category'

// constants
import Spacing from '@constants/Spacing'

// utils
import { withOpacity } from '@utils/colorUtils'
import Spacer from '@components/base/Spacer'
import { Typography } from '@constants/Typography'

// calculate the item width for responsiveness
export const COLUMNS = 4
export const GAP = Spacing.paddingMd
const SCREEN_WIDTH = Dimensions.get('window').width
const HORIZONTAL_PADDING = Spacing.pageHorizontalPadding * 2
const ITEM_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING - GAP * (COLUMNS - 1)) / COLUMNS

export type CategoryItemProps = { category: Category; selected?: boolean; onPress: () => void }

const CategoryItem = ({ category, selected = false, onPress }: CategoryItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={Styles.container}>
            {/* Icon */}
            <ThemedView
                style={[
                    Styles.iconBg,
                    { backgroundColor: withOpacity(category.color, 0.15) },
                    selected && {
                        ...Styles.iconBgSelected,
                        borderColor: category.color,
                    },
                ]}
            >
                <Ionicons name={category.icon} size={Spacing.iconMd} color={category.color} />
            </ThemedView>

            <Spacer height={10} />

            {/* Label */}
            <Text style={Styles.label}>{category.label}</Text>
        </TouchableOpacity>
    )
}

export default CategoryItem

const Styles = StyleSheet.create({
    container: {
        width: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBg: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Spacing.radiusSm,
        width: 64,
        height: 64,
    },
    label: {
        ...Typography.labelSm,
        textAlign: 'center',
    },
    iconBgSelected: {
        borderWidth: 2,
    },
})
