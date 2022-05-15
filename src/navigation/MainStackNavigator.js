import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainScreen from '../screens/MainScreen';
import LocationScreen from '../screens/LocationScreen';
import AddressScreen from '../screens/AddressScreen';
import {useSelector} from 'react-redux';
import BottomTabNavigator from './BottomTabNavigator';
import AddressManagerScreen from '../screens/AddressManagerScreen';
import Colors from '../constants/Colors';
import RestaurantItemScreen from '../screens/RestaurantItemScreen';
import WalletScreen from '../screens/WalletScreen';
import FavouriteProductsScreen from '../screens/FavouriteProductsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderPlacedScreen from '../screens/OrderPlacedScreen';
import ProductDetails from '../screens/ProductDetails';
import TrackOrderScreen from '../screens/TrackOrderScreen';
import { TouchableOpacity, Text } from 'react-native';

import tw from 'twrnc';
import BrandItems from '../screens/BrandItems';
const Stack = createNativeStackNavigator();
const MainStackNavigator = () => {
  const isLoggedIn = useSelector(state => state.auth.user.success);
  const isAddressSaved = useSelector(
    state => state.auth.user.data.default_address,
  );
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerShadowVisible:false
      }}>
      {isLoggedIn == true ? (
        isAddressSaved == null ? (
          <>
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Select Address',
              }}
              name="Location"
              component={LocationScreen}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.App,
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Address',
              }}
              name="Address"
              component={AddressScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="BottomTab"
              component={BottomTabNavigator}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Manage Addresses',
              }}
              name="AddressManager"
              component={AddressManagerScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Wallet',
              }}
              name="Wallet"
              component={WalletScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Favourite Stores',
              }}
              name="FavouriteProducts"
              component={FavouriteProductsScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Orders',
              }}
              name="Orders"
              component={OrdersScreen}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Select Address',
              }}
              name="Location1"
              component={LocationScreen}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.App,
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Address',
              }}
              name="Address1"
              component={AddressScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: '',
              }}
              name="RestaurantItem"
              component={RestaurantItemScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Checkout',
              }}
              name="Checkout"
              component={CheckOutScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Payment',
              }}
              name="Payment"
              component={PaymentScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Order',
              }}
              name="OrderPlaced"
              component={OrderPlacedScreen}
            />
            <Stack.Screen
              options={
                
                 ({ route }) => ({ title: route.params.name,headerTitleStyle:{
                  fontFamily:"Urbanist-Bold",
                    fontSize:20
                } })
              }
              
              name="Product"
              component={ProductDetails}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Order Tracking',
              }}
              name="Track"
              component={TrackOrderScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: Colors.App,
                },
                
                headerTintColor: Colors.TextWhite,
                headerTitle: 'Order Tracking',
              }}
              name="BrandItems"
              component={BrandItems}
            />
          </>
        )
      ) : (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name="Main"
            component={MainScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={RegistrationScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
