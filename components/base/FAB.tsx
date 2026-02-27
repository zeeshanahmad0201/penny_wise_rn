import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// constants
import Spacing from '@constants/Spacing'
import { Colors } from '@constants/Colors'

type FABViewProps = {
    icon: keyof typeof Ionicons.glyphMap
    size?: number
    onPress: () => void
}

const FAB = ({ icon, size = Spacing.iconLg, onPress: onPress }: FABViewProps) => {
    return (
        <TouchableOpacity style={Styles.fab} onPress={onPress}>
            <Ionicons name={icon} size={size} color={Colors.onPrimary} />
        </TouchableOpacity>
    )
}

export default FAB

const Styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: Spacing.pageHorizontalPadding,
        right: Spacing.pageHorizontalPadding,
        width: 56,
        height: 56,
        borderRadius: Spacing.radiusSm,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
    },
})
