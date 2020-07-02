import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Personal } from '../auth/guards/personal.decorator';
import { FileUpload } from './upload.decorator';
import { UploadService } from './upload.service';
import { UserObjectID } from '../user/user-object-id.decorator';
import { UploadSuccess, FileUploadDto } from './upload.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Upload')
@ApiConsumes('multipart/form-data')
@FileUpload() // Enables UploadedFile usage
@Personal() // Applies authentication to the entire controller
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @ApiBody({
    type: FileUploadDto
  })
  @Post('profile-pic')
  async uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return {
      url: await this.uploadService.uploadProfilePic(_id, file),
    };
  }

  @ApiBody({
    type: FileUploadDto
  })
  @Post('profile-banner-pic')
  async uploadProfileBannerPic(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return { url: await this.uploadService.uploadProfileBannerPic(_id, file) };
  }

  @ApiBody({
    type: FileUploadDto
  })
  @Post('public/asset')
  async uploadPublicAsset(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return { url: await this.uploadService.uploadPublicAsset(_id, file) };
  }

  @Post('private/file')
  async uploadPrivateFile(
    @UploadedFile() file: Express.Multer.File,
    @UserObjectID() _id: string,
  ): Promise<UploadSuccess> {
    return { url: await this.uploadService.uploadPrivateFile(_id, file) };
  }
}
