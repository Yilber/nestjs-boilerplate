import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';
import { DatabaseConfig } from '../../database/config/database-config.type';
import databaseConfig from '../../database/config/database.config';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

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
