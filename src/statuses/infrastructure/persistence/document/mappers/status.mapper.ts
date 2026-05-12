import { Status } from '../../../../domain/status';
import { StatusSchemaClass } from '../entities/status.schema';

export class StatusMapper {
  public static toDomain(raw: StatusSchemaClass): Status {
    const domainEntity = new Status();

    domainEntity.id = raw._id.toString();
    domainEntity.refId = raw.refId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.createdById = raw.createdById;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.updatedById = raw.updatedById;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.deletedById = raw.deletedById;

    domainEntity.name = raw.name;
    domainEntity.description = raw.description;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Status): StatusSchemaClass {
    const persistenceSchema = new StatusSchemaClass();

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id.toString();
    }

    persistenceSchema.refId = domainEntity.refId;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.createdById = domainEntity.createdById;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.updatedById = domainEntity.updatedById;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    persistenceSchema.deletedById = domainEntity.deletedById;

    persistenceSchema.name = domainEntity.name;
    persistenceSchema.description = domainEntity.description;

    return persistenceSchema;
  }
}
