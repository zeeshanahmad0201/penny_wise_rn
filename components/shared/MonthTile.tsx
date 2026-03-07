import { StyleSheet, Text, TouchableOpacity } from 'react-native'

// constants
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'
import { Typography } from '@constants/Typography'

type MonthTileProps = {
    title: string
    isActive?: boolean
    onPress: () => void
}

const MonthTile = ({ title, isActive = false, onPress }: MonthTileProps) => {
    return (
        <TouchableOpacity
            style={[
                Styles.container,
                { backgroundColor: isActive ? Colors.success : Colors.background },
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    Styles.title,
                    { color: isActive ? Colors.white.normal : Colors.text.normal },
                ]}
                numberOfLines={1}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default MonthTile

const Styles = StyleSheet.create({
    container: {
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.spacingMd,
        borderRadius: Spacing.radiusSm,
    },
    title: {
        ...Typography.bodyMd,
    },
})
