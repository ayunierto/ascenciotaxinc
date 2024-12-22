import {API_URL} from '@env';

export const verifyCode = async (
  phone_number: string,
  verfication_code: string,
) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone_number, verfication_code}),
    }).then(data => data.json());

    return response;
  } catch (error) {
    return error;
  }
};
