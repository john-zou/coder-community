import { ApiProperty } from "@nestjs/swagger";

export class UploadSuccess {
  @ApiProperty({
    description: "The relative static URL of the file",
    example: "uploads/assets/xyz.jpg"
  })
  url: string;
}

export class FileUploadDto {
  @ApiProperty({type: 'file', format: 'binary'})
  file: any;
}
