import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { ProfileBannerDir, ProfilePicsDir, PublicUserContentSrc } from '../storage/storage.constants';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';
import {
  PublicAssetsDir, PublicUserContentDir,
  PublicUserContentServeRoot
} from './../storage/storage.constants';

@Injectable()
export class UploadService {
  constructor(private readonly storageService: StorageService, private readonly userService: UserService) { }

  async uploadProfilePic(_id: string, file: Express.Multer.File): Promise<string> {
    const url = await this.uploadProfileItem(_id, file, ProfilePicsDir);
    await this.userService.saveProfilePic(_id, url);
    return url;
  }

  async uploadProfileBannerPic(
    _id: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const url = await this.uploadProfileItem(_id, file, ProfileBannerDir);
    await this.userService.saveProfileBannerPic(_id, url);
    return url;
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

    const envURL = process.env.URL || "http://localhost:3001";
    const servePathParts = [envURL, PublicUserContentSrc, PublicAssetsDir, assetName];
    const servePath = servePathParts.join('/');

    return servePath;
  }

  uploadPrivateFile(_id: string, file: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }

  private async uploadProfileItem(
    fileName: string,
    file: Express.Multer.File,
    to: string,
  ): Promise<string> {
    const extension = path.extname(file.originalname);
    const fileNameWithExtension = fileName + extension;
    const subPath = path.join(to, fileNameWithExtension);
    const serverPath = path.join(PublicUserContentDir, subPath);
    await this.storageService.save(file, serverPath);
    const envURL = process.env.URL || "http://localhost:3001";
    const servePathParts = [envURL, PublicUserContentSrc, to, fileNameWithExtension];
    const servePath = servePathParts.join('/');
    return servePath;
  }

  private generateAssetName(originalName: string) {
    const extension = path.extname(originalName);
    return uuid() + extension;
  }


}
