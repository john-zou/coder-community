import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Personal } from '../auth/guards/personal.decorator';
import { FileUpload } from './upload.decorator';
import { UploadService } from './upload.service';
import { UserID } from '../user/userID.decorator';

@FileUpload() // Enables UploadedFile usage
@Personal() // Applies authentication to the entire controller
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('profile-pic')
  uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @UserID() userID: string,
  ): Promise<void> {
    // TODO: create upload response DTOs
    return this.uploadService.uploadProfilePic(userID, file);
  }

  @Post('profile-banner-pic')
  uploadProfileBannerPic(
    @UploadedFile() file: Express.Multer.File,
    @UserID() userID: string,
  ): Promise<void> {
    // TODO: create upload response DTOs
    return this.uploadService.uploadProfileBannerPic(userID, file);
  }

  @Post('public/image')
  uploadPublicImage(
    @UploadedFile() file: Express.Multer.File,
    @UserID() userID: string,
  ): Promise<void> {
    // TODO: create upload response DTOs
    return this.uploadService.uploadPublicImage(userID, file);
  }

  @Post('public/video')
  uploadPublicVideo(
    @UploadedFile() file: Express.Multer.File,
    @UserID() userID: string,
  ): Promise<void> {
    // TODO: create upload response DTOs
    return this.uploadService.uploadPublicVideo(userID, file);
  }

  @Post('private/file')
  uploadPrivateFile(
    @UploadedFile() file: Express.Multer.File,
    @UserID() userID: string,
  ): Promise<void> {
    // TODO: create upload response DTOs
    return this.uploadService.uploadPrivateFile(userID, file);
  }
}
