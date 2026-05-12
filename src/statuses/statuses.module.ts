import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { RelationalStatusPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalStatusPersistenceModule;

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
