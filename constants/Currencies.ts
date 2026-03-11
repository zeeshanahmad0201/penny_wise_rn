export const Currencies = [
    { code: 'PKR', symbol: 'Rs' },
    { code: 'USD', symbol: '$' },
    { code: 'GBP', symbol: '£' },
]

export type Currency = (typeof Currencies)[number]
