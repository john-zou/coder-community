import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  GitHubLoginBody,
  GoogleLoginBody,
  LoginSuccess,
  LogOut,
} from './auth.dto';

import { GitHubOAuthClientID } from './constants';

import { UserService } from '../user/user.service';
import { Secrets } from '../secrets';

const GitHubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
const GitHubApi = 'https://api.github.com/user';

// https://developer.github.com/v3/users/#get-the-authenticated-user
type GitHubUser = {
  login: 'octocat';
  id: 1;
  node_id: 'MDQ6VXNlcjE=';
  avatar_url: 'https://github.com/images/error/octocat_happy.gif';
  gravatar_id: '';
  url: 'https://api.github.com/users/octocat';
  html_url: 'https://github.com/octocat';
  followers_url: 'https://api.github.com/users/octocat/followers';
  following_url: 'https://api.github.com/users/octocat/following{/other_user}';
  gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}';
  starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}';
  subscriptions_url: 'https://api.github.com/users/octocat/subscriptions';
  organizations_url: 'https://api.github.com/users/octocat/orgs';
  repos_url: 'https://api.github.com/users/octocat/repos';
  events_url: 'https://api.github.com/users/octocat/events{/privacy}';
  received_events_url: 'https://api.github.com/users/octocat/received_events';
  type: 'User';
  site_admin: false;
  name: 'monalisa octocat';
  company: 'GitHub';
  blog: 'https://github.com/blog';
  location: 'San Francisco';
  email: 'octocat@github.com';
  hireable: false;
  bio: 'There once was...';
  twitter_username: 'monatheoctocat';
  public_repos: 2;
  public_gists: 1;
  followers: 20;
  following: 0;
  created_at: '2008-01-14T04:33:35Z';
  updated_at: '2008-01-14T04:33:35Z';
  private_gists: 81;
  total_private_repos: 100;
  owned_private_repos: 100;
  disk_usage: 10000;
  collaborators: 8;
  two_factor_authentication: true;
  plan: {
    name: 'Medium';
    space: 400;
    private_repos: 20;
    collaborators: 0;
  };
};

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) { }

  async loginDev(): Promise<LoginSuccess> {
    const devUserID = "lion-king";
    // create dev user
    const { isNewUser, _id } = await this.userService.createOrUpdateUser(
      devUserID, 12345678
    );
    const jwt = await this.signCoderCommunityJwt(_id);

    return {
      isNewUser,
      jwt,
      userID: devUserID,
      _id,
    };
  }

  logOut(
    logOut: LogOut,
  ):
    Promise<import('./auth.dto').LogOutSuccess> {
    throw new Error('Method not implemented.');
  }

  // https://developers.google.com/identity/protocols/oauth2/web-server
  // https://github.com/googleapis/google-api-nodejs-client
  async authenticateGoogleLogin(
    googleLogin: GoogleLoginBody,
  ): Promise<LoginSuccess> {
    throw new Error('Method not implemented.');
  }

  // https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow
  async authenticateGitHubLogin({
    code,
    state,
  }: GitHubLoginBody): Promise<LoginSuccess> {
    const res = await this.httpService
      .post(
        GitHubAccessTokenUrl,
        {
          client_id: GitHubOAuthClientID,
          client_secret: Secrets.GitHubOAuthClientSecret,
          code,
          state,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .toPromise();

    if (!res.data) {
      throw new HttpException('There was an issue with the GitHub OAuth', 401);
    }

    const gitHubToken: string = res.data.access_token;
    const userInfo: Partial<GitHubUser> = await this.httpService
      .get(GitHubApi, {
        headers: {
          Authorization: 'token ' + gitHubToken,
          Accept: 'application/json',
        },
      })
      .toPromise()
      .then(res => res.data);

    const userID = userInfo.login;
    const gitHubID = userInfo.id;

    const { isNewUser, _id } = await this.userService.createOrUpdateUser(
      userID, gitHubID
    );

    const jwt = await this.signCoderCommunityJwt(_id);

    return {
      isNewUser,
      jwt,
      userID,
      _id,
    };
  }

  private signCoderCommunityJwt(_id: string) {
    const payload = { _id };
    return this.jwtService.signAsync(payload);
  }
}
