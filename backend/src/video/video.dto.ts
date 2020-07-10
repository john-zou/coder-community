// Every request and response should have a "dto" type
export class GetAllVideosDto {
  videos: VideoDto[];
}

export class VideoDto {
   name: string;
   description: string;
   _id: string;
   createdAt: string;
 }

 export class CreateVideoDto {
   name: string;
   description: string;
 }