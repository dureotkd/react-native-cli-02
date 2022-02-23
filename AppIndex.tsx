import * as React from 'react';
import {View, Text} from 'react-native';
import {Auth, Order, Join} from './src/pages/index';
import {useSelector, shallowEqual} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useLayoutEffect} from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppIndex() {
  const isLogin = useSelector(state => {
    console.log('one', state);
  }, shallowEqual);

  useLayoutEffect(() => {
    console.log('two');
  }, []);

  useEffect(() => {
    console.log('three');
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Join" component={Join} />
      <Tab.Screen name="Auth" component={Auth} />
    </Tab.Navigator>
  );
}

export default AppIndex;
