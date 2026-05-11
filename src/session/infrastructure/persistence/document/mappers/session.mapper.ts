import { User } from '../../../../../users/domain/user';
import { Session } from '../../../../domain/session';
import { SessionSchemaClass } from '../entities/session.schema';

export class SessionMapper {
  static toDomain(raw: SessionSchemaClass): Session {
    const domainEntity = new Session();

    domainEntity.id = raw._id.toString();
    domainEntity.refId = raw.refId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.createdById = raw.createdById;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.updatedById = raw.updatedById;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.deletedById = raw.deletedById;

    if (raw.user) {
      const user = new User();
      user.id = raw.user.toString();
      domainEntity.user = user;
    }

    domainEntity.hash = raw.hash;

    return domainEntity;
  }

  static toPersistence(domainEntity: Session): SessionSchemaClass {
    const persistenceSchema = new SessionSchemaClass();

    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }

    persistenceSchema.refId = domainEntity.refId;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.createdById = domainEntity.createdById;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.updatedById = domainEntity.updatedById;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    persistenceSchema.deletedById = domainEntity.deletedById;

    persistenceSchema.user = domainEntity.user.id.toString();
    persistenceSchema.hash = domainEntity.hash;

    return persistenceSchema;
  }
}
