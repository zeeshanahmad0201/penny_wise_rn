import { Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// components
import ThemedView from '@components/base/ThemedView'
import { Typography } from '@constants/Typography'
import Spacing from '@constants/Spacing'
import Spacer from '@components/base/Spacer'

type EmptyStateProps = {
    icon?: keyof typeof Ionicons.glyphMap
    title: string
    message: string
}

const EmptyState = ({ icon, title, message }: EmptyStateProps) => {
    return (
        <ThemedView centeredContent style={Styles.container}>
            {/* Icon */}
            {icon && (
                <>
                    <Ionicons name={icon} size={Spacing.iconLg} />
                    <Spacer height={20} />
                </>
            )}

            {/* Title */}
            <Text style={Styles.title}>{title}</Text>

            <Spacer height={5} />

            {/* Message */}
            <Text style={Styles.message}>{message}</Text>
        </ThemedView>
    )
}

export default EmptyState

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        ...Typography.titleMd,
    },
    message: {
        ...Typography.bodyMd,
    },
})
