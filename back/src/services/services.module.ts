import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ServicesControllers } from './services.controllers';
import { ServicesProviders } from './services.providers';
import { ServicesService } from './services.service';

@Module({
  imports: [DatabaseModule],
  providers: [...ServicesProviders, ServicesService],
  controllers: [ServicesControllers],
  exports: [ServicesService],
})
export class ServicesModule {}