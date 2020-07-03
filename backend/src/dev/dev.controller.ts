import { Controller, Get, Param, Post, Body, HttpException } from '@nestjs/common';
import { LoginSuccess } from '../auth/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { ObjectID } from 'mongodb';
import { CreateCustomUser } from './dev.dto';
import { PostsService } from '../posts/posts.service';
import { CreatePostBodyDto, CreatePostSuccessDto } from '../posts/dto/posts.dto';

@ApiTags('Dev')
@Controller('dev')
export class DevController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly postsService: PostsService,
  ) {}

  /**
   * A simple way to log in to test the front end without OAuth: gets the login token for userID lion-king
   */
  @Get('login')
  async loginDev(): Promise<LoginSuccess> {
    const devUserID = "lion-king";
    // create dev user
    const { isNewUser, _id } = await this.userService.createOrUpdateUser(
      devUserID, 12345678
    );
    const jwt = await this.authService.signCoderCommunityJwt(_id);

    return {
      isNewUser,
      jwt,
      userID: devUserID,
      _id,
    };
  }

  @Post('create-user')
  async createCustomUser(@Body() customUser: CreateCustomUser): Promise<LoginSuccess> {
    const { _id, isNewUser } = await this.userService.createOrUpdateUser(
      customUser.userID,
      Math.floor(Math.random() * 100000000),
    )
    const jwt = await this.authService.signCoderCommunityJwt(_id);
    return {
      isNewUser,
      jwt,
      userID: customUser.userID,
      _id,
    }
  }

  @Post('create-post')
  createPostDev(@Body() createPostDto: CreatePostBodyDto & { author: string }): Promise<CreatePostSuccessDto> {
    return this.postsService.createPost(createPostDto.author, createPostDto);
  }

  /**
   * Returns the JWT for the user ObjectID (does not create user)
   * 
   * @param _id UserObjectID
   */
  @Get('jwt')
  getJwt(@Param('id') _id: string): Promise<string> {
    try {
      const oid = new ObjectID(_id);
      if (!ObjectID.isValid(oid)) {
        throw new Error();
      }
    } catch (err) {
      throw new HttpException("Invalid Object ID :(", 400);
    }
    return this.authService.signCoderCommunityJwt(_id);
  }
}
