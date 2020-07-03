import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Secrets } from '../secrets';

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
  exports: [AuthService]
})
export class AuthModule {}
