import React from "react"
import DeviceInfo from "react-native-device-info"
import {
  View,
  Dimensions,
  Animated,
  Platform
} from "react-native"

// Store the device constants like the window's width and height, as well as whether it has a notch
const window = Dimensions.get('window'), width = window.width, height = window.height
const hasNotch = DeviceInfo.hasNotch()

export default function StripedContainer(props) {
  // Consists of the JSX for displaying the striped background
  return (
    <>
      <Animated.View style={[
        styles.darkgreenView,
        {
          height: props.striped.interpolate({
            inputRange: [0, 1],
            outputRange: [100, height*(0.2)]
          })
        }
      ]} />
      <Animated.View style={[
        Platform.OS == 'ios' ? styles.iosContainer : styles.androidContainer,
        {
          transform: [{
            skewY: props.striped.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-35deg'],
              easing: (num) => (
                num < 0.5 ? 0 : num-0.5
              )
            })
          }],
          top: props.striped.interpolate({
            inputRange: [0, 1],
            outputRange: [90, 0],
            easing: (num) => (
              num < 0.75 ? (hasNotch ? (num ? 0 : 0.4) : 0.6) : num-0.5
            )
          }),
          height: props.striped.interpolate({
            inputRange: [0, 1],
            outputRange: [80, height/2.6],
            easing: (num) => (
              num <= 0.5 && num >= 0.2 ? 160/height : num
            )
          })
        }
      ]}>
        <View style={styles.greenView} />
        <View style={styles.darkgreenblueView} />
        <View style={styles.greenblueView} />
      </Animated.View>
    </>
  )
}

// Styles used for the striped background
const styles = {
  iosContainer: {
    position: 'absolute',
    top: 0,
    width: width
  },
  androidContainer: {
    position: 'absolute',
    left: width*(-0.35),
    top: 0,
    width: width*(1.6)
  },
  darkgreenView: {
    position: 'absolute',
    width: width,
    zIndex: -2,
    backgroundColor: '#02D224'
  },
  greenView: {
    flex: 1,
    height: height*(0.15),
    zIndex: -2,
    backgroundColor: '#0BF554'
  },
  darkgreenblueView: {
    flex: 1,
    height: height*(0.15),
    zIndex: -3,
    backgroundColor: '#1CC87C'
  },
  greenblueView: {
    flex: 1,
    height: height*(0.15),
    zIndex: -4,
    backgroundColor: '#00E696'
  }
}
