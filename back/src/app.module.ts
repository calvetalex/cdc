import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UserModule, OauthModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
