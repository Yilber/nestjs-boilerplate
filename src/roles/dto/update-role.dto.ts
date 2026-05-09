import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional({ example: 'User', type: String })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Cuenta de usuario', type: String })
  @IsOptional()
  description?: string;
}
