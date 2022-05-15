import React, {useRef, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from '@timwangdev/react-native-geocoder';
import {useSelector} from 'react-redux';
import tw from '../lib/tailwind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const LocationScreen = ({navigation}) => {
  const defaultAddress = useSelector(
    state => state.auth.user.data.default_address,
  );
  const [Address, setAddress] = useState('');
  const [ShowRightIcon, setShowRightIcon] = useState(false);
  const [Coordinates, setCoordinates] = useState({
    latitude: 19.077727674111042,
    longitude: 72.87789864465594,
    latitudeDelta: 0.004321039371959046,
    longitudeDelta: 0.005127377808094025,
  });
  const mapRef = useRef();
  const inputRef = useRef();
  const [isInputFocused, setisInputFocused] = useState(false);
  const handleSearch = (data, details) => {
    const {location} = details.geometry;
    Geocoder.geocodePosition({
      lat: location.lat,
      lng: location.lng,
    })
      .then(res => {
        const address = res[0].formattedAddress;
        setAddress(address);
      })
      .catch(err => console.log(err));
    setCoordinates({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.004321039371959046,
      longitudeDelta: 0.005127377808094025,
    });
    mapRef.current.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.004321039371959046,
      longitudeDelta: 0.005127377808094025,
    });
  };
  const insets = useSafeAreaInsets()
  const styles = StyleSheet.create({
    mapContainer: {
      flex: 1,
      backgroundColor: Colors.ScreenBackground,
      ...StyleSheet.absoluteFillObject,
    },
    searchContainer: {
      position: 'absolute',
      width: '100%',
      paddingTop: 5,
      backgroundColor: Colors.TextWhite,
    },
    locationContainer: {
      width: '100%',
      left: 0,
      right: 0,
      position: 'absolute',
      bottom: insets.bottom,
      backgroundColor: Colors.TextWhite,
    },
    btnStyle: {
      backgroundColor: Colors.App,
      marginBottom: 0,
      padding: 15,
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.mapContainer}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
        onMapReady={() =>
          Geolocation.getCurrentPosition(
            ({coords}) => {
              mapRef.current.animateToRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.004321039371959046,
                longitudeDelta: 0.005127377808094025,
              });
              setCoordinates({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.004321039371959046,
                longitudeDelta: 0.005127377808094025,
              });
              Geocoder.geocodePosition({
                lat: coords.latitude,
                lng: coords.longitude,
              })
                .then(res => {
                  const address = res[0].formattedAddress;
                  setAddress(address);
                })
                .catch(err => console.log(err));
            },
            err => {
              console.log(err);
            },
            {enableHighAccuracy: true, timeout: 10000},
          )
        }
        style={{...StyleSheet.absoluteFillObject,flex:1, marginBottom:insets.bottom}}
        provider="google"
        onPress={e => {
          const {latitude, longitude} = e.nativeEvent.coordinate;
          setCoordinates({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.004321039371959046,
            longitudeDelta: 0.005127377808094025,
          });

          mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.004321039371959046,
            longitudeDelta: 0.005127377808094025,
          });
          Geocoder.geocodePosition({
            lat: latitude,
            lng: longitude,
          })
            .then(res => {
              const address = res[0].formattedAddress;
              setAddress(address);
            })
            .catch(err => console.log(err));
        }}
        onPoiClick={e => {
          const {latitude, longitude} = e.nativeEvent.coordinate;
          setCoordinates({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.004321039371959046,
            longitudeDelta: 0.005127377808094025,
          });

          mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.004321039371959046,
            longitudeDelta: 0.005127377808094025,
          });

          Geocoder.geocodePosition({
            lat: latitude,
            lng: longitude,
          })
            .then(res => {
              const address = res[0].formattedAddress;
              setAddress(address);
            })
            .catch(err => console.log(err));
        }}
        initialRegion={Coordinates}>
        <Marker
          coordinate={{
            latitude: Coordinates.latitude,
            longitude: Coordinates.longitude,
          }}
        />
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          ref={inputRef}
          placeholder="Search Location..."
          fetchDetails={true}
          onPress={(data, details) => handleSearch(data, details)}
          textInputProps={{
            onChangeText(text) {
              if (text.length >= 1) {
                setisInputFocused(true)
                setShowRightIcon(true);
              } else {
                setShowRightIcon(false);
                setisInputFocused(false)
              }
            },
          }}
          enablePoweredByContainer={false}
          renderRightButton={() =>
            ShowRightIcon ? (
              <Icon
                onPress={() => {
                  inputRef.current.clear();
                  inputRef.current.blur();
                  setShowRightIcon(false);
                  setisInputFocused(false)
                }}
                style={{position: 'absolute', top: 9, right: 16}}
                name="close-circle"
                size={25}
              />
            ) : null
          }
          query={{
            key: 'AIzaSyBK8iL0tUCalpNKFM2a_uhexZbdANljhU0',
            language: 'en',
          }}
        />
        {!isInputFocused && (
          <TouchableOpacity
            onPress={() =>
              Geolocation.getCurrentPosition(
                ({coords}) => {
                  mapRef.current.animateToRegion({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.004321039371959046,
                    longitudeDelta: 0.005127377808094025,
                  });
                  setCoordinates({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.004321039371959046,
                    longitudeDelta: 0.005127377808094025,
                  });
                  Geocoder.geocodePosition({
                    lat: coords.latitude,
                    lng: coords.longitude,
                  })
                    .then(res => {
                      const address = res[0].formattedAddress;
                      setAddress(address);
                    })
                    .catch(err => console.log(err));
                },
                err => {
                  console.log(err);
                },
                {enableHighAccuracy: true, timeout: 10000},
              )
            }
            style={{position: 'absolute', top: 6, right: 10}}>
            <Icon
              style={{backgroundColor: '#fff', padding: 8, borderRadius: 5}}
              name="crosshairs-gps"
              size={25}
            />
          </TouchableOpacity>
        )}
      </View>
      {Address !== '' ? (
        <View style={styles.locationContainer}>
          <View style={tw`pl-4 py-6 pr-10 flex-row items-start`}>
            <Icon
              name="map-marker"
              style={tw`mt-0.5 pr-2`}
              color={Colors.App}
              size={20}
            />
            <Text style={tw`text-sm font-myfontmedium text-black`}>{Address}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                defaultAddress == null ? 'Address' : 'Address1',
                {
                  address: Address,
                  latitude: Coordinates.latitude,
                  longitude: Coordinates.longitude,
                },
              )
            }
            activeOpacity={0.8}
            style={styles.btnStyle}>
            <Text style={tw`text-white font-myfontbold`}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};



export default LocationScreen;
