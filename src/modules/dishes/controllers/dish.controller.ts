import { Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { DishController as Controller } from '../decorators';
import { DishService } from '../services';

@Controller()
export class DishController {
  constructor(private readonly _dishService: DishService) {}

  @Get(':id')
  async getDishes(@Param('id', ParseUUIDPipe) categoryId: string) {
    return this._dishService.getDishes(categoryId);
  }
}
