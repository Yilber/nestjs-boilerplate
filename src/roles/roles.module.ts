import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RelationalRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalRolePersistenceModule;

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
