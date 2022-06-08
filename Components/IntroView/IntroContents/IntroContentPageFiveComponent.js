import React, { useState } from "react"
import IntroContentPageFiveContainer from
"../../../Containers/IntroView/IntroContents/IntroContentPageFiveContainer"

export default function IntroContentPageFiveComponent(props) {
    // State required for the confirmation & display of sign in/up form
    const [ isValid, setIsValid ] = useState([null, null, null])
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')

    // Regular Expressions used to validate the email and password fields
    const emailRegex =  new RegExp([
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)',
        '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]',
        '{1,3}\\])|(([a-zA-Z\\-0-9]+\.)+[a-zA-Z]{2,}))$'
    ].join('')), specialCharRegex = /(?=.*[\+\-\_\!\@\#\$\%\&])/;
    
    // Set of functions that are called repeatedly during the filling out of the
    // form to determine whether or not the values entered are valid
    const isConfirmedPasswordValid = () => (
        confirmPassword.trim() !== '' && confirmPassword === password
    ), isPasswordValid = () => {
        const pass = password.trim()
        if(pass === pass.toLowerCase()) return false
        if(!pass.match(specialCharRegex)) return false
        if(pass.length < 8) return false
        return true
    }, updatePasswordValid = (password) => {
        let pass = password.trim(), newIsValid = [true, true, true]
        if(pass === pass.toLowerCase()) newIsValid[0] = false
        if(!pass.match(specialCharRegex)) newIsValid[1] = false
        if(pass.length < 8) newIsValid[2] = false
        setIsValid(newIsValid)
    }, isEmailValid = () => (email.trim().match(emailRegex)),
    isFormValid = () => {
        return (
            !props.isSignIn ?
                isValid.every(valid => valid) &&
                isConfirmedPasswordValid() &&
                isPasswordValid() && isEmailValid()
            : isPasswordValid() && isEmailValid()
        )
    }

    // Create a container for the intro slideshow five and pass all props
    return (
        <IntroContentPageFiveContainer
            isSignIn={props.isSignIn}
            setIsSignIn={props.setIsSignIn}
            email={{email, setEmail}}
            isFormValid={isFormValid}
            isEmailValid={isEmailValid}
            valid={{isValid, setIsValid}}
            handleSignUp={props.handleSignUp}
            handleSignIn={props.handleSignIn}
            password={{password, setPassword}}
            updatePasswordValid={updatePasswordValid}
            confirmPassword={{
                confirmPassword,
                setConfirmPassword
            }}
        />
    )
}