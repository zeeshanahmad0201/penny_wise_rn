// components
import ThemedView from '@components/base/ThemedView'
import SummaryCard from '@components/shared/SummaryCard'
import Spacer from '@components/base/Spacer'
import SpendingChart from '@components/shared/SpendingChart'
import CategoryBreakdown from '@components/shared/CategoryBreakdown'
import { ScrollView } from 'react-native'

const Analytics = () => {
    return (
        <ScrollView>
            <ThemedView main>
                <ThemedView row>
                    <SummaryCard
                        title={'Total Income'}
                        amount={10000}
                        subtitle={'Last 6 months'}
                        isIncome
                    />

                    <Spacer height={'100%'} width={10} />

                    <SummaryCard
                        title={'Total Expenses'}
                        amount={5000}
                        subtitle={'Last 6 months'}
                    />
                </ThemedView>

                <Spacer />

                <SpendingChart />

                <Spacer />

                <CategoryBreakdown />
            </ThemedView>
        </ScrollView>
    )
}

export default Analytics
