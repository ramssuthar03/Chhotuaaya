import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  AddToCart,
  resetCart,
  SubQuantity,
  updateTotalPayAmount,
} from '../app/reducers/CartReducer';
import RazorpayCheckout from 'react-native-razorpay';
import LottieView from 'lottie-react-native';
import tw from '../lib/tailwind';
import {useIsFocused} from '@react-navigation/core';
import {
  useGetPaymentGatewaysMutation,
  usePlaceOrderMutation,
  useProcessRazorpayOrderMutation,
  useRazorpayCreateOrderMutation,
} from '../app/services/api';
const CheckOutScreen = ({navigation}) => {
  const totalPayAmount = useSelector(state => state.cart.totalPayAmount);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const totalItems = useSelector(state => state.cart.totalItems);
  const order = useSelector(state => state.cart.products);
  const location = useSelector(state => state.auth.user.data.default_address);
  const data = useSelector(state => state.auth.user.data);
  const user = useSelector(state => state.auth.user);
  const dispatchHandleCart = useDispatch();
  const [handlePaymentGateways, {isLoading: areGatewaysLoading}] =
    useGetPaymentGatewaysMutation();
  const [handlePlaceOrder, {isLoading: isOrderPlacing}] =
    usePlaceOrderMutation();
  const [handleCreateOrder, {isLoading: isOrderBeingCreated}] =
    useRazorpayCreateOrderMutation();
  const [handleProcessOrder, {isLoading: isOrderProcessing}] =
    useProcessRazorpayOrderMutation();
  useEffect(() => {
    handlePaymentGateways().then(res => {
      setPaymentGateways(res.data);
    });
  }, []);
  const [PaymentGateways, setPaymentGateways] = useState(null);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      {isOrderBeingCreated ? (
        <ActivityIndicator color={Colors.App} size="large" style={tw`flex-1`} />
      ) : (
        <>
          <Text style={tw`text-black font-myfontsemibold px-5 pt-3`}>
            Select Payment Option :
          </Text>
          <Text style={tw`text-black font-myfontbold px-5 pt-3`}>
            Total amount to be paid : {totalPayAmount} Rs.
          </Text>
          {PaymentGateways !== null ? (
            <View style={tw`px-5`}>
              {isOrderProcessing ? (
                <TouchableOpacity
                  activeOpacity={1}
                  style={tw`flex-row items-center justify-between bg-white px-5 py-5 rounded-1 mt-5`}>
                  <View>
                    <ActivityIndicator color={Colors.App} size="small" />
                  </View>
                  <View style={tw`w-15 h-15`}>
                    <Image
                      style={tw`w-full h-full`}
                      source={require('../../assets/images/razorpay.png')}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleProcessOrder({
                      totalAmount: totalAmount.toFixed(0),
                    })
                      .then(res => {
                        const options = {
                          description: 'Chhotuaaya',
                          currency: 'INR',
                          key: 'rzp_test_g86ywzvUueBrPI',
                          amount: res.data.response.amount,
                          order_id: res.data.response.id,
                          prefill: {
                            email: data.email,
                            contact: data.phone,
                            name: data.name,
                          },
                          theme: {color: Colors.App},
                        };

                        return RazorpayCheckout.open(options);
                      })
                      .then(res => {
                        return handlePlaceOrder({
                          location,
                          order,
                          method: 'RAZORPAY',
                          partial_wallet: false,
                          pending_payment: false,
                          delivery_type: 1,
                          dis: 0,
                          payment_token:res.razorpay_payment_id,
                          total: {
                            productQuantity: totalItems,
                            totalPrice: totalAmount,
                          },
                          user,
                        });
                      })
                      .then(res=>{
                        dispatchHandleCart(resetCart(res.data.success))
                        navigation.replace('OrderPlaced',{success:res.data.success})
                      })
                      .catch(err => {
                        navigation.replace('OrderPlaced',{success:false})
                      });
                  }}
                  style={tw`flex-row items-center justify-between bg-white px-5 py-5 rounded-1 mt-5`}>
                  <View>
                    <Text style={tw`text-sm text-black font-myfontbold`}>
                      Razorpay
                    </Text>
                    <Text style={tw`text-xs text-gray-800 font-myfontmedium`}>
                      Razorpay Payment Gateway
                    </Text>
                  </View>
                  <View style={tw`w-15 h-15`}>
                    <Image
                      style={tw`w-full h-full`}
                      source={require('../../assets/images/razorpay.png')}
                    />
                  </View>
                </TouchableOpacity>
          
              )}
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Payment')
                  }}
                  style={tw`flex-row items-center justify-between bg-white px-5 py-5 rounded-1 mt-5`}>
                  <View>
                    <Text style={tw`text-sm text-black font-myfontbold`}>
                      COD
                    </Text>
                    <Text style={tw`text-xs text-gray-800 font-myfontmedium`}>
                      Cash On Delivery
                    </Text>
                  </View>
                  <View style={tw`w-15 h-15`}>
                    <Image
                      style={tw`w-full h-full`}
                      source={require('../../assets/images/cod.png')}
                    />
                  </View>
                </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator
              color={Colors.App}
              size="large"
              style={tw`flex-1`}
            />
          )}
        </>
      )}
    </View>
  );
};
export default CheckOutScreen;
