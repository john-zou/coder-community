import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CoderCommunityJwtSecretProperty } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    HttpModule, // For social OAuth
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(CoderCommunityJwtSecretProperty),
      }),
    }), // For signing CoderCommunity jwt
    UserModule, // For creation of new user
    PassportModule, // For validating CoderCommunity jwt
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
