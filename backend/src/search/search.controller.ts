import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchResultDto } from './search.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @ApiOperation({
    description: "Finds posts containing any of the terms in the query string"
  })
  @Get()
  search(@Query('q') query: string): Promise<SearchResultDto> {
    return this.service.search(query);
  }
}
