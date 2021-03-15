import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';
import { ServicesModule } from './services/services.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [UserModule, OauthModule, ServicesModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
