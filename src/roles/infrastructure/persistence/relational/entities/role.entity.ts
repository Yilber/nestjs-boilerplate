import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelperWithTimeStamp } from '../../../../../utils/relational-entity-helper-with-timestamp';
import { Role } from '../../../../domain/role';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'roles',
})
export class RoleEntity
  extends EntityRelationalHelperWithTimeStamp
  implements Role
{
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @Column({
    nullable: false,
    type: String,
  })
  description: string;

  @OneToMany(() => UserEntity, (users) => users.role)
  users?: UserEntity[];

  constructor(data?: Role) {
    super(data);

    if (data) {
      this.id = Number(data.id);
      this.name = data.name;
      this.description = data.description;
    }
  }
}
