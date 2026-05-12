import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

const idType = Number;

export class StatusDto extends TimeStampDto {
  @ApiProperty({
    type: idType,
    example: 'statusId',
  })
  @IsNumber()
  id: number | string;

  constructor(data?: StatusDto) {
    super(data);

    if (data) {
      this.id = Number(data.id);
    }
  }
}
