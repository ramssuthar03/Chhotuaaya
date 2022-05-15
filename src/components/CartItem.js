import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import tw from '../lib/tailwind';
import IconF from 'react-native-vector-icons/FontAwesome';
import Counter from '../components/Counter';
import Colors from '../constants/Colors';
const CartItem = ({image,title,price,onPressDecrement,onPressIncrement,quantity,navigation,item}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={()=>{navigation.navigate('Product',{id:item.id,name:item.name})}}
      style={tw`flex-row py-2 items-center rounded-1 mb-0.5 bg-white text-black`}>
      <View style={tw`w-12 h-12 ml-5`}>
        <Image
          style={tw` w-full h-full `}
          resizeMode="contain"
          source={{uri:image}}
        />
      </View>
      <View style={tw`flex-grow flex-2 pl-4 pb-1`}>
        <Text style={tw`text-sm font-myfontbold text-black`}>{title}</Text>
        <Text style={{color: Colors.Success, fontFamily:'Urbanist-Medium', fontSize: 12}}>In Stock</Text>

        <View style={tw`flex-row pt-0.5`}>
          <View style={tw`flex-row`}>
            <IconF
              style={tw`pt-0.5`}
              color={Colors.Error}
              size={15}
              name="rupee"
            />
            <Text style={tw`text-sm items-center font-myfontbold text-error pl-0.5`}>{price}</Text>
          </View>
          <Text style={{color: Colors.TextBlack, paddingLeft:5, fontSize: 12,fontWeight:'800',paddingTop:2,fontFamily:'Urbanist-Bold'}}>
            {!quantity===null||quantity>0?`Qt. ${quantity}`:null}
          </Text>
        </View>
      </View>
      <View style={tw`flex-1 pr-5`}>
        <Counter onPressDecrement={onPressDecrement} onPressIncrement={onPressIncrement} />
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;
