import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TimeStampDto } from './timeStamp.dto';

export default class TimeStampEntity
  extends BaseEntity
  implements TimeStampDto
{
  @Column({ type: String, unique: true, nullable: false, length: 36 })
  refId?: string;

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

    this.refId = data?.refId ?? uuidv4();

    this.createdById = data?.createdById ?? 1;
    this.createdAt = data?.createdAt ?? now;

    this.updatedById = data?.updatedById ?? this.createdById;
    this.updatedAt = data?.updatedAt ?? now;

    this.deletedById = data?.deletedById;
    this.deletedAt = data?.deletedAt;
  }
}
