import { Controller, Get, Logger, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { ApiTags } from '@nestjs/swagger';
import { GetInitialDataDto, GetInitialDataLoggedInDto } from './initialData.dto';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';

@ApiTags('Trending')
@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) { }

  @UsePipes(new ValidationPipe({ transform: true })) //turn string into specified @Query() type
  @Get('fetchCount')
  getTrending(@Query('fetchCount') fetchCount: number): Promise<GetInitialDataDto> {
    Logger.log("Getting more trending posts!", "TrendingController");
    return this.trendingService.getInitialData(fetchCount);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Personal()
  @Get('loggedIn')
  getTrendingLoggedIn(@Query('fetchCount') fetchCount: number, @UserObjectID() userObjectID: string): Promise<GetInitialDataLoggedInDto> {
    Logger.log(`Getting more trending posts!, fetchCount: ${fetchCount}`, "TrendingController");
    return this.trendingService.getInitialLoggedInData(fetchCount, userObjectID);
  }
}
