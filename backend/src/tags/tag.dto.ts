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
  requestedCount?: number;
  
  @ApiPropertyOptional({
    description: "What index to start at, e.g. if startIdx = 5, then the 5 posts (0th, 1st, 2nd, 3rd, 4th) of this tag will not be fetched",
    default: 0
  })
  startIdx?: number;

  @ApiPropertyOptional({
    description: "An object that works like a set of Post ObjectIDs to exclude",
    example: {
      "an3fklnalfknnkaf": true,
      "afklna3flknafkln": true
    }
  })
  excludePostIDs?: Record<string, boolean>;
}