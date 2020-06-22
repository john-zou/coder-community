import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { CoderCommunityJwtSecret } from '../../secrets';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    HttpModule, // For social OAuth
    JwtModule.register({ secret: CoderCommunityJwtSecret }), // For signing CoderCommunity jwt
    UserModule, // For creation of new user
    PassportModule, // For validating CoderCommunity jwt
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
