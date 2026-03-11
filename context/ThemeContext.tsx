import { Colors } from '@constants/Colors'
import usePrefs from '@hooks/usePrefs'
import { createContext, JSX, PropsWithChildren, useContext } from 'react'

export type Theme = typeof Colors.light

type ThemeContextType = {
    theme: Theme
    isDarkMode: boolean
    switchTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const { isDarkMode, switchTheme } = usePrefs()
    const theme = isDarkMode ? Colors.dark : Colors.light

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within ThemeProvider')

    return context
}
