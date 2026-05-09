import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';
import { DatabaseConfig } from '../../database/config/database-config.type';
import databaseConfig from '../../database/config/database.config';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

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
