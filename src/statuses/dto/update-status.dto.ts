import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateStatusDto } from './create-status.dto';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
  @ApiPropertyOptional({ example: 'Deactivated', type: String })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Not active now', type: String })
  @IsOptional()
  description?: string;
}
