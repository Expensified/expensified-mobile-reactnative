import React from "react"
import StripedContainer from "./StripedContainer"
import IntroFooter from "./IntroFooter/IntroFooter"
import IntroHeader from "./IntroHeaders/IntroHeader"
import IntroContent from "./IntroContents/IntroContent"
import { View, SafeAreaView } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"

export default function IntroViewContainer(props) {
  // Returns JSX that encapsulates all of the required
  // elements for the introductory slideshow, with a
  // GestureRecognizer for swiping right and left in
  // the slideshow
  return (
    <GestureRecognizer
      config={{velocityThreshold: 0.1}}
      onSwipeRight={props.swipeLeft}
      onSwipeLeft={props.swipeRight}
      style={{flex: 1, backgroundColor: '#fff'}}
    >
      <StripedContainer striped={props.striped} />
      <SafeAreaView>
        <IntroHeader
          pages={props.fadeAnims}
          isSignIn={props.isSignIn}
          setIsSignIn={props.setIsSignIn}
        />
        <IntroContent
          handleSignIn={props.handleSignIn}
          handleSignUp={props.handleSignUp}
          pages={props.fadeAnims}
          isSignIn={props.isSignIn}
          setIsSignIn={props.setIsSignIn}
        />
      </SafeAreaView>
      <IntroFooter
        skipToSignIn={props.skipToSignIn}
        currentPage={props.currentPage}
        swipeRight={props.swipeRight}
        swipeLeft={props.swipeLeft}
      />
    </GestureRecognizer>
  )
}
