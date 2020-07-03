import { Controller, Post, Body } from '@nestjs/common';
import {
  GitHubLoginBody,
  GoogleLoginBody,
  LoginSuccess,
  LogOut,
  LogOutSuccess,
} from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login/github')
  async loginGitHub(@Body() gitHubLogin: GitHubLoginBody): Promise<LoginSuccess> {
    return await this.authService.authenticateGitHubLogin(gitHubLogin);
  }

  @Post('login/google')
  async loginGoogle(
    @Body() googleLogin: GoogleLoginBody,
  ): Promise<LoginSuccess> {
    return await this.authService.authenticateGoogleLogin(googleLogin);
  }

  /**
   * This is not a high priority. It may be implemented in the future when we allow a user to end all of their sessions
   */
  @Post('logout')
  async logOut(@Body() logOut: LogOut): Promise<LogOutSuccess> {
    return await this.authService.logOut(logOut);
  }
}
