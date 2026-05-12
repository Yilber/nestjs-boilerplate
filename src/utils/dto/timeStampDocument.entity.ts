import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { UUID } from '../types/uuid.type';
import { TimeStampDto } from './timeStamp.dto';

export type TimeStampSchemaDocument = HydratedDocument<TimeStampSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class TimeStampSchemaClass implements TimeStampDto {
  @Prop({
    type: String,
    unique: true,
    length: 36,
  })
  refId?: UUID;

  @Prop({ default: now })
  createdAt?: Date;

  @Prop({
    type: Number,
  })
  createdById?: number;

  @Prop({ default: now })
  updatedAt?: Date;

  @Prop({
    type: Number,
  })
  updatedById?: number;

  @Prop()
  deletedAt?: Date;

  @Prop({
    type: Number,
  })
  deletedById?: number;

  constructor(data?: TimeStampDto) {
    const now = new Date();

    this.refId = data?.refId;

    this.createdById = data?.createdById ?? 1;
    this.createdAt = data?.createdAt ?? now;

    this.updatedById = data?.updatedById ?? this.createdById;
    this.updatedAt = data?.updatedAt ?? now;

    this.deletedById = data?.deletedById;
    this.deletedAt = data?.deletedAt;
  }
}

export const TimeStampSchema =
  SchemaFactory.createForClass(TimeStampSchemaClass);
