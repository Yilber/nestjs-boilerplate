import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EntityDocumentHelperWithTimeStamp } from '../../../../../utils/document-entity-helper-with-timestamp';

export type SessionSchemaDocument = HydratedDocument<SessionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class SessionSchemaClass extends EntityDocumentHelperWithTimeStamp {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSchemaClass' })
  user: string;

  @Prop()
  userId: number;

  @Prop()
  hash: string;
}

export const SessionSchema = SchemaFactory.createForClass(SessionSchemaClass);

SessionSchema.index({ user: 1 });
