import { Transform } from 'class-transformer';
import { TimeStampDto } from './dto/timeStamp.dto';
import { TimeStampSchemaClass } from './dto/timeStampDocument.entity';

export class EntityDocumentHelperWithTimeStamp extends TimeStampSchemaClass {
  @Transform(
    (value) => {
      if ('value' in value) {
        // https://github.com/typestack/class-transformer/issues/879
        return value.obj[value.key].toString();
      }

      return 'unknown value';
    },
    {
      toPlainOnly: true,
    },
  )
  public _id: string;

  constructor(data?: TimeStampDto) {
    super(data);
  }
}
