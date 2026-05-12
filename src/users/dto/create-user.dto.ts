import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import {
  // decorators here
  Transform,
} from 'class-transformer';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto extends TimeStampDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', type: String, required: true })
  @MinLength(6)
  password: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  statusId: number;
}
