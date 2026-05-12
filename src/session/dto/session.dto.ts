import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

const idType = Number;

export class SessionDto extends TimeStampDto {
  @ApiProperty({
    type: idType,
  })
  @IsNotEmpty()
  id: number | string;

  constructor(data?: SessionDto) {
    super(data);

    if (data) {
      this.id = Number(data.id);
    }
  }
}
