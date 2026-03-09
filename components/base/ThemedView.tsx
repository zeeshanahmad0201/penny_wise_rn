import { ViewProps, StyleSheet, View } from 'react-native'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@constants/Colors'
import Spacing from '@constants/Spacing'

type ThemedViewProps = ViewProps & {
    main?: boolean
    centeredContent?: boolean
    row?: boolean
    edges?: Edges
}

const ThemedView = ({
    style,
    main = false,
    centeredContent = false,
    row = false,
    edges = ['bottom', 'left', 'right'],
    ...props
}: ThemedViewProps) => {
    const mergedStyle = [centeredContent && Styles.centeredContent, row && Styles.row, style]

    if (main) {
        return <SafeAreaView edges={edges} style={[Styles.main, mergedStyle]} {...props} />
    }

    return <View style={mergedStyle} {...props} />
}

export default ThemedView

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        paddingHorizontal: Spacing.pageHorizontalSpacing,
        paddingVertical: Spacing.pageVerticalSpacing,
        backgroundColor: Colors.background,
    },
    centeredContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
