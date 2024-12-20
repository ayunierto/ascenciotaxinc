import {api} from '../../config/api/api';
import {RegisterData} from '../../infrastructure/interfaces';

export const signin = async (username: string, password: string) => {
  try {
    const data = await api('/auth/signin', 'POST', {
      username: username,
      password,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const signup = async ({
  email,
  last_name,
  name,
  password,
  phone_number,
}: RegisterData) => {
  email = email.toLocaleLowerCase().trim();

  try {
    const data = await api('/auth/signup', 'POST', {
      email,
      last_name,
      name,
      password,
      phone_number,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const checkSatus = async () => {
  try {
    const data = await api('/auth/check-status', 'GET');
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const verifyCode = async (
  phone_number: string,
  verfication_code: string,
) => {
  try {
    const data = await api('/auth/verify-code', 'POST', {
      phone_number: phone_number,
      verfication_code: verfication_code,
    });
    return data;
  } catch (error) {
    return error;
  }
};
