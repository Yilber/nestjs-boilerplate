import { UpdateResult } from 'typeorm';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Status } from '../../domain/status';

export abstract class StatusRepository {
  abstract create(
    data: Omit<Status, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Status>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Status[]>;

  abstract findByName(name: Status['name']): Promise<NullableType<Status>>;

  abstract findByRefId(refId: Status['refId']): Promise<NullableType<Status>>;

  abstract findById(id: Status['id']): Promise<NullableType<Status>>;

  abstract findByIds(ids: Status['id'][]): Promise<Status[]>;

  abstract update(
    id: Status['id'],
    payload: DeepPartial<Status>,
  ): Promise<Status | UpdateResult>;

  // abstract remove(id: Status['id']): Promise<UpdateResult>;
}
