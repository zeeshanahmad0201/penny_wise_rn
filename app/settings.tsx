import Toast from 'react-native-toast-message'
import { Alert } from 'react-native'

// components
import ThemedView from '@components/base/ThemedView'
import SettingSection from '@components/shared/SettingSection'
import SettingTile from '@components/shared/SettingTile'

// constants
import { Colors } from '@constants/Colors'

// hooks
import useTransactions from '@hooks/useTransactions'

// utils
import { exportToCSV } from '@utils/exportUtils'

const Settings = () => {
    const { getAllTransactions, resetAll } = useTransactions()

    const handleExport = async () => {
        try {
            const transactions = await getAllTransactions()
            await exportToCSV(transactions)
            Toast.show({ type: 'success', text1: 'Data exported successfully', position: 'bottom' })
        } catch (error: any) {
            Toast.show({ type: 'error', text1: error.message, position: 'bottom' })
        }
    }

    const handleClearPress = () =>
        Alert.alert(
            'Clear All Data',
            'This will permanently delete all transactions. This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: handleDelete },
            ]
        )

    const handleDelete = async () => {
        try {
            await resetAll()
            Toast.show({
                type: 'success',
                text1: 'All transactions deleted successfully',
                position: 'bottom',
            })
        } catch (error: any) {
            Toast.show({ type: 'error', text1: error.message, position: 'bottom' })
        }
    }

    return (
        <ThemedView main>
            <SettingSection
                title={'DATA'}
                tiles={[
                    <SettingTile
                        key={'export'}
                        prefixIcon={'document-text-outline'}
                        title={'Export Transactions'}
                        subtitle={'Download as CSV file'}
                        onPress={handleExport}
                    />,
                    <SettingTile
                        key={'clear'}
                        prefixIcon={'trash-outline'}
                        prefixColor={Colors.error}
                        title={'Clear All Data'}
                        subtitle={'Permanently delete all transactions'}
                        onPress={handleClearPress}
                    />,
                ]}
            />
        </ThemedView>
    )
}

export default Settings
