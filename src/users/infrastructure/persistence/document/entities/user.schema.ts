import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import {
  RoleSchema,
  RoleSchemaClass,
} from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';
import {
  StatusSchema,
  StatusSchemaClass,
} from '../../../../../statuses/infrastructure/persistence/document/entities/status.schema';
import { EntityDocumentHelperWithTimeStamp } from '../../../../../utils/document-entity-helper-with-timestamp';

export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelperWithTimeStamp {
  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: AuthProvidersEnum.email,
  })
  provider: string;

  @Prop({
    type: String,
    default: null,
  })
  socialId?: string | null;

  @Prop({
    type: Number,
  })
  roleId?: number;

  @Prop({
    type: Number,
  })
  statusId?: number;

  @Prop({
    type: RoleSchema,
  })
  role?: RoleSchemaClass;

  @Prop({
    type: StatusSchema,
  })
  status?: StatusSchemaClass;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);

UserSchema.index({ 'role._id': 1 });
