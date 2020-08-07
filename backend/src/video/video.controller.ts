import {Body, Controller, Get, Post} from '@nestjs/common';
import {VideoService} from './video.service';
import {CreateVideoDto, GetAllVideosDto, VideoDto} from './video.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Personal} from '../auth/guards/personal.decorator';
import {UserObjectID} from '../user/user-object-id.decorator';

@ApiTags('video')
@Controller('video')

export class VideoController {

    constructor(private readonly videoService: VideoService) {
    } // Used for dependency injection

    @ApiBearerAuth()
    @Personal()
    @Get()
    async getAllVideos(): Promise<GetAllVideosDto> {
        return this.videoService.getAllVideos();
    }

    @ApiBearerAuth()
    @Personal()
    @Post() // HTTP POST method
    async createVideo(@UserObjectID() ownerID: string, @Body() createVideoDto: CreateVideoDto): Promise<VideoDto> {
        return this.videoService.createVideo(createVideoDto, ownerID);
    }
}
