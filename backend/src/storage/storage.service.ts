import { Injectable } from '@nestjs/common';
import { promises as fs } from "fs";

@Injectable()
export class StorageService {
  /**
   * Multer saves the file in tmp. This just moves it to the correct location in public or private
   * 
   * @param file the Multer file
   * @param at destination e.g. "public/profile-pics/x.jpg"
   */
  save(file: Express.Multer.File, at: string): Promise<void> {
    return fs.rename(file.path, at);
  }
}
