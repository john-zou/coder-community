import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { StorageModule } from '../storage/storage.module';
import { StorageService } from '../storage/storage.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileSizeLimitInBytes } from '../storage/storage.constants';
import { multerFileFilter } from './multer-file-filter';

@Module({
  imports: [
    MulterModule.register({
      dest: './tmp',
      fileFilter: multerFileFilter,
      limits: {fileSize: FileSizeLimitInBytes}
    }),
    StorageModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, StorageService],
})
export class UploadModule {}
