import { UserModel, TagModel } from './../mongoModels';
import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Ref, DocumentType } from '@typegoose/typegoose';
import { ObjectID } from 'mongodb';
import { convertToStrArr, convertPostDocumentToPostDto } from '../util/helperFunctions';
import * as urlSlug from 'url-slug';
import { PostModel } from '../mongoModels';
import { User } from '../user/user.schema';
import {
    CreatePostBodyDto,
    CreatePostSuccessDto,
    PostDto,
    PostWithDetails,
} from './dto/posts.dto';
import { Post } from './post.schema';

// Unused -- can use later for different feature
type DevToArticle = {
    type_of: 'article';
    id: 194541;
    title: "There's a new DEV theme in town for all you 10x hackers out there (plus one actually useful new feature)";
    description: '';
    cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--74Bl23tz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--xU8cbIK4--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/8a39dzf3oovzc2snl7iv.png';
    readable_publish_date: 'Oct 24';
    social_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--SeMxdKIa--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--xU8cbIK4--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/8a39dzf3oovzc2snl7iv.png';
    tag_list: ['meta', 'changelog', 'css', 'ux'];
    tags: 'meta, changelog, css, ux';
    slug: 'there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk';
    path: '/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk';
    url: 'https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk';
    canonical_url: 'https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk';
    comments_count: 37;
    public_reactions_count: 142;
    collection_id: null;
    created_at: '2019-10-24T13:41:29Z';
    edited_at: '2019-10-24T13:56:35Z';
    crossposted_at: null;
    published_at: '2019-10-24T13:52:17Z';
    last_comment_at: '2019-10-25T08:12:43Z';
    published_timestamp: '2019-10-24T13:52:17Z';
    user: {
        name: 'Ben Halpern';
        username: 'ben';
        twitter_username: 'bendhalpern';
        github_username: 'benhalpern';
        website_url: 'http://benhalpern.com';
        profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--Y1sq1tFG--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png';
        profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--DcW51A6v--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png';
    };
    organization: {
        name: 'The DEV Team';
        username: 'devteam';
        slug: 'devteam';
        profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--0kDBq1Ne--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/organization/profile_image/1/0213bbaa-d5a1-4d25-9e7a-10c30b455af0.png';
        profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--8tTU-XkZ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/organization/profile_image/1/0213bbaa-d5a1-4d25-9e7a-10c30b455af0.png';
    };
};

const DevToApiKey = 'QG7J1McHHMV7UZ9jwDTeZFHf';
const DevToApiUrlArticles = 'https://dev.to/api/articles/'; //retrieve a list of articles (with no content)
const previewContentLength = 100;
@Injectable()
export class PostsService {
    constructor(private readonly httpService: HttpService) {
    }

    async getPostBySlug(slug: string): Promise<PostWithDetails> {
        // console.log("POST::SERVOCE::GETPOSTS")
        // console.log(slug);
        const post = await PostModel.findOne({ slug });
        // console.log(post);
        if (post) {
            return {
                _id: post._id,
                author: post.author.toString(),
                comments: convertToStrArr(post.comments),
                commentsCount: post.comments.length,
                content: post.content,
                createdAt: post.createdAt.toString(),
                updatedAt: post.updatedAt.toString(),
                featuredImg: post.featuredImg,
                likes: post.likes,
                previewContent: post.previewContent,
                slug: post.slug,
                tags: convertToStrArr(post.tags),
                title: post.title,
                views: post.views,
                group: post.group?.toString(),
            };
        } else {
            throw new NotFoundException();
        }
    }

