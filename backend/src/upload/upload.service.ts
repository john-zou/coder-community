import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UploadService {
  uploadProfilePic(_id: string, file: Express.Multer.File): Promise<import("./upload.dto").UploadSuccess> {
    throw new Error("Method not implemented.");
  }
  uploadProfileBannerPic(_id: string, file: Express.Multer.File): Promise<import("./upload.dto").UploadSuccess> {
    throw new Error("Method not implemented.");
  }
  uploadPublicImage(_id: string, file: Express.Multer.File): Promise<import("./upload.dto").UploadSuccess> {
    throw new Error("Method not implemented.");
  }
  uploadPublicVideo(_id: string, file: Express.Multer.File): Promise<import("./upload.dto").UploadSuccess> {
    throw new Error("Method not implemented.");
  }
  uploadPrivateFile(_id: string, file: Express.Multer.File): Promise<import("./upload.dto").UploadSuccess> {
    throw new Error("Method not implemented.");
  }
  constructor(private readonly storageService: StorageService) {}

  
}
