import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type RoleSchemaDocument = HydratedDocument<RoleSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class RoleSchemaClass extends EntityDocumentHelper {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleSchemaClass);
