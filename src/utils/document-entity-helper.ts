import { Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { now } from 'mongoose';
import { UUID } from './types/uuid.type';

export class EntityDocumentHelper {
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

  @Prop()
  refId?: UUID;

  @Prop({ default: now })
  createdAt?: Date;

  @Prop()
  createdById?: number;

  @Prop({ default: now })
  updatedAt?: Date;

  @Prop()
  updatedById?: number;

  @Prop()
  deletedAt?: Date;

  @Prop()
  deletedById?: number;
}
