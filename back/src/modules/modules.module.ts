import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ServicesModule } from '../services/services.module';
import { ModulesController } from './modules.controllers';
import { ModulesProviders } from './modules.providers';
import { ModulesService } from './modules.service';

@Module({
  imports: [DatabaseModule, ServicesModule],
  providers: [...ModulesProviders, ModulesService],
  controllers: [ModulesController],
  exports: [ModulesService],
})
export class ModulesModule {}
