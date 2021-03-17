import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      // authorizationURL: 'https://api.twitter.com/oauth/authenticate',
      // tokenURL: 'https://api.twitter.com/oauth/access_token',
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:8080/twitter/redirect',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: any, user?: any) => any,
  ): Promise<any> {
    const data = { profile, accessToken, refreshToken };
    return done(null, data);
  }
}
