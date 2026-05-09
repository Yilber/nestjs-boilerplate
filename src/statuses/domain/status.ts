import { ApiProperty } from '@nestjs/swagger';
import { StatusDto } from '../dto/status.dto';
import { UserDto } from '../../users/dto/user.dto';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Status extends StatusDto {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'active',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  description: string;

  @ApiProperty({
    type: UserDto,
    isArray: true,
  })
  users?: UserDto[];

  constructor(data?: Status) {
    super(data);

    if (data) {
      this.name = data.name;
      this.description = data.description;

      this.users = data.users;
    }
  }
}
