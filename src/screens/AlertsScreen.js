import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import tw from '../lib/tailwind';
import { useGetUserNotificationsMutation } from '../app/services/api';
const AlertsScreen = ({ navigation }) => {
  const user_id = useSelector((state) => state.auth.user.data.id);
  const [handleNotifications, { isLoading: areNotificationsLoading }] =
    useGetUserNotificationsMutation();
  useEffect(() => {
    handleNotifications({ user_id }).then((res) => {
      setNotification(res.data);
    });
  }, []);
  const [Notification, setNotification] = useState(null);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.App} />
      {Notification === null ? (
        <ActivityIndicator style={tw`flex-1`} color={Colors.App} />
      ) : (
        Notification.length === 0 && (
          <Text style={tw`font-myfontsemibold text-gray-700`}>
            You don't have any notification
          </Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.ScreenBackground,
  },
});

export default AlertsScreen;
