import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { SessionDto } from '../dto/session.dto';

const idType = Number;

export class Session extends SessionDto {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: Number,
  })
  userId: number;

  @ApiProperty({
    type: String,
  })
  hash: string;

  @ApiProperty({
    type: User,
  })
  user?: User;

  constructor(data?: Session) {
    super(data);

    if (data) {
      this.userId = data.userId;
      this.hash = data.hash;
      this.user = data.user;
    }
  }
}
