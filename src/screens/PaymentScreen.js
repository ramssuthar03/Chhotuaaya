import React from 'react';
import { Text, View, TouchableHighlight, TextInput } from 'react-native';
import tw from '../lib/tailwind';
import {
    usePlaceOrderMutation,
  } from '../app/services/api';
  import {
    resetCart,
  } from '../app/reducers/CartReducer';
import Button from '../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
const PaymentScreen = ({navigation}) => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const totalItems = useSelector(state => state.cart.totalItems);
  const order = useSelector(state => state.cart.products);
  const location = useSelector(state => state.auth.user.data.default_address);
  const user = useSelector(state => state.auth.user);
    const [changeAmount,setChangeAmount] = useState('')

    const [handlePlaceOrder, {isLoading: isOrderPlacing}] =
    usePlaceOrderMutation();
    const dispatchHandleCart = useDispatch();
    console.log(changeAmount)
    return ( <View  style={tw`flex-1 bg-white`}>
        <Text style={tw`self-center px-5 pt-10 text-p font-myfontbold text-darkblue`}>Enter Cash Change Amount</Text>
        <TextInput keyboardType='numeric' maxLength={5} value={changeAmount} onChangeText={(text)=>setChangeAmount(text)} style={tw`h-13 border border-app mx-5 rounded-full mt-3 px-4`} />
        <Text style={tw`self-center px-5 text-center text-p2 py-3 font-myfontbold text-darkblue`}>Leave blank if you don't require any cash change on your COD order.</Text>
        <Button onPress={()=>{
            handlePlaceOrder({
                cash_change_amount:changeAmount,
                location,
                order,
                method: 'COD',
                partial_wallet: false,
                pending_payment: false,
                delivery_type: 1,
                dis: 0,
                total: {
                  productQuantity: totalItems,
                  totalPrice: totalAmount,
                },
                user,
              })
            .then(res=>{
              dispatchHandleCart(resetCart(res.data.success))
              navigation.replace('OrderPlaced',{success:res.data.success})
            })
            .catch(err => {
              navigation.replace('OrderPlaced',{success:false})
            });
        }} containerStyle={tw`mx-5`}>Order</Button>
    </View> );
}
 
export default PaymentScreen;