import * as React from 'react';
import {Auth, Join, Orders} from './src/pages/index';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Config from 'react-native-config';
import io from 'socket.io-client';
import axiosController from './src/api/axiosController';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import userSlice from './src/slices/user';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppIndex() {
  const dispatch = useDispatch();
  const [socketObj, setSocketObj] = useState({});

  console.log(`API URL : ${Config.API_URL}`);

  useLayoutEffect(() => {}, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    PushNotification.configure({
      // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
      onRegister: async function (token: any) {
        dispatch(
          userSlice.actions.setPhoneToken({
            token: token.token,
          }),
        );

        await axiosController({
          method: 'post',
          url: '/phoneToken',
          data: {
            token: token.token,
          },
        });
      },

      // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
        if (notification.channelId === 'riders') {
          // if (notification.message || notification.data.message) {
          //   store.dispatch(
          //     userSlice.actions.showPushPopup(
          //       notification.message || notification.data.message,
          //     ),
          //   );
          // }
        }
        // process the notification

        // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) 등록한 액션을 누렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
      onAction: function (notification: any) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err: Error) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'riders-01', // (required)
        channelName: 'riders-01', // (required)
        channelDescription: 'default', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created: boolean) =>
        console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Join" component={Join} />
      <Tab.Screen name="Auth" component={Auth} />
      <Tab.Screen name="Orders" component={Orders} />
    </Tab.Navigator>
  );
}

export default AppIndex;
