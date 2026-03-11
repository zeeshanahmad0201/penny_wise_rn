import { useWindowDimensions, StyleSheet } from 'react-native'
import { forwardRef, ReactNode, useMemo } from 'react'
import GorhomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

// context
import { Theme, useTheme } from '@context/ThemeContext'

const AppBottomSheet = forwardRef<GorhomBottomSheet, { children: ReactNode; onChange?: (index: number) => void }>(
    ({ children, onChange }, ref) => {
        const { height } = useWindowDimensions()
        const { theme } = useTheme()
        const Styles = useMemo(() => createStyles(theme), [theme])

        return (
            <GorhomBottomSheet
                ref={ref}
                index={-1}
                snapPoints={['90%']}
                enablePanDownToClose
                backgroundStyle={Styles.container}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                onChange={onChange}
            >
                <BottomSheetView style={{ height: height * 0.9 }}>{children}</BottomSheetView>
            </GorhomBottomSheet>
        )
    }
)

AppBottomSheet.displayName = 'BottomSheet'

export default AppBottomSheet

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.background,
        },
    })
