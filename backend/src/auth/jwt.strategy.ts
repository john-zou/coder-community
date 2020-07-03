import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Secrets } from '../secrets';

export type CoderCommunityJwtPayload = { _id: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Secrets.CoderCommunityJwtSecret,
    });
  }

  // Passport will attach `user` to the `Request`
  // I.e. `req.user.userID` will be the one from a valid token
  async validate({ _id }): Promise<CoderCommunityJwtPayload> {
    return { _id };
  }
}
