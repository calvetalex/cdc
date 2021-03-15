import { Module } from '@nestjs/common';
import { ModulesModule } from 'src/modules/modules.module';
import { DatabaseModule } from '../database/database.module';
import { ProfilesController } from './profiles.controllers';
import { ProfilesProviders } from './profiles.providers';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [DatabaseModule, ModulesModule],
  providers: [...ProfilesProviders, ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
