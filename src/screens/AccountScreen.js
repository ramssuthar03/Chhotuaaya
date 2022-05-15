import React from 'react';
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../app/reducers/AuthReducer';
import tw from '../lib/tailwind';
import IconI from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
const AccountScreen = ({navigation}) => {
  const dispatchLogout = useDispatch();
  const UserInfo = useSelector(state => state.auth.user.data);
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      <View style={tw`relative h-40`}>
        <View style={styles.header}>
          <Text style={tw`text-white text-xl pl-10 font-myfontsemibold`}>
            {UserInfo.name}
          </Text>
        </View>
        <View
          style={tw`w-25 h-25 rounded-full bg-white border items-center justify-center border-white absolute bg-gray-100 top-11 left-8`}>
          <IconI size={40} name='person-outline' />
        </View>
      </View>
      <View style={tw``}>
        <Text style={tw`text-black text-lg pl-8 font-myfontsemibold my-2`}>
          Account Settings
        </Text>
        <TouchableHighlight activeOpacity={1} underlayColor="#F8F8F8" onPress={ () =>navigation.navigate('AddressManager',{prevRoute:"Account"})}>
          <View style={tw`flex-row items-center py-4`}>
            <IconE
              name="location"
              style={tw`ml-10`}
              color={Colors.TextBlack}
              size={20}
            />
            <Text style={tw`text-black pl-2 text-sm  font-myfontsemibold`}>
              Manage Addresses
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={1} underlayColor="#F8F8F8" onPress={ () =>navigation.navigate('Orders',{prevRoute:"Account"})}>
          <View style={tw`flex-row items-center py-4`}>
            <IconE
              name="shopping-bag"
              style={tw`ml-10`}
              color={Colors.TextBlack}
              size={20}
            />
            <Text style={tw`text-black pl-2 text-sm  font-myfontsemibold`}>
              Orders
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={1} underlayColor="#F8F8F8" onPress={ () =>navigation.navigate('Wallet',{prevRoute:"Account"})}>
          <View style={tw`flex-row items-center py-4`}>
            <IconE
              name="wallet"
              style={tw`ml-10`}
              color={Colors.TextBlack}
              size={20}
            />
            <Text style={tw`text-black pl-2 text-sm  font-myfontsemibold`}>
              Wallet
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={1} underlayColor="#F8F8F8" onPress={ () =>navigation.navigate('FavouriteProducts',{prevRoute:"Account"})}>
          <View style={tw`flex-row items-center py-4`}>
            <IconI
              name="heart"
              style={tw`ml-10`}
              color={Colors.TextBlack}
              size={20}
            />
            <Text style={tw`text-black pl-2 text-sm  font-myfontsemibold`}>
              Favourites
            </Text>
          </View>
        </TouchableHighlight>
        {/* <TouchableHighlight activeOpacity={1} underlayColor="#F8F8F8" onPress={ () =>{ return}}>
          <View style={tw`flex-row items-center py-4`}>
            <IconI
              name="receipt"
              style={tw`ml-10`}
              color={Colors.TextBlack}
              size={20}
            />
            <Text style={tw`text-black pl-2 text-sm  font-myfontsemibold`}>
              Tax/VAT Number
            </Text>
          </View>
        </TouchableHighlight> */}
      </View>
      <TouchableOpacity
        onPress={() => dispatchLogout(logout(false))}
        activeOpacity={0.8}
        style={styles.btnStyle}>
        <Text style={tw`text-white font-myfontbold`}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 60,
    backgroundColor: Colors.App,
  },
  btnStyle:{
    backgroundColor:Colors.App,
    margin:15,
    marginBottom:0,
    padding:20,
    borderRadius:50,
    alignItems:'center',
  }
});

export default AccountScreen;
