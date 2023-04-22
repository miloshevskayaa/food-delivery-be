import { Get } from '@nestjs/common';

import { DishController as Controller } from '../decorators';
import { CategoryService } from '../services';

@Controller()
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this._categoryService.getCategories();
  }
}
