import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelperWithTimeStamp } from '../../../../../utils/document-entity-helper-with-timestamp';

export type RoleSchemaDocument = HydratedDocument<RoleSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class RoleSchemaClass extends EntityDocumentHelperWithTimeStamp {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleSchemaClass);
