import {
  PublicUserContentDir,
  PublicUserContentServeRoot,
  PublicAssetsDir,
} from './../storage/storage.constants';
import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import path from 'path';
import { ProfilePicsDir, ProfileBannerDir } from '../storage/storage.constants';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  constructor(private readonly storageService: StorageService) {}

  private async uploadProfileItem(
    fileName: string,
    file: Express.Multer.File,
    to: string,
  ): Promise<string> {
    const extension = path.extname(file.originalname);
    const subPath = path.join(to, fileName + '.' + extension);
    const serverPath = path.join(PublicUserContentDir, subPath);
    await this.storageService.save(file, serverPath);
    const servePath = path.join(PublicUserContentServeRoot, subPath);
    return servePath;
  }

  uploadProfilePic(_id: string, file: Express.Multer.File): Promise<string> {
    return this.uploadProfileItem(_id, file, ProfilePicsDir);
  }

  uploadProfileBannerPic(
    _id: string,
    file: Express.Multer.File,
  ): Promise<string> {
    return this.uploadProfileItem(_id, file, ProfileBannerDir);
  }

  private generateAssetName(originalName: string) {
    const extension = path.extname(originalName);
    return uuid() + '.' + extension;
  }

  async uploadPublicAsset(
    _id: string, // unused, for now
    file: Express.Multer.File,
  ): Promise<string> {
    const assetName = this.generateAssetName(file.originalname);
    const savePath = path.join(
      PublicUserContentDir,
      PublicAssetsDir,
      assetName,
    );
    await this.storageService.save(file, savePath);
    const servePath = path.join(
      PublicUserContentServeRoot,
      PublicAssetsDir,
      assetName,
    );
    return servePath;
  }

  uploadPrivateFile(_id: string, file: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
