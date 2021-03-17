import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';
import { ServicesModule } from './services/services.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ModulesModule } from './modules/modules.module';
import { WeatherModule } from './weather/weather.module';
import { TwitterModule } from './twitter/twitter.module';
import { ImgurModule } from './imgur/imgur.module';

@Module({
  imports: [
    UserModule,
    OauthModule,
    ServicesModule,
    ProfilesModule,
    ModulesModule,
    WeatherModule,
    TwitterModule,
    ImgurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
