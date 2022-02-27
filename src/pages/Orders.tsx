import {View, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {RootStackParamList} from '../../App';
import {NativeModules} from 'react-native';
const {RNKakaoLogins} = NativeModules;
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export type KakaoOAuthToken = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
};

export type KakaoAccessTokenInfo = {
  accessToken: string;
  expiresIn: string;
};

export type KakaoProfile = {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  phoneNumber: string;
  ageRange: string;
  birthday: string;
  birthdayType: string;
  birthyear: string;
  gender: string;
  isEmailValid: boolean;
  isEmailVerified: boolean;
  isKorean: boolean;
  ageRangeNeedsAgreement?: boolean;
  birthdayNeedsAgreement?: boolean;
  birthyearNeedsAgreement?: boolean;
  emailNeedsAgreement?: boolean;
  genderNeedsAgreement?: boolean;
  isKoreanNeedsAgreement?: boolean;
  phoneNumberNeedsAgreement?: boolean;
  profileNeedsAgreement?: boolean;
};

export const login = async (): Promise<KakaoOAuthToken> => {
  try {
    const result: KakaoOAuthToken = await RNKakaoLogins.login();

    return result;
  } catch (err) {
    throw err;
  }
};

function Orders({navigation}: SignInScreenProps) {
  const goAuth = useCallback(async () => {
    await login();
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
