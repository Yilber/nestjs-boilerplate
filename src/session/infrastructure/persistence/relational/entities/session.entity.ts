import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelperWithTimeStamp } from '../../../../../utils/relational-entity-helper-with-timestamp';
import { Session } from '../../../../domain/session';

@Entity({
  name: 'sessions',
})
export class SessionEntity
  extends EntityRelationalHelperWithTimeStamp
  implements Session
{
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({
    type: Number,
    nullable: false,
  })
  userId: number;

  @Column({
    type: String,
    nullable: false,
  })
  hash: string;

  @ManyToOne(() => UserEntity, (users) => users.sessions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user?: UserEntity;

  constructor(data?: Session) {
    super(data);

    if (data) {
      this.id = Number(data.id);
      this.userId = Number(data.userId);
      this.hash = data.hash;
    }
  }
}
