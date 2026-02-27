import { useWindowDimensions, StyleSheet } from 'react-native'
import { forwardRef, ReactNode } from 'react'
import GorhomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

// constants
import { Colors } from '@constants/Colors'

const AppBottomSheet = forwardRef<GorhomBottomSheet, { children: ReactNode; onChange?: (index: number) => void }>(
    ({ children, onChange }, ref) => {
        const { height } = useWindowDimensions()
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

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
    },
})
