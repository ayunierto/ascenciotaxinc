import {api} from '../../config/api/api';
import {Service} from '../../domain/entities/service';
import {ServicesResponse} from '../../infrastructure/interfaces/services.response';
import {ServiceMapper} from '../../infrastructure/mappers/service.mapper';

export const getServices = async (): Promise<Service[]> => {
  try {
    const data: ServicesResponse[] = await api('/services', 'GET');
    const services = data.map(ServiceMapper.serviceToEntity);
    return services;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting services');
  }
};
