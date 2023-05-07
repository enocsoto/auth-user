import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [AuthModule, UserModule,
  TypeOrmModule.forRoot({
    "name": "sesions-db",
    "type": "mysql",
    "host": "localhost",
    "port": 3310,
    "username": "enoc",
    "password": "1234",
    "database": "sesions",
    "synchronize": false,
    "entities": [UserEntity] 
  })],
})
export class AppModule {}
