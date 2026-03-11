import { Stack } from 'expo-router'
import { useEffect } from 'react'
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from '@expo-google-fonts/poppins'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

// services
import { initDatabase } from '@services/database'

// context
import { ThemeProvider, useTheme } from '@context/ThemeContext'

const AppNavigator = () => {
    const { theme } = useTheme()

    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: theme.background },
                    headerTintColor: theme.text.normal,
                }}
            >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen
                    name="analytics"
                    options={{ title: 'Analytics', headerBackButtonDisplayMode: 'minimal' }}
                />
                <Stack.Screen
                    name="settings"
                    options={{ title: 'Settings', headerBackButtonDisplayMode: 'minimal' }}
                />
            </Stack>
            <Toast />
        </>
    )
}

const RootLayout = () => {
    useEffect(() => {
        initDatabase()
    }, [])

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    })

    if (!fontsLoaded) return null

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <AppNavigator />
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}

export default RootLayout
