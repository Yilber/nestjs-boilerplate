import {
  // typeorm decorators here
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelperWithTimeStamp } from '../../../../../utils/relational-entity-helper-with-timestamp';
import { FileType } from '../../../../domain/file';

@Entity({
  name: 'files',
})
export class FileEntity
  extends EntityRelationalHelperWithTimeStamp
  implements FileType
{
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({
    nullable: false,
    type: String,
  })
  path: string;

  constructor(data?: FileType) {
    super(data);

    if (data) {
      this.id = Number(data.id);
      this.path = data.path;
    }
  }
}
