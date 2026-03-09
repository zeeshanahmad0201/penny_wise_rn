// components
import ThemedView from '@components/base/ThemedView'
import SummaryCard from '@components/shared/SummaryCard'
import Spacer from '@components/base/Spacer'

// hooks
import useAnalytics from '@hooks/useAnalytics'

const AnalyticsSummary = () => {
    const { last6MonthsSummary } = useAnalytics()
    const totalIncome = last6MonthsSummary.reduce((sum, item) => sum + item.income, 0)
    const totalExpense = last6MonthsSummary.reduce((sum, item) => sum + item.expense, 0)

    return (
        <ThemedView row>
            <SummaryCard
                title={'Total Income'}
                amount={totalIncome}
                subtitle={'Last 6 months'}
                isIncome
            />

            <Spacer height={0} width={10} />

            <SummaryCard
                title={'Total Expenses'}
                amount={totalExpense}
                subtitle={'Last 6 months'}
            />
        </ThemedView>
    )
}

export default AnalyticsSummary
