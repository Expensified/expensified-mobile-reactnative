import React from "react"
import IntroFooterScroll from "./IntroFooterScroll"
import IntroFooterArrow from "./IntroFooterArrow"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native"

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

export default function IntroFooter(props) {
  // Consists of the JSX for the Footer element
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        zIndex: 1,
        paddingRight: 30,
        paddingLeft: 30
      }} onPress={() => props.skipToSignIn(props.currentPage)}>
        <Text style={styles.item}>Sign In</Text>
      </TouchableOpacity>
      <IntroFooterScroll active={props.currentPage} />
      <IntroFooterArrow swipeRight={props.swipeRight} />
    </View>
  )
}

// Styles used for the footer and its elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: width
  },
  item: {
    fontWeight: 'bold',
    color: '#005831',
    fontSize: 20
  }
})
