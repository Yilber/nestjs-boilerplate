import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { RelationalStatusPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalStatusPersistenceModule,
  ],
  controllers: [StatusesController],
  providers: [StatusesService],
  exports: [StatusesService, RelationalStatusPersistenceModule],
})
export class StatusesModule {}
