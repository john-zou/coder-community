import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetPostsByTagQueryParams {
  @ApiProperty({
    description: "The ObjectID of the tag"
  })
  tagID: string;
  
  @ApiPropertyOptional({
    description: "How many posts to fetch",
    default: 5
  })
  fetchCount: number;
}

export class MakeTagBodyDto {
  tagName: string;
}

export class MakeTagSuccessDto {
  tag: {
    _id: string;
    name: string;
  }
}