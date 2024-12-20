import {create} from 'zustand';

export interface BookingState {
  service: string | undefined;
  date: string | undefined;
  address: string | undefined;
  staff: string | undefined;
  time: string | undefined;
  staffMembers: string[];

  bookNow: (service: string, staffMembers: string[]) => void;
}

export const useBookingStore = create<BookingState>()(set => ({
  service: undefined,
  date: undefined,
  address: undefined,
  staff: undefined,
  time: undefined,
  staffMembers: [],

  bookNow: (service: string, staffMembers: string[]) => {
    set({service, staffMembers});
  },
}));
