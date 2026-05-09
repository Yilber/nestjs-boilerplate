import { Status } from '../../../../domain/status';
import { StatusEntity } from '../entities/status.entity';

export class StatusMapper {
  static toDomain(raw: StatusEntity): Status {
    const domainEntity = new Status(raw);

    return domainEntity;
  }

  static toPersistence(domainEntity: Status): StatusEntity {
    const persistenceEntity = new StatusEntity(domainEntity);

    return persistenceEntity;
  }
}
