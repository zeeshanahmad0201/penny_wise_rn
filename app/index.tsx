import { View, Image } from 'react-native'
import { router } from 'expo-router'
import { useEffect } from 'react'

// themed components
import ThemedView from '@components/base/ThemedView'

// constants
import { Colors } from '@constants/Colors'

// assets
import AppIcon from '@assets/icon.png'

const Splash = () => {
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
                    backgroundColor: Colors.primary,
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
