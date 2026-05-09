import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RelationalRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalRolePersistenceModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, RelationalRolePersistenceModule],
})
export class RolesModule {}
