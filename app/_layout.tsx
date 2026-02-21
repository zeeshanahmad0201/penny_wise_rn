import { StatusBar } from "expo-status-bar"
import { Stack } from "expo-router"

// themed components
import { Colors } from "../constants/Colors"

const RootLayout = () => {
    return (
        <>
            <StatusBar backgroundColor={Colors.background} />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default RootLayout