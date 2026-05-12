import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { SessionEntity } from '../../../../../session/infrastructure/persistence/relational/entities/session.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { EntityRelationalHelperWithTimeStamp } from '../../../../../utils/relational-entity-helper-with-timestamp';
import { User } from '../../../../domain/user';

@Entity({
  name: 'users',
})
export class UserEntity
  extends EntityRelationalHelperWithTimeStamp
  implements User
{
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({ type: String, unique: true, nullable: false })
  email: string;

  @Column({ type: String, nullable: false })
  password: string;

  @Column({ type: Number, nullable: false })
  roleId: number;

  @Column({ type: Number, nullable: false })
  statusId: number;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
  role?: RoleEntity;

  @ManyToOne(() => StatusEntity, (status) => status.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'statusId', referencedColumnName: 'id' }])
  status?: StatusEntity;

  @OneToMany(() => SessionEntity, (sessions) => sessions.user)
  sessions?: SessionEntity[];

  constructor(data?: User) {
    super(data);

    if (data) {
      this.id = Number(data.id);
      this.email = data.email;
      this.password = data.password;
      this.roleId = data.roleId;
      this.statusId = data.statusId;
    }
  }
}
