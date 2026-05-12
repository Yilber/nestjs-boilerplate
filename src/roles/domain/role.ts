import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { RoleDto } from '../dto/role.dto';

const idType = Number;

export class Role extends RoleDto {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Admin',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Admin Role',
  })
  description: string;

  @ApiProperty({
    type: UserDto,
    isArray: true,
  })
  users?: UserDto[];

  constructor(data?: Role) {
    super(data);

    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.users = data.users;
    }
  }
}
