import { Module, OnModuleInit } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';
import { TwitterStrategy } from './twitter.strategy';

@Module({
  imports: [],
  controllers: [TwitterController],
  providers: [TwitterService, TwitterStrategy],
})
export class TwitterModule implements OnModuleInit {
  constructor(private readonly twitterService: TwitterService) {}

  onModuleInit() {
    console.log('[TWITTER MODULE] - Initialize...');
  }
}
