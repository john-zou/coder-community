import {Body, Controller, Post, Put, Get, Param, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Personal} from '../auth/guards/personal.decorator';
import {UserService} from './../user/user.service';
import {UserObjectID} from '../user/user-object-id.decorator';
import {CreatePostBodyDto, CreatePostSuccessDto, GetPostDetailsSuccessDto} from './dto/posts.dto';
import {PostsService} from './posts.service';


@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService, private readonly userService: UserService) {
    }

    @ApiBearerAuth()
    @Personal() //provides @UserObjectID to get userid
    @Post()
    createPost(@Body('newPost') createPostDto: CreatePostBodyDto, @UserObjectID() author: string): Promise<CreatePostSuccessDto> {
        // createPost(@Body('newPost') createPostDto: CreatePostBodyDto) {
        // console.log("*** " + createPostDto.content + "  " + createPostDto.title + " ***");
        // console.log(author);
        return this.postsService.createPost(author, createPostDto);
    }

    @Put()
    updatePostBySlug(@Body('newPost') newPost: CreatePostBodyDto, @Param('slug') slug: string) {
        console.log("CONTORLLER::NEWPOST");
        this.postsService.updatePostBySlug(newPost, slug);
    }

    @Get(':slug')
    @UsePipes(new ValidationPipe({transform: true}))
    async getPostBySlug(@Param('slug') slug: string, @Query('get-author') getAuthor?: boolean): Promise<GetPostDetailsSuccessDto> {
        const post = await this.postsService.getPostBySlug(slug);
        if (getAuthor) {

            const author = await this.userService.findUserById(post.author);
            return {post, author};
        } else {
            return {post}
        }
    }
}