import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';
import { DatabaseModule } from '../database/database.module';
import { OauthController } from './oauth.controller';
import { OauthProviders } from './oauth.providers';
import { OauthService } from './oauth.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [...OauthProviders, OauthService],
  controllers: [OauthController],
})
export class OauthModule {}
