import { Get, Query } from '@nestjs/common';

import { DishController as Controller } from '../decorators';
import { DishService } from '../services';

@Controller()
export class DishController {
  constructor(private readonly _dishService: DishService) {}

  @Get()
  async getDishes(@Query() { categoryId, search }: any) {
    return this._dishService.getDishes(categoryId, search);
  }

  @Get('dish')
  async getDish(@Query() { dishId }: any) {
    return this._dishService.getDish(dishId);
  }
}
