import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen';
import HomeScreen from '../screens/HomeScreen';
import AlertsScreen from '../screens/AlertsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CartScreen from '../screens/CartScreen';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import tw from '../lib/tailwind'
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  const displayAddress = useSelector(
    state => state.auth.user.data.default_address,
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.App,
        },
        headerTintColor: Colors.TextWhite,
        tabBarItemStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          
        },
        tabBarActiveTintColor: Colors.App,
        tabBarLabelStyle: {
          fontFamily: 'Urbanist-Bold',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={25}
              color={focused ? Colors.App : Colors.TextBlack}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddressManager', {prevRoute: 'Home'})
              }
              style={tw`flex-row items-center pr-2`}>
              <Icon
                name="map-marker"
                style={{paddingTop: 5}}
                size={20}
                color={Colors.TextWhite}
              />
              <Text style={tw`text-p2 text-white pt-1`}>{`${displayAddress.address
                .replace(/^[^,]+, */, '')
                .substring(0, 15)}...`}</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: Colors.App,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerShown:false
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="bell"
              size={25}
              color={focused ? Colors.App : Colors.TextBlack}
            />
          ),
        }}
        name="Notifications"
        component={AlertsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="feature-search"
              size={25}
              color={focused ? Colors.App : Colors.TextBlack}
            />
          ),
          headerStyle: {
            backgroundColor: Colors.App,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Explore"
        component={ExploreScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="cart"
              size={25}
              color={focused ? Colors.App : Colors.TextBlack}
            />
          ),
        }}
        name="Cart"
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="account"
              size={25}
              color={focused ? Colors.App : Colors.TextBlack}
            />
          ),
          headerStyle: {
            backgroundColor: Colors.App,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
