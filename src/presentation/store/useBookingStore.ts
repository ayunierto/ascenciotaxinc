import {create} from 'zustand';

export interface BookingState {
  service: string | undefined;
  date: string | undefined;
  address: string | undefined;
  staff: string | undefined;
  time: string | undefined;
  //   user?: User;

  setState: ({service, date, address, staff, time}: SetState) => void;

  bookNow: (
    service: string,
    date: string,
    address: string,
    staff: string,
    time: string,
  ) => Promise<boolean>;
}

interface SetState {
  service?: string | undefined;
  date?: string | undefined;
  address?: string | undefined;
  staff?: string | undefined;
  time?: string | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useBookingStore = create<BookingState>()((set, get) => ({
  service: undefined,
  date: undefined,
  address: undefined,
  staff: undefined,
  time: undefined,

  //   login: async (email: string, password: string) => {
  //     const resp = await authLogin(email, password);
  //     if (!resp) {
  //       set({status: 'unauthenticated', token: undefined, user: undefined});
  //       return false;
  //     }

  //     await StorageAdapter.setItem('token', resp.token);

  //     set({status: 'authenticated', token: resp.token, user: resp.user});
  //     return true;
  //   },

  bookNow: async () => {
    return false;
  },

  setState: ({service, date, address, staff, time}: SetState) => {
    if (service) {
      set({service});
    }
    if (date) {
      set({date});
    }
    if (address) {
      set({address});
    }
    if (staff) {
      set({staff});
    }
    if (time) {
      set({time});
    }
  },
}));
