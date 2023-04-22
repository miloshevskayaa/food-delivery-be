import { Body, Delete, Get, Post, Request } from '@nestjs/common';

import { IsAuthenticated } from '@shared/user';

import { FavoriteController as Controller } from '../decorators';
import { FavoriteService } from '../services';

@Controller()
export class FavoriteController {
  constructor(private readonly _favoriteService: FavoriteService) {}

  @IsAuthenticated()
  @Get()
  async getFavorites(@Request() { user }: any) {
    return this._favoriteService.getFavorites(user.user.id);
  }

  @Post('create')
  async createFavorite(@Body() { userId, dishId }: any) {
    return this._favoriteService.createFavorite(userId, dishId);
  }

  @Delete('remove')
  async removeFavorite(@Body() { userId, dishId }: any) {
    return this._favoriteService.removeFavorite(userId, dishId);
  }
}
