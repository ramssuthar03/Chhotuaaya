import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {select} from '../app/reducers/StyleReducer';
const RadioGroup = ({handleSelected,inputPlaceHolder}) => {
  const selectedStyle = tw`w-15 h-7 rounded-1 bg-red-500 items-center justify-center mr-2`;
  const selectedTextStyle = tw`text-white`;
  const [otherSelected, setotherSelected] = useState(false);
  const data = useSelector(state => state.style.radioStyle);
  const dispatchSelect = useDispatch();
  const inputRef = useRef();
  const handleOnPress = (id, value) => {
    dispatchSelect(select({id, value}));
    
    if (value == 'Other') {
      setotherSelected(true)
    }else{
      setotherSelected(false)
      handleSelected(value)
    }
  };
  return (
    <View style={tw``}>
      <View style={tw`flex-row`}>
        {data.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => handleOnPress(item.id, item.value)}
            style={item.unselectedStyle}>
            <Text style={item.unselectedTextStyle}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {otherSelected ? (
          <TextInput
          placeholder={inputPlaceHolder}
            maxLength={5}
            onChangeText={value=>handleSelected(value)}
            keyboardType="numeric"
            style={tw`border-b  pt-1 mt-2 text-sm border-b-red-500 pb-1 pl-0.5`}
          />
        ) : null}
      </View>
    </View>
  );
};

export default RadioGroup;
