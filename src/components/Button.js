import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import tw from '../lib/tailwind'
const Button = ({children,disabled, onPress, containerStyle,textStyle}) => {
  return (
      <TouchableOpacity
                activeOpacity={0.8}
                disabled={disabled}
                onPress={onPress}
                style={[tw`bg-app py-4 px-5 rounded-full`,{...containerStyle}]}>
                <Text
                  style={[tw`self-center font-myfontbold text-white text-p`,{...textStyle}]}>
                  {children}
                </Text>
              </TouchableOpacity>
   
    
  );
};

export default Button;
