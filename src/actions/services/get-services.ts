import {API_URL} from '@env';
import {ServicesResponse} from '../../infrastructure/interfaces/services.response';

export const getServices = async () => {
  try {
    const services: ServicesResponse[] = await fetch(
      `${API_URL}/services`,
    ).then(result => result.json());

    return services;
  } catch (error) {
    return error;
  }
};
