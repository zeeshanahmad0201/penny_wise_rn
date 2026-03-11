import { Currencies, Currency } from '@constants/Currencies'
import { create } from 'zustand'

type PrefsStore = {
    isDarkMode: boolean
    currency: Currency

    setDarkMode: (isDarkMode: boolean) => void
    switchCurrency: (currency: Currency) => void
}

const usePrefsStore = create<PrefsStore>((set) => ({
    isDarkMode: false,
    currency: Currencies[0],

    setDarkMode: (isDarkMode) => set({ isDarkMode }),
    switchCurrency: (currency) => set({ currency }),
}))

export default usePrefsStore
