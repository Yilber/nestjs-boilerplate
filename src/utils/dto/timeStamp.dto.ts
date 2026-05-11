import { ApiPropertyOptional } from '@nestjs/swagger';
import { UUID } from '../types/uuid.type';

export class TimeStampDto {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    nullable: false,
    example: '69297e85-cb6c-4256-902f-bb32756b8a1d',
  })
  refId?: UUID;

  @ApiPropertyOptional({
    type: Date,
    example: '2025-10-21 14:36:53.976000',
  })
  createdAt?: Date;

  @ApiPropertyOptional({
    type: Number,
    nullable: false,
    example: 1,
  })
  createdById?: number;

  @ApiPropertyOptional({
    type: Date,
    example: '2025-10-21 14:36:53.976000',
  })
  updatedAt?: Date;

  @ApiPropertyOptional({
    type: Number,
    nullable: false,
    example: 1,
  })
  updatedById?: number;

  @ApiPropertyOptional({
    type: Date,
    nullable: true,
    example: '2025-10-21 14:36:53.976000',
  })
  deletedAt?: Date;

  @ApiPropertyOptional({
    type: Number,
    nullable: true,
    example: 1,
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
