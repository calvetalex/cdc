import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './users.controllers';
import { UserProviders } from './users.providers';
import { UserService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...UserProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
