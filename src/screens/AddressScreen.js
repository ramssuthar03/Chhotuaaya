import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {useGetSaveAddressMutation} from '../app/services/api';
import {updateAddress} from '../app/reducers/AuthReducer';
import tw from '../lib/tailwind';
const AddressScreen = ({navigation, route}) => {
  const {address, longitude, latitude} = route.params;
  const [Address, setAddress] = useState(address);
  const [House, setHouse] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [Pincode, setPincode] = useState('');
  const [Tags, setTags] = useState('');
  const [isCompleteAddressValid, setisCompleteAddressValid] = useState(true);
  const [isLandmarkValid, setisLandmarkValid] = useState(true);
  const [isPincodeValid, setisPincodeValid] = useState(true);
  const [isTagValid, setisTagValid] = useState(true);
  const userId = useSelector(state => state.auth.user.data.id);
  const defaultAddress = useSelector(
    state => state.auth.user.data.default_address,
  );
  const [handleSaveAddress, {isLoading: isAddressSaved}] =
    useGetSaveAddressMutation();
  const dispatchUpdateAddress = useDispatch();
  const validateField = body => {
    const {
      user_id,
      longitude,
      latitude,
      address,
      house,
      pincode,
      landmark,
      tag,
    } = body;
    const regex = /\d{6}$/;
    const str = pincode;
    let m = regex.exec(str);

    if (house.length < 10) {
      setisCompleteAddressValid(false);
    } else if (landmark.length < 5) {
      setisLandmarkValid(false);
    } else if (m == null) {
      setisPincodeValid(false);
    } else if (tag.length < 1) {
      setisTagValid(false);
    } else {
      handleSaveAddress(body)
        .then(res => {
          dispatchUpdateAddress(
            updateAddress({
              address: address,
              latitude: latitude,
              longitude: longitude,
              house: house,
              tag: tag,
            }),
          );
          navigation.navigate(defaultAddress !== null && 'Home');
        })
        .catch(err => console.log(err));
    }

    // let m = regex.exec(str);
    // if (m == null) {
    //   validphone = false;
    //   setIsValidPhone(false);
    // }
  };
  return (
    <ScrollView style={styles.addressContainer}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      <View
        style={tw`mx-4 pb-3 pr-8 flex-row items-start border-b border-b-app`}>
        <Icon
          name="map-marker"
          style={tw`mt-0.5 pr-2`}
          color={Colors.App}
          size={20}
        />
        <Text style={tw`text-sm font-myfontsemibold text-black`}>{address}</Text>
      </View>
      <View style={tw`mx-4 flex-row items-end py-2`}>
        <Icon
          name="home-map-marker"
          style={tw`mt-0.5 pr-2 border-b border-b-app py-2`}
          color={Colors.App}
          size={20}
        />
        <TextInput
          placeholder="Complete Address"
          placeholderTextColor={Colors.TextBlack}
          onFocus={() => setisCompleteAddressValid(true)}
          onChangeText={text => setHouse(text)}
          style={tw`border-b flex-1 font-myfontsemibold border-b-app py-1 flex-grow`}
        />
      </View>
      {!isCompleteAddressValid && (
        <Text style={tw`px-6 self-end font-myfontsemibold text-red-500`}>
          Address must contain at least 10 letters
        </Text>
      )}
      <View style={tw`mx-4 flex-row items-end py-2`}>
        <Icon
          name="city"
          style={tw`mt-0.5 pr-2 border-b border-b-app py-2`}
          color={Colors.App}
          size={20}
        />
        <TextInput
          placeholder="Landmark"
          onFocus={() => setisLandmarkValid(true)}
          placeholderTextColor={Colors.TextBlack}
          onChangeText={text => setLandmark(text)}
          style={tw`border-b flex-1 font-myfontsemibold border-b-app py-1 flex-grow`}
        />
      </View>
      {!isLandmarkValid && (
        <Text style={tw`px-6 font-myfontsemibold self-end text-red-500`}>
          Landmark must contain at least 5 letters
        </Text>
      )}
      <View style={tw`mx-4 flex-row items-end py-2`}>
        <Icon
          name="map"
          style={tw`mt-0.5 pr-2 border-b border-b-app py-2`}
          color={Colors.App}
          size={20}
        />
        <TextInput
          placeholder="Pincode"
          onFocus={() => setisPincodeValid(true)}
          placeholderTextColor={Colors.TextBlack}
          maxLength={6}
          keyboardType="numeric"
          style={tw`border-b font-myfontsemibold border-b-app flex-1  py-1 flex-grow`}
          onChangeText={text => setPincode(text)}
        />
      </View>
      {!isPincodeValid && (
        <Text style={tw`px-6 font-myfontsemibold self-end text-red-500`}>
          Please enter a valid 6 digit pincode.
        </Text>
      )}
      <View style={tw`mx-4 flex-row items-end py-2`}>
        <Icon
          name="tag"
          style={tw`mt-0.5 pr-2 border-b border-b-app py-2`}
          color={Colors.App}
          size={20}
        />
        <TextInput
          placeholder="Tag"
          onFocus={() => setisTagValid(true)}
          placeholderTextColor={Colors.TextBlack}
          onChangeText={text => setTags(text)}
          style={tw`border-b font-myfontsemibold border-b-app flex-1  py-1 flex-grow`}
        />
      </View>
      {!isTagValid && (
        <Text style={tw`px-6 font-myfontsemibold self-end text-red-500`}>
          Tag must contain at least 1 letter.
        </Text>
      )}
      <View style={styles.btnContainer}>
        {!isAddressSaved ? (
          <TouchableOpacity
            onPress={() => {
              const body = {
                user_id: userId,
                longitude: longitude,
                latitude: latitude,
                address: address,
                house: House,
                pincode: Pincode,
                landmark: Landmark,
                tag: Tags,
              };
              validateField(body);
            }}
            activeOpacity={0.8}
            style={styles.btnStyle}>
            <Text style={tw`text-white font-myfontbold`}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={1} style={styles.btnStyle}>
            <Text style={tw`text-white font-myfontbold`}>Saving...</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flex: 1,
    backgroundColor: Colors.TextWhite,
    paddingTop: 20,
  },
  address: {
    width: '90%',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    paddingBottom: 5,
    color: Colors.TextBlack,
  },
  addressText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.TextBlack,
  },
  inputContainer: {
    paddingTop: 10,
  },
  btnContainer: {
    width: '100%',
    paddingTop: 10,
  },
  btnStyle: {
    backgroundColor: Colors.App,
    margin: 15,
    marginBottom: 0,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default AddressScreen;
