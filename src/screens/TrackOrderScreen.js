import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import {
  useGetDeliveryGuyGpsLocationMutation,
  useUpdateUserInfoMutation,
} from '../app/services/api';
import tw from '../lib/tailwind';

import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const TrackOrderScreen = ({navigation, route}) => {
  const mapRef = useRef();
  const {unique_order_id, order_id, orderstatusid} = route.params;
  const [orderStatusId, setorderStatusId] = useState(orderstatusid);
  const [handleUpdateUserInfo, {isLoading: isUserInfoLoading}] =
    useUpdateUserInfoMutation();
  const [handleGpsLocation, {isLoading: isGpsLocationLoading}] =
    useGetDeliveryGuyGpsLocationMutation();
  const user_id = useSelector(state => state.auth.user.data.id);
  const [GpsData, setGpsData] = useState(null);
  const [UserData, setUserData] = useState(null);
  const [Refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchUserInfo();
  }, [Refresh]);
  const fetchUserInfo = async () => {
    handleUpdateUserInfo({unique_order_id, user_id})
      .then(res => {
        setUserData(res.data);
        setorderStatusId(res.data.running_order.orderstatus_id);
      })
      .catch(err => {
        setorderStatusId(5);
      });
  };
  useEffect(() => {
    fetchGpsLocation();
  }, [Refresh]);
  const fetchGpsLocation = async () => {
    handleGpsLocation({order_id})
      .then(res => {
        setGpsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const statusArr = [
    {
      id: 1,
      title: 'Order Placed Successfully',
      subTitle: 'Waiting for the confirm your order',
      animation: require('../../assets/animations/confirmed.json'),
    },
    {
      id: 2,
      title: 'Order Confirmed',
      subTitle: 'We are preparing your order',
      animation: require('../../assets/animations/prepare.json'),
    },
    {
      id: 3,
      title: 'Delivery Guy Assigned',
      subTitle: 'Order ready for pick up',
      animation: require('../../assets/animations/assign.json'),
    },
    {
      id: 4,
      title: 'Order Picked Up',
      subTitle: 'Your order is on the way',
      animation: require('../../assets/animations/delivery.json'),
    },
  ];
  const insets = useSafeAreaInsets();
  const filteredStatus = statusArr.filter(item => item.id <= orderStatusId);
  if (orderStatusId <= 2) {
    return isGpsLocationLoading || isUserInfoLoading ? (
      <ActivityIndicator size="large" style={{flex: 1}} color={Colors.App} />
    ) : (
      <View style={tw`flex-1 bg-white`}>
        <View style={tw` flex-col-reverse`}>
          {filteredStatus.map(item => (
            <View
              key={item.id}
              style={tw`px-5 flex-row py-1 bg-gray-50 justify-between items-center mb-0.5`}>
              <View>
                <Text style={tw`text-gray-800 text-sm`}>{item.title}</Text>
                <Text style={tw`text-gray-800 text-xs`}>{item.subTitle}</Text>
              </View>
              <View>
                <LottieView
                  style={tw`w-13`}
                  source={item.animation}
                  autoPlay
                  loop
                />
              </View>
            </View>
          ))}
        </View>
        <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <TouchableOpacity
            onPress={() => {
              setRefresh(!Refresh);
            }}
            activeOpacity={0.8}
            style={styles.btnStyle}>
            <Text style={tw`text-white font-bold`}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (orderStatusId > 2 && orderStatusId < 5) {
    return isGpsLocationLoading ||
      isUserInfoLoading ||
      GpsData === null ||
      GpsData === undefined ||
      UserData === null ||
      UserData === undefined ? (
      <ActivityIndicator size="large" style={{flex: 1}} color={Colors.App} />
    ) : UserData.running_order === null &&
      UserData.delivery_details === null ? (
      <ActivityIndicator size="large" style={{flex: 1}} color={Colors.App} />
    ) : (
      <View style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          <MapView
            onMapReady={() => {
              mapRef.current.animateToRegion({
                latitude: +GpsData.delivery_lat,
                longitude: +GpsData.delivery_long,
                latitudeDelta: 0.004321039371959046,
                longitudeDelta: 0.005127377808094025,
              });
            }}
            ref={mapRef}
            showsUserLocation={true}
            showsMyLocationButton={false}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: '100%',
              height: '100%',
            }}
            provider="google">
            <Marker
              coordinate={{
                latitude: +GpsData.delivery_lat,
                longitude: +GpsData.delivery_long,
              }}
            />
          </MapView>
        </View>
        <View style={tw`flex-2`}>
          <View style={tw`flex bg-white font-myfontsemibold px-5 py-5`}>
            <Text
              style={tw`text-black font-myfontsemibold text-p2  `}>{`Your Order will be Delivered by ${UserData.delivery_details.name}`}</Text>
            <Text
              style={tw`text-gray-500 rounded-1 font-myfontsemibold text-p2  py-3 self-start`}>{`Vehicle: ${UserData.delivery_details.vehicle_number}`}</Text>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={tw`text-darkblue bg-darkblue bg-opacity-20 px-3 font-myfontsemibold  py-3 self-start  rounded-1 text-p2`}>{`Phone: ${UserData.delivery_details.phone}`}</Text>
              <Text
                style={tw`text-success rounded-1 font-myfontsemibold text-p2 bg-success bg-opacity-20 py-3 self-start px-3`}>{`Delivery Pin: ${UserData.running_order.delivery_pin}`}</Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={tw` flex-col-reverse`}>
            {filteredStatus.map(item => (
              <View
                key={item.id}
                style={tw`px-5 flex-row py-1 bg-gray-50 justify-between items-center mb-0.5`}>
                <View>
                  <Text style={tw`text-gray-800 font-myfontsemibold text-sm`}>
                    {item.title}
                  </Text>
                  <Text style={tw`text-gray-800 font-myfontsemibold text-xs`}>
                    {item.subTitle}
                  </Text>
                </View>
                <View>
                  <LottieView
                    style={tw`w-13`}
                    source={item.animation}
                    autoPlay
                    loop
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: insets.bottom,
            left: 0,
            right: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              setRefresh(!Refresh);
            }}
            activeOpacity={0.8}
            style={styles.btnStyle}>
            <Text style={tw`text-white font-bold`}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    navigation.navigate('Orders');
    return null;
  }
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.App,
    marginBottom: 0,
    padding: 15,
    alignItems: 'center',
  },
});

export default TrackOrderScreen;