    async createPost(
        authorObjectID: string,
        body: CreatePostBodyDto,
    ): Promise<CreatePostSuccessDto> {
        console.log("POSTS::Service::createPost")
        let slug = urlSlug(body.title);

        // TODO: optimize with model.collection.find() / limit() / size()
        if (await PostModel.findOne({slug})) {
            slug = undefined;
        }

        const doc = {
            author: authorObjectID,
            title: body.title,
            slug,
            previewContent: body.content.substring(0, previewContentLength),
            content: body.content,
            tags: body.tags,
            featuredImg: body.featuredImg,
            likes: 0,
            comments: [],
            views: 0,
            group: body.group,
        };
        // Logger.log(doc);
        // Logger.log("Done create");
        const newPost = new PostModel(doc);
        console.log(newPost);
        await newPost.save();
        if (!slug) {
            // set _id as slug (if slug is already taken)
            // TODO: create a better slug than just the id if taken
            newPost.slug = newPost._id;
            await newPost.save();
        }
        // Add post to author
        const author = await UserModel.findById(authorObjectID);
        author.posts.push(newPost._id);
        await author.save();

        // Add post to tags
        const tags = newPost.tags;
        const expressions = tags.map(tagID => ({ _id: tagID }));
        // awaitModel.updateMany({ $or: expressions }, { $push: {posts: newPost._id }});
        return {
            _id: newPost._id,
            slug,
        };
    }

    async updatePostBySlug(newPost: CreatePostBodyDto, slug: string) {
        console.log("POSTS::SERVICE");
        console.log(slug);
        const post = await PostModel.findOneAndUpdate({slug}, {
            content: newPost.content,
            title: newPost.title,
            tags: newPost.tags,
            featuredImg: newPost.featuredImg,
            previewContent: newPost.content.substring(0, previewContentLength),
        });
        console.log()
    }

    isLikedByUser(likes: Ref<User, ObjectID>[], userObjectID: string): boolean {
        const found = likes.find(uid => uid.toString() === userObjectID);
        return found !== null;
    }

    /**
     *
     * @param userObjectID? only needed if user logged in
     */
    async getInitialPosts(userObjectID?: string): Promise<PostDto[]> {
        const foundPosts = await PostModel.find().limit(5);
        return foundPosts.map(convertPostDocumentToPostDto);
    }

    // Unused -- can use later for different feature
    // https://docs.dev.to/api/#tag/articles
    async getDevToPosts(): Promise<any[]> {
        const res = await this.httpService
            .get(DevToApiUrlArticles, {
                headers: {
                    api_key: DevToApiKey,
                },
            })
            .toPromise(); //axios api
        const allArticles = await res.data;
        const first50Articles = allArticles.slice(0, 20);
        // console.log(first50Articles);
        return await Promise.all(
            first50Articles.map(article => {
                return this.convertDevToPosts(article);
            }),
        );
    }

    // Unused -- can use later for different feature
    private async convertDevToPosts(data: DevToArticle): Promise<any> {
        // const content = "Nullam quis feugiat est, vitae fermentum nunc. Ut ac nunc hendrerit, malesuada massa quis, pharetra ante. Praesent volutpat rhoncus risus a congue. Integer ultrices risus massa, a sodales sem mollis in. Fusce massa lectus, rhoncus at fermentum ac, eleifend ut diam. Donec a iaculis orci. Etiam cursus vel odio porta molestie. Maecenas elit ligula, ultricies vitae hendrerit nec, tincidunt nec urna. Sed tristique, nibh et lobortis mattis, sem magna dictum mauris, a viverra felis nunc quis lorem. Fusce elementum pellentesque diam, at eleifend nisi gravida nec. Aenean tempus lacus vel urna blandit ornare. Mauris id ante vitae tellus tempus vulputate quis quis diam. Nulla tellus ligula, scelerisque finibus elit quis, malesuada tempus nisi.";
        // const comments = ["Sed blandit sagittis sapien, id bibendum libero facilisis eget. Nullam eget nisi quam. Integer aliquet lectus mi, sit amet molestie est finibus vel.", "Maecenas commodo mauris quam, in laoreet nulla commodo vitae.", "Proin pulvinar scelerisque viverra."]
        return {
            authorName: data.user.name,
            authorImg: data.user.profile_image,
            title: data.title,
            previewContent: data.description,
            // content,
            tags: data.tag_list,
            featuredImg: data.cover_image,
            createdAt: new Date(data.created_at),
            likes: data.public_reactions_count,
            comments: data.comments_count,
            // comments,
            likedByUser: false,
        };
    }
}