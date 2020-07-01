import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { StorageModule } from '../storage/storage.module';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [StorageModule],
  controllers: [UploadController],
  providers: [UploadService, StorageService]
})
export class UploadModule {}
