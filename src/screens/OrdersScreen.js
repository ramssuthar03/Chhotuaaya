import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import Colors from '../constants/Colors';
import {useSelector} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  useGetOrdersMutation,
  useCancelOrderMutation,
} from '../app/services/api';
import tw from '../lib/tailwind';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/core';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const OrdersScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const userId = useSelector(state => state.auth.user.data.id);
  const [ currentPage,setCurrentPage ] = useState(1)
  const [handleGetOrders, {isLoading: areOrdersLoading}] =
    useGetOrdersMutation();
  const [handleCancelOrder, {isLoading: isOrderCancelling}] =
    useCancelOrderMutation();
  const [Orders, setOrders] = useState(null);
  const [totalOrdersCount, settotalOrdersCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [Refresh, setRefresh] = useState(false);
  useEffect(() => {
    handleGetOrders({page:currentPage})
      .then(res => {
        setOrders(res.data.data);
        settotalOrdersCount(res.data.total)
      })
      .catch(err => console.log(err));
  }, [isFocused, Refresh]);
  const handleOrderStatus = statusid => {
    if (statusid === 1) {
      return 'Order Placed';
    } else if (statusid === 2) {
      return 'Preparing Order';
    } else if (statusid === 3) {
      return 'Delivery Guy Assigned';
    } else if (statusid === 4) {
      return 'Order Picked Up';
    } else if (statusid === 5) {
      return 'Delivered';
    } else if (statusid === 6) {
      return 'Canceled';
    } else if (statusid === 7) {
      return 'Ready For Pick Up';
    } else if (statusid === 8) {
      return 'Awaiting Payment';
    } else if (statusid === 9) {
      return 'Payment Failed';
    } else if (statusid === 10) {
      return 'Scheduled Order';
    } else if (statusid === 11) {
      return 'Confirmed Order';
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.InputBackground,
      paddingBottom:insets.bottom
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    button: {
      borderRadius: 20,
      padding: 10,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  const pages = [];
  for(let i = 0; i<(totalOrdersCount/10); i++ ){
      pages.push(i+1)
  }
  const [OrderId,setOrderId] = useState(0);
  const [UniqueOrderId,setUniqueOrderId] = useState('');
  const [orderTotal,setorderTotal] = useState(0);
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      {Orders !== null ? (
        areOrdersLoading ? (
          <ActivityIndicator
            style={{flex: 1}}
            size="large"
            color={Colors.App}
          />
        ) : Orders.length < 1 ? (
          <View style={tw`flex-1 items-center justify-start pt-10 bg-white`}>
            <LottieView
              style={tw`w-50`}
              source={require('../../assets/animations/emptyorders.json')}
              autoPlay
              loop
            />
            <Text style={tw`text-sm font-myfontmedium text-black`}>
              You haven't order anything yet.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={tw`bg-error bg-opacity-10 mt-5 rounded-1`}>
              <Text
                style={{
                  color: Colors.App,
                  fontSize: 12,
                  padding: 9,
                  fontFamily: 'Urbanist-SemiBold',
                }}>
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView style={{flex: 1}}>
            
            {Orders.map(order => {
              const orderStatus = handleOrderStatus(order.orderstatus_id);
              const time = moment(order.created_at).fromNow();
              return (
                <View key={order.id} style={tw`bg-white px-3 py-3 mb-0.5`}>
                  <View style={tw`flex-row justify-between pb-2`}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={tw`bg-gray-500 bg-opacity-10 rounded-1 self-center`}>
                      <Text
                        style={{
                          color: Colors.TextBlack,
                          fontSize: 12,
                          padding: 9,
                          fontFamily: 'Urbanist-Medium',
                        }}>
                        {orderStatus}
                      </Text>
                    </TouchableOpacity>
                    {(orderStatus === 'Order Placed' ||
                      orderStatus === 'Preparing Order' ||
                      orderStatus === 'Order Picked Up' ||
                      orderStatus === 'Delivery Guy Assigned') && (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Track', {
                            unique_order_id: order.unique_order_id,
                            order_id: order.id,
                            orderstatusid: order.orderstatus_id,
                          });
                        }}
                        style={tw`bg-success bg-opacity-10 rounded-1 self-center`}>
                        <Text
                          style={{
                            color: Colors.Success,
                            fontSize: 12,
                            padding: 9,
                            fontFamily: 'Urbanist-Medium',
                          }}>
                          Track Order
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {order.orderitems.map(item => (
                    <View
                      key={item.id}
                      style={tw`flex-row justify-between px-3 py-1`}>
                      <View style={tw`flex-row`}>
                        <Text
                          style={tw`text-xs font-myfontsemibold text-black`}>{`x${item.quantity}`}</Text>
                        <Text
                          style={tw`px-3 text-xs font-myfontsemibold text-black`}>{`${item.name}`}</Text>
                      </View>
                      <View style={tw`flex-row items-center`}>
                        <FontAwesomeIcon
                          style={tw`mt-0.5 pr-0.5`}
                          color={Colors.TextBlack}
                          name="rupee"
                        />
                        <Text
                          style={tw`text-xs font-myfontsemibold text-black`}>
                          {item.price}
                        </Text>
                      </View>
                    </View>
                  ))}
                  <View style={tw`flex-row justify-between`}>
                    <Text
                      style={tw`text-black font-myfontsemibold text-xs px-2 pt-1`}>
                      {`Order ID:`}
                    </Text>
                    <Text
                      style={tw`text-black font-myfontsemibold text-xs px-2 pt-1`}>
                      {`${order.unique_order_id}`}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between`}>
                    <Text
                      style={tw`text-black font-myfontsemibold text-xs px-2 pt-1`}>
                      {`Payment Mode:`}
                    </Text>
                    <Text
                      style={tw`text-black font-myfontsemibold text-xs px-2 pt-1`}>
                      {`${order.payment_mode}`}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between`}>
                    <Text
                      style={tw`text-error font-myfontsemibold text-xs px-2 pt-1`}>
                      {`Tax:`}
                    </Text>
                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-error font-myfontsemibold text-xs pr-2 pt-1`}>
                        + 18%
                      </Text>
                      <Text
                        style={tw`text-error font-myfontsemibold text-xs pr-2 pt-1`}>
                        <FontAwesomeIcon
                          style={tw`px-1 pt-1`}
                          color={Colors.Error}
                          name="rupee"
                        />
                        {` ${order.tax_amount}`}
                      </Text>
                    </View>
                  </View>
                  <View style={tw`flex-row justify-between`}>
                    <Text
                      style={tw`text-black font-myfontsemibold text-xs px-2 pt-1`}>
                      {`Total:`}
                    </Text>
                    <View style={tw`flex-row items-center`}>
                      <FontAwesomeIcon
                        style={tw`px-1 pt-1`}
                        color={Colors.TextBlack}
                        name="rupee"
                      />
                      <Text
                        style={tw`text-black font-myfontsemibold text-xs pr-2 pt-1`}>
                        {`${order.total}`}
                      </Text>
                    </View>
                  </View>
                  <View style={tw`flex-row justify-between`}>
                    <Text
                      style={tw`text-black font-myfontsemibold text-xs px-2 pt-3`}>
                      {order.address}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between`}>
                    <Text
                      style={tw`text-black font-myfontsemibold text-xs px-2 pt-3`}>
                      {time}
                    </Text>
                  </View>
                  {orderStatus === 'Order Placed' && (
                    <View style={tw`flex-row px-2 pt-2 justify-between`}>
                      <TouchableOpacity
                        onPress={() => {
                          setOrderId(order.id);
                          setUniqueOrderId(order.unique_order_id);
                          setorderTotal(order.total)
                          setModalVisible(true);
                        }}
                        activeOpacity={0.7}
                        style={tw`bg-error bg-opacity-10 rounded-1 self-center`}>
                        <Text
                          style={{
                            color: Colors.Error,
                            fontSize: 12,
                            padding: 9,
                            fontFamily: 'Urbanist-Medium',
                          }}>
                          Cancel Order
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
            {totalOrdersCount<=10 ? null :<View style={tw`flex-row px-3 py-4`}>
             { 
             pages.map(page=>(
               <TouchableOpacity onPress={()=>{
                handleGetOrders({page:page})
                .then(res => {
                  setOrders(res.data.data);
                  settotalOrdersCount(res.data.total)
                  setCurrentPage(page)
                })
                .catch(err => console.log(err));
               }} style={page === currentPage ? tw`bg-error m-1 p-3 rounded-1`: tw`bg-white m-1 p-3 rounded-1`} key={page}>
                 <Text style={page === currentPage ? tw`text-white`:'text-gray-800'}>{page}</Text>
               </TouchableOpacity>
             ))
             }
            </View>}
            <View style={styles.centeredView}>
                        <Modal visible={modalVisible}>
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <AntDesignIcon
                                name="warning"
                                color={Colors.Warning}
                                style={tw`py-3`}
                                size={50}
                              />
                              <Text
                                style={tw`font-myfontbold text-xs text-gray-800 `}>
                                {UniqueOrderId}
                              </Text>
                              <Text
                                style={tw`font-myfontbold text-lg text-gray-800 `}>
                                Do you want to cancel order ?
                              </Text>
                              <Text
                                style={tw`font-myfontsemibold text-gray-600 text-xs pb-2`}>
                                {orderTotal} <Icon name="rupee" /> will be
                                refunded back to your wallet.
                              </Text>
                              {isOrderCancelling ? (
                                <ActivityIndicator
                                  size="small"
                                  color={Colors.App}
                                />
                              ) : (
                                <View style={tw`flex-row`}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      handleCancelOrder({
                                        order_id: OrderId,
                                        user_id:userId
                                      })
                                        .then(res => {
                                          setModalVisible(!modalVisible);
                                          setRefresh(!Refresh);
                                        })
                                        .catch(err => console.log(err));
                                      
                              
                                    }}
                                    activeOpacity={0.7}
                                    style={tw`bg-error bg-opacity-10 px-1 rounded-1 self-center`}>
                                    <Text
                                      style={{
                                        color: Colors.Error,
                                        fontSize: 12,
                                        padding: 9,
                                        fontFamily: 'Urbanist-Medium',
                                      }}>
                                      Cancel
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setModalVisible(!modalVisible);
                                    }}
                                    activeOpacity={0.7}
                                    style={tw`bg-success bg-opacity-10 rounded-1 px-4 ml-2 self-center`}>
                                    <Text
                                      style={{
                                        color: Colors.Success,
                                        fontSize: 12,
                                        padding: 9,
                                        fontFamily: 'Urbanist-Medium',
                                      }}>
                                      No
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              )}
                            </View>
                          </View>
                        </Modal>
                      </View>
          </ScrollView>
        )
      ) : (
        <ActivityIndicator style={{flex: 1}} color={Colors.App} size="large" />
      )}
      
    </View>
  );
};



export default OrdersScreen;
