import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState, useEffect} from 'react';
import {RootStackParamList} from '../../App';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

function Auth({navigation}: AuthScreenProps) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const goJoin = useCallback(() => {
    navigation.navigate('Join');
  }, [navigation]);

  const onSubmit = useCallback(() => {}, [email, password]);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback(text => {
    console.log(text);
    setPassword(text.trim());
  }, []);

  const hideModal = useCallback(event => {
    setShowModal(false);
  }, []);

  return (
    <>
      <View style={{padding: 12}}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.textInput}
            ref={emailRef}
            onChangeText={onChangeEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangePassword}
            value={password}
            autoComplete="password"
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={passwordRef}
            onSubmitEditing={onSubmit}
          />
        </View>
        <Pressable style={styles.loginButton} onPress={onSubmit}>
          <Text>로그인</Text>
        </Pressable>
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate('Join')}>
          <Text>회원가입</Text>
        </Pressable>
        <Pressable
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            padding: 12,
          }}
          onPress={() => setShowModal(true)}>
          <Text style={{color: 'white'}}>모달창</Text>
        </Pressable>
      </View>
      {showModal ? (
        <Pressable
          nativeID="modalOut"
          style={styles.modalSheet}
          onPress={hideModal}>
          <Pressable style={styles.modal}></Pressable>
        </Pressable>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  modalSheet: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    position: 'absolute',
    backgroundColor: 'orange',
    top: 50,
    left: 50,
    bottom: 50,
    right: 50,
    borderRadius: 6,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Auth;
