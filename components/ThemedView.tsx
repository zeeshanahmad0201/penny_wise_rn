import { ViewProps, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/Colors'

const ThemedView = ({ style, main = false, centeredContent = false, ...props }: ViewProps & { main?: boolean, centeredContent?: boolean }) => {
    const mergedStyle = [Styles.container, centeredContent && Styles.centeredContent, style]

    if (main) {
        return <SafeAreaView style={[Styles.main, mergedStyle]} {...props} />
    }

    return <View style={mergedStyle} {...props} />
}

export default ThemedView

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.background,
    },
    main: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    centeredContent: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})