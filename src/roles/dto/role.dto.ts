import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';

const idType = Number;

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
