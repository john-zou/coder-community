import { Injectable } from '@nestjs/common';
import {
  GitHubLoginBody,
  GoogleLoginBody,
  LoginSuccess,
  LogOut,
} from './auth.dto';

@Injectable()
export class AuthService {
  logOut(
    logOut: LogOut,
  ):
    | import('./auth.dto').LogOutSuccess
    | PromiseLike<import('./auth.dto').LogOutSuccess> {
    throw new Error('Method not implemented.');
  }
  async authenticateGoogleLogin(
    googleLogin: GoogleLoginBody,
  ): Promise<LoginSuccess> {
    throw new Error('Method not implemented.');
  }

  async authenticateGitHubLogin(
    gitHubLogin: GitHubLoginBody,
  ): Promise<LoginSuccess> {
    throw new Error('Method not implemented.');
  }
}
