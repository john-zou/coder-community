import { Controller, Get, Post, Body } from '@nestjs/common';
import { ShopModel } from '../mongoModels';
import { ShopService } from './shop.service';
import { GetAllShopsDto, ShopDto, CreateShopDto } from './shop.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';


@ApiTags('Shop')  // Used to place these endpoints in the Api document under "Shop" category and also cause them to be in ShopApi() in front end src/api
@Controller('shop') // Automatically generated. Used to tell NestJS that this class contains methods that handle REST endpoints.
                    // This defines the root of the controller. The root of the entire backend is /api. So this controller's root is /api/shop
export class ShopController {
  // alternatively, you can have a hard dependency on shopService like this:
  // private readonly shopService = new ShopService(); (assuming you can construct shopService... it may have its own dependencies)
  // ... placing it into the constructor parameter instead, while it may seem magical, is nice. (NestJS handles the "magic")

  constructor(private readonly shopService: ShopService){} // Used for dependency injection

  @ApiBearerAuth() // Used to give the "lock" button in the API document
  @Personal() // Basically says: "this endpoint returns 401 unauthorized, unless you give the right token"
  @Get() // Says: this is a GET request for "/api/shop". You can pass a string into the @Get(), for example, @Get("new-shop") will respond to /api/src/new-shop
  async getAllShops(): Promise<GetAllShopsDto> { // it returns a promise because all async functions return a promise.
                                                 // NestJS will take the fulfilled promise (which returns a GetAllShopsDto) and res.send() it
    return this.shopService.getAllShops();
  }

  @ApiBearerAuth()
  @Personal()
  @Post() // HTTP POST method
  async createShop(@UserObjectID() ownerID: string, @Body() createShopDto: CreateShopDto): Promise<ShopDto> {
    return this.shopService.createShop(createShopDto, ownerID);
  }
}
