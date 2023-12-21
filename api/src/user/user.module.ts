import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostgresService } from 'src/postgres/postgres.service';

@Module({
    imports: [UserModule],
    controllers: [UserController],
    providers: [ UserService, PostgresService],
  })
  export class UserModule {}
  