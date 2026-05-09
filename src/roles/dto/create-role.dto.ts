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

export class CreateRoleDto extends TimeStampDto {
  @ApiProperty({
    example: 'Admin',
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'admin account',
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
