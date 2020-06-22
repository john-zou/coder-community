import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HttpService, HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GitHubOAuthClientID,
  GitHubOAuthClientSecretProperty,
} from './constants';

import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigModule } from '@nestjs/config';

const GitHubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
const GitHubApi = 'https://api.github.com/user';
const FakeCoderCommunityJwtSecret = '123';

describe('AuthService', () => {
  let authService: AuthService;
  let httpService: HttpService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule, // For social OAuth
        JwtModule.register({ secret: FakeCoderCommunityJwtSecret }), // For signing CoderCommunity jwt
        UserModule, // For creation of new user
        ConfigModule,
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('GitHub auth', () => {
    it('should return a LoginSuccess with a jwt that passes UserAuthGuard when a good code is provided', async () => {
      const code = 'abc';
      const state = 'efg';
      const fakeGitHubToken = 'hij';
      const fakeGitHubLogin = 'klm';
      const isNewUser = true;
      const createUserSpy = jest
        .spyOn(userService, 'createOrUpdateUser')
        .mockImplementation(() => {
          return Promise.resolve(isNewUser);
        });

      jest
        .spyOn(httpService, 'post')
        .mockImplementation((url, data, config) => {
          expect(url).toEqual(GitHubAccessTokenUrl);
          expect(data).toEqual({
            client_id: GitHubOAuthClientID,
            client_secret: configService.get(GitHubOAuthClientSecretProperty),
            code,
            state,
          });
          expect(config.headers.Accept).toEqual('application/json');
          return new Observable<AxiosResponse>(subscriber => {
            subscriber.next({
              data: { access_token: fakeGitHubToken },
            } as AxiosResponse);
            subscriber.complete();
          });
        });

      jest.spyOn(httpService, 'get').mockImplementation((url, config) => {
        expect(url).toEqual(GitHubApi);
        expect(config.headers.Accept).toEqual('application/json');
        expect(config.headers.Authorization).toEqual(
          'token ' + fakeGitHubToken,
        );
        return new Observable<AxiosResponse>(subscriber => {
          subscriber.next({
            data: { login: fakeGitHubLogin },
          } as AxiosResponse);
          subscriber.complete();
        });
      });

      const actual = await authService.authenticateGitHubLogin({ code, state });
      expect(createUserSpy).toBeCalledTimes(1);
      expect(jwtService.verify(actual.jwt).userID).toEqual(fakeGitHubLogin);
      expect(actual.isNewUser).toEqual(isNewUser);
      expect(actual.userID).toEqual(fakeGitHubLogin);
    });

    it('should reject with a message that mentions GitHub, and not create a user, when GitHub rejects the code', async () => {
      const code = 'abc';
      const state = 'def';

      const createUserSpy = jest.spyOn(userService, 'createOrUpdateUser');

      jest
        .spyOn(httpService, 'post')
        .mockImplementation((url, data, config) => {
          expect(url).toEqual(GitHubAccessTokenUrl);
          expect(data).toEqual({
            client_id: GitHubOAuthClientID,
            client_secret: configService.get(GitHubOAuthClientSecretProperty),
            code,
            state,
          });
          expect(config.headers.Accept).toEqual('application/json');
          return new Observable<AxiosResponse>(subscriber => {
            subscriber.next({
              status: 404,
            } as AxiosResponse);
            subscriber.complete();
          });
        });

      await expect(
        authService.authenticateGitHubLogin({ code, state }),
      ).rejects.toThrow('GitHub');

      expect(createUserSpy).toBeCalledTimes(0);
    });
  });
});
