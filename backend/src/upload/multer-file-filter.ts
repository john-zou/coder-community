import { Request } from "express";
import path from "path";

const AcceptedExtensions: Record<string, boolean> = {
  // image formats
  jpg: true,
  jpeg: true,
  png: true,
  webp: true,
  gif: true,

  // video formats
  mp4: true,
  avi: true,
  wmv: true,
  webm: true,
  flv: true,
  mov: true,
}

/**
 * Does Multer file validatoin
 */
export function multerFileFilter (_: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void): void {
  const extension = path.extname(file.originalname)
  const accepted = AcceptedExtensions[extension];
  if (accepted) {
    callback(null, true);
  } else {
    callback(new Error(`Only the following extensions are allowed: ${Object.keys(AcceptedExtensions)}`), false);
  }
}