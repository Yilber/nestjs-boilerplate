import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type StatusSchemaDocument = HydratedDocument<StatusSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class StatusSchemaClass extends EntityDocumentHelper {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const StatusSchema = SchemaFactory.createForClass(StatusSchemaClass);
