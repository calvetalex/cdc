import { Connection } from 'typeorm';
import { Services } from './entities/services.entity';

export const ServicesProviders = [
  {
    provide: 'SERVICES_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Services),
    inject: ['DATABASE_CONNECTION'],
  },
];