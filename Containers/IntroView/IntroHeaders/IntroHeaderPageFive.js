import React from "react"
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar
} from "react-native"
import DeviceInfo from "react-native-device-info"

// Store the device constants like the window's width and height, as well as whether it has a notch
const window = Dimensions.get('window'), width = window.width, height = window.height
const hasNotch = DeviceInfo.hasNotch()

export default function IntroHeaderPageFive(props) {
    // JSX for the header of the page
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {props.isSignIn ? "Sign In" : "Sign Up"}
            </Text>
        </View>
    )
}

// Styles used for this header and its elements
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        justifyContent: 'flex-start',
        height: height*(0.195)+StatusBar.currentHeight,
        alignItems: 'center'
    },
    header: {
        width,
        textAlign: 'center',
        overflow: 'hidden',
        color: '#005831',
        fontWeight: 'bold',
        fontSize: width > 600 ? height*(0.06) : width*(0.11),
        marginTop: width > 600 ? 0 : hasNotch ? height*(0.01)
        : StatusBar.currentHeight ? height*(0.04)
        : height*(0.025)
    }
})