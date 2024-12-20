import {Service} from '../../domain/entities/service';
import {ServicesResponse} from '../interfaces/services.response';

export class ServiceMapper {
  static serviceToEntity(service: ServicesResponse): Service {
    const staffMembers = service.staffMembers.map(member => member.name);
    return {
      id: service.id,
      title: service.title,
      isAvailableOnline: service.isAvailableOnline,
      duration: service.duration,
      isActive: service.isActive,
      image: service.images[0].url,
      staffMembers,
    };
  }
}
