import { Controller, Get } from '@nestjs/common';
import { InitialDataDto } from './initialData.dto';
import { TrendingService } from './trending.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Trending')
@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) { }

  @Get()
  getTrending(): InitialDataDto {
    return this.trendingService.getInitialData();
  }
}
