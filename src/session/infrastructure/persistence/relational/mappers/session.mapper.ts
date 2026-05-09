import { Session } from '../../../../domain/session';
import { SessionEntity } from '../entities/session.entity';

export class SessionMapper {
  static toDomain(raw: SessionEntity): Session {
    const domainEntity = new Session(raw);

    return domainEntity;
  }

  static toPersistence(domainEntity: Session): SessionEntity {
    const persistenceEntity = new SessionEntity(domainEntity);

    return persistenceEntity;
  }
}
