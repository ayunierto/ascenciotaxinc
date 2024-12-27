import {create} from 'zustand';
import {ServiceResponse as Service} from '../../infrastructure/interfaces/services.response';
import {saveAppointment} from '../../actions/appointments';
import {StorageAdapter} from '../../config/adapters/storage-adapter';

export interface BookingState {
  selectedService: Service | undefined;
  startDateAndTime: string | undefined;
  endDateAndTime: string | undefined;
  staffId: string | undefined;
  staffName: string | undefined;

  selectService: (service: Service) => void;
  saveDetails: (
    staffId: string,
    staffName: string,
    startDateAndTime: string,
    endDateAndTime: string,
  ) => void;
  bookNow: () => Promise<any>;
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  selectedService: undefined,
  startDateAndTime: undefined,
  endDateAndTime: undefined,
  staffId: undefined,
  staffName: undefined,

  selectService: async (selectedService: Service) => {
    set({selectedService});
    await StorageAdapter.setItem(
      'selectedService',
      JSON.stringify(selectedService),
    );
  },

  saveDetails: (
    staffId: string,
    staffName: string,
    startDateAndTime: string,
    endDateAndTime: string,
  ) => {
    set({staffId, staffName, startDateAndTime, endDateAndTime});
  },

  bookNow: async () => {
    const {endDateAndTime, selectedService, staffId, startDateAndTime} = get();
    if (endDateAndTime && selectedService && staffId && startDateAndTime) {
      const response = saveAppointment({
        startDateAndTime,
        endDateAndTime,
        service: selectedService.id,
        staff: staffId,
      });
      return response;
    }
    return null;
  },
}));
