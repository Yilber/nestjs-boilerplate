import { instanceToPlain } from 'class-transformer';
import { AfterLoad } from 'typeorm';
import TimeStampEntity from './dto/timeStamp.entity';
import { TimeStampDto } from './dto/timeStamp.dto';

export class EntityRelationalHelperWithTimeStamp extends TimeStampEntity {
  __entity?: string;

  constructor(data?: TimeStampDto) {
    super(data);
  }

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
