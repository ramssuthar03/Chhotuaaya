import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useGetRestaurantItemsMutation} from '../app/services/api';
import {AddToCart, SubQuantity} from '../app/reducers/CartReducer';
import {useDispatch, useSelector} from 'react-redux';
import Counter from '../components/Counter';
import Colors from '../constants/Colors';
import tw from '../lib/tailwind';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const BrandItems = ({navigation, route}) => {
  const productsInCart = useSelector(state => state.cart.products);
  const dispatchHandleCart = useDispatch();
  const insets = useSafeAreaInsets();
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const {brand} = route.params;
const isFocused =  useIsFocused();
  const [handleGetRestaurantItems, {isLoading: areItemsLoading}] =
    useGetRestaurantItemsMutation();

  const [brandItems, setBrandsItem] = useState(null);

  useEffect(() => {
    handleGetRestaurantItems('brand-dairy-products-xfksrqdv45oyley')
      .then(res => {
        setBrandsItem(res.data.items[brand]);
      })
      .catch(err => console.log(err));
  }, []);

  console.log(brandItems);

  return (
      brandItems === null ? (<View style={tw`flex-1 bg-white`}>
      {isFocused&&<StatusBar barStyle='dark-content' backgroundColor={Colors.White} />}
          <ActivityIndicator style={tw`flex-1`} size="large" color={Colors.App} />
      </View>
          ) : (
              <>
        {isFocused&&<StatusBar barStyle='dark-content' backgroundColor={Colors.White} />}
          <ScrollView contentContainerStyle={tw`bg-white pb-10`}>
            <View style={tw`w-full py-10 bg-white`}>
                          <Image
                            style={{width: width / 5, height: width / 5,alignSelf:'center',borderRadius:50}}
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
                          <Text style={tw`text-h2 font-myfontbold text-darkblue self-center`}>{brand}</Text>
            </View>
          <View style={tw`flex-row flex-wrap`}>
              {

        brandItems.map(item => {
            const doesItemExist = productsInCart.find(
              product => product.id === item.id,
            );
  
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('Product', {id: item.id});
                }}
                style={[
                  tw`bg-white px-5  py-3 rounded-2 m-2`,
                  {width: width / 3.5},
                ]}>
                <View style={tw`w-10 h-10 self-center my-2`}>
                  <Image
                    resizeMode="contain"
                    style={tw`h-full w-full`}
                    source={{uri: `https://chhotuaaya.com/${item.image}`}}
                  />
                </View>
                <View style={tw``}>
                  <Text style={tw`font-myfontbold text-black`}>{item.name}</Text>
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
                    <FontAwesomeIcon name="rupee" size={14} color={Colors.Error} />
                    <Text style={tw`px-1 text-red-500 text-sm font-myfontbold`}>
                      {item.price}
                    </Text>
                  </View>
                  <Counter
                    onPressIncrement={() =>
                      dispatchHandleCart(AddToCart({...item, quantity: 1}))
                    }
                    onPressDecrement={() =>
                      dispatchHandleCart(SubQuantity({id: item.id}))
                    }
                  />
                </View>
              </TouchableOpacity>
            );
        })
    }
    </View>
    </ScrollView>
    {totalItems > 0 && (
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
                      style={tw`text-white text-sm font-myfontbold`}>{`${totalAmount}`}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    activeOpacity={0.95}
                    style={tw`flex-row items-center bg-white px-5 py-3`}>
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
    )
    );
};

export default BrandItems;
