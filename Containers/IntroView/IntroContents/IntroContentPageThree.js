import React from "react"
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroContentPageThree() {
    // JSX for the content of the page
    return (
        <View style={styles.container}>
            <Text style={styles.para}>
                Create custom categories, and Expensified will
                automatically detect the categories and seamlessly
                integrate them with previous expenses.
            </Text>
            <Image
                source={require('../../../assets/app-bar-graph.png')}
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
        width: height*(0.3),
        height: height*(0.4)
    }
})