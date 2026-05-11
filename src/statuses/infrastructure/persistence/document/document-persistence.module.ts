import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema, StatusSchemaClass } from './entities/status.schema';
import { StatusRepository } from '../status.repository';
import { StatusDocumentRepository } from './repositories/status.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatusSchemaClass.name, schema: StatusSchema },
    ]),
  ],
  providers: [
    {
      provide: StatusRepository,
      useClass: StatusDocumentRepository,
    },
  ],
  exports: [StatusRepository],
})
export class DocumentStatusPersistenceModule {}
