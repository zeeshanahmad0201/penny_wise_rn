import { Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// components
import ThemedView from '@components/base/ThemedView'
import { Typography } from '@constants/Typography'
import Spacing from '@constants/Spacing'
import Spacer from '@components/base/Spacer'
import { Theme, useAppPrefs } from '@context/PrefsContext'
import { useMemo } from 'react'

type EmptyStateProps = {
    icon?: keyof typeof Ionicons.glyphMap
    title: string
    message: string
}

const EmptyState = ({ icon, title, message }: EmptyStateProps) => {
    const { theme } = useAppPrefs()
    const Styles = useMemo(() => createStyles(theme), [theme])

    return (
        <ThemedView centeredContent style={Styles.container}>
            {/* Icon */}
            {icon && (
                <>
                    <Ionicons name={icon} size={Spacing.iconLg} color={theme.text.normal} />
                    <Spacer height={10} />
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

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            color: theme.text.normal,
        },
        title: {
            ...Typography.titleMd,
            textAlign: 'center',
            color: theme.text.normal,
        },
        message: {
            ...Typography.bodyMd,
            textAlign: 'center',
            color: theme.text.normal,
        },
    })
