import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  useDeleteAddressMutation,
  useGetAddressesMutation,
  useSetDefaultAddressMutation,
  useUpdateUserInfoMutation,
} from '../app/services/api';
import {setDefaultAddress, updateUser} from '../app/reducers/AuthReducer';
import Button from '../components/Button';
import {useIsFocused} from '@react-navigation/core';
import tw from '../lib/tailwind';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const AddressManagerScreen = ({navigation, route}) => {
  const {prevRoute} = route.params;
  const [Refresh, setRefresh] = useState(false);
  useEffect(() => {
    handleGetAddress({user_id: userId})
      .then(res => {
        setAddresses(res.data);
      })
      .catch(err => console.log(err));
  }, [Refresh]);
  const userId = useSelector(state => state.auth.user.data.user_id);
  const [handleDeleteAddress, {isLoading: isAddressDeleting}] =
    useDeleteAddressMutation();
  const dispatchUpdateUser = useDispatch();
  const [handleUpdateUser, {isLoading: isUserUpdating}] =
    useUpdateUserInfoMutation();
  const [Addresses, setAddresses] = useState([]);
  const [handleGetAddress, {isLoading: isAddressesLoading}] =
    useGetAddressesMutation();
  const [handleSetDefaultAddress, {}] = useSetDefaultAddressMutation();
  const dispatchSetDefaultAddress = useDispatch();
  const focusedAddressManager = useIsFocused();
  const insets = useSafeAreaInsets()
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.InputBackground,
    paddingBottom:insets.bottom
  },
  addressContainer: {
    backgroundColor: Colors.ScreenBackground,
    marginBottom: 1,
    padding: 10,
  },
  btnStyle: {
    backgroundColor: Colors.App,
    marginBottom: 0,
    padding: 15,
    alignItems: 'center',
  },
});
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      <View style={{flex: 10}}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          {isAddressesLoading ? (
            <ActivityIndicator
              size="large"
              style={{flex: 1, alignSelf: 'center'}}
            />
          ) : (
            Addresses.map(address => (
              <TouchableOpacity
                onPress={() => {
                  handleSetDefaultAddress({
                    address_id: address.id,
                    user_id: address.user_id,
                  })
                    .then(res => {
                      dispatchSetDefaultAddress(setDefaultAddress(address));
                      navigation.navigate(prevRoute);
                    })
                    .catch(err => console.log(err));
                }}
                activeOpacity={0.8}
                key={address.id}
                style={styles.addressContainer}>
                <View style={tw`flex-row items-center justify-between pr-5`}>
                  <Text style={tw`font-myfontsemibold text-lg text-gray-900`}>
                    {address.tag}
                  </Text>
                    <MaterialCommunityIcon
                      onPress={() => {
                        handleDeleteAddress({
                          address_id: address.id,
                          user_id: userId,
                        }).then(res => {
                          setRefresh(!Refresh)
                        });
                      }}
                      color={Colors.App}
                      style={tw`p-1`}
                      name="delete"
                      size={18}
                    />
                </View>
                <Text style={tw`font-myfontsemibold text-sm text-gray-500`}>
                  {address.house}
                </Text>
                <Text style={tw`font-myfontsemibold text-sm text-gray-500`}>
                  {address.address}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
      <View style={{position: 'absolute', bottom: insets.bottom, left: 0, right: 0}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Location1')}
          activeOpacity={0.8}
          style={styles.btnStyle}>
          <Text style={tw`text-white font-myfontsemibold`}>New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default AddressManagerScreen;
