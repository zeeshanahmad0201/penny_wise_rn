export const formatAmount = (amount: number | string): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    if (isNaN(num) || num === undefined || num === null) return '0'
    return num % 1 === 0 ? num.toString() : num.toFixed(2)
}
