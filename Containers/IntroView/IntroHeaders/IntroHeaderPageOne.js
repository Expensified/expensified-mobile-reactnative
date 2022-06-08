import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroHeaderPageOne() {
  // JSX for the header of the page
  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>expensified</Text>
      <Text style={styles.tinyHeader}>expense tracking simplified</Text>
      <Text style={styles.introPageOneDesc}>A robust and secure expense tracker, for everyday use</Text>
    </View>
  )
}

// Styles used for this header and its elements
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    overflow: 'hidden'
  },
  mainHeader: {
    width: width,
    fontSize: width*(0.1067),
    color: '#005831',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tinyHeader: {
    width: width,
    fontSize: width*(0.04),
    color: '#005831',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  introPageOneDesc: {
    marginTop: width*(0.08),
    marginLeft: width*(0.053),
    color: '#046820',
    fontWeight: 'bold',
    width: Platform.OS == 'ios' ?
      (width < 600 ? width*(0.8) : width*(0.6))
      : width < 400 ? width*(0.8) : width*(0.6),
    lineHeight: height*(0.06),
    fontSize: height*(0.035)
  }
})
