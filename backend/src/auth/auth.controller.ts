import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GitHubLoginBody, GoogleLoginBody, LoginSuccess, LogOut, LogOutSuccess } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login/github')
  loginGitHub(@Body() gitHubLogin: GitHubLoginBody): Promise<LoginSuccess> {
    return this.authService.authenticateGitHubLogin(gitHubLogin);
  }

  @Post('login/google')
  loginGoogle(
    @Body() googleLogin: GoogleLoginBody,
  ): Promise<LoginSuccess> {
    return this.authService.authenticateGoogleLogin(googleLogin);
  }

  /**
   * This is not a high priority. It may be implemented in the future when we allow a user to end all of their sessions
   */
  @Post('logout')
  logOut(@Body() logOut: LogOut): Promise<LogOutSuccess> {
    return this.authService.logOut(logOut);
  }
}
