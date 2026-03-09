import { ScrollView } from 'react-native'

// components
import ThemedView from '@components/base/ThemedView'
import Spacer from '@components/base/Spacer'
import SpendingChart from '@components/shared/SpendingChart'
import CategoryBreakdown from '@components/shared/CategoryBreakdown'
import AnalyticsSummary from '@components/shared/AnalyticsSummary'

const Analytics = () => {
    return (
        <ScrollView>
            <ThemedView main edges={['bottom', 'left', 'right']}>
                <AnalyticsSummary />

                <Spacer />

                <SpendingChart />

                <Spacer />

                <CategoryBreakdown />
            </ThemedView>
        </ScrollView>
    )
}

export default Analytics
