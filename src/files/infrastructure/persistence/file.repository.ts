import { UpdateResult } from 'typeorm';
import { NullableType } from '../../../utils/types/nullable.type';
import { FileType } from '../../domain/file';

export abstract class FileRepository {
  abstract create(
    data: Omit<FileType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<FileType>;

  abstract findById(id: FileType['id']): Promise<NullableType<FileType>>;

  abstract findByRefId(
    refId: FileType['refId'],
  ): Promise<NullableType<FileType>>;

  abstract findByIds(ids: FileType['id'][]): Promise<FileType[]>;

  abstract remove(id: FileType['id']): Promise<UpdateResult>;
}
