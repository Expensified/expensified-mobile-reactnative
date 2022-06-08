import React from "react"
import IntroContentPageOne from "./IntroContentPageOne"
import IntroContentPageTwo from "./IntroContentPageTwo"
import IntroContentPageThree from "./IntroContentPageThree"
import IntroContentPageFour from "./IntroContentPageFour"
import IntroContentPageFiveComponent from
"../../../Components/IntroView/IntroContents/IntroContentPageFiveComponent"

import {
  View,
  Dimensions,
  StyleSheet,
  Animated
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroContent(props) {
  // Two functions to return the width and height interpolation
  // for each of the animated slideshow contents below
  const getWidthInterpolation = (i) => (
    props.pages[i].interpolate({
      inputRange: [0, 1],
      outputRange: [0, width]
    })
  ), getHeightInterpolation = (i) => (
    props.pages[i].interpolate({
      inputRange: [0, 1],
      outputRange: [0, i ? height*(0.65) : 300],
    })
  )

  // Return JSX that renders each slideshow content based on the
  // current animation state
  return (
    <View style={styles.container}>
      <Animated.View style={{
        opacity: props.pages[0].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          easing: (num) => (
            num < 0.5 ? num/2 : num
          )
        }),
        width: getWidthInterpolation(0),
        height: getHeightInterpolation(0),
        zIndex: 1
      }}><IntroContentPageOne /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[1],
        width: getWidthInterpolation(1),
        height: getHeightInterpolation(1),
        zIndex: 2
      }}><IntroContentPageTwo /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[2],
        width: getWidthInterpolation(2),
        height: getHeightInterpolation(2),
        zIndex: 3
      }}><IntroContentPageThree /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[3],
        width: getWidthInterpolation(3),
        height: getHeightInterpolation(3),
        zIndex: 4
      }}><IntroContentPageFour /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[4],
        width: getWidthInterpolation(4),
        height: getHeightInterpolation(4),
        zIndex: 5
      }}>
        <IntroContentPageFiveComponent
          isSignIn={props.isSignIn}
          setIsSignIn={props.setIsSignIn}
          handleSignIn={props.handleSignIn}
          handleSignUp={props.handleSignUp}
        />
      </Animated.View>
    </View>
  )
}

// Consists of the styles for the content container
const styles = StyleSheet.create({
  container: {
    marginTop: width > 600 ? height*(-0.049) : 0,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})
