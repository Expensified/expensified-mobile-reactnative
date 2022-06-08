import React from "react"
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroContentPageOne() {
  // JSX for the content of the page
  return (
    <Image
      source={require('../../../assets/app-pie-chart.png')}
      style={styles.image}
    />
  )
}

// Styles used for this content page and its elements
const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
    marginRight: 'auto',
    marginTop: height < 800 ? height*(0.08)
    : width > 600 ? height*(0.25) : height*(0.2),
    marginLeft: width < 600  ? 'auto' : width*(0.3),
    width: width < 600 ? height*(0.33) : height*(0.4),
    height: width < 600 ? height*(0.33) : height*(0.4)
  }
})
