import React from "react"
import IntroHeaderPageOne from "./IntroHeaderPageOne"
import IntroHeaderPageTwo from "./IntroHeaderPageTwo"
import IntroHeaderPageThree from "./IntroHeaderPageThree"
import IntroHeaderPageFour from "./IntroHeaderPageFour"
import IntroHeaderPageFive from "./IntroHeaderPageFive"
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroHeader(props) {
  // Two functions to return the width and height interpolation
  // for each of the animated slideshow headers below
  const getWidthInterpolation = (i) => (
    props.pages[i].interpolate({
      inputRange: [0, 1],
      outputRange: [0, width]
    })
  ), getHeightInterpolation = (i) => (
    props.pages[i].interpolate({
      inputRange: [0, 1],
      outputRange: [0, i ? height*(0.195)+StatusBar.currentHeight : 300],
    })
  )

  // Return JSX that renders each slideshow header based on the
  // current animation state
  return (
    <View>
      <Animated.View style={{
        opacity: props.pages[0],
        width: getWidthInterpolation(0),
        height: getHeightInterpolation(0),
        zIndex: 1
      }}><IntroHeaderPageOne /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[1],
        width: getWidthInterpolation(1),
        height: getHeightInterpolation(1),
        zIndex: 2
      }}><IntroHeaderPageTwo /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[2],
        width: getWidthInterpolation(2),
        height: getHeightInterpolation(2),
        zIndex: 3
      }}><IntroHeaderPageThree /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[3],
        width: getWidthInterpolation(3),
        height: getHeightInterpolation(3),
        zIndex: 4
      }}><IntroHeaderPageFour /></Animated.View>
      <Animated.View style={{
        opacity: props.pages[4],
        width: getWidthInterpolation(4),
        height: getHeightInterpolation(4),
        zIndex: 5
      }}>
        <IntroHeaderPageFive isSignIn={props.isSignIn} />
      </Animated.View>
    </View>
  )
}
