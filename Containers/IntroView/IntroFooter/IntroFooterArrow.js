import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"

export default function IntroFooterArrow(props) {
  // JSX used to display the footer arrow button
  return (
      <TouchableOpacity
        onPress={props.swipeRight}
        style={styles.container}
      >
        <View style={styles.arrow}></View>
      </TouchableOpacity>
  )
}

// Styles used for the footer arrow button
const styles = StyleSheet.create({
  container: {
    paddingRight: 30,
    paddingLeft: 30
  },
  arrow: {
    zIndex: 50,
    width: 18,
    height: 18,
    borderColor: 'darkgreen',
    borderRightWidth: 5,
    borderBottomWidth: 5,
    transform: [{ rotate: '-45deg' }],
    padding: 3
  }
})
