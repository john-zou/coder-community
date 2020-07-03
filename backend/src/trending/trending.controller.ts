import { Controller, Get } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { ApiTags } from '@nestjs/swagger';
import { GetInitialDataDto } from './initialData.dto';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';

@ApiTags('Trending')
@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) { }

  @Personal()
  @Get()
  getTrending(@UserObjectID() userObjectID: string): Promise<GetInitialDataDto> {
    return this.trendingService.getInitialData(userObjectID);
  }

  // @Get('loggedIn')
  // getTrendingLoggedIn(): Promise<GetInitialLoggedInData> {

  // }
}
