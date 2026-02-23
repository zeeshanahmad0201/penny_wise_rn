import { Category } from '@models/Category'

export const categories = {
    expense: <Category[]>[
        { label: 'Food', icon: 'fast-food', color: '#EA580C' },
        { label: 'Transport', icon: 'car-sport', color: '#2563EB' },
        { label: 'Shopping', icon: 'bag-handle', color: '#DB2777' },
        { label: 'Entertainment', icon: 'game-controller', color: '#9333EA' },
        { label: 'Bills', icon: 'receipt', color: '#DC2626' },
        { label: 'Health', icon: 'medkit', color: '#E11D48' },
        { label: 'Groceries', icon: 'cart', color: '#16A34A' },
        { label: 'Subscription', icon: 'repeat', color: '#0284C7' },
        { label: 'Education', icon: 'school', color: '#7C3AED' },
        { label: 'Other', icon: 'ellipsis-horizontal', color: '#6B7280' },
    ],
    income: <Category[]>[
        { label: 'Salary', icon: 'briefcase-outline', color: '#0EA5E9' },
        { label: 'Freelance', icon: 'laptop-outline', color: '#8B5CF6' },
        { label: 'Investment', icon: 'trending-up-outline', color: '#10B981' },
        { label: 'Gift', icon: 'gift-outline', color: '#EC4899' },
        { label: 'Refund', icon: 'return-down-back-outline', color: '#F59E0B' },
        { label: 'Other', icon: 'ellipsis-horizontal-outline', color: '#6B7280' },
    ],
}
