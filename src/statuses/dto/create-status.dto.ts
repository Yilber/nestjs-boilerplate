import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

export class CreateStatusDto extends TimeStampDto {
  @ApiProperty({
    example: 'Active',
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Active status',
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
