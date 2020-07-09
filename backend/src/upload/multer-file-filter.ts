import { Request } from "express";
import * as path from "path";
import { Logger, HttpException } from "@nestjs/common";

const AcceptedExtensions: Record<string, boolean> = {
  // image formats
  [".jpg"]: true,
  [".jpeg"]: true,
  [".png"]: true,
  [".webp"]: true,
  [".gif"]: true,

  // video formats
  [".mp4"]: true,
  [".avi"]: true,
  [".wmv"]: true,
  [".webm"]: true,
  [".flv"]: true,
  [".mov"]: true,
}

/**
 * Does Multer file validatoin
 */
export function multerFileFilter(_: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void): void {
  Logger.log(file);
  const extension = path.extname(file.originalname);
  Logger.log("File extension:", extension);
  const accepted = AcceptedExtensions[extension];
  if (accepted) {
    callback(null, true);
  } else {
    callback(new HttpException(`Only the following extensions are allowed: ${Object.keys(AcceptedExtensions)}`, 400), false);
  }
}