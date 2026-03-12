import { formatAmount } from '@utils/formatUtils'

describe('formatAmount', () => {
    // --- Type handling ---
    it('should handle string input', () => {
        expect(formatAmount('100')).toBe('100')
    })

    it('should handle number input', () => {
        expect(formatAmount(100)).toBe('100')
    })

    // --- Invalid / edge cases ---
    it('should return 0 for NaN', () => {
        expect(formatAmount(NaN)).toBe('0')
    })

    it('should return 0 for invalid string', () => {
        expect(formatAmount('abc')).toBe('0')
    })

    // --- Formatting ---
    it('should return whole number without decimals', () => {
        expect(formatAmount(100)).toBe('100')
    })

    it('should return decimal number with 2 places', () => {
        expect(formatAmount(10.5)).toBe('10.50')
    })

    it('should handle negative number', () => {
        expect(formatAmount(-50)).toBe('-50')
    })
})
