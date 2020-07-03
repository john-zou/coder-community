import { UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export function FileUpload(): MethodDecorator & ClassDecorator {
  return UseInterceptors(FileInterceptor('file'));
}