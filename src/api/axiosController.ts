import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: `http://192.168.219.102:8090/api`,
  // 요청 타임아웃 설정
  timeout: 2500,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉션 추
instance.interceptors.request.use(
  // 요청 보내기 전  수행로직
  config => {
    console.log('요청 보내기 전  수행로직');

    return config;
  },

  // 요청 에러 발생시 수행로직
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉션 추
instance.interceptors.response.use(
  // 응답 로직 생성
  response => {
    console.log('응답 로직 생성');

    return response;
  },

  // 응답 에러
  error => {
    return Promise.reject(error);
  },
);

export default instance;
