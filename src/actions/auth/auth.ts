import {api} from '../../config/api/api';
import {User} from '../../domain/entities/user';
import type {AuthResponse} from '../../infrastructure/interfaces/auth.response';

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLocaleLowerCase();
  try {
    const data = await api('/auth/signin', 'POST', {
      email,
      password,
    });
    if (data.token) {
      return returnUserToken(data);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckSatus = async () => {
  try {
    const data = await api('/auth/check-status', 'GET');
    if (data.token) {
      return returnUserToken(data);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
