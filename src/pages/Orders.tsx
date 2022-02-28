import {View, Text, Pressable, StyleSheet, Alert, Image} from 'react-native';
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
    Alert.alert('알림', '에러');
  }
};

function Orders({navigation}: SignInScreenProps) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  const goAuth = useCallback(async (): Promise<void> => {
    const kakaoToken: KakaoOAuthToken = await kakaoLogin();
    const profile: KakaoProfile = await getProfile();

    if (profile) {
      setUser({
        id: profile?.id,
        nickname: profile?.nickname,
        profileImageUrl: profile?.profileImageUrl,
      });
    }
  }, []);

  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
    } catch (err) {
      Alert.alert('알림', '로그인을 먼저 해주세요');
    } finally {
    }
  };

  const goLogout = useCallback(async (): Promise<void> => {
    try {
      const msg = await logout();
      setToken(msg);
    } catch (err) {
      Alert.alert('알림', '에러');
    } finally {
    }
  }, []);

  return (
    <View style={{display: 'flex', alignItems: 'center', marginTop: 12}}>
      <View style={{marginBottom: 30}}>
        <View style={{marginBottom: 10}}>
          <Text>ID : {user.id}</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text>닉네임 : {user.nickname}</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text>프로필</Text>
          <Image source={{uri: user.profileImageUrl}} />
        </View>
      </View>
      <Text>{token}</Text>
      <Pressable style={styles.kakaoBtn} onPress={goAuth}>
        <Text>카카오 로그인</Text>
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
