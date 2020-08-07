import {ApiProperty} from "@nestjs/swagger";

export class UploadSuccess {
    @ApiProperty({
        description: "The URL of the file which is now statically served as a result of this upload.",
        example: "http://localhost:3001/uploads/assets/xyz.jpg"
    })
    url: string;
}

export class FileUploadDto {
    @ApiProperty({type: 'file', format: 'binary'})
    file: any;
}
