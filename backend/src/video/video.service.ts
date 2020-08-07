import {Injectable} from '@nestjs/common';
import {CreateVideoDto, GetAllVideosDto, VideoDto} from './video.dto';
import {VideoModel} from '../mongoModels';

@Injectable()

export class VideoService {

    async createVideo(createVideoDto: CreateVideoDto, ownerID: string): Promise<VideoDto> {
        const video = new VideoModel({
            name: createVideoDto.name,
            description: createVideoDto.description,
            owner: ownerID
        });
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
