import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Indicator from '../components/Indicator';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Logo from '../components/Logo';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import SplashScreen from 'react-native-splash-screen'
import Colors from '../constants/Colors';

const DATA = [
  {
    id: 1,
    image: require('../../assets/images/bg1.png'),
    title: 'Ready Food',
    description: 'Deleciuos and Tasty Food',
  },
  {
    id: 2,
    image: require('../../assets/images/bg2.png'),
    title: 'Fresh Veggies',
    description: 'Purified and fresh veggies available at low cost',
  },
  {
    id: 3,
    image: require('../../assets/images/bg3.png'),
    title: 'Free Delivery',
    description: 'You will not be charged any delivery fee',
  },
];

const MainScreen = ({navigation}) => {

  const [index, setIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const ref = useRef();

  useEffect(()=>{
      SplashScreen.hide()
  })

  useEffect(() => {
    ref?.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor={'#fff'} />
      <View style={{flex: 0.2}}>
       <View style={{alignSelf:'flex-end',paddingRight:30,paddingTop:30,justifyContent:'center',alignItems:'center'}} >
       <Logo  width={width/8}/>
        <Text style={{fontSize:11,fontFamily:'Urbanist-ExtraBold',paddingTop:5}}>CHHOTUAAYA</Text>
       </View>
      </View>
      <Animated.FlatList
        horizontal
        pagingEnabled
        ref={ref}
        onMomentumScrollEnd={ev => {
          setIndex(Math.round(ev.nativeEvent.contentOffset.x / width));
        }}
        showsHorizontalScrollIndicator={false}
        style={{flex: 0.5}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        data={DATA}
        keyExtractor={({id}) => id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width,
              }}>
              <Image
                source={item.image}
                style={{
                  aspectRatio:1,
                  height:width/1.5 ,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: '#2F324A',
                  fontSize: 25,
                  paddingTop: 60,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontWeight: '800',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#2F324A',
                  fontSize: 15,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontWeight: '800',
                }}>
                {item.description}
              </Text>
            </View>
          );
        }}
      />
      <View style={{flex: 0.05}}>
        <Indicator
          scrollX={scrollX}
          data={DATA}
          width={width}
          height={height}
        />
      </View>
      <View style={{flex: 0.25, justifyContent: 'center'}}>
        <Animated.View
          style={{
            backgroundColor: Colors.App,
            borderRadius: width / 12,
            position: 'absolute',
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, width],
                  outputRange: [
                    (width * 5) / 12,
                    (width * 5) / 12 - (width * 5) / 15,
                  ],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <TouchableOpacity
            onPress={() => {
              if (index === 0) {
                return;
              }
              setIndex(index - 1);
            }}
            style={{
              width: width / 6,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesignIcon name="arrowleft" size={25} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        {index===(DATA.length - 1)?
        <Animated.View style={{
          backgroundColor: Colors.App,
          borderRadius: width / 12,
          position: 'absolute',
          transform:[
            {
              translateX:width/3.5
            }
          ]
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{
            height: width / 6,
            width:width/1.57,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff',
                  fontSize: 20,
                  fontWeight: '800',}}>Get Started</Text>
        </TouchableOpacity>

        </Animated.View>
        :
        <><Animated.View
          style={{
            backgroundColor: Colors.App,
            borderRadius: width / 12,
            position: 'absolute',
            zIndex: 9999,
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, width],
                  outputRange: [
                    (width * 5) / 12,
                    (width * 5) / 12 + (width * 5) / 15,
                  ],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <TouchableOpacity
            onPress={() => {
              if (index === DATA.length - 1) {
                return;
              }
              setIndex(index + 1);
            }}
            style={{
              width: width / 6,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesignIcon name="arrowright" size={25} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.Text
          style={{
            fontSize: 15,
            position: 'absolute',
            color: Colors.App,
            paddingRight: width / 10,
            fontWeight: '800',
            zIndex: 0,
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, width],
                  outputRange: [(width * 5) / 6, width / 2 - 15],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
          onPress={() => {
            setIndex(DATA.length - 1);
          }}>
          Skip
        </Animated.Text></>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MainScreen;
