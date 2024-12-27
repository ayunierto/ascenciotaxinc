import {API_URL} from '@env';
import {StorageAdapter} from '../../config/adapters/storage-adapter';

interface Appointment {
  startDateAndTime: string;
  endDateAndTime: string;
  service: string;
  staff: string;
  comments?: string;
}

export const saveAppointment = async ({
  startDateAndTime,
  endDateAndTime,
  service,
  staff,
  comments = '',
}: Appointment) => {
  const baseUrl = API_URL;
  const token = (await StorageAdapter.getItem('token')) || '';
  try {
    const response = await fetch(`${baseUrl}/appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        startDateAndTime,
        endDateAndTime,
        service,
        staff,
        comments,
      }),
      redirect: 'follow',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving appointment:', error);
    return error;
  }
};
