import { Body, Get, Post, Request } from '@nestjs/common';

import { IsAuthenticated } from '@shared/user';

import { OrderController as Controller } from '../decorators';
import { OrderService } from '../services';

@Controller()
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @IsAuthenticated()
  @Post('create')
  async createFavorite(@Request() { user }: any, @Body() { promocodeId, totalPrice, time, address }: any) {
    return this._orderService.createOrder(user.user.id, promocodeId, totalPrice, time, address);
  }

  @IsAuthenticated()
  @Get()
  async getFavorites(@Request() { user }: any) {
    return this._orderService.getOrdersByUser(user.user.id);
  }
}
