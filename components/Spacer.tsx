import { View, DimensionValue } from 'react-native'

const Spacer = ({ height = 20, width = "100%" as DimensionValue }) => {
    return (
        <View style={{ height: height, width: width }} />
    )
}

export default Spacer