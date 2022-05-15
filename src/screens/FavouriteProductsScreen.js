import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import tw from '../lib/tailwind';
import {useSelector} from 'react-redux';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useGetFavouriteStoresMutation} from '../app/services/api';
const FavouriteProductsScreen = ({navigation}) => {
  const {latitude, longitude} = useSelector(
    state => state.auth.user.data.default_address,
  );
  const [Stores, setStores] = useState(null);
  const [handleGetFavouriteStore, {isLoading: areStoresLoading}] =
    useGetFavouriteStoresMutation();
  useEffect(() => {
    handleGetFavouriteStore({latitude, longitude})
      .then(res => {
        setStores(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      {Stores !== null ? (
        <>
          {Stores.map(store => (
            <TouchableOpacity style={tw`mx-1 mt-1`} onPress={()=>navigation.navigate('RestaurantItem', {slug: store.slug})} key={store.id}>
              <View style={tw`relative`}>
                <View style={tw`flex-row  py-5 z-20`}>
                  <View style={tw`flex-grow flex-1 px-5 py-2 `}>
                    <Text style={tw`text-white font-myfontbold text-lg`}>
                      {store.name}
                    </Text>
                    <Text style={tw`text-white font-myfontmedium text-sm`}>
                      {store.description}
                    </Text>
                    <View style={tw`flex-row py-1 items-center`}>
                      <AntDesignIcon
                        name="star"
                        size={15}
                        color={Colors.Warning}
                      />
                      <Text style={tw`px-1 text-white font-myfontsemibold text-xs`}>
                        {store.rating}
                      </Text>
                    </View>
                  </View>
                </View>
                <Image
                  resizeMode="cover"
                  source={{uri: `https://chhotuaaya.com/${store.image}`}}
                  style={tw`absolute w-full bottom-0 top-0 left-0 right-0 h-full z-0`}
                />
                <View
                  style={tw`absolute w-full bg-black bg-opacity-70 bottom-0 top-0 left-0 right-0 h-full z-10`}></View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <ActivityIndicator size="large" style={{flex: 1}} color={Colors.App} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ScreenBackground,
  },
});

export default FavouriteProductsScreen;
