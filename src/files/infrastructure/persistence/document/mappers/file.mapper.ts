import { FileType } from '../../../../domain/file';
import { FileSchemaClass } from '../entities/file.schema';

export class FileMapper {
  static toDomain(raw: FileSchemaClass): FileType {
    const domainEntity = new FileType();

    domainEntity.id = raw._id.toString();
    domainEntity.refId = raw.refId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.createdById = raw.createdById;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.updatedById = raw.updatedById;
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.deletedById = raw.deletedById;

    domainEntity.path = raw.path;

    return domainEntity;
  }
  static toPersistence(domainEntity: FileType): FileSchemaClass {
    const persistenceSchema = new FileSchemaClass();

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

    persistenceSchema.path = domainEntity.path;

    return persistenceSchema;
  }
}
