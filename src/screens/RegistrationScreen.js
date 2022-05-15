import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import Colors from '../constants/Colors';
import tw from '../lib/tailwind';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  useGetGenerateOtpForLoginMutation,
  useGetLoginWithOtpMutation,
} from '../app/services/api';
import {Formik} from 'formik';
import * as yup from 'yup';
import RBSheet from 'react-native-raw-bottom-sheet';
import OtpInputs from 'react-native-otp-inputs';
import {useDispatch} from 'react-redux';
import {login} from '../app/reducers/AuthReducer';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const RegistrationScreen = ({navigation, route}) => {
  const {phone} = route.params;

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const Insets = useSafeAreaInsets();

  const bottomSheet = useRef();

  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(true);

  const [handleGenerateOtpForLogin, {isLoading: isRegistering}] =
    useGetGenerateOtpForLoginMutation();

  const [handleLoginWithOtp, {isLoading: isOtpVerifying}] =
    useGetLoginWithOtpMutation();

  const handleRegister = useDispatch();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={tw`flex-1 justify-center items-center bg-white  px-5`}>
      <Pressable
        onPress={Keyboard.dismiss}
        style={tw`justify-center items-center`}>
        <Logo width={height / 6} />
        <Text style={{fontSize:width/20,fontFamily:'Urbanist-ExtraBold',paddingTop:5}}>CHHOTUAAYA</Text>
        <Text style={tw`text-h2 font-myfontextrabold mt-4 text-darkblue`}>
        Create Account
      </Text>
      <Text
        style={tw`flex-shrink font-myfontmedium text-darkblue mb-2 text-p2 px-5  text-center`}>
        to continue with chhotuaaya
      </Text>
      <Formik
            initialValues={{name: '', phone: phone, email: ''}}
            validateOnMount={true}
            validationSchema={yup.object().shape({
              phone: yup
                .string()
                .matches(/^\d{10}$/, 'Please enter a valid phone number')
                .required('Phone number is required'),
              email: yup
                .string()
                .matches(
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
                  'Please enter a valid email address.',
                )
                .required('Email address is required'),
              name: yup.string().required('Username is required.'),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
            }) => (
              <View>
                <TextInput
                  iconLeft={
                    <AntDesignIcon
                      name="user"
                      size={24}
                      color={Colors.TextBlack}
                    />
                  }
                  inputContainer={tw`my-1`}
                  value={values.name}
                  maxLength={20}
                  placeholder="User Name"
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  onFocus={() => setFieldTouched('name', false)}
                />
                {touched.name && errors.name && (
                  <Text style={tw`text-error text-p2 self-end px-2 py-1`}>
                    {errors.name}
                  </Text>
                )}
                <TextInput
                  iconLeft={
                    <Text style={tw`font-myfontbold text-lg text-gray-800`}>
                      +91
                    </Text>
                  }
                  inputContainer={tw`my-1`}
                  keyboardType="numeric"
                  value={values.phone}
                  maxLength={10}
                  placeholder="Phone Number"
                  onChangeText={handleChange('phone')}
                  onBlur={() => setFieldTouched('phone')}
                  onFocus={() => setFieldTouched('phone', false)}
                />
                {touched.phone && errors.phone && (
                  <Text style={tw`text-error text-p2 self-end px-2 py-1`}>
                    {errors.phone}
                  </Text>
                )}
                <TextInput
                  iconLeft={
                    <AntDesignIcon
                      name="mail"
                      size={24}
                      color={Colors.TextBlack}
                    />
                  }
                  inputContainer={tw`my-1`}
                  value={values.email}
                  placeholder="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  onFocus={() => setFieldTouched('email', false)}
                />
                {touched.email && errors.email && (
                  <Text style={tw`text-error text-p2 self-end px-2 py-1`}>
                    {errors.email}
                  </Text>
                )}
                <View style={tw`mt-2`}>
                  {isRegistering ? (
                    <Button disabled={true}>Creating account...</Button>
                  ) : (
                    <Button
                      onPress={() => {
                        handleGenerateOtpForLogin({phone: `+91${values.phone}`,email:values.email,})
                          .then(res => {
                           if(res.data.otp){
                             bottomSheet.current.open()
                             setIsOtpVerified(true)
                           }else if(res.data.email_phone_already_used){
                              alert('Email or Phone Already in Use')
                          }
                          console.log(res)
                          })
                          .catch(err => console.log(err));
                      }}
                      
                      disabled={!isValid}>
                      Create Account
                    </Button>
                  )}
                </View>

                <Pressable onPress={() => {
                      navigation.navigate('Login', {phone: values.phone});
                    }} style={tw`flex-row self-center items-center mt-4`}>
                  <Text
                    
                    style={tw`text-darkblue pl-1 text-p2 uppercase font-myfontextrabold`}>
                    I already have an account
                  </Text>
                  <AntDesignIcon
                    style={tw`px-1`}
                    size={20}
                    name="rightcircleo"
                    color={Colors.textDarkBlue}
                  />
                </Pressable>
                <RBSheet
                  ref={bottomSheet}
                  openDuration={0}
                  customStyles={{
                    container: {
                      borderTopLeftRadius:30,
                      borderTopRightRadius:30,
                    },
                    wrapper: {
                      marginBottom: Insets.bottom,
                    },
                  }}>
                  <View style={tw`flex-1 justify-center`}>
                  <Text
                    style={tw`flex-shrink font-myfontbold text-app mx-5  mb-2 text-p  `}>
                    An OTP has been sent to +91{values.phone}
                  </Text>
                  <Text
                    style={tw`flex-shrink font-myfontmedium text-gray-500 mx-5 text-p2`}>
                    Please enter the OTP below to create account.
                  </Text>
                  <OtpInputs
                    onFocus={()=>setIsOtpVerified(true)}
                    handleChange={otp => setOtp(otp)}
                    numberOfInputs={6}
                    inputStyles={tw`w-[${
                      windowWidth / 30
                    }] rounded-1 aspect-ratio-1 bg-gray-100 text-center`}
                    style={tw`flex-row mx-5 my-2 justify-between `}
                  />
                  <View style={tw`mx-5 pt-5 flex-row justify-between`}>
                    {isOtpVerifying ? (
                      <Button disabled={true}>Verifying...</Button>
                    ) : (
                      <Button
                        onPress={() => {
                          handleLoginWithOtp({otp, phone: `+91${values.phone}`,name:values.name,email:values.email,address:null})
                            .then(res => {
                              if (res.data.success) {
                                handleRegister(login(res.data));
                              }else {
                                setIsOtpVerified(res.data.success);
                              }
                              console.log(res)
                            })
                            .catch(err => console.log(err));
                        }}
                        containerStyle={tw``}>
                        Submit
                      </Button>
                    )}
                    {!isOtpVerified && (
                      <Text style={tw`flex-shrink text-error text-p2`}>
                        Entered wrong or invalid OTP.
                      </Text>
                    )}
                  </View>
                  </View>
                </RBSheet>
              </View>
            )}
          </Formik>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
