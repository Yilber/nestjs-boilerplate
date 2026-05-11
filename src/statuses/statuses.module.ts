import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { RelationalStatusPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DocumentStatusPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

// <database-block>
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentStatusPersistenceModule
  : RelationalStatusPersistenceModule;
// </database-block>

@Module({
  imports: [
    // do not remove this comment
    infrastructurePersistenceModule,
  ],
  controllers: [StatusesController],
  providers: [StatusesService],
  exports: [StatusesService, infrastructurePersistenceModule],
})
export class StatusesModule {}
