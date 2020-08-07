import {GroupModel, PostModel, TagModel, UserModel} from '../mongoModels';
import {BadRequestException, HttpService, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {DocumentType, Ref} from '@typegoose/typegoose';
import {ObjectID, ObjectId} from 'mongodb';
import {convertPostDocumentToPostDto,} from '../util/helperFunctions';
import * as urlSlug from 'url-slug';
import {User} from '../user/user.schema';
import {Post} from '../posts/post.schema';
import {
    CreatePostBodyDto,
    CreatePostSuccessDto,
    GetPostsSuccessDto,
    PostDto,
    PostWithDetails,
    UpdatePostBodyDto,
    UpdatePostSuccessDto,
} from './dto/posts.dto';


// Can use for future feature
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
const SecondsInAWeek = 604800;

@Injectable()
export class PostsService {
    constructor(private readonly httpService: HttpService) {
    }

    async updateScore(postDocument: DocumentType<Post>): Promise<void> {
        if (this.isOverOneWeekOld(postDocument)) {
            postDocument.score = -1
        } else {
            // calculate the score if not over one week old
            let score = postDocument.likes / postDocument.views

            if (isNaN(score)) {
                score = 0.5
            }
            postDocument.score = score
        }

        await postDocument.save()
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
            this.updateScore(post) // purposefully not awaiting
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
            score: 0.5,
            group: body.group,
        };
        const newPost = new PostModel(doc);


        await newPost.save();
        if (!slug) {
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

        if (body.group) {
            const foundGroup = await GroupModel.findById(body.group)
            console.log("CREATING POST FOR GROUP ", foundGroup._id)
            await GroupModel.updateOne({_id: foundGroup._id}, {
                $push: {posts: new ObjectID(newPost._id)}
            })
        }
        return {
            _id: newPost._id,
            slug,
        };
    }

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
        return {_id: post._id, slug: post.slug};
    }

    isLikedByUser(likes: Ref<User, ObjectID>[], userObjectID: string): boolean {
        const found = likes.find(uid => uid.toString() === userObjectID);
        return found !== null;
    }

    async getPopularPosts(): Promise<PostDto[]> {
        const popularPosts = await PostModel.find().sort({score: -1}).limit(20)
        return popularPosts.map(post => (convertPostDocumentToPostDto(post)))
    }

    async getInitialPosts(fetchCount: number, userObjectID?: string): Promise<PostDto[]> {
        let user: DocumentType<User>;
        if (userObjectID) {
            user = await UserModel.findById(userObjectID)
        }
        let fetchOffset = fetchCount * 5;
        const initialFetchOffset = fetchOffset;
        const maxOffset = fetchOffset + 5;
        let postDocuments: DocumentType<Post>[] = [];
        let postsByUserCount = 0

        if (user) {
            postsByUserCount = user.posts.length
            const postsToFetch: ObjectID[] = []
            while (fetchOffset < postsByUserCount) {
                postsToFetch.push(user.posts[fetchOffset++] as ObjectID)
                if (fetchOffset >= maxOffset) {
                    break;
                }
            }
            if (postsToFetch.length > 0) {
                postDocuments = await PostModel.find({_id: {$in: postsToFetch}})
            }
        }

        // need to fetch more if user has less than 5 posts left
        if (fetchOffset < maxOffset) {
            const limit = maxOffset - fetchOffset
            const skip = fetchOffset - postsByUserCount
            // fetch from Post collection starting from fetchOffset
            const trendingPostDocs = await PostModel.find().sort({score: -1}).skip(skip).limit(limit)
            trendingPostDocs.forEach(post => postDocuments.push(post))
        }

        //if there is no posts left
        if (postDocuments.length === 0) {
            Logger.log("returning 404 because postDocuments.length is 0", "getInitialPosts")
            throw new NotFoundException()
        }
        return postDocuments.map(convertPostDocumentToPostDto)
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
        return await Promise.all(
            first50Articles.map(article => {
                return this.convertDevToPosts(article);
            }),
        );
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

    private isOverOneWeekOld(postDocument: DocumentType<Post>): boolean {
        const now = Date.now()
        const createdAt = postDocument.createdAt.valueOf()
        return (now - createdAt) / 1000 > SecondsInAWeek
    }

    private async convertHNToPost(data: HNArticle): Promise<any> {
        return {
            id: data.id.toString(),
            author: data.by,
            title: data.title,
            url: data.url,
            createdAt: data.time,
        }
    }

    // Unused -- can use later for different feature
    private async convertDevToPosts(data: DevToArticle): Promise<any> {
        return {
            authorName: data.user.name,
            authorImg: data.user.profile_image,
            title: data.title,
            previewContent: data.description,
            tags: data.tag_list,
            featuredImg: data.cover_image,
            createdAt: new Date(data.created_at),
            likes: data.public_reactions_count,
            comments: data.comments_count,
            likedByUser: false,
        };
    }
}
