import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet,
    Platform,
    TouchableOpacity
} from "react-native"
import DeviceInfo from "react-native-device-info"
import IntroContentValidation from "./IntroContentValidation"

const window = Dimensions.get('window'), width = window.width, height = window.height
export default function IntroContentPageFiveContainer(props) {
    // JSX for the sign in/sign up form determined by props
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{
                props.isSignIn ?
                "Sign into your Expensified Account:" :
                "Create a new account:"
            }</Text>
            <View style={styles.form}>
                { props.isSignIn && <Text style={styles.signIn}>Sign In</Text> }
                <Text style={
                    props.isSignIn ?
                    {color: 'gray', ...styles.emailText}
                    : {color: 'black', ...styles.emailText}
                }>Email</Text>
                <TextInput
                    value={props.email.email}
                    style={styles.textField}
                    onChangeText={props.email.setEmail}
                />
                <Text style={[
                    props.email.email == '' ||
                    props.isEmailValid() ?
                    {opacity: 0} : {},
                    styles.errorMessage
                ]}>Invalid Email</Text>
                <Text style={
                    props.isSignIn ?
                    {color: 'gray', ...styles.passwordText}
                    : {color: 'black', ...styles.passwordText}
                }>Password</Text>
                <TextInput
                    value={props.password.password}
                    secureTextEntry={true}
                    onEndEditing={() => (
                        props.password.password.trim() === '' &&
                        props.valid.setIsValid([null, null, null])
                    )}
                    onChangeText={(pass) => {
                        props.password.setPassword(pass)
                        props.updatePasswordValid(pass)
                    }}
                    style={{
                        ...styles.textField,
                        marginBottom: height*(0.02)
                    }}
                />
                {!props.isSignIn && (
                    <IntroContentValidation
                        completed={props.valid.isValid}
                    /> 
                )}
                { !props.isSignIn && (
                    <><Text style={
                            props.isSignIn ?
                            {color: 'gray', ...styles.passwordText}
                            : {color: 'black', ...styles.passwordText}
                    }>Confirm Password</Text>
                    <TextInput
                            value={props.confirmPassword.confirmPassword}
                            onChangeText={props.confirmPassword.setConfirmPassword}
                            secureTextEntry={true}
                            style={{
                                ...styles.textField,
                                marginBottom: height*(0.02)
                            }}
                    /></>
                )}
                <TouchableOpacity
                    style={ props.isFormValid() ? styles.submitButton : styles.unsubmittableButton }
                    onPress={() => props.isSignIn ? props.handleSignIn() : props.handleSignUp()}
                    disabled={!props.isFormValid()}
                >
                    <Text style={{color: 'white', fontSize: height*(0.022), textAlign: 'center'}}>
                        { props.isSignIn ? "Continue" : "Create Account" }
                    </Text>
                </TouchableOpacity>
                <View style={styles.switcher}>
                    <Text style={{
                        fontSize: 15,
                        color: 'gray',
                        fontWeight: 'bold'
                    }}>{ props.isSignIn ? "Don't have an account?" : "Already have an account?" }</Text>
                    <TouchableOpacity onPress={() => props.setIsSignIn(!props.isSignIn)}>
                        <Text style={{
                            fontSize: 15,
                            color: '#19B092',
                            fontWeight: 'bold'
                        }}>{ props.isSignIn ? "   Sign Up" : "   Sign In" }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

// Styles used for the content page and form elements
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    form: {
        marginBottom: 'auto',
        width: width-150
    },
    switcher: {
        width: width-150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    emailText: {
        fontSize: height*(0.022),
        marginBottom: height*(0.011),
        fontWeight: 'bold'
    },
    textField: {
        color: 'black',
        paddingLeft: 5,
        height: Platform.OS == 'ios' ? height*(0.039) : height*(0.055),
        marginBottom: height*(0.011),
        borderColor: '#CCCCCC',
        borderRadius: 8,
        borderWidth: 1.5
    },
    passwordText: {
        fontSize: height*(0.022),
        marginBottom: height*(0.011),
        fontWeight: 'bold'
    },
    submitButton: {
        padding: 10,
        marginBottom: height*(0.04),
        borderRadius: 10,
        backgroundColor: "#3498DB"
    },
    unsubmittableButton: {
        padding: 10,
        marginBottom: height*(0.04),
        borderRadius: 10,
        backgroundColor: "#98CBEC"
    },
    errorMessage: {
        fontWeight: 'bold',
        fontSize: height*(0.015),
        marginBottom: height*(0.022),
        color: 'red'
    },
    header: {
        padding: width*(0.09),
        width: width,
        color: '#19B092',
        marginTop: DeviceInfo.hasNotch() || Platform.OS != 'ios'
        ? height*(-0.11) : height*(-0.075),
        fontSize: height*(0.031),
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: height*(0.045)
    },
    signIn: {
        fontWeight: 'bold',
        fontSize: height*(0.023),
        marginBottom: height*(0.017)
    },
    image: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: height*(0.4),
        height: height*(0.4)
    },
    confirmation: {
        backgroundColor: 'red',
        width: width-50,
        height: height-150
    }
})