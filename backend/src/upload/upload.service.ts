import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  uploadProfilePic(userID: string, file: Express.Multer.File): Promise<void> {
    throw new Error('Method not implemented.');
  }
  uploadProfileBannerPic(
    userID: string,
    file: Express.Multer.File,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  uploadPublicImage(userID: string, file: Express.Multer.File): Promise<void> {
    throw new Error('Method not implemented.');
  }
  uploadPublicVideo(userID: string, file: Express.Multer.File): Promise<void> {
    throw new Error('Method not implemented.');
  }
  uploadPrivateFile(userID: string, file: Express.Multer.File): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
