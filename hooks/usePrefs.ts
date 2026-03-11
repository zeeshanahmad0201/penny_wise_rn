import usePrefsStore from '@stores/prefsStore'
import { getBool, setData } from '@services/prefsService'
import { useCallback, useEffect } from 'react'
import { PrefsKey } from '@constants/PrefsKeys'

const usePrefs = () => {
    const { isDarkMode, currency, setDarkMode, switchCurrency } = usePrefsStore()

    const changeTheme = useCallback(
        (isDark: boolean) => {
            setDarkMode(isDark)
            setData(PrefsKey.darkMode, isDark)
        },
        [setDarkMode]
    )

    const switchTheme = useCallback(() => {
        const newValue = !isDarkMode
        changeTheme(newValue)
    }, [changeTheme, isDarkMode])

    useEffect(() => {
        const savedThemed = getBool(PrefsKey.darkMode)
        changeTheme(savedThemed)
    }, [changeTheme])

    return {
        isDarkMode,
        currency,

        switchTheme,
        switchCurrency,
    }
}

export default usePrefs
