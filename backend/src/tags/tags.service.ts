import {PostModel, TagModel, UserModel} from '../mongoModels';
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {TagsDto} from './tags.dto';
import {GetPostsByTagDto} from '../posts/dto/posts.dto';
import {convertPostDocumentToPostDto, convertUserToUserDto} from '../util/helperFunctions';
import {MakeTagSuccessDto} from './tag.dto';

const PostsFetchedAtATime = 5;

@Injectable()
export class TagsService {
    async getPostsByTag(tagID: string, fetchCount: number): Promise<GetPostsByTagDto> {
        const tag = await TagModel.findById(tagID);
        if (!tag) {
            throw new NotFoundException();
        }

        const postIDs = new Array<string>(PostsFetchedAtATime);
        // Get the most recent posts first
        for (let i = tag.posts.length - (fetchCount * PostsFetchedAtATime) - 1, count = 0; i >= 0 && count < PostsFetchedAtATime; --i, ++count) {
            const postID = tag.posts[i].toString();
            postIDs.push(postID);
        }
        const postDocuments = await PostModel.find({_id: {$in: postIDs}});

        if (postDocuments.length === 0) {
            throw new NotFoundException();
        }

        const postDtos = postDocuments.map(convertPostDocumentToPostDto);
        const authorIDs = postDtos.map(post => post.author.toString());

        const authorDocuments = await UserModel.find({_id: {$in: authorIDs}});
        const authorDtos = authorDocuments.map(convertUserToUserDto);
        return {
            tagID,
            posts: postDtos,
            authors: authorDtos,
        };
    }

    async makeTag(tagName: string): Promise<MakeTagSuccessDto> {
        if (await TagModel.exists({name: tagName})) {
            throw new BadRequestException('Tag Name already exists');
        }

        const tag = new TagModel({name: tagName, posts: []});
        await tag.save();

        return {
            tag: {
                name: tagName,
                _id: tag._id.toString(),
            },
        };
    }


    async getTags(): Promise<TagsDto[]> {
        const tags = await TagModel.find();
        return tags.map((tag) => ({
            _id: tag._id.toString(),
            name: tag.name,
        }));
    }
}
