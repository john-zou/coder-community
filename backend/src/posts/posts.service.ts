import {GroupModel, PostModel, TagModel, UserModel} from '../mongoModels';
import {BadRequestException, HttpService, Injectable, Logger, NotFoundException, Post} from '@nestjs/common';
import {Ref} from '@typegoose/typegoose';
import {ObjectID, ObjectId} from 'mongodb';
import {
    convertPostDocumentToPostDetailDto,
    convertPostDocumentToPostDto,
    convertToStrArr,
} from '../util/helperFunctions';
import * as urlSlug from 'url-slug';
import {User} from '../user/user.schema';
import {
    CreatePostBodyDto,
    CreatePostSuccessDto,
    GetPostsSuccessDto,
    PostDto,
    PostWithDetails, UpdatePostBodyDto,
    UpdatePostSuccessDto,
} from './dto/posts.dto';
import {TrendingGateway} from '../trending/trending.gateway';
import {AxiosResponse} from 'axios';
import {Observable} from 'rxjs';


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
type HNArticle = {
    "by": "dhouston",
    "descendants": 71,
    "id": 8863,
    "kids": [8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876],
    "score": 111,
    "time": 1175714200,
    "title": "My YC app: Dropbox - Throw away your USB drive",
    "type": "story",
    "url": "http://www.getdropbox.com/u/2/screencast.html"
}
const DevToApiKey = 'QG7J1McHHMV7UZ9jwDTeZFHf';
const DevToApiUrlArticles = 'https://dev.to/api/articles/'; //retrieve a list of articles (with no content)
const HackerNewsTopStories = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'

const previewContentLength = 100;

@Injectable()
export class PostsService {
    constructor(private readonly httpService: HttpService) {
    }

    async getPostByID(postID: string): Promise<PostWithDetails> {
        const post = await PostModel.findById(postID);
        if (post) {
            return convertPostDocumentToPostDto(post);
        } else {
            throw new NotFoundException();
        }
    }

    async getPostBySlug(slug: string): Promise<PostWithDetails> {
        const post = await PostModel.findOne({slug});
        if (post) {
            ++post.views;
            post.save(); // purposefully not awaiting
            return convertPostDocumentToPostDto(post);
        } else {
            throw new NotFoundException();
        }
    }

    async createPost(
        authorObjectID: string,
        body: CreatePostBodyDto,
    ): Promise<CreatePostSuccessDto> {
        let slug = urlSlug(body.title);
        // console.log("POSTS::SERVICE");
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
        // console.log(body.group);
        // console.log(newPost);

        await newPost.save();
        // console.log("AFTER SAVE");
        if (!slug) {
            // set _id as slug (if slug is already taken)
            // TODO: create a better slug than just the id if taken
            slug = newPost._id;
            newPost.slug = newPost._id;
            await newPost.save();
        }

        // Add post to author
        const author = await UserModel.findById(authorObjectID);
        author.posts.push(newPost._id);
        await author.save();

        // Add post to tags
        const tags = newPost.tags;
        if (tags.length > 0) {
            const expressions = tags.map(tagID => ({_id: tagID}));
            await TagModel.updateMany({$or: expressions}, {$push: {posts: newPost._id}});
        }

        // TODO: Add post to group (if post created for group)
        if (body.group) {
            const foundGroup = await GroupModel.findById(body.group)
            console.log("CREATING POST FOR GROUP ", foundGroup._id)
            await GroupModel.updateOne({_id: foundGroup._id}, {
                $push: {posts: new newPost._id}
            })
        }
        return {
            _id: newPost._id,
            slug,
        };
    }

    // add post to posts array of tag in newTags
    // remove post from posts array of all other tags
    async updateTagPosts(newTags: Set<string>, postID: string, post: Ref<Post>) {
        const tags = await TagModel.find();
        for (const tag of tags) {
            if (!newTags.has(tag._id.toString())) {
                // find index of current post in posts array of current tag
                // if present, remove post from posts array
                tag.posts.push(post);
                const index = tag.posts.indexOf(tag.posts[tag.posts.length - 1], 0);
                if (index != tag.posts.length - 1 && index != -1)
                    tag.posts.splice(index, 1);
                tag.posts.splice(tag.posts.length - 1, 1);
            } else {
                tag.posts.push(post);
            }
            tag.save();
        }
    }

