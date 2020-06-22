import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CoderCommunityJwtSecretProperty } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(CoderCommunityJwtSecretProperty),
    });
  }

  // Passport will attach `user` to the `Request`
  // I.e. `req.user.userID` will be the one from a valid token
  async validate({ userID }) {
    return { userID };
  }
}
