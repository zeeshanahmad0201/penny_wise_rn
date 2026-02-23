import { ViewProps, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@constants/Colors'

const ThemedView = ({
    style,
    main = false,
    centeredContent = false,
    row = false,
    ...props
}: ViewProps & { main?: boolean; centeredContent?: boolean; row?: boolean }) => {
    const mergedStyle = [centeredContent && Styles.centeredContent, row && Styles.row, style]

    if (main) {
        return <SafeAreaView style={[Styles.main, mergedStyle]} {...props} />
    }

    return <View style={mergedStyle} {...props} />
}

export default ThemedView

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: Colors.background,
    },
    centeredContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})
