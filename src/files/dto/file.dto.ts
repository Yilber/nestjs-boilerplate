import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TimeStampDto } from '../../utils/dto/timeStamp.dto';
import { DatabaseConfig } from '../../database/config/database-config.type';
import databaseConfig from '../../database/config/database.config';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class FileDto extends TimeStampDto {
  @ApiProperty({
    type: idType,
    example: 'fileId',
  })
  @IsNotEmpty()
  id: number | string;

  @ApiProperty({
    example: 'https://example.com/path/to/file.jpg',
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  constructor(data?: FileDto) {
    super(data);

    if (data) {
      this.id = Number(data.id);
      this.path = data.path;
    }
  }
}
