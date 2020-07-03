import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.schema';

@Module({
  imports: [TypegooseModule.forFeature([User])],//forFeature creates model User
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
