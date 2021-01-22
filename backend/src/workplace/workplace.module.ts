import { Module , HttpModule} from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import { WorkplaceController } from './workplace.controller';

@Module({
  imports:[HttpModule.register({
    timeout: 1000 * 60,
    maxRedirects: 3,
  })],
  providers: [WorkplaceService],
  controllers: [WorkplaceController]
})
export class WorkplaceModule {}
