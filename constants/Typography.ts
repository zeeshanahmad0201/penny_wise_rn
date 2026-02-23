import { TextStyle } from 'react-native'
import { Colors } from '@constants/Colors'

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
        color: Colors.text.normal,
    },
    displayMd: {
        fontFamily: family.bold,
        fontSize: 36,
        lineHeight: 40,
        color: Colors.text.normal,
    },
    displaySm: {
        fontFamily: family.bold,
        fontSize: 32,
        lineHeight: 38,
        color: Colors.text.normal,
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
        color: Colors.text.normal,
    },
    headlineSm: {
        fontFamily: family.semiBold,
        fontSize: 18,
        lineHeight: 23,
        color: Colors.text.normal,
    },

    // Title
    titleLg: {
        fontFamily: family.bold,
        fontSize: 18,
        lineHeight: 23,
        color: Colors.text.normal,
    },
    titleMd: {
        fontFamily: family.semiBold,
        fontSize: 16,
        lineHeight: 22,
        color: Colors.text.normal,
    },
    titleSm: {
        fontFamily: family.semiBold,
        fontSize: 14,
        lineHeight: 20,
        color: Colors.text.normal,
    },

    // Body
    bodyLg: {
        fontFamily: family.medium,
        fontSize: 15,
        lineHeight: 23,
        color: Colors.text.normal,
    },
    bodyMd: {
        fontFamily: family.regular,
        fontSize: 14,
        lineHeight: 21,
        color: Colors.text.normal,
    },
    bodySm: {
        fontFamily: family.regular,
        fontSize: 12,
        lineHeight: 17,
        color: Colors.text.normal,
    },

    // Label
    labelLg: {
        fontFamily: family.semiBold,
        fontSize: 16,
        lineHeight: 21,
        color: Colors.text.normal,
    },
    labelMd: {
        fontFamily: family.medium,
        fontSize: 12,
        lineHeight: 16,
        color: Colors.text.normal,
    },
    labelSm: {
        fontFamily: family.semiBold,
        fontSize: 11,
        lineHeight: 14,
        color: Colors.text.normal,
    },
}
