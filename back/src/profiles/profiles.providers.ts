import { Connection } from 'typeorm';
import { Profiles } from './entities/profiles.entity';

export const ProfilesProviders = [
  {
    provide: 'PROFILES_REPOSITORY',
    useFactory: async (connection: Connection) =>
      connection.getRepository(Profiles),
    inject: ['DATABASE_CONNECTION'],
  },
];
