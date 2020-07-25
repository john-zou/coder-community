import { UserService } from '../user/user.service';
import {
    Body,
    Controller,
    Get,
    HttpException,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import {
    CreatePostBodyDto,
    CreatePostSuccessDto,
    GetPostDetailsSuccessDto,
    UpdatePostBodyDto,
    UpdatePostSuccessDto,
} from './dto/posts.dto';
import { PostsService } from './posts.service';
import { PostModel, UserModel } from '../mongoModels';
import * as _ from 'lodash';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService,
                private readonly userService: UserService) {
    }

    @Put('increment-view/:postID')
    async incrementView(@Param('postID') postID: string): Promise<void> {
        await PostModel.updateOne({_id: postID}, { $inc:{views: 1}});
    }

    @ApiBearerAuth()
    @Personal()
    @Put('like')
    async likePost(@UserObjectID() userID: string, @Query('postID') postID: string): Promise<void> {
        const post = await PostModel.findById(postID);
        if (!post) {
            throw new NotFoundException();
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            throw new HttpException('User does not exist in MongoDB!', 500);
        }

        for (const likedPost of user.likedPosts) {
            if (likedPost.toString() === postID) {
                throw new HttpException('User already likes post!', 400);
            }
        }

        user.likedPosts.push(post);
        await user.save();
        ++post.likes;
        await post.save();
    }

    @ApiBearerAuth()
    @Personal()
    @Put('unlike')
    async unlikePost(@UserObjectID() userID: string, @Query('postID') postID: string): Promise<void> {
        const post = await PostModel.findById(postID);
        if (!post) {
            throw new NotFoundException();
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            throw new HttpException('User does not exist in MongoDB!', 500);
        }

        const len = user.likedPosts.length;
        _.remove(user.likedPosts, (likedPostID) => likedPostID.toString() === postID);
        if (user.likedPosts.length === len) {
            throw new HttpException('User did not like the post in the first place!', 400);
        }

        await user.save();
        --post.likes;
        await post.save();
    }

    @ApiBearerAuth()
    @ApiBody({
        type: CreatePostBodyDto,
    })
    @Personal() //provides @UserObjectID to get userid
    @Post()
    createPost(@Body() createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
        // console.log('POSTS::CONTROLLER');
        // console.log(author);
        // console.log(createPostDto);
        return this.postsService.createPost(author, createPostDto);
    }

    @Get(':slug')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getPostBySlug(@Param('slug') slug: string, @Query('get-author') getAuthor?: boolean): Promise<GetPostDetailsSuccessDto> {
        const post = await this.postsService.getPostBySlug(slug);
        if (getAuthor) {
            const author = await this.userService.findUserById(post.author);
            return { post, author };
        } else {
            return { post };
        }
    }

    @Get('byID/:postID')
    async getPostByID(@Param('postID') postID: string, getAuthor?: boolean): Promise<GetPostDetailsSuccessDto> {
        const post = await this.postsService.getPostByID(postID);
        if (getAuthor) {
            const author = await this.userService.findUserById(post.author);
            return { post, author };
        } else {
            return { post };
        }
    }


    @ApiBody({
        type: UpdatePostBodyDto,
    })
    @Personal()
    @Put(':slug')
    updatePostBySlug(@Body() update: UpdatePostBodyDto, @Param('slug') slug: string): Promise<UpdatePostSuccessDto> {
        // console.log("POST::CONTROLLER::UPDATE");
        // console.log(slug);
        // console.log(update);
        return this.postsService.updatePostBySlug(update, slug);
    }
}
