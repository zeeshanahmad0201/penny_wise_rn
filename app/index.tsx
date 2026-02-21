import { Text, View, Image } from 'react-native'

// themed components
import ThemedView from '../components/ThemedView'
import { Colors } from '../constants/Colors'

const Splash = () => {
    return (
        <ThemedView main centeredContent>
            <View style={{ borderRadius: 24, backgroundColor: Colors.primary, width: 150, height: 150 }}>
                <Image source={require('../assets/icon.png')} style={{ width: "100%", height: "100%", tintColor: "#FFFFFF" }} />
            </View>
        </ThemedView>
    )
}

export default Splash