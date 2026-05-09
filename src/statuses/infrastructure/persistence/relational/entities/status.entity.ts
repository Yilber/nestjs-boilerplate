import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelperWithTimeStamp } from '../../../../../utils/relational-entity-helper-with-timestamp';
import { Status } from '../../../../domain/status';

@Entity({
  name: 'status',
})
export class StatusEntity
  extends EntityRelationalHelperWithTimeStamp
  implements Status
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

  @OneToMany(() => UserEntity, (users) => users.status)
  users?: UserEntity[];

  constructor(data?: Status) {
    super(data);

    if (data) {
      this.id = Number(data.id);
      this.name = data.name;
      this.description = data.description;
    }
  }
}
