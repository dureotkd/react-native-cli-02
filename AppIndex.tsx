import * as React from 'react';
import {View, Text} from 'react-native';
import {Auth, Order, Join} from './src/pages/index';
import {useSelector, shallowEqual} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Config from 'react-native-config';
import io from 'socket.io-client';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppIndex() {
  const [socketObj, setSocketObj] = useState({});

  const isLogin = useSelector(state => {
    return state.user.test ? true : false;
  }, shallowEqual);

  const getSocket = useCallback(() => {
    console.log('callback', Config.API_URL);
    const socket = io(`http://10.0.2.2:8090`);
    setSocketObj(socket);
  }, []);

  useLayoutEffect(() => {
    console.log('two', isLogin);
  }, []);

  useEffect(() => {
    getSocket();
  }, [getSocket]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Join" component={Join} />
      <Tab.Screen name="Auth" component={Auth} />
    </Tab.Navigator>
  );
}

export default AppIndex;
