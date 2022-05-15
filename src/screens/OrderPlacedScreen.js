import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';

import tw from '../lib/tailwind';
import LottieView from 'lottie-react-native';
const OrderPlacedScreen = ({navigation, route}) => {
  const { success } = route.params;
  return (
    <View style={styles.container}>
      {!success?<View style={tw`flex-1 items-center justify-start pt-10 bg-white`}>
        <LottieView
          style={tw`w-50`}
          source={require('../../assets/animations/error.json')}
          autoPlay
          loop={false}
        />
        <Text style={tw`text-sm font-myfontmedium text-black`}>Payment Failed</Text>
      </View>:<View style={tw`flex-1 items-center justify-start pt-10 bg-white`}>
        <LottieView
          style={tw`w-50`}
          source={require('../../assets/animations/success.json')}
          autoPlay
          loop={false}
        />
        <Text style={tw`text-sm font-myfontmedium text-black`}>Order Placed Successfully</Text>
        <TouchableOpacity
              onPress={() =>
                navigation.replace('Orders')
              }
              style={tw`bg-red-500 bg-opacity-10 mt-5 rounded-1`}>
              <Text style={{color: Colors.App, fontSize: 12, padding: 9, fontFamily:'Urbanist-Medium'}}>
                Check Orders
              </Text>
            </TouchableOpacity>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ScreenBackground,
  },
});

export default OrderPlacedScreen;