    async updatePostBySlug(update: UpdatePostBodyDto, slug: string): Promise<UpdatePostSuccessDto> {
        // 1. Find post
        const post = await PostModel.findOne({slug});
        if (!post) {
            throw new NotFoundException();
        }

        if (update.title) {
            post.title = update.title;
            let newSlug = urlSlug(update.title);
            const existingPostWithSlug = await PostModel.findOne({newSlug});
            if (existingPostWithSlug) {
                newSlug = post._id;
            }
            post.slug = newSlug;
        }

        if (update.content) {
            post.content = update.content;
            post.previewContent = post.content.substring(0, previewContentLength);
        }

        if (update.featuredImg) {
            post.featuredImg = update.featuredImg;
        }

        if (Array.isArray(update.tags)) {
            post.tags = update.tags.map(tag => new ObjectId(tag));
            const tagSet = new Set(update.tags);
            this.updateTagPosts(tagSet, post._id, post);
        }

        await post.save();
        // console.log("POST::SERVICE");
        // console.log(post.slug);
        return {_id: post._id, slug: post.slug};
    }

    isLikedByUser(likes: Ref<User, ObjectID>[], userObjectID: string): boolean {
        const found = likes.find(uid => uid.toString() === userObjectID);
        return found !== null;
    }

    /**
     * Get the top 5 posts based on:
     *
     * - Ratio of likes to views, higher the better (if 0 views then score is 0.5)
     * - Tie breaker: most recent
     * - Only in past week
     *
     * TODO: make this scalable (optimize)
     */
    async getInitialPosts(fetchCount: number, userObjectID?: string): Promise<PostDto[]> {
        const allPosts = await PostModel.find();

        //TODO: only show posts in the past week
        // allPosts.sort((post1, post2) => parseInt(post1.createdAt.toString()) - parseInt(post2.createdAt.toString()));
        const start: number = 5 * fetchCount;
        const end: number = start + 5;

        const likesToViewsRatios: Record<string, number>[] = [];
        allPosts.forEach((post) => {
            let likeToViewRatio = 0;
            if (post.views > 0) {
                likeToViewRatio = post.likes / post.views;
            }
            likesToViewsRatios.push({[post._id.toString()]: likeToViewRatio});
        })
        likesToViewsRatios.sort((ratio1, ratio2) => ratio2[Object.keys(ratio2)[0]] - ratio1[Object.keys(ratio1)[0]]);

        const foundPosts = await PostModel.find({
            _id: {
                $in: likesToViewsRatios.slice(start, end).map(ratio => new ObjectID(Object.keys(ratio)[0]))
            }
        })

        if (foundPosts.length === 0) {
            throw new NotFoundException();
        }
        // if (userObjectID) {
        //   const followingIDs = (await UserModel.findById(userObjectID)).following;
        //   const postsByFollowing = foundPosts.filter((post) => followingIDs.includes(post.author));
        //   return postsByFollowing.map(post => convertPostDocumentToPostDto(post));
        // }
        return foundPosts.map(post => convertPostDocumentToPostDto(post));
    }


    private async convertHNToPost(data: HNArticle): Promise<any> {
        return {
            id: data.id.toString(),
            author: data.by,
            // authorImg: data.user.profile_image,
            title: data.title,
            url: data.url,
            // tags: data.tag_list,
            // featuredImg: data.cover_image,
            createdAt: data.time,
            // likes: data.public_reactions_count,
            // comments: data.comments_count,
            // comments,
            // likedByUser: false,
        }
    }

    async getHackerNewsPosts(fetchCount: number): Promise<any[]> {
        const start: number = 10 * fetchCount;
        const end: number = start + 10;
        const res = await this.httpService.get(HackerNewsTopStories).toPromise()
        const allTopStoriesIDs = await res.data
        const postIDs = allTopStoriesIDs.slice(start, end) //get a list of ids

        return await Promise.all(postIDs.map(async (postID) => {
            const singleArticle = await this.httpService.get(`https://hacker-news.firebaseio.com/v0/item/${postID}.json?print=pretty`).toPromise()
            return this.convertHNToPost(singleArticle.data)
        }));
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

    async deletePostByPostID(postID: string, userID: string): Promise<void> {
        const postExists = await PostModel.exists({_id: postID, author: new ObjectID(userID)});
        if (!postExists) {
            throw new BadRequestException("Post not found");
        }

        await PostModel.deleteOne({_id: postID});
        await UserModel.updateOne({_id: userID}, {$pull: {posts: new ObjectID(postID)}});
    }

    async findPostsByIDs(ids: string[]): Promise<GetPostsSuccessDto> {
        const foundPosts = await PostModel.find({_id: {$in: ids}})
        return {posts: foundPosts.map(post => convertPostDocumentToPostDto(post))}
    }

    async getPostsByUserID(userID: string): Promise<GetPostsSuccessDto> {
        const foundUser = await UserModel.findById(userID)
        const postsByUser = await PostModel.find({author: foundUser._id})

        const postIDs = postsByUser.map((post) => post._id.toString())
        console.log(postIDs)
        return this.findPostsByIDs(postIDs)
    }


}
