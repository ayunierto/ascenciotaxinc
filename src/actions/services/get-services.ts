import {API_URL} from '@env';
import {ServiceResponse} from '../../infrastructure/interfaces/services.response';

export const getServices = async (): Promise<ServiceResponse[] | null> => {
  try {
    const url = API_URL;
    const services: ServiceResponse[] = await fetch(`${url}/services`).then(
      result => result.json(),
    );
    return services;
  } catch (error) {
    return null;
  }
};
