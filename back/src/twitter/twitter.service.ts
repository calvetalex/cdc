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
      const tweets = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${subject}&max_results=10&tweet.fields=created_at,public_metrics,lang,author_id`, {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
        }
      }).then(resp => resp.json());
      return Promise.all(tweets.data.map(async (tweet) => {
        let user: any;
        try {
          user = await fetch(`https://api.twitter.com/2/users/${tweet.author_id}`, { headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER}` } }).then(res => res.json());
          user = user.data.name;
        } catch(e) {
          console.error('[TWITTER] - Cannot get author, skipping');
        }
        return { ...tweet, user };
      }));
    } catch (e) {
      console.error('[TWITTER] - Cannot get tweets', e);
      return [];
    }
  }
}
