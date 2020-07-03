import { Controller, Get } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { ApiTags } from '@nestjs/swagger';
import { GetInitialDataDto } from './initialData.dto';

@ApiTags('Trending')
@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) { }

  @Get()
  getTrending(): Promise<GetInitialDataDto> {
    return this.trendingService.getInitialData();
  }

  // @Get('loggedIn')
  // getTrendingLoggedIn(): Promise<GetInitialLoggedInData> {

  // }
}
