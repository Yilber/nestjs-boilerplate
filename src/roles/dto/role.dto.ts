import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';
import { DatabaseConfig } from '../../database/config/database-config.type';
import databaseConfig from '../../database/config/database.config';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class RoleDto extends TimeStampDto {
  @ApiProperty({
    type: idType,
    example: 'roleId',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number | string;

  constructor(data?: RoleDto) {
    super(data);

    if (data) {
      this.id = Number(data.id);
    }
  }
}
