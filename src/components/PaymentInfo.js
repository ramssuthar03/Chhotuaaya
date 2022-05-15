import React from 'react';
import tw from '../lib/tailwind';
import {View, Text, TouchableOpacity, StyleSheet,ActivityIndicator, TextInput} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { useApplyCouponMutation } from '../app/services/api';
const PaymentInfo = ({
  totalAmount,
  deliveryCharge,
  payAmount,
  handleOnPress,
  isDataLoading,
}) => {



  const [ handleApplyCoupon, {isLoading:isApplying} ] = useApplyCouponMutation()

  return (
    <View style={tw`bg-white py-5`}>
      {/* <View style={tw`flex-row justify-between px-4 pb-3`}>
        <TextInput style={tw`flex-1 h-10 px-3 border border-darkblue rounded-1`} placeholder='Coupon' /><TouchableOpacity
          onPress={()=>{
            handleApplyCoupon({}).then(res=>{

            }).catch(err=>{

            })
          }}
          activeOpacity={0.8}
          
          style={tw`bg-app border border-app px-4 items-center justify-center ml-2 rounded-1`}>
          <Text style={tw`text-white font-myfontbold `}>Apply</Text>
        </TouchableOpacity>
      </View> */}
      <View style={tw`flex-row justify-between px-7 py-1`}>
        <Text style={tw`text-black font-myfontbold`}>Total</Text>
        <View style={tw`flex-row items-center`}>
          <IconF name="rupee" />
          <Text style={tw`text-black font-myfontbold pl-1`}>{totalAmount}</Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between px-7 py-1`}>
        <Text style={tw`text-black font-myfontmedium`}>Delivery Charges</Text>
        <View style={tw`flex-row items-center`}>
          <IconF name="rupee" />
          <Text style={tw`text-black font-myfontmedium pl-1`}>{deliveryCharge}</Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between px-7 py-1`}>
        <Text style={tw`text-red-500 font-myfontmedium`}>Tax</Text>
        <View style={tw`flex-row items-center`}>
          <IconI color={Colors.Error} name="add" />
          <Text style={tw`text-red-500 font-myfontmedium pl-1`}>18%</Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between px-7 py-1`}>
        <Text style={tw`text-black font-myfontbold`}>To Pay</Text>
        <View style={tw`flex-row items-center`}>
          <IconF name="rupee" />
          <Text style={tw`text-black font-myfontbold  pl-1`}>{payAmount}</Text>
        </View>
      </View>
      {isDataLoading ? (
        <TouchableOpacity activeOpacity={1} style={styles.btnStyle}>
          <ActivityIndicator size="small" color={Colors.TextWhite} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleOnPress}
          activeOpacity={0.8}
          style={styles.btnStyle}>
          <Text style={tw`text-white font-myfontbold `}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.App,
    margin: 15,
    marginBottom: 0,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default PaymentInfo;
