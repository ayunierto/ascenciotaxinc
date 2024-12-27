import {API_URL} from '@env';
import {StorageAdapter} from '../../config/adapters/storage-adapter';

export const checkStatus = async () => {
  try {
    const baseUrl = API_URL;
    const token = (await StorageAdapter.getItem('token')) || '';
    const response = await fetch(`${baseUrl}/auth/check-status`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(data => data.json());
    return response;
  } catch (error) {
    return null;
  }
};
