import {UserService} from '../user/user.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Logger,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiTags} from '@nestjs/swagger';

import {Personal} from '../auth/guards/personal.decorator';
import {UserObjectID} from '../user/user-object-id.decorator';
import {
    CreatePostBodyDto,
    CreatePostSuccessDto,
    GetPostDetailsSuccessDto,
    GetPostsSuccessDto,
    UpdatePostBodyDto,
    UpdatePostSuccessDto,
} from './dto/posts.dto';
import {PostsService} from './posts.service';
import {PostModel, UserModel} from '../mongoModels';
import {ObjectID} from 'mongodb';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    private readonly logger = new Logger('PostsController');

    constructor(private readonly postsService: PostsService,
                private readonly userService: UserService) {
    }

    @Put('increment-view/:postID')
    async incrementView(@Param('postID') postID: string): Promise<void> {
        await PostModel.updateOne({_id: postID}, {$inc: {views: 1}});
        const post = await PostModel.findById(postID);
        if (post) {
            this.postsService.updateScore(post);
        }
    }

    @ApiBearerAuth()
    @Personal()
    @Put('like')
    async likePost(@UserObjectID() userID: string, @Query('postID') postID: string): Promise<void> {
        this.logger.log(`likePost(), userID: ${userID}, postID: ${postID}`)
        const post = await PostModel.findById(postID);
        if (!post) {
            this.logger.log('Post not found, throwing NotFoundException');
            throw new NotFoundException();
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            this.logger.log('User not in MongoDB!');
            throw new HttpException('User does not exist in MongoDB!', 500);
        }

        for (const likedPost of user.likedPosts) {
            if (likedPost.toString() === postID) {
                this.logger.log('User already likes the post!');
                throw new HttpException('User already likes post!', 400);
            }
        }

        user.likedPosts.push(post);
        await user.save();
        this.logger.log('User likedPosts updated.');
        ++post.likes;
        await this.postsService.updateScore(post)
        this.logger.log('Post likes incremented.');
    }

    @ApiBearerAuth()
    @Personal()
    @Put('unlike')
    async unlikePost(@UserObjectID() userID: string, @Query('postID') postID: string): Promise<void> {
        this.logger.log(`unlikePost(), userID: ${userID}, postID: ${postID}`)
        const post = await PostModel.findById(postID);
        if (!post) {
            throw new NotFoundException();
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            throw new HttpException('User does not exist in MongoDB!', 500);
        }

        this.logger.log('User likedPosts before removal:');
        this.logger.log(user.likedPosts);

        const userLikesPost = user.likedPosts.some(likedPostID => likedPostID.toString() === postID);
        if (!userLikesPost) {
            throw new HttpException('User did not like the post in the first place!', 400);
        }

        const updateResult = await UserModel.updateOne({_id: userID}, {$pull: {likedPosts: new ObjectID(postID)}});
        this.logger.log(updateResult);

        this.logger.log('User likedPosts updated.');
        --post.likes;
        await this.postsService.updateScore(post);
        this.logger.log('Post likes decremented.');
    }

    @ApiBearerAuth()
    @ApiBody({
        type: CreatePostBodyDto,
    })

    @Personal() //provides @UserObjectID to get userid
    @Post()
    createPost(@Body() createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
        return this.postsService.createPost(author, createPostDto);
    }

    @Get('hackernews')
    async getHackerNewsPosts(@Query('fetchCount') fetchCount: number): Promise<any> {
        this.logger.log("getHackerNewsPosts");
        return this.postsService.getHackerNewsPosts(fetchCount)
    }

    @Get('byID/:postID')
    async getPostByID(@Param('postID') postID: string, @Query('get-author') getAuthor?: boolean): Promise<GetPostDetailsSuccessDto> {
        const post = await this.postsService.getPostByID(postID);
        if (getAuthor) {
            const author = await this.userService.findUserById(post.author);
            return {post, author};
        } else {
            return {post};
        }
    }

    @Get('byUser/:userID')
    async getPostsByUserID(@Param('userID') userID: string): Promise<GetPostsSuccessDto> {
        return this.postsService.getPostsByUserID(userID)
    }

    @Personal()
    @Delete(':postID')
    async deletePostByPostID(@Param('postID') postID: string, @UserObjectID() userID: string): Promise<void> {
        await this.postsService.deletePostByPostID(postID, userID);
    }


    @Get(':slug')
    @UsePipes(new ValidationPipe({transform: true}))
    async getPostBySlug(@Param('slug') slug: string, @Query('get-author') getAuthor?: boolean): Promise<GetPostDetailsSuccessDto> {
        const post = await this.postsService.getPostBySlug(slug);
        if (getAuthor) {
            const author = await this.userService.findUserById(post.author);
            return {post, author};
        } else {
            return {post};
        }
    }

    @ApiBody({
        type: UpdatePostBodyDto,
    })
    @Personal()
    @Put(':slug')
    updatePostBySlug(@Body() update: UpdatePostBodyDto, @Param('slug') slug: string): Promise<UpdatePostSuccessDto> {
        return this.postsService.updatePostBySlug(update, slug);
    }
}
