import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from '../lib/tailwind'
import Colors from '../constants/Colors';

const Counter = ({onPressDecrement,onPressIncrement}) => {
  return (
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity
      onPress={onPressDecrement}
        style={tw` w-8 h-8 bg-opacity-20 bg-error justify-center items-center rounded-full`}>
        <Icon color={Colors.Error} size={20} name="remove" />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>onPressIncrement()}
        style={tw` w-8 h-8 bg-opacity-20 bg-error justify-center items-center ml-2 rounded-full`}>
        <Icon color={Colors.Error} size={20} name="add" />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
