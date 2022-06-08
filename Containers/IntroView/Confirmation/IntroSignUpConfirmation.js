import IntroSignUpCodeField from "./IntroSignUpCodeField"
import { MaterialIndicator } from "react-native-indicators"
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroSignUpConfirmation(props) {
    // Function to return the animated width for each component
    const getWidthInterpolation = (i) => (
        props.confirmIndicators[i].interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '60%']
        })
    )
    
    // Reset the indicators from a previous confirmation code action
    props.handleCodeEntry(null, '')

    // Consists of the JSX for displaying the confirmation page
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Confirmation Code</Text>
            <Text style={styles.desc}>
                Please enter the confirmation code we
                {'\n'}have sent to your email:
            </Text>
            <IntroSignUpCodeField handleCodeEntry={props.handleCodeEntry} />
            <Animated.View style={{
                zIndex: 1,
                opacity: props.confirmIndicators[0],
                width: getWidthInterpolation(0),
                height: props.confirmIndicators[0].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width*(0.7)]
                })
            }}>
                <MaterialIndicator
                    size={width*(0.53)}
                    trackWidth={width*(0.08)}
                    color="#00B39F"
                    animating={true}
                    style={{ marginTop: width*(0.1) }}
                />
            </Animated.View>
            <Animated.View style={{
                zIndex: 2,
                marginTop: width*(0.1),
                flexDirection: 'row',
                opacity: props.confirmIndicators[1],
                width: getWidthInterpolation(1),
                height: props.confirmIndicators[1].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width*(0.53)]
                })
            }}>
                <View style={styles.shortEndCheckmark}></View>
                <View style={styles.longEndCheckmark}></View>
            </Animated.View>
            <Animated.View style={{
                zIndex: 3,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                opacity: props.confirmIndicators[2],
                width: getWidthInterpolation(2),
                height: props.confirmIndicators[2].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width*(0.5)]
                })
            }}>
                <View style={styles.leftDiagonalX}></View>
                <View style={styles.rightDiagonalX}></View>
            </Animated.View>
        </View>
    )
}

// Styles used for the confirmation page
const styles = StyleSheet.create({
    container: {
       alignItems: 'center' 
    },
    title: {
        width: '100%',
        marginTop: width*(0.04),
        marginLeft: width*(0.02),
        textAlign: 'center',
        color: '#046820',
        fontWeight: 'bold',
        fontSize: width*(0.065)
    },
    desc: {
        lineHeight: width*(0.055),
        marginTop: width*(0.03),
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#19B092',
        fontSize: width*(0.035)
    },
    shortEndCheckmark: {
        width: '60%',
        height: '30%',
        marginLeft: width*(-0.053),
        borderRadius: width*(0.053),
        alignSelf: 'flex-end',
        backgroundColor: 'lightgreen',
        transform: [{ rotate: '45deg' }]
    },
    longEndCheckmark: {
        marginBottom: width*(-0.0853),
        width: '30%',
        height: '110%',
        alignSelf: 'flex-end',
        borderRadius: width*(0.053),
        backgroundColor: 'lightgreen',
        transform: [{ rotate: '45deg' }]
    },
    leftDiagonalX: {
        width: '30%',
        height: '110%',
        borderRadius: width*(0.053),
        transform: [{ rotate: '45deg' }],
        backgroundColor: 'red'
    },
    rightDiagonalX: {
        width: '30%',
        height: '110%',
        marginLeft: width*(-0.16),
        borderRadius: width*(0.053),
        transform: [{ rotate: '-45deg' }],
        backgroundColor: 'red'
    }
})