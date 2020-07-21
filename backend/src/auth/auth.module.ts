import { Global, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Secrets } from '../secrets';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    HttpModule, // For social OAuth
    JwtModule.register({
      secret: Secrets.CoderCommunityJwtSecret,
    }), // For signing CoderCommunity jwt
    UserModule, // For creation of new user
    PassportModule, // For validating CoderCommunity jwt
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
