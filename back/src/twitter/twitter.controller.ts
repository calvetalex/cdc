import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get()
  @UseGuards(AuthGuard('twitter'))
  async twitterAuth(@Req() req) {
    return null;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('twitter'))
  twitterAuthRedirect(@Req() req) {
    return this.twitterService.twitterLogin(req);
  }

  @Get(':subject')
  async twitterGetSubject(@Param('subject') subject: string): Promise<any[]> {
    return await this.twitterService.getLastTweets(subject);
  }
}