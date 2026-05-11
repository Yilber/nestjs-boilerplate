import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelperWithTimeStamp } from '../../../../../utils/document-entity-helper-with-timestamp';

export type StatusSchemaDocument = HydratedDocument<StatusSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class StatusSchemaClass extends EntityDocumentHelperWithTimeStamp {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const StatusSchema = SchemaFactory.createForClass(StatusSchemaClass);
