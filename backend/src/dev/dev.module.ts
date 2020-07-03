import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [DevController],
})
export class DevModule {}
