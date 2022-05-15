import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import tw from '../lib/tailwind';
import IconFe from 'react-native-vector-icons/Feather';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';
import CartItem from '../components/CartItem';
import LottieView from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  AddToCart,
  SubQuantity,
  updateTotalPayAmount,
} from '../app/reducers/CartReducer';
import PaymentInfo from '../components/PaymentInfo';
import {useIsFocused} from '@react-navigation/core';
import {useAddItemsToCartMutation,useGetAddressesMutation} from '../app/services/api';

const CartScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatchHandleCart = useDispatch();
  const products = useSelector(state => state.cart.products);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const totalPayAmount = useSelector(state => state.cart.totalPayAmount);
  const deliveryCharge = useSelector(state => state.cart.deliveryCharge);
  const displayAddress = useSelector(
    state => state.auth.user.data.default_address,
  );
  
  const userId = useSelector(state => state.auth.user.data.user_id);
  const calculateTotalPayAmount = (totalAmount, deliveryCharge) => {
    const totalPayAmount = (
      (totalAmount * 18) / 100 +
      totalAmount +
      deliveryCharge
    )
      .toFixed(2)
      .toString();

    dispatchHandleCart(updateTotalPayAmount({totalPayAmount}));
  };
  const [Refresh, setRefresh] = useState(false);
  const [Addresses, setAddresses] = useState([]);
  const [handleGetAddress, {isLoading: isAddressesLoading}] =
    useGetAddressesMutation();
  useEffect(() => {
    handleGetAddress({user_id: userId})
      .then(res => {
        setAddresses(res.data);
      })
      .catch(err => console.log(err));
  }, [isFocused]);
  useEffect(() => {
    calculateTotalPayAmount(totalAmount, deliveryCharge);
  }, [totalAmount, deliveryCharge]);
  const [handleAddItemsToCart, {isLoading: isCartDataLoading}] =
    useAddItemsToCartMutation();

  return products.length > 0 ? (
    <ScrollView style={tw`flex-1`}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      <View style={tw`py-3   bg-white`}>
        {Addresses.length === 0? <TouchableOpacity
            onPress={() => {
             navigation.navigate('AddressManager', {prevRoute: 'Cart'})
            }}
            activeOpacity={0.8}
            style={styles.btnStyle}>
            <Text style={tw`text-white font-myfontbold`}>
              Add a New Address
            </Text>
          </TouchableOpacity> :
          <View style={tw`flex-row pl-5 items-start`}>
            <IconFe
              style={tw`mt-0.5`}
              name="map-pin"
              color={Colors.App}
              size={30}
            />
            <Text style={tw`text-sm text-black font-myfontmedium flex-3 pl-4 `}>
              {displayAddress.address}
            </Text>
            <View style={tw`flex-1  justify-center items-center`}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddressManager', {prevRoute: 'Cart'})
                }
                style={tw`bg-app bg-opacity-10 mt-0.5 rounded-1`}>
                <Text
                  style={{
                    color: Colors.App,
                    fontSize: 12,
                    padding: 9,
                    fontFamily: 'Urbanist-Bold',
                  }}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        {isCartDataLoading ? (
          <TouchableOpacity activeOpacity={1} style={styles.btnStyle}>
            <ActivityIndicator size="small" color={Colors.TextWhite} />
          </TouchableOpacity>
        ) : (Addresses.length === 0? <TouchableOpacity
          activeOpacity={1}
          style={styles.btnStyle}>
          <Text style={tw`text-white font-myfontbold`}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity> :
          <TouchableOpacity
            onPress={() => {
              handleAddItemsToCart({items: products})
                .then(res =>
                  navigation.navigate('Checkout', {cartData: res.data}),
                )
                .catch(err => console.log(err));
            }}
            activeOpacity={0.8}
            style={styles.btnStyle}>
            <Text style={tw`text-white font-myfontbold`}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {products.map(product => (
        <CartItem
          item={product}
          navigation={navigation}
          key={product.id}
          onPressIncrement={() => dispatchHandleCart(AddToCart({...product}))}
          onPressDecrement={() =>
            dispatchHandleCart(SubQuantity({id: product.id}))
          }
          quantity={product.quantity}
          price={product.price}
          title={product.name}
          image={`https://chhotuaaya.com/${product.image}`}
        />
      ))}
      {Addresses.length === 0 ?null: <PaymentInfo
        totalAmount={totalAmount}
        payAmount={totalPayAmount}
        deliveryCharge={deliveryCharge}
        isDataLoading={isCartDataLoading}
        handleOnPress={() => {
          handleAddItemsToCart({items: products})
            .then(res => navigation.navigate('Checkout', {cartData: res.data}))
            .catch(err => console.log(err));
        }}
      />}
    </ScrollView>
  ) : (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <LottieView
        style={tw`w-50`}
        source={require('../../assets/animations/empty_cart.json')}
        autoPlay
        loop
      />
      <Text style={tw`text-sm font-myfontsemibold mt-4 text-gray-700`}>
        Your Cart is Currently Empty !
      </Text>
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
    alignItems: 'center'
  },
});

export default CartScreen;
