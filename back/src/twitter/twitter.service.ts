import { Injectable, OnModuleInit } from '@nestjs/common';
const fetch = require('node-fetch');

@Injectable()
export class TwitterService {
  constructor() {}

  twitterLogin(req) {
    if (!req.user) {
      return 'No user from Twitter';
    }
    console.log('[TWITTER] - new connection...');
    console.log(req);
    return 'You can now close this page and return to your CDC !';
  }

  async getLastTweets(subject: string): Promise<any[]> {
    try {
      return fetch(`https://api.twitter.com/2/tweets/search/recent\?query\=${subject}`, {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
        }
      }).then(resp => resp.json());
    } catch (e) {
      console.error('[TWITTER] - Cannot get tweets', e);
      return [];
    }
  }
}
