import React from "react"
import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroContentValidation(props) {
    // A function that defines the styles of the validation boxes
    // and the text based on whether they are completed or not
    const getStyle = (i, type) => {
        return (
            type ?
                props.completed[i] !== null ?
                    props.completed[i] ? styles.valid
                    : styles.invalid
                : styles.unknown
            : props.completed[i] ? { opacity: 0 }
            : props.completed[i] === false && { color: 'white' }
        )
    }

    // JSX for the content of the validation boxes
    return (
        <View style={styles.container}>
            <View style={getStyle(0, true)}>
                <Text style={[getStyle(0), styles.text]}>Capital Letter</Text>
            </View>
            <View style={getStyle(1, true)}>
                <Text style={[getStyle(1), styles.text]}>Special Char</Text>
            </View>
            <View style={getStyle(2, true)}>
                <Text style={[getStyle(2), styles.text]}>Password Length</Text>
            </View>
        </View>
    )
}

// Styles used for this container and its elements
const styles = StyleSheet.create({
    container: {
        marginBottom: height*(0.033),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    text: {
        fontSize: width < 600 ? width*(0.03) : width*(0.02),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    unknown: {
        padding: 5,
        height: height*(0.056),
        width: '30%',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 15
    },
    invalid: {
        padding: 5,
        height: height*(0.056),
        width: '30%',
        justifyContent: 'center',
        backgroundColor: 'red',
        fontWeight: 'bold',
        borderRadius: 15
    },
    valid: {
        padding: 5,
        height: height*(0.056),
        width: '30%',
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: '#00EF5B',
        fontWeight: 'bold',
        borderRadius: 15
    }
})