import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart, SubQuantity } from '../app/reducers/CartReducer';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useGetDeliveryRestaurantsMutation,
  usePromoSliderMutation,
  useGetRestaurantItemsMutation,
} from '../app/services/api';
import RestaurantCard from '../components/RestaurantCard';
import tw from '../lib/tailwind';
import Slider from '../components/Slider';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import CartItem from '../components/CartItem';
const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const productsInCart = useSelector((state) => state.cart.products);
  const { latitude, longitude } = useSelector(
    (state) => state.auth.user.data.default_address
  );
  const insets = useSafeAreaInsets();
  const [handleGetRestaurantItems, { isLoading: areItemsLoading }] =
    useGetRestaurantItemsMutation();

  const [handleGetPromoSlider, { isLoading: isSliderLoading }] =
    usePromoSliderMutation();

  useEffect(() => {
    SplashScreen.hide();
  });

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    handleGetRestaurantItems('brand-dairy-products-xfksrqdv45oyley')
      .then((res) => {
        setBrands(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    const res = await handleGetDeliveryRestaurants({ latitude, longitude });
    const categories = res.data.map((cat) => cat.slug);
    const allItems = [];
    await categories.map(async (category, index) => {
      const res = await handleGetRestaurantItems(category);
      Object.keys(res.data.items).map((brand) => {
        res.data.items[brand].map((item) => {
          allItems.push(item);
        });
      });
      if (index === categories.length - 1) {
        setProducts(allItems);
      }
    });
  };
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  useEffect(() => {
    handleGetDeliveryRestaurants({ latitude, longitude })
      .then((res) => {
        setDeliveryRestaurants(res.data);
      })

      .catch((err) => {});

    handleGetPromoSlider({ latitude, longitude })
      .then((res) => {
        setSliderData(res.data.mainSlides);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, [latitude, longitude]);
  const [DeliveryRestaurants, setDeliveryRestaurants] = useState(null);
  const [
    handleGetDeliveryRestaurants,
    { isLoading: areRestaurantsLoading, isError },
  ] = useGetDeliveryRestaurantsMutation();

  const [sliderData, setSliderData] = useState([]);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const displayAddress = useSelector(
    (state) => state.auth.user.data.default_address
  );
  const dispatchHandleCart = useDispatch();
  return isFocused ? (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Logo width={width / 15} />
          <Text
            style={tw`px-2 text-p2 font-myfontbold uppercase text-darkblue`}
          >
            Chhotuaaya
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddressManager', { prevRoute: 'Home' })
          }
          style={tw`flex-row items-center`}
        >
          <AntDesignIcon
            name="enviroment"
            style={{ paddingTop: 5 }}
            size={25}
            color={Colors.textDarkBlue}
          />
          <Text
            style={tw`text-p2 uppercase text-darkblue font-myfontbold pt-1 pl-1`}
          >{`${displayAddress.address
            .replace(/^[^,]+, */, '')
            .substring(0, 15)}...`}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Explore')}
          activeOpacity={1}
          style={tw`h-13 bg-white rounded-full border border-darkblue flex-row justify-between items-center px-5`}
        >
          <Text style={tw`text-p2 uppercase font-myfontsemibold`}>
            Search categories or products
          </Text>
          <AntDesignIcon name="search1" size={20} />
        </TouchableOpacity>
      </View>
      {isError ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text
            style={tw`bg-error bg-opacity-20 font-myfontbold px-3 py-2 text-error rounded-1`}
          >
            Network Error
          </Text>
        </View>
      ) : (
        <View style={tw`flex-1`}>
          {DeliveryRestaurants !== null && DeliveryRestaurants !== undefined ? (
            <>
              {DeliveryRestaurants.length !== 0 ? (
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                  {/* <Text style={tw`text-black text-lg px-4 pt-2 font-myfontbold`}>Featured Brands</Text> */}
                  <View>
                    {sliderData !== [] && (
                      <Slider
                        navigation={navigation}
                        itemWidth={width}
                        sliderWidth={width}
                        autoplay={true}
                        autoplayInterval={5000}
                        enableSnap={true}
                        data={sliderData}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: Colors.TextBlack,
                      fontFamily: 'Urbanist-ExtraBold',
                      fontSize: 18,
                      paddingLeft: 15,
                      paddingTop: 10,
                      textTransform: 'uppercase',
                    }}
                  >
                    {DeliveryRestaurants.length === 0
                      ? 'No Product Available for You'
                      : `Shop by Category`}
                  </Text>
                  <View style={tw`flex-row px-3 py-2`}>
                    {DeliveryRestaurants.map((item) => (
                      <RestaurantCard
                        key={item.id}
                        onPress={() =>
                          navigation.navigate('RestaurantItem', {
                            slug: item.slug,
                          })
                        }
                        item={item}
                      />
                    ))}
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: Colors.TextBlack,
                        fontFamily: 'Urbanist-ExtraBold',
                        fontSize: 18,
                        paddingLeft: 15,
                        paddingTop: 10,
                        textTransform: 'uppercase',
                      }}
                    >
                      Shop by Brands
                    </Text>
                    <View
                      style={{
                        paddingLeft: 15,
                        paddingTop: 10,
                        flexDirection: 'row',
                      }}
                    >
                      {Object.keys(brands).map((brand) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('BrandItems', {
                                brand,
                              })
                            }
                            style={{
                              padding: 20,
                              backgroundColor: '#f1f1f1',
                              width: width / 5,
                              aspectRatio: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 50,
                              marginRight: 10,
                              borderWidth: 1,
                              overflow: 'hidden',
                            }}
                            key={brand}
                          >
                            {/* <Text style={tw`text-center text-darkblue font-myfontbold text-sm`}>{brand}</Text> */}
                            <Image
                              style={{ width: width / 5, height: width / 5 }}
                              resizeMode="stretch"
                              source={
                                brand === 'Amul'
                                  ? require('../../assets/images/amul.png')
                                  : brand === 'Krishna'
                                  ? require('../../assets/images/krishna.png')
                                  : brand === 'Gowardhan'
                                  ? require('../../assets/images/gowardhan.jpg')
                                  : brand === 'Gokul' &&
                                    require('../../assets/images/gokul.png')
                              }
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: Colors.TextBlack,
                        fontFamily: 'Urbanist-ExtraBold',
                        fontSize: 18,
                        paddingLeft: 15,
                        paddingTop: 10,
                        textTransform: 'uppercase',
                      }}
                    >
                      Products
                    </Text>
                    <View
                      style={{
                        paddingLeft: 0,
                        marginTop: 10,
                      }}
                    >
                      {products !== [] &&
                        products.map((item) => {
                          const doesItemExist = productsInCart.find(
                            (product) => product.id === item.id
                          );
                          return (
                            <CartItem
                              key={item.id}
                              navigation={navigation}
                              onPressIncrement={() =>
                                dispatchHandleCart(
                                  AddToCart({ ...item, quantity: 1 })
                                )
                              }
                              onPressDecrement={() =>
                                dispatchHandleCart(SubQuantity({ id: item.id }))
                              }
                              quantity={
                                doesItemExist === undefined
                                  ? null
                                  : doesItemExist.quantity
                              }
                              price={item.price}
                              title={item.name}
                              item={item}
                              image={`https://chhotuaaya.com/${item.image}`}
                            />
                          );
                        })}
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <View style={tw`flex-1 justify-center items-center`}>
                  <LottieView
                    style={tw`w-50`}
                    source={require('../../assets/animations/no-item.json')}
                    autoPlay
                    loop
                  />
                  <Text
                    style={tw`text-xl text-center px-10  mt-5 text-darkblue font-myfontbold `}
                  >
                    We are sorry. We don't have any product for this location.
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate('AddressManager', {
                        prevRoute: 'Home',
                      })
                    }
                    style={tw`bg-app bg-opacity-10 px-5 py-3 rounded-1 mt-5 justify-center items-center`}
                  >
                    <Text
                      style={tw`text-p2 text-center text-app font-myfontbold `}
                    >
                      Change Location
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {totalItems > 0 && (
                <View
                  style={{
                    width: '100%',
                    backgroundColor: Colors.App,
                    position: 'absolute',
                    zIndex: 100,
                    bottom: Platform.OS === 'ios' ? 0 : insets.bottom,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <View style={tw`flex-row items-center px-5`}>
                    <Text style={tw`text-white text-sm font-myfontbold`}>
                      {`${totalItems} `}
                      {totalItems === 1 ? 'Item' : 'Items'}
                    </Text>
                    <Text style={tw`text-white text-sm font-myfontbold px-2`}>
                      |
                    </Text>
                    <FontAwesomeIcon
                      style={tw`mt-0.5 pr-0.5`}
                      name="rupee"
                      size={13}
                      color={Colors.TextWhite}
                    />
                    <Text
                      style={tw`text-white text-sm font-myfontbold`}
                    >{`${totalAmount}`}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    activeOpacity={0.95}
                    style={tw`flex-row items-center bg-white px-5 py-3`}
                  >
                    <Text style={tw` text-app font-myfontbold text-sm px-1`}>
                      View Cart
                    </Text>
                    <AntDesignIcon
                      name="shoppingcart"
                      size={17}
                      color={Colors.App}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <ActivityIndicator
              size="large"
              style={{ flex: 1 }}
              color={Colors.App}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  ) : (
    <ActivityIndicator size="small" color={Colors.App} style={{ flex: 1 }} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ScreenBackground,
  },
});

export default HomeScreen;
