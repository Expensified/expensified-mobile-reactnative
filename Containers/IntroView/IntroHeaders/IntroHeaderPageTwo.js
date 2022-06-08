import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar
} from "react-native"
import DeviceInfo from "react-native-device-info"

// Store the device constants like the window's width and height, as well as whether it has a notch
const window = Dimensions.get('window'), width = window.width, height = window.height
const hasNotch = DeviceInfo.hasNotch()

export default function IntroHeaderPageTwo() {
    // JSX for the header of the page
    return (
        <View style={styles.container}>
            {
                width < 600 ? (<>
                    <Text style={[styles.header1, styles.header]}>Track</Text>
                    <Text style={[styles.header2, styles.header]}>Expenses</Text>
                    <Text style={[styles.header3, styles.header]}>On The Go      <View></View></Text>
                </>) : (<>
                    <Text style={[styles.header, styles.header1]}>Track  Expenses</Text>
                    <Text style={[styles.header, styles.header3]}>On  The  Go      <View></View></Text>
                </>)
            }
        </View>
    )
}

// Styles used for this header and its elements
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: height*(0.195)+StatusBar.currentHeight,
        alignItems: 'center'
    },
    header: {
        overflow: 'hidden',
        color: '#005831',
        fontWeight: 'bold',
        fontSize: width > 600  ? height*(0.06) : width*(0.09)
    },
    header1: {
        width,
        marginTop: hasNotch ? height*(0.025)
        : StatusBar.currentHeight ? height*(0.015)
        : height*(-0.01),
        marginRight: 'auto',
        marginLeft: width > 600 ? width*(0.15) : width*(0.1067)
    },
    header2: {
        width,
        textAlign: 'center',
        marginTop: StatusBar.currentHeight && width*(-0.01)
    },
    header3: {
        width,
        textAlign: 'right',
        marginTop: StatusBar.currentHeight && width*(-0.01),
        marginLeft: 'auto'
    }
})