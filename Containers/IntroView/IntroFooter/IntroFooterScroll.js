import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroFooterScroll(props) {
  // JSX element for the footer scroll element
  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map(i => (
        <View
          style={props.active == i ? styles.active : styles.normal}
          key={i}
        ></View>
      ))}
    </View>
  )
}

// Styles used for the footer scroll and its elements
const styles = StyleSheet.create({
  container: {
      flexDirection: 'row'
  },
  normal: {
    borderRadius: 20,
    width: 15,
    height: 15,
    marginRight: 10,
    backgroundColor: '#005831'
  },
  active: {
    borderRadius: 20,
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: '#00EB55'
  }
})
