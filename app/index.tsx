import { View, Image } from 'react-native'
import { router } from 'expo-router'
import { useEffect } from 'react'

// themed components
import ThemedView from '@components/base/ThemedView'

// assets
import AppIcon from '@assets/icon.png'

// context
import { useTheme } from '@context/ThemeContext'

const Splash = () => {
    const { theme } = useTheme()
    useEffect(() => {
        setTimeout(() => {
            router.replace('./home')
        }, 1500)
    }, [])

    return (
        <ThemedView main centeredContent>
            <View
                style={{
                    borderRadius: 24,
                    backgroundColor: theme.primary,
                    width: 150,
                    height: 150,
                }}
            >
                <Image
                    source={AppIcon}
                    style={{ width: '100%', height: '100%', tintColor: '#FFFFFF' }}
                />
            </View>
        </ThemedView>
    )
}

export default Splash
