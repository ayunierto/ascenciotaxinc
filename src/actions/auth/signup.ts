import {API_URL} from '@env';
import {RegisterData} from '../../infrastructure/interfaces';

export const signup = async ({
  email,
  last_name,
  name,
  password,
  phone_number,
}: RegisterData) => {
  email = email.toLocaleLowerCase().trim();
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        last_name,
        name,
        password,
        phone_number,
      }),
    }).then(data => data.json());

    return response;
  } catch (error) {
    return error;
  }
};
