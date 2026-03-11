import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV({
    id: 'pennywise-storage',
    encryptionKey: process.env.EXPO_PREFS_ENC_KEY,
})

export const getBool = (key: string): boolean => {
    try {
        return storage.getBoolean(key) ?? false
    } catch (error) {
        console.error('Failed to get data: ', error)
        return false
    }
}

export const setData = (key: string, value: boolean | string | number | ArrayBuffer) => {
    try {
        storage.set(key, value)
    } catch (error: any) {
        console.error('Failed to set data: ', error)
        throw new Error('Unable to set data')
    }
}
