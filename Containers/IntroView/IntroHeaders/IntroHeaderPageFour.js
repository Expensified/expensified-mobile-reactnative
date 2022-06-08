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

export default function IntroHeaderPageFour() {
    // JSX for the header of the page
    return (
        <View style={styles.container}>
            <Text style={[styles.header1, styles.header]}>Data</Text>
            <Text style={[styles.header2, styles.header]}>Security</Text>
        </View>
    )
}

// Styles used for this header and its elements
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        height: height*(0.195)+StatusBar.currentHeight,
        alignItems: 'center'
    },
    header: {
        width,
        textAlign: width < 600 ? 'left' : 'center',
        overflow: 'hidden',
        color: '#005831',
        fontWeight: 'bold',
        fontSize: width < 600 ? width*(0.11) : height*(0.06)
    },
    header1: {
        marginTop: hasNotch ? height*(0.025)
        : StatusBar.currentHeight ? height*(0.02)
        : height*(-0.01),
        marginRight: 'auto',
        marginLeft: width < 600 ? width*(0.13) : 'auto'
    },
    header2: {
        marginLeft: width < 600 ? width*(0.6) : 0,
        marginTop: StatusBar.currentHeight ? width*(-0.0194)
        : width > 600 ? height*(-0.013) : 0
    },
})