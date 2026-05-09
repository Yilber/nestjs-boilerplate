import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

export class CreateSessionDto extends TimeStampDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hash: string;
}
