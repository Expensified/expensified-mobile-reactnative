import React from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroContentPageTwo() {
    // JSX for the content of the page
    return (
        <View style={styles.container}>
            <Text style={styles.para}>
                Through Expensified, you can import or export existing data from an Excel file
                into or from the application, however, you can enter daily transactions through our platform.
            </Text>
            <Image
                source={require('../../../assets/app-doughnut-graph.png')}
                style={styles.image}
            />
        </View>
    )
}

// Styles used for this content page and its elements
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    para: {
        width: width,
        color: '#046820',
        fontSize: height*(0.0278),
        padding: 20,
        fontWeight: 'bold',
        lineHeight: height*(0.045)
    },
    image: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: width-50,
        height: width*(0.45)
    }
})