import axios from 'axios';
import {API_URL_ANDROID, API_URL_IOS, STAGE, API_URL as URL} from '@env';
import {Platform} from 'react-native';

export const API_URL =
  STAGE === 'prod'
    ? URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'aplication/json',
  },
});

export {api};
