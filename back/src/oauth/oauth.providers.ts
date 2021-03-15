import { Connection } from 'typeorm';
import { Oauth } from './entity/oauth.entity';

export const OauthProviders = [
  {
    provide: 'OAUTH_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Oauth),
    inject: ['DATABASE_CONNECTION'],
  },
];
