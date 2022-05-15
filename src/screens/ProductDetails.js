import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar
} from 'react-native';
import tw from '../lib/tailwind';
import {useGetSingleItemMutation} from '../app/services/api';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';
import Counter from '../components/Counter';
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart, SubQuantity} from '../app/reducers/CartReducer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductDetails = ({navigation, route}) => {
  const {id} = route.params;
  const [handleGetSingleItem, {isLoading: isItemLoading}] =
    useGetSingleItemMutation();
  const [Item, setItem] = useState(null);
  useEffect(() => {
    handleGetSingleItem({id})
      .then(res => {
        setItem(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  const dispatchHandleCart = useDispatch();
  const products = useSelector(state => state.cart.products);
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const doesItemExist = products.find(product => product.id === id);
  const insets = useSafeAreaInsets()
  return Item === null ? (
    <ActivityIndicator style={{flex: 1}} color={Colors.App} size="large" />
  ) : (

    <View style={{flex:1}}>
    <ScrollView style={{flex:1,backgroundColor:Colors.ScreenBackground,paddingBottom:insets.bottom}}>
      <StatusBar backgroundColor={Colors.White} barStyle='dark-content' />
      <View style={tw`bg-white w-full my-16 h-50 py-5`}>
        <Image
          resizeMode="contain"
          style={tw`w-full h-full`}
          source={{uri: `https:chhotuaaya.com/${Item.image}`}}
        />
      </View>
      <Text style={tw`text-black text-lg font-myfontbold px-5 pt-2`}>
        {Item.name}
      </Text>
      <View style={tw`flex-row items-center px-5 `}>
        <FontAwesomeIcon size={20} color={Colors.Error} name="rupee" />
        <Text
          style={{
            color: Colors.Error,
            fontSize: 20,
            marginBottom: 1.5,
            paddingLeft: 4,
            fontFamily:'Urbanist-Bold'
          }}>
          {Item.price}
        </Text>
      </View>
      <View style={tw`px-5 py-3 flex-row justify-between items-center`}>
        <Counter
          onPressIncrement={() => {
            dispatchHandleCart(AddToCart({...Item, quantity: 1}));
          }}
          onPressDecrement={() => {
            dispatchHandleCart(SubQuantity({id}));
          }}
        />
        {doesItemExist !== undefined && (
          <Text
            style={tw`text-app font-myfontsemibold text-sm bg-app bg-opacity-20 p-1.5 px-3 rounded-1 `}>
            {`Quantity : ${doesItemExist.quantity}`}
          </Text>
        )}
      </View>
      <Text style={tw`text-black font-myfontsemibold text-sm py-3 px-5 mb-10`}>
        {Item.desc !== null &&
          Item.desc.replace(/<p>|<br>/g, '').replace('</p>', '')}
      </Text>
      
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
            <Text style={tw`text-white text-sm font-myfontsemibold`}>
              {`${totalItems} `}
              {totalItems === 1 ? 'Item' : 'Items'}
            </Text>
            <Text style={tw`text-white text-sm font-myfontsemibold px-2`}>|</Text>
            <FontAwesomeIcon
              style={tw`mt-0.5 pr-0.5`}
              name="rupee"
              size={13}
              color={Colors.TextWhite}
            />
            <Text
              style={tw`text-white text-sm font-myfontsemibold`}>{`${totalAmount}`}</Text>
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

export default ProductDetails;
