import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiPropertyOptional({
    type: Number,
  })
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  hash?: string;
}
