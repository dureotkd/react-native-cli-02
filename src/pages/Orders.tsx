import {View, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {RootStackParamList} from '../../App';
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function Orders({navigation}: SignInScreenProps) {
  const goAuth = useCallback(() => {
    navigation.navigate('Auth');
  }, [navigation]);

  return (
    <View>
      <Text>Orders</Text>
      <Pressable onPress={goAuth}>
        <Text>go Home</Text>
      </Pressable>
    </View>
  );
}

export default Orders;
