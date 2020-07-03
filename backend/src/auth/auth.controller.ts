import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import {
  GitHubLoginBody,
  GoogleLoginBody,
  LoginSuccess,
  LogOut,
  LogOutSuccess,
} from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  /**
   * Temporary endpoint for logging in to bypass OAuth
   */
  @Get('login/dev')
  loginDev(): Promise<LoginSuccess> {
    return this.authService.loginDev();
  }

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
