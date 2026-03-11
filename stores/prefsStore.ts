import { create } from 'zustand'

type PrefsStore = {
    isDarkMode: boolean

    setDarkMode: (isDarkMode: boolean) => void
}

const usePrefsStore = create<PrefsStore>((set) => ({
    isDarkMode: false,

    setDarkMode: (isDarkMode) => set({ isDarkMode }),
}))

export default usePrefsStore
