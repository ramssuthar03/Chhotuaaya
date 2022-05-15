import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import tw from '../lib/tailwind';
const width =  Dimensions.get('screen').width;
const height =  Dimensions.get('screen').height;
const RestaurantCard = ({item, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={tw`py-2 flex-1 mx-1 my-1`}>
        <View style={tw`rounded-2  bg-white overflow-hidden border-app`}>
        <Image
          style={{width:"100%",aspectRatio:1}}
          resizeMode='stretch'
          source={{uri: `https://chhotuaaya.com/${item.image}`}}
        />
        {/* <Image
          style={{width:width/3,aspectRatio:1,}}
          resizeMode='stretch'
          source={{uri: `https://chhotuaaya.com/${item.image}`}}
        /> */}
        </View>
      {/* <View style={tw`w-12 h-12 rounded-full bg-white overflow-hidden border-2 border-app z-100`}>
        <Image
          style={tw`w-full h-full z-100`}
          source={{uri: `https://chhotuaaya.com/${item.image}`}}
        />
      </View>

      <Text
        style={tw`text-gray-800 text-center text-xs w-15 pt-1 font-myfontbold z-100`}>
        {item.name}
      </Text>

      <View
        style={tw`bg-app absolute  bottom-0 left-0 right-0 top-8 z-10 bg-opacity-10 rounded-2`}></View> */}
    </TouchableOpacity>
  );
};

export default RestaurantCard;
