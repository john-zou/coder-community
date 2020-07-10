import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule { }
