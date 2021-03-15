import { Connection } from 'typeorm';
import { Modules } from './entities/modules.entity';

export const ModulesProviders = [
  {
    provide: 'MODULES_REPOSITORY',
    useFactory: async (connection: Connection) =>
      connection.getRepository(Modules),
    inject: ['DATABASE_CONNECTION'],
  },
];
