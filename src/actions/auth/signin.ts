import {API_URL} from '@env';

export const signin = async (username: string, password: string) => {
  try {
    const url = API_URL;
    const response = await fetch(`${url}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    }).then();
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
