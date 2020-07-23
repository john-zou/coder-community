import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { GetAllVideosDto, CreateVideoDto, VideoDto } from './video.dto';
import { VideoModel, PostModel, TagModel, UserModel } from '../mongoModels';
import { Ref } from '@typegoose/typegoose';
import { ObjectID, ObjectId } from 'mongodb';
import {
  convertPostDocumentToPostDetailDto,
  convertPostDocumentToPostDto,
  convertToStrArr,
  convertUserToUserDto,
} from '../util/helperFunctions';
import { DocumentType } from '@typegoose/typegoose';
import { UserService } from '../user/user.service';
import * as urlSlug from 'url-slug';
import { User } from '../user/user.schema';
import {
  CreatePostBodyDto,
  CreatePostSuccessDto,
  PostDto,
  PostWithDetails, UpdatePostBodyDto,
  UpdatePostSuccessDto,
} from '../posts/dto/posts.dto';
import { Model } from 'mongoose';

@Injectable()

export class VideoService {

async createVideo(createVideoDto: CreateVideoDto, ownerID: string): Promise<VideoDto> {
     const video = new VideoModel({name: createVideoDto.name, description: createVideoDto.description, owner: ownerID});
     await video.save();
     return {
       _id: video._id.toString(),
       createdAt: "some date",
       description: video.description,
       name: video.name,
     }
   }

   async getAllVideos(): Promise<GetAllVideosDto> {
     const videos = await VideoModel.find().exec();
     return {
       videos:
         videos.map(video => {
       return {
         _id: video._id.toString(),
         name: video.name,
         description: video.description,
         createdAt: "some date",
       }
       })
     };
   }
}
