---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
import { ApiProperty } from '@nestjs/swagger';
import { <%= name %>Dto } from '../dto/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';

const idType = Number;

export class <%= name %> extends <%= name %>Dto {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

 @ApiProperty({
    type: String,
    example: 'John',
  })
  name: string;

  constructor(data?: <%= name %>) {
    super(data);

    if(data){
      this.name = data.name;
    }
  }
}
