import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import {
  useGetRestaurantInfoWithFavouriteMutation,
  useGetRestaurantItemsMutation,
  useToggleFavouriteMutation,
} from '../app/services/api';
import tw from '../lib/tailwind';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Counter from '../components/Counter';
import CartItem from '../components/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart, SubQuantity} from '../app/reducers/CartReducer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const RestaurantItemScreen = ({navigation, route}) => {
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const {slug} = route.params;
  useEffect(() => {
    handleGetRestaurantInfoWithFavourite(slug)
      .then(res => {
        setRestaurantInfo(res.data);
        setToggleFavourite(res.data.is_favorited);
      })
      .catch(err => console.log(err));
    return () => {};
  }, []);
  useEffect(() => {
    handleGetRestaurantItems(slug)
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.log(err));
    return () => {};
  }, []);
  const dispatchHandleCart = useDispatch();
  const [handleGetRestaurantItems, {isLoading: areItemsLoading}] =
    useGetRestaurantItemsMutation();
  const [
    handleGetRestaurantInfoWithFavourite,
    {isLoading: isRestaurantInfoLoading},
  ] = useGetRestaurantInfoWithFavouriteMutation();
  const [handleToggleFavourite] = useToggleFavouriteMutation();
  const [Items, setItems] = useState(null);
  const [RestaurantInfo, setRestaurantInfo] = useState(null);
  const [ToggleFavourite, setToggleFavourite] = useState(false);
  const products = useSelector(state => state.cart.products);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: Platform.OS == 'ios' ? insets.bottom : 0,
      }}>
      <View style={tw`flex-1 bg-gray-50 `}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
        {Items == null || RestaurantInfo == null ? (
          <ActivityIndicator
            color={Colors.App}
            style={tw`flex-1`}
            size="large"
          />
        ) : (
          <ScrollView>
            <View style={tw`relative`}>
              <View style={tw`flex-row  py-5 z-20`}>
                <View style={tw`flex-grow flex-1 px-5 py-2 `}>
                  <Text style={tw`text-white font-myfontbold text-lg`}>
                    {RestaurantInfo.name}
                  </Text>
                  <Text style={tw`text-white font-myfontmedium text-sm`}>
                    {RestaurantInfo.description}
                  </Text>
                  <View style={tw`flex-row py-1 items-center`}>
                    <AntDesignIcon
                      name="star"
                      size={15}
                      color={Colors.Warning}
                    />
                    <Text
                      style={tw`px-1 text-white font-myfontsemibold text-xs`}>
                      {RestaurantInfo.rating}
                    </Text>
                  </View>
                </View>
                <View style={tw`pr-10 py-3`}>
                  {ToggleFavourite ? (
                    <AntDesignIcon
                      onPress={() => {
                        setToggleFavourite(!ToggleFavourite);
                        handleToggleFavourite({id: RestaurantInfo.id})
                          .then(res => {})
                          .catch(err => console.log(err));
                      }}
                      name="heart"
                      size={20}
                      color={Colors.Error}
                    />
                  ) : (
                    <AntDesignIcon
                      onPress={() => {
                        setToggleFavourite(!ToggleFavourite);
                        handleToggleFavourite({id: RestaurantInfo.id})
                          .then(res => {})
                          .catch(err => console.log(err));
                      }}
                      name="hearto"
                      size={20}
                      color={Colors.Error}
                    />
                  )}
                </View>
              </View>
              <Image
                resizeMode="cover"
                source={{uri: `https://chhotuaaya.com/${RestaurantInfo.image}`}}
                style={tw`absolute w-full bottom-0 top-0 left-0 right-0 h-full z-0`}
              />
              <View
                style={tw`absolute w-full bg-black bg-opacity-70 bottom-0 top-0 left-0 right-0 h-full z-10`}></View>
            </View>
            <View style={tw`px-3  py-3`}>
              <Text style={tw`text-black font-myfontbold text-sm pb-3 `}>
                Recommended
              </Text>
              <FlatList
                data={Items.recommended}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  const doesItemExist = products.find(
                    product => product.id === item.id,
                  );
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        navigation.navigate('Product', {id: item.id,name:item.name});
                      }}
                      style={tw`bg-white px-5  py-3 rounded-2 mr-2`}>
                      <View style={tw`w-10 h-10 self-center my-2`}>
                        <Image
                          resizeMode="contain"
                          style={tw`h-full w-full`}
                          source={{uri: `https://chhotuaaya.com/${item.image}`}}
                        />
                      </View>
                      <View style={tw``}>
                        <Text style={tw`font-myfontbold text-black`}>
                          {item.name}
                        </Text>
                        <View style={tw`flex-row`}>
                          <Text
                            style={{
                              color: Colors.Success,
                              fontSize: 12,
                              fontFamily: 'Urbanist-SemiBold',
                            }}>
                            In Stock
                          </Text>
                          {doesItemExist !== undefined && (
                            <Text
                              style={{
                                color: Colors.TextBlack,
                                paddingLeft: 5,
                                fontSize: 12,
                                fontFamily: 'Urbanist-Bold',
                              }}>
                              {`Qt. ${doesItemExist.quantity}`}
                            </Text>
                          )}
                        </View>
                        <View style={tw`flex-row pb-2 items-center`}>
                          <FontAwesomeIcon
                            name="rupee"
                            size={14}
                            color={Colors.Error}
                          />
                          <Text
                            style={tw`px-1 text-red-500 text-sm font-myfontbold`}>
                            {item.price}
                          </Text>
                        </View>
                        <Counter
                          onPressIncrement={() =>
                            dispatchHandleCart(
                              AddToCart({...item, quantity: 1}),
                            )
                          }
                          onPressDecrement={() =>
                            dispatchHandleCart(SubQuantity({id: item.id}))
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={tw`px-3 flex-1 py-3 mb-10`}>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-gray-800 font-myfontbold text-sm pb-3`}>
                  Products
                </Text>
                <View style={tw`flex-row pb-2 items-center`}></View>
              </View>
              {Object.keys(Items.items).map(subCat => {
                const key = subCat.toString();
                return (
                  <View key={key}>
                    <Text style={tw`text-gray-800 font-semibold py-2`}>
                      {subCat.toString()}
                    </Text>
                    {Items.items[key].map(item => {
                      const doesItemExist = products.find(
                        product => product.id === item.id,
                      );
                      return (
                        <CartItem
                          key={item.id}
                          navigation={navigation}
                          onPressIncrement={() =>
                            dispatchHandleCart(
                              AddToCart({...item, quantity: 1}),
                            )
                          }
                          onPressDecrement={() =>
                            dispatchHandleCart(SubQuantity({id: item.id}))
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
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
      {totalItems > 0 && RestaurantInfo !== null && (
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.App,
            position: 'absolute',
            zIndex: 100,
            bottom: insets.bottom,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={tw`flex-row items-center px-5`}>
            <Text style={tw`text-white text-sm font-myfontbold`}>
              {`${totalItems} `}
              {totalItems === 1 ? 'Item' : 'Items'}
            </Text>
            <Text style={tw`text-white text-sm font-myfontbold px-2`}>|</Text>
            <FontAwesomeIcon
              style={tw`mt-0.5 pr-0.5`}
              name="rupee"
              size={13}
              color={Colors.TextWhite}
            />
            <Text
              style={tw`text-white text-sm font-myfontbold`}>{`${totalAmount}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.95}
            style={tw`flex-row items-center bg-white px-5 py-3`}>
            <Text style={tw` text-app font-myfontbold text-sm px-1`}>
              View Cart
            </Text>
            <AntDesignIcon name="shoppingcart" size={17} color={Colors.App} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RestaurantItemScreen;
