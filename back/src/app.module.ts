import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [UserModule, OauthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
