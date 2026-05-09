---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
---
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

export class Create<%= name %>Dto extends TimeStampDto {  
  @ApiProperty({
    example: 'John',
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
