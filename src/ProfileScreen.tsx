import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import useScreenOrientation from './orientationHook';
import messaging from '@react-native-firebase/messaging';

const ProfileScreen = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('✅ Push notification permission granted!');
    } else {
      Alert.alert(
        'Permission Denied',
        'Enable push notifications in settings.',
      );
    }
  }
  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('📩 FCM Token:', token);
      // Send this token to your backend for notification targeting
    } catch (error) {
      console.error('❌ Error getting FCM Token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
