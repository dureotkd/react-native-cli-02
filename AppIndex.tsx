import * as React from 'react';
import {Auth, Join} from './src/pages/index';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Config from 'react-native-config';
import io from 'socket.io-client';
import axiosController from './src/api/axiosController';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppIndex() {
  const dispatch = useDispatch();
  const [socketObj, setSocketObj] = useState({});

  console.log(`API URL : ${Config.API_URL}`);

  const getSocket = useCallback(() => {
    const socket = io(`http://127.0.0.1:8090`);
    setSocketObj(socket);
  }, []);
  1;

  useLayoutEffect(() => {}, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    // axiosController({
    //   method: 'post',
    //   url: '/user',
    //   data: {
    //     email: 'dureotkd123',
    //     name: '성민',
    //     nickname: '까리하게한방',
    //   },
    // });

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
