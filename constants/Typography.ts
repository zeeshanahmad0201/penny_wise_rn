import { TextStyle } from 'react-native'

const family = {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
}

export const Typography: Record<string, TextStyle> = {
    // Display
    displayLg: {
        fontFamily: family.bold,
        fontSize: 48,
        lineHeight: 53,
    },
    displayMd: {
        fontFamily: family.bold,
        fontSize: 36,
        lineHeight: 40,
    },
    displaySm: {
        fontFamily: family.bold,
        fontSize: 32,
        lineHeight: 38,
    },

    // Headline
    headlineLg: {
        fontFamily: family.bold,
        fontSize: 24,
        lineHeight: 31,
    },
    headlineMd: {
        fontFamily: family.bold,
        fontSize: 20,
        lineHeight: 26,
    },
    headlineSm: {
        fontFamily: family.semiBold,
        fontSize: 18,
        lineHeight: 23,
    },

    // Title
    titleLg: {
        fontFamily: family.bold,
        fontSize: 18,
        lineHeight: 23,
    },
    titleMd: {
        fontFamily: family.semiBold,
        fontSize: 16,
        lineHeight: 22,
    },
    titleSm: {
        fontFamily: family.semiBold,
        fontSize: 14,
        lineHeight: 20,
    },

    // Body
    bodyLg: {
        fontFamily: family.medium,
        fontSize: 15,
        lineHeight: 23,
    },
    bodyMd: {
        fontFamily: family.regular,
        fontSize: 14,
        lineHeight: 21,
    },
    bodySm: {
        fontFamily: family.regular,
        fontSize: 12,
        lineHeight: 17,
    },

    // Label
    labelLg: {
        fontFamily: family.semiBold,
        fontSize: 16,
        lineHeight: 21,
    },
    labelMd: {
        fontFamily: family.medium,
        fontSize: 12,
        lineHeight: 16,
    },
    labelSm: {
        fontFamily: family.semiBold,
        fontSize: 11,
        lineHeight: 14,
    },
}
