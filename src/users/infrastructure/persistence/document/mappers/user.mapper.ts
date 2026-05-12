import { User } from '../../../../domain/user';
import { UserSchemaClass } from '../entities/user.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();

    domainEntity.id = raw._id.toString();
    domainEntity.refId = raw.refId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.createdById = raw.createdById;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.updatedById = raw.updatedById;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.deletedById = raw.deletedById;

    domainEntity.email = raw.email;
    domainEntity.password = raw.password;
    domainEntity.provider = raw.provider;
    domainEntity.socialId = raw.socialId;

    if (raw.role) {
      domainEntity.roleId = Number(raw.role._id);
    }

    if (raw.status) {
      domainEntity.statusId = Number(raw.status._id);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserSchemaClass {
    const persistenceSchema = new UserSchemaClass();

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

    persistenceSchema.email = domainEntity.email;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.provider = domainEntity.provider;
    persistenceSchema.socialId = domainEntity.socialId;

    if (domainEntity.role) {
      persistenceSchema.roleId = Number(domainEntity.role.id);
    }

    if (domainEntity.status) {
      persistenceSchema.statusId = Number(domainEntity.status.id);
    }

    return persistenceSchema;
  }
}
