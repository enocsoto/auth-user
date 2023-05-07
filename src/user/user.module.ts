import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MysqlProvider } from './provider/mysql.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, MysqlProvider]
})
export class UserModule {}
