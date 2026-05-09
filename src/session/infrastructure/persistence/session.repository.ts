import { DeepPartial, UpdateResult } from 'typeorm';
import { User } from '../../../users/domain/user';
import { NullableType } from '../../../utils/types/nullable.type';
import { Session } from '../../domain/session';

export abstract class SessionRepository {
  abstract create(
    data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Session>;

  abstract findById(id: Session['id']): Promise<NullableType<Session>>;

  abstract update(
    id: Session['id'],
    payload: DeepPartial<Session>,
  ): Promise<Session | UpdateResult>;

  abstract updateByHash(
    conditions: { id: Session['id']; hash: Session['hash'] },
    payload: Partial<
      Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Session | null>;

  abstract deleteById(id: Session['id']): Promise<void>;

  abstract deleteByUserId(conditions: { userId: User['id'] }): Promise<void>;

  abstract deleteByUserIdWithExclude(conditions: {
    userId: User['id'];
    excludeSessionId: Session['id'];
  }): Promise<void>;

  abstract remove(id: Session['id']): Promise<UpdateResult>;
}
