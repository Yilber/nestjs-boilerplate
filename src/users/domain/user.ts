import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { SessionDto } from '../../session/dto/session.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { UserDto } from '../dto/user.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { DatabaseConfig } from '../../database/config/database-config.type';
import databaseConfig from '../../database/config/database.config';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class User extends UserDto {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @ApiProperty({
    type: Number,
    nullable: false,
    example: 1,
  })
  roleId: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    example: 1,
  })
  statusId: number;

  @ApiProperty({
    type: () => RoleDto,
  })
  role?: RoleDto;

  @ApiProperty({
    type: () => StatusDto,
  })
  status?: StatusDto;

  @ApiProperty({
    type: () => SessionDto,
    isArray: true,
  })
  sessions?: SessionDto[];

  constructor(data?: User) {
    super(data);

    if (data) {
      this.email = data.email;
      this.password = data.password;
      this.roleId = data.roleId;
      this.statusId = data.statusId;

      this.provider = data.provider;
      this.socialId = data.socialId;

      this.role = data.role;
      this.status = data.status;
      this.sessions = data.sessions;
    }
  }
}
