import React, { useState, useEffect } from "react"
import IntroViewContainer from "../../Containers/IntroView/IntroViewContainer"
import IntroSignUpConfirmation from "../../Containers/IntroView/Confirmation/IntroSignUpConfirmation"
import NotificationSounds, { playSampleSound } from "react-native-notification-sounds"
import ReactNativeHapticFeedback from "react-native-haptic-feedback"
import Modal from "react-native-modal"
import {
  Animated,
  StyleSheet,
  Vibration,
  StatusBar,
  Dimensions,
  Platform
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get("window"), width = window.width, height = window.height

export default function IntroViewComponent(props) {
  // All of the state required to manage the transitions betweeen each slideshow
  const [ fadeAnims ] = useState([...Array(5)].map(() => new Animated.Value(0)))
  const [ stripedSkewable ] = useState(new Animated.Value(0))
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ currentPage, setCurrentPage ] = useState(0)
  const [ isSignIn, setIsSignIn ] = useState(true)
  const verificationCode = 171922 // Sample hard-coded verfication code
  const [ confirmIndicators ] = useState([
    new Animated.Value(1),
    new Animated.Value(0),
    new Animated.Value(0)
  ])

  // Set of functions that are used to 'swipe right' to the next
  // slideshow and 'swipe left' to previous slideshow, consists
  // of a fadeIn animation to fade a slide in, fade out, and 3
  // more functions to manage animation for the striped background
  const fadeIn = (fadeAnim, ms) => {
    setCurrentPage(fadeAnims.indexOf(fadeAnim))
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ms || 500,
      useNativeDriver: false
    })
   }, fadeOut = (fadeAnim, ms) => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: ms || 500,
      useNativeDriver: false
    })
  }, setStripedDiagonal = (ms) => (
    Animated.timing(stripedSkewable, {
      toValue: 1,
      duration: ms || 500,
      useNativeDriver: false
    })
  ), setStripedNormal = (ms) => (
    Animated.timing(stripedSkewable, {
      toValue: 0.5,
      duration: ms || 500,
      useNativeDriver: false
    })
  ), setStripedHalfNormal = (ms) => (
    Animated.timing(stripedSkewable, {
      toValue: 0,
      duration: ms || 100,
      useNativeDriver: false
    })
  )

  // Function to simulate the swiping of the slideshow to the right
  function swipeRight() {
    if(currentPage == fadeAnims.length-1) return
    fadeOut(fadeAnims[currentPage]).start()
    fadeIn(fadeAnims[currentPage+1]).start()
    if(currentPage == fadeAnims.length-2) setStripedHalfNormal().start()
    else setStripedNormal(500).start()
  }

  // Function to simulate the swiping of the slideshow to the left
  function swipeLeft() {
    if(currentPage == 0) return
    fadeOut(fadeAnims[currentPage]).start()
    fadeIn(fadeAnims[currentPage-1]).start()
    if(currentPage == 1) setStripedDiagonal().start()
    else setStripedNormal().start()
  }

  // Function to simulate the skipping of the slideshow to the last page
  function skipToSignIn() {
    if(currentPage == fadeAnims.length-1) return
    fadeOut(fadeAnims[currentPage]).start()
    fadeIn(fadeAnims[fadeAnims.length-1]).start()
    setStripedHalfNormal().start()
  }

  // Fade in the first slideshow when the
  // application is first mounted
  useEffect(() => {
    setStripedDiagonal().start(() => (
      fadeIn(fadeAnims[0]).start()
    ))
  }, [])

  // Handler function when the sign in button is clicked
  function handleSignIn() {
    alert('Signing In!')
  }

  // Handler function when the sign up button is clicked
  function handleSignUp() {
    setModalVisible(true)
  }

  // Handler function when the six-digit code has been entered
  function handleCodeEntry(obj, text2) {
    // Determine the text depending on whether it came from endEditing or changeText
    const text = obj !== null ? obj._dispatchInstances.memoizedProps.text : text2

    // Function to animate the change between the indicators
    function toOpacities(loader, valid, invalid) {
      Animated.timing(confirmIndicators[0], {
        toValue: loader,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(confirmIndicators[1], {
        toValue: valid,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(confirmIndicators[2], {
        toValue: invalid,
        duration: 500,
        useNativeDriver: false
      }).start()
    }

    // Check and change opacities based on validity of code entered
    if(text.length < 6) { toOpacities(1, 0, 0); return }
    else if(+text === verificationCode) {
      // Play the Apple Success Sound when it is verified
      if(handleCodeEntry.hasSuccessGone) {
        playSampleSound({ soundID: 1407 })
        handleCodeEntry.hasSuccessGone = false
      } else handleCodeEntry.hasSuccessGone = true

      // Trigger a haptic feedback when successful
      ReactNativeHapticFeedback.trigger("notificationSuccess", {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true
      })

      // Change the opacities of the indicators and close the modal
      toOpacities(0, 1, 0)
      setTimeout(() => setModalVisible(false), 1000)
    }
    else {
      // Play the Apple Failure Sound when it is not verified
      if(handleCodeEntry.hasFailureGone && Platform.OS === 'ios') {
        NotificationSounds.getNotifications().then(soundsList => {
          playSampleSound(soundsList.filter(sound => (
            sound.title === 'payment failure'
          ))[0])
        })
        handleCodeEntry.hasFailureGone = false
      } else handleCodeEntry.hasFailureGone = true

      // Vibrate the phone for 1.5s and change the opacities of the indicators
      Vibration.vibrate(1000)
      toOpacities(0, 0, 1)
    }
  }

  // Create a container for the state and return it
  return (
    <>
      <Modal
        useNativeDriver={false}
        isVisible={modalVisible}
        style={styles.modalContainer}
      ><IntroSignUpConfirmation
          handleCodeEntry={handleCodeEntry}
          confirmIndicators={confirmIndicators}
      /></Modal>
      <IntroViewContainer
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        skipToSignIn={skipToSignIn}
        isSignIn={isSignIn}
        fadeAnims={fadeAnims}
        striped={stripedSkewable}
        swipeRight={swipeRight}
        swipeLeft={swipeLeft}
        setIsSignIn={setIsSignIn}
        currentPage={currentPage}
      />
    </>
  )
}

// Consists of the styles used for the modal view
const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: height*(0.078)+StatusBar.currentHeight*(-0.5),
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'flex-start',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    width: '90%',
  }
})