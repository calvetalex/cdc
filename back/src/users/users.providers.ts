import { Connection } from 'typeorm';
import { Users } from './entities/users.entity';

export const UserProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Users),
    inject: ['DATABASE_CONNECTION'],
  },
];
