import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API = axios.create({
    baseURL: 'http://10.5.50.164:8080'
});
API.interceptors.request.use(async config => {

  const token = await AsyncStorage.getItem('token');

  const isAuthRoute =
    config.url.includes('/auth/login') ||
    config.url.includes('/auth/register');

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
