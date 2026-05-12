import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

const idType = Number;

export class UserDto extends TimeStampDto {
  @ApiProperty({
    type: idType,
    example: 'userId',
  })
  @IsNotEmpty()
  id: number | string;

  constructor(data?: UserDto) {
    super(data);

    if (data) {
      this.id = Number(data.id);
    }
  }
}
