import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { SessionDto } from '../../session/dto/session.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { UserDto } from '../dto/user.dto';
import { RoleDto } from '../../roles/dto/role.dto';

const idType = Number;

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

      this.role = data.role;
      this.status = data.status;
      this.sessions = data.sessions;
    }
  }
}
