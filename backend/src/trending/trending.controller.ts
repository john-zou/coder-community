import { Controller, Get, Logger } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { ApiTags } from '@nestjs/swagger';
import { GetInitialDataDto, GetInitialDataLoggedInDto } from './initialData.dto';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';

@ApiTags('Trending')
@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) { }

  @Get()
  getTrending(): Promise<GetInitialDataDto> {
    Logger.log("Getting more trending posts!", "TrendingController");
    return this.trendingService.getInitialData();
  }

  @Personal()
  @Get('loggedIn')
  getTrendingLoggedIn(@UserObjectID() userObjectID: string): Promise<GetInitialDataLoggedInDto> {
    Logger.log("Getting more trending posts!", "TrendingController");
    return this.trendingService.getInitialLoggedInData(userObjectID);
  }
}
