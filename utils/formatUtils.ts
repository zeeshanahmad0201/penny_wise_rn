export const formatAmount = (amount: number): string => {
    return amount % 1 === 0 ? amount.toString() : amount.toFixed(2)
}
