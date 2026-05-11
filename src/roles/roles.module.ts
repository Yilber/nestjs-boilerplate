import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RelationalRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';
import { DocumentRolePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

// <database-block>
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentRolePersistenceModule
  : RelationalRolePersistenceModule;
// </database-block>

@Module({
  imports: [
    // do not remove this comment
    infrastructurePersistenceModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, infrastructurePersistenceModule],
})
export class RolesModule {}
