import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';
import tw from '../lib/tailwind';
import {useSelector} from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useGetWalletTransactionsMutation} from '../app/services/api';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const WalletScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [handleWalletTransactions, {isLoading: areWalletTransactionsLoading}] =
    useGetWalletTransactionsMutation();
  const user_id = useSelector(state => state.auth.user.data.id);
  const [Wallet, setWallet] = useState(null);
  useEffect(() => {
    handleWalletTransactions({user_id})
      .then(res => {
        setWallet(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ScreenBackground,
    paddingBottom:insets.bottom
  },
});
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      {Wallet !== null ? (
        <>
          <View style={tw`px-5 pt-3 flex-row items-center`}>
            <EntypoIcon name="wallet" size={30} color={Colors.App} />
            <Text style={tw`text-gray-600 text-lg font-myfontbold mb-0.5 pl-1`}>
              Wallet Balance : {Wallet.balance}{' '}
              <FontAwesomeIcon name="rupee" size={15} />
            </Text>
          </View>
          <View style={tw`mt-3 flex mb-10`}>
            <FlatList
              data={Wallet.transactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const time = moment(item.created_at).fromNow();
                return (
                  <View
                    style={tw`flex px-6 mb-0.5 bg-gray-50 py-2 pb-3 flex-row`}>
                    <View>
                      <View style={tw`flex-row items-center self-center mb-1`}>
                        <Text
                          style={
                            item.type === 'withdraw'
                              ? tw`text-red-600 font-myfontsemibold mb-0.5 pr-1`
                              : tw`text-green-600 font-myfontsemibold mb-0.5 pr-1`
                          }>
                          {item.amount / 100}
                        </Text>
                        {item.type === 'withdraw' ? (
                          <FontAwesomeIcon
                            color={Colors.Error}
                            name="rupee"
                            size={13}
                          />
                        ) : (
                          <FontAwesomeIcon
                            name="rupee"
                            color={Colors.Success}
                            size={13}
                          />
                        )}
                      </View>
                      <View>
                        {item.type === 'withdraw' ? (
                          <Text
                            style={tw`capitalize text-xs text-red-500 bg-red-500 self-start bg-opacity-10 px-3 py-2 rounded-1 font-myfontbold `}>
                            {item.type}
                          </Text>
                        ) : (
                          <Text
                            style={tw`capitalize text-xs text-green-500 bg-green-500 self-start bg-opacity-10 px-3 py-2 rounded-1 font-myfontbold `}>
                            {item.type}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={tw`ml-4 flex-shrink justify-center`}>
                      <Text style={tw`text-gray-800 text-xs font-myfontbold`}>
                        {item.meta.description}
                      </Text>
                      <Text
                        style={tw`text-gray-500 text-xs font-myfontmedium`}>
                        {time}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator color={Colors.App} size="large" style={tw`flex-1`} />
      )}
    </View>
  );
};


export default WalletScreen;
