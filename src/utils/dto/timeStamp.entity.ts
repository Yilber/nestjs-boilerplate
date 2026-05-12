import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  UpdateDateColumn,
} from 'typeorm';
import { TimeStampDto } from './timeStamp.dto';
import { UUID } from '../types/uuid.type';

export default class TimeStampEntity
  extends BaseEntity
  implements TimeStampDto
{
  @Column({ type: 'uuid', unique: true, nullable: false })
  @Generated('uuid')
  refId?: UUID;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ type: Number, nullable: false })
  createdById?: number;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: Number, nullable: false })
  updatedById?: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ type: Number, nullable: true })
  deletedById?: number;

  constructor(data?: TimeStampDto) {
    super();

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
