// Every request and response should have a "dto" type
export class GetAllVideosDto {
  videos: VideoDto[];
}

class VideoDto {
   name: string;
    description: string;
    _id: string;
    createdAt: string;
}