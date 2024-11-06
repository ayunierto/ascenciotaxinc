import {API_URL_ANDROID, API_URL_IOS, STAGE, API_URL as PROD_URL} from '@env';
import {Platform} from 'react-native';

export const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

console.log({API_URL_ANDROID, API_URL_IOS, STAGE, PROD_URL, CURRENT: API_URL});

const api = async (
  url: string,
  method: 'POST' | 'GET' | 'PUT' | 'PATH' | 'DELETE',
  body: any,
) => {
  const resp = await fetch(`${API_URL}${url}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await resp.json();
  return data;
};

export {api};
