import {
  // common
  Injectable,
} from '@nestjs/common';
import { User } from '../users/domain/user';
import { NullableType } from '../utils/types/nullable.type';
import { Session } from './domain/session';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionRepository } from './infrastructure/persistence/session.repository';

@Injectable()
export class SessionService {
  constructor(
    // Dependencies here
    private readonly sessionRepository: SessionRepository,
  ) {}

  create(createSessionDto: CreateSessionDto): Promise<Session> {
    // Do not remove comment below.
    // <creating-property />

    return this.sessionRepository.create({
      ...createSessionDto,
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findById(id: Session['id']): Promise<NullableType<Session>> {
    return this.sessionRepository.findById(id);
  }

  update(
    id: Session['id'],
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session | any> {
    // Do not remove comment below.
    // <updating-property />

    return this.sessionRepository.update(id, {
      ...updateSessionDto,
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  updateByHash(
    conditions: { id: Session['id']; hash: Session['hash'] },
    payload: Partial<
      Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Session | null> {
    return this.sessionRepository.updateByHash(conditions, payload);
  }

  deleteById(id: Session['id']): Promise<void> {
    return this.sessionRepository.deleteById(id);
  }

  deleteByUserId(conditions: { userId: User['id'] }): Promise<void> {
    return this.sessionRepository.deleteByUserId(conditions);
  }

  deleteByUserIdWithExclude(conditions: {
    userId: User['id'];
    excludeSessionId: Session['id'];
  }): Promise<void> {
    return this.sessionRepository.deleteByUserIdWithExclude(conditions);
  }

  remove(id: Session['id']): Promise<any> {
    return this.sessionRepository.remove(id);
  }
}
