import React, {forwardRef, useRef} from 'react';
import {TextInput as Input, StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/Colors';

const TextInput = (
  {
    placeholder,
    onChangeText,
    keyboardType,
    maxLength,
    iconLeft,
    iconRight,
    value,
    onFocus,
    onBlur,
    inputContainer
  },
  ref,
) => {
  return (
    <View style={[styles.inputContainer,{...inputContainer}]}>
      <View style={styles.iconLeft}>{iconLeft}</View>
      <Input
        onFocus={onFocus}
        style={styles.inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        ref={ref}
        value={value}
        onBlur={onBlur}
      />
      <View style={styles.iconRight}>{iconRight}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderRadius:50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth:1
  },
  inputStyle: {
    fontSize: 17,
    fontFamily: 'Urbanist-SemiBold',
    letterSpacing: 1,
    color:Colors.TextBlack,
    flexGrow: 1,
    height: 50,
  },
  iconLeft: {
    height: 50,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  iconRight: {
    height: 50,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 15,
  },
});

export default forwardRef(TextInput);
