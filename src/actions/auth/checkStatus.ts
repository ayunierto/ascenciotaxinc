import {API_URL} from '@env';
import {StorageAdapter} from '../../config/adapters/storage-adapter';

export const checkStatus = async () => {
  try {
    const token = (await StorageAdapter.getItem('token')) || '';

    const response = await fetch(`${API_URL}/auth/check-status`, {
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
