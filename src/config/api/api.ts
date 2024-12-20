import {API_URL_ANDROID, STAGE, API_URL as PROD_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

export const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_ANDROID
    : API_URL_ANDROID;

const api = async (
  url: string,
  method: 'POST' | 'GET' | 'PUT' | 'PATH' | 'DELETE',
  body: any = {},
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const token = await AsyncStorage.getItem('token');
  if (token) {
    myHeaders.append('Authorization', `Bearer ${token}`);
  }

  if (method === 'GET') {
    const resp = await fetch(`${API_URL}${url}`, {
      method: method,
      headers: myHeaders,
    });
    const data = await resp.json();
    return data;
  }

  const resp = await fetch(`${API_URL}${url}`, {
    method: method,
    body: JSON.stringify(body),
    headers: myHeaders,
  });
  const data = await resp.json();
  return data;
};

export {api};
