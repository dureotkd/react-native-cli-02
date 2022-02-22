import * as React from 'react';
import {View, Text} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {Auth, Order, Join} from './src/pages/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppIndex() {
  const isLogin = useSelector(state => {
    console.log(state);
  }, shallowEqual);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Join" component={Join} />
      <Tab.Screen name="Auth" component={Auth} />
    </Tab.Navigator>
  );
}

export default AppIndex;
