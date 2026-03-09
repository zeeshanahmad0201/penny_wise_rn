import ThemedView from '@components/base/ThemedView'
import SettingSection from '@components/shared/SettingSection'
import SettingTile from '@components/shared/SettingTile'
import useTransactions from '@hooks/useTransactions'
import { exportToCSV } from '@utils/exportUtils'
import Toast from 'react-native-toast-message'

const Settings = () => {
    const { getAllTransactions } = useTransactions()

    const handleExport = async () => {
        try {
            const transactions = await getAllTransactions()
            await exportToCSV(transactions)
            Toast.show({ type: 'success', text1: 'Data exported successfully', position: 'bottom' })
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
                        suffixIcon={'chevron-forward'}
                        onPress={handleExport}
                    />,
                ]}
            />
        </ThemedView>
    )
}

export default Settings
