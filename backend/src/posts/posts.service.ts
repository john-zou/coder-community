import { Injectable, HttpService } from '@nestjs/common';
import { Post } from './post.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../user/user.schema';
import { GetAllPostsDto } from './dto/posts.dto';

type DevToArticle = {
  "type_of": "article",
  "id": 194541,
  "title": "There's a new DEV theme in town for all you 10x hackers out there (plus one actually useful new feature)",
  "description": "",
  "cover_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--74Bl23tz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--xU8cbIK4--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/8a39dzf3oovzc2snl7iv.png",
  "readable_publish_date": "Oct 24",
  "social_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--SeMxdKIa--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--xU8cbIK4--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/8a39dzf3oovzc2snl7iv.png",
  "tag_list": [
    "meta",
    "changelog",
    "css",
    "ux"
  ],
  "tags": "meta, changelog, css, ux",
  "slug": "there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
  "path": "/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
  "url": "https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
  "canonical_url": "https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
  "comments_count": 37,
  "public_reactions_count": 142,
  "collection_id": null,
  "created_at": "2019-10-24T13:41:29Z",
  "edited_at": "2019-10-24T13:56:35Z",
  "crossposted_at": null,
  "published_at": "2019-10-24T13:52:17Z",
  "last_comment_at": "2019-10-25T08:12:43Z",
  "published_timestamp": "2019-10-24T13:52:17Z",
  "user": {
    "name": "Ben Halpern",
    "username": "ben",
    "twitter_username": "bendhalpern",
    "github_username": "benhalpern",
    "website_url": "http://benhalpern.com",
    "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--Y1sq1tFG--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png",
    "profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--DcW51A6v--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png"
  },
  "organization": {
    "name": "The DEV Team",
    "username": "devteam",
    "slug": "devteam",
    "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--0kDBq1Ne--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/organization/profile_image/1/0213bbaa-d5a1-4d25-9e7a-10c30b455af0.png",
    "profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--8tTU-XkZ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/organization/profile_image/1/0213bbaa-d5a1-4d25-9e7a-10c30b455af0.png"
  }
}
const DevToApiKey = "QG7J1McHHMV7UZ9jwDTeZFHf";
const DevToApiUrlArticles = "https://dev.to/api/articles/"; //retrieve a list of articles (with no content)
const DevToApiUrlComments = "https://dev.to/api/comments";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postModel: ReturnModelType<typeof User>, private readonly httpService: HttpService) { }

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   const createdUser = new this.userModel(createUserDto);
  //   return createdUser.save();
  // }

  // https://docs.dev.to/api/#tag/articles
  async getDevToArticles(): Promise<GetAllPostsDto[]> {
    const res = await this.httpService.get(DevToApiUrlArticles, {
      headers: {
        'api_key': DevToApiKey
      }
    }).toPromise(); //axios api
    const allArticles = await res.data;
    const first50Articles = allArticles.slice(0, 3);
    console.log(first50Articles);
    return await Promise.all(first50Articles.map((article) => {
      return this.convertToPostsDto(article);
    }));
  }

  // https://docs.dev.to/api/#operation/getArticleById?
  async getContent(id: number): Promise<string> {
    const res = await this.httpService.get(DevToApiUrlArticles + id, {
      headers: {
        'api_key': DevToApiKey
      }
    }).toPromise();
    return res.data.body_markdown;
  }

  // async getComments(id: number): Promise<string[]> {
  //   const res = await this.httpService.get(DevToApiUrlComments, {
  //     headers: {
  //       'api_key': DevToApiKey
  //     },
  //     params: {
  //       'a_id': id
  //     }
  //   }).toPromise();
  //   return 
  // }


  async convertToPostsDto(data: DevToArticle): Promise<GetAllPostsDto> {
    return {
      author: data.user.name,
      title: data.title,
      description: data.description,
      content: await this.getContent(data.id),
      tags: data.tag_list,
      featuredImg: data.cover_image,
      likedByUsers: data.public_reactions_count,
      commentsCount: data.comments_count,
      // comments: await getComments(data.id),
    }
  }
}
