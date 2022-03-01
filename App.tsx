import * as React from 'react';
import {Provider, useDispatch} from 'react-redux';
import store from './src/store';
import AppIndex from './AppIndex';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import userSlice from './src/slices/user';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppIndex />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
