import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Personal } from '../auth/guards/personal.decorator';
import { FileUpload } from './upload.decorator';
import { UploadService } from './upload.service';
import { UserObjectID } from '../user/user-object-id.decorator';
import { UploadSuccess } from './upload.dto';

@FileUpload() // Enables UploadedFile usage
@Personal() // Applies authentication to the entire controller
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('profile-pic')
  uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return this.uploadService.uploadProfilePic(_id, file);
  }

  @Post('profile-banner-pic')
  uploadProfileBannerPic(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return this.uploadService.uploadProfileBannerPic(_id, file);
  }

  @Post('public/image')
  uploadPublicImage(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return this.uploadService.uploadPublicImage(_id, file);
  }

  @Post('public/video')
  uploadPublicVideo(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return this.uploadService.uploadPublicVideo(_id, file);
  }

  @Post('private/file')
  uploadPrivateFile(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return this.uploadService.uploadPrivateFile(_id, file);
  }
}
