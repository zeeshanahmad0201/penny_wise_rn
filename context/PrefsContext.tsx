import { Colors } from '@constants/Colors'
import { Currency } from '@constants/Currencies'
import usePrefs from '@hooks/usePrefs'
import { createContext, JSX, PropsWithChildren, useContext } from 'react'

export type Theme = typeof Colors.light

type PrefsContextType = {
    theme: Theme
    isDarkMode: boolean
    currency: Currency

    switchTheme: () => void
    switchCurrency: (currency: Currency) => void
}

export const PrefsContext = createContext<PrefsContextType | undefined>(undefined)

export const PrefsProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const { isDarkMode, currency, switchTheme, switchCurrency } = usePrefs()
    const theme = isDarkMode ? Colors.dark : Colors.light

    return (
        <PrefsContext.Provider value={{ theme, isDarkMode, currency, switchTheme, switchCurrency }}>
            {children}
        </PrefsContext.Provider>
    )
}

export const useAppPrefs = (): PrefsContextType => {
    const context = useContext(PrefsContext)
    if (!context) throw new Error('useAppPrefs must be used within ThemeProvider')

    return context
}
