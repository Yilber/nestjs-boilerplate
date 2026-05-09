---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
---
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

const idType = Number;

export class <%= name %>Dto extends TimeStampDto {
  @ApiProperty({
    type: idType,
    example: '<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Id',
  })
  @IsNotEmpty()
  id: number | string;

  constructor(data?: <%= name %>Dto) {
    super(data);

    if (data) {
      this.id = Number(data.id);
    }
  }
}
