import { Animated, StyleSheet, Dimensions, Keyboard } from 'react-native'
import React, { useState } from 'react'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

// Store the device constants like the window's width and height
const window = Dimensions.get('window'), width = window.width, height = window.height

// Constants and functions used for the animation of the cells
const animationsColor = [...new Array(6)].map(() => new Animated.Value(0));
const animationsScale = [...new Array(6)].map(() => new Animated.Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export default function IntroSignUpCodeField(props) {
  // State used to manage the value of the text input and the code field's props
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Function that returns a cell for each code box
  const renderCell = ({index, symbol, isFocused}) => {
    // Constants used for determining the cell's style and value
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['#2EFFA3', '#AAF0D1'],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['#FFF', '#AAF0D1'],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [width*(0.093), 8],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1],
          }),
        },
      ],
    };

    // Run the cell animation after this component has
    // returned by this function and is mounted
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    // Return the JSX for the component
    return (
      <Animated.Text
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </Animated.Text>
    );
  };

  // JSX for the code field containing the cells
  return (
    <CodeField
      ref={ref}
      {...codeFieldProps}
      value={value}
      returnKeyType='done'
      cellCount={6}
      onChangeText={(text) => {
        setValue(text)
        props.handleCodeEntry(null, text)
      }}
      autoFocus={true}
      onEndEditing={props.handleCodeEntry}
      rootStyle={styles.codeFieldRoot}
      onSubmitEditing={Keyboard.dismiss}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={renderCell}
    />
  );
};

// Styles used for the code field and its cells
const styles = StyleSheet.create({
    codeFieldRoot: {
        height: width*(0.093),
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cell: {
        lineHeight: width*(0.093)*(0.9),
        marginHorizontal: 8,
        height: width*(0.093),
        width: width*(0.093),
        fontSize: width*(0.07),
        textAlign: 'center',
        borderRadius: 8,
        color: '#046820',
        backgroundColor: '#fff',

        // Cell shadow for iOS
        shadowColor: '#00E1A0',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,

        // Cell shadow for Android
        elevation: 5,
    }
})