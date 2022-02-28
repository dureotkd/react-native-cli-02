import {View, Text, Pressable, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {RootStackParamList} from '../../App';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
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

export const kakaoLogin = async (): Promise<KakaoOAuthToken> => {
  try {
    const result: KakaoOAuthToken = await login();
    return result;
  } catch (err) {
    throw err;
  }
};

function Orders({navigation}: SignInScreenProps) {
  const [token, setToken] = useState('');

  const goAuth = useCallback(async (): Promise<void> => {
    const kakaoToken: KakaoOAuthToken = await kakaoLogin();
    setToken(JSON.stringify(kakaoToken));
  }, []);

  const getProfile = useCallback(async (): Promise<void> => {
    const profile: KakaoProfile = await getKakaoProfile();
    setToken(JSON.stringify(profile));
  }, []);

  const goLogout = useCallback(async (): Promise<void> => {
    const msg = await logout();
    setToken(msg);
  }, []);

  return (
    <View style={{display: 'flex', alignItems: 'center', marginTop: 12}}>
      <Text>{token}</Text>
      <Pressable style={styles.kakaoBtn} onPress={goAuth}>
        <Text>카카오 로그인</Text>
      </Pressable>
      <Pressable style={styles.kakaoBtn} onPress={getProfile}>
        <Text>프로필 조회</Text>
      </Pressable>
      <Pressable style={styles.kakaoBtn} onPress={goLogout}>
        <Text>카카오 로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  kakaoBtn: {
    width: '50%',
    backgroundColor: '#FEE500',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
  },
});

export default Orders;
