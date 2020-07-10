import {UserService} from '../user/user.service';
import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Query,
    UsePipes,
    ValidationPipe,
    Put,
    NotFoundException, HttpException,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

import {Personal} from '../auth/guards/personal.decorator';
import {UserObjectID} from '../user/user-object-id.decorator';
import {CreatePostBodyDto, CreatePostSuccessDto, GetPostDetailsSuccessDto} from './dto/posts.dto';
import {PostsService} from './posts.service';
import {PostModel, UserModel} from '../mongoModels';
import _ from "lodash";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService,
                private readonly userService: UserService) {
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
            throw new HttpException("User does not exist in MongoDB!", 500);
        }

        for (const likedPost of user.likedPosts) {
            if (likedPost.toString() === postID) {
                throw new HttpException("User already likes post!", 400);
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
            throw new HttpException("User does not exist in MongoDB!", 500);
        }

        const len = user.likedPosts.length;
        _.remove(user.likedPosts, (likedPostID) => likedPostID.toString() === postID);
        if (user.likedPosts.length === len) {
            throw new HttpException("User did not like the post in the first place!", 400);
        }

        await user.save();
        --post.likes;
        await post.save();
    }

    @ApiBearerAuth()
    @Personal() //provides @UserObjectID to get userid
    @Post()
    // createPost(@Body('newPost') createPostDto: CreatePostBodyDto): Promise<CreatePostSuccessDto> {
    createPost(@Body('newPost') createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
        console.log("POST CONTROLLER");
        console.log(author);
        console.log(createPostDto);
        // let author = "5f07dd25be9a5c6510208dce";
        return this.postsService.createPost(author, createPostDto);
    }

    @Get(':slug')
    @UsePipes(new ValidationPipe({transform: true}))
    async getPostBySlug(@Param('slug') slug: string, @Query('get-author') getAuthor?: boolean): Promise<GetPostDetailsSuccessDto> {
        // console.log("POSTS::CONTROLLER::GET");
        const post = await this.postsService.getPostBySlug(slug);
        // console.log(post);
        if (getAuthor) {
            const author = await this.userService.findUserById(post.author);
            return {post, author};
        } else {
            return {post}
        }
    }


    @Put(':slug')
    updatePostBySlug(@Body('newPost') newPost: CreatePostBodyDto, @Param('slug') slug: string) {
        console.log("CONTORLLER::NEWPOST");
        this.postsService.updatePostBySlug(newPost, slug);
    }
}