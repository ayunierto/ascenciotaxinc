import {create} from 'zustand';
import {User} from '../../../domain/entities/user';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {checkSatus, signin, signup} from '../../../actions/auth';
import {RegisterData} from '../../../infrastructure/interfaces';
import {verifyCode} from '../../../actions/auth/auth';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  signin: (email: string, password: string) => Promise<any>;
  signup: (values: RegisterData) => Promise<any>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<boolean>;
  verifyCode: (phone_number: string, verfication_code: string) => Promise<any>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  signin: async (username: string, password: string) => {
    const response = await signin(username, password);
    if (response.error === 'Inactive') {
      set({status: 'unauthenticated', token: undefined, user: undefined});
    }
    return response;
    // if (!response) {
    //   set({status: 'unauthenticated', token: undefined, user: undefined});
    //   return false;
    // }

    // await StorageAdapter.setItem('token', response.token);

    // set({status: 'authenticated', token: response.token, user: response.user});
    // return true;
  },

  signup: async (values: RegisterData) => {
    const response = await signup(values);
    if (response.verification_code) {
      set({status: 'unauthenticated', token: undefined, user: response});
    }
    return response;
    // if (!response) {
    //   set({status: 'unauthenticated', token: undefined, user: undefined});
    //   return false;
    // }

    // await StorageAdapter.setItem('token', response.token);

    // set({status: 'authenticated', token: response.token, user: response.user});
    // return true;
  },

  checkStatus: async () => {
    const response = await checkSatus();

    if (response.statusCode === 401) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }

    if (!response) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }

    await StorageAdapter.setItem('token', response.token);
    set({status: 'authenticated', token: response.token, user: response.user});
  },

  logout: async () => {
    const response = await StorageAdapter.removeItem('token');
    if (response) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return true;
    }
    return false;
  },

  verifyCode: async (phone_number: string, verification_code: string) => {
    const response = await verifyCode(phone_number, verification_code);
    if (response.token) {
      await StorageAdapter.setItem('token', response.token);
      set({
        status: 'authenticated',
        token: response.token,
        user: undefined,
      });
    }
    return response;
  },
}));
