import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import tw from '../lib/tailwind';
import RestaurantCard from '../components/RestaurantCard';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/core';
import LottieView from 'lottie-react-native';
import {useSearchRestaurantsMutation} from '../app/services/api';
const ExploreScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && inputRef.current.focus();
  }, [isFocused]);
  const inputRef = useRef();
  const [handleSearchRestaurants, {isLoading: areRestaurantsLoading}] =
    useSearchRestaurantsMutation();
  const latitude = useSelector(
    state => state.auth.user.data.default_address.latitude,
  );
  const longitude = useSelector(
    state => state.auth.user.data.default_address.longitude,
  );
  const [Categories, setCategories] = useState(null);
  const [Items, setItems] = useState(null);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      <View style={{backgroundColor: Colors.App, padding: 10}}>
        <TextInput
          ref={inputRef}
          onChangeText={query => {
            if (query.length >= 3) {
              handleSearchRestaurants({
                latitude,
                longitude,
                q: query,
              })
                .then(res => {
                  setCategories(res.data.restaurants);
                  setItems(res.data.items);
                })
                .catch(err => console.log(err));
            } else {
              setItems(null);
              setCategories(null);
            }
          }}
          placeholder="Search categories or products"
          style={tw`bg-white py-1.5 rounded-1 px-2 h-10`}
        />
      </View>
      {areRestaurantsLoading ? (
        <View style={tw`flex-1 items-center justify-center bg-white`}>
          <LottieView
            style={tw`w-50`}
            source={require('../../assets/animations/loader.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View contentContainerStyle={tw`flex-1`}>
          <View style={tw``}>
            {Categories !== null && Categories.length > 0 && (
              <>
                <Text style={tw`px-5 py-2 text-black font-myfontbold`}>
                  Categories
                </Text>
                <FlatList
                  horizontal={true}
                  style={{padding: 10}}
                  showsHorizontalScrollIndicator={false}
                  data={Categories}
                  renderItem={({item}) => (
                    <RestaurantCard
                      onPress={() =>
                        navigation.navigate('RestaurantItem', {
                          slug: item.slug,
                        })
                      }
                      item={item}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </>
            )}
            {Items !== null && Items.length > 0 && (
              <>
                <Text style={tw`px-5 py-2 text-black font-myfontbold`}>Products</Text>
                <FlatList
                  data={Items}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Product',{id:item.id,name:item.name})
                      }}
                      style={tw`bg-white flex-row p-2`}>
                      <View style={tw`w-12 h-12 ml-5`}>
                        <Image
                          style={tw` w-full h-full `}
                          resizeMode="contain"
                          source={{
                            uri: `https://chhotuaaya.com/${item.image}`,
                          }}
                        />
                      </View>
                      <View style={tw`flex-grow flex-2 pl-4 pb-1`}>
                        <Text style={tw`text-sm text-black font-myfontbold`}>{item.name}</Text>
                        <Text style={{color: Colors.Success, fontSize: 12,fontFamily:'Urbanist-Bold'}}>
                          In Stock
                        </Text>

                        <View style={tw`flex-row pt-0.5`}>
                          <View style={tw`flex-row`}>
                            <FontAwesomeIcon
                              style={tw`pt-0.5`}
                              color={Colors.Error}
                              size={15}
                              name="rupee"
                            />
                            <Text
                              style={tw`text-sm items-center font-myfontbold text-error pl-0.5`}>
                              {item.price}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                />
              </>
            )}
          </View>
        </View>
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

export default ExploreScreen;
