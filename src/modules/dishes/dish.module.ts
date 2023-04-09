import { Module } from '@nestjs/common';

import { DISH_CONTROLLERS } from './controllers';
import { DISH_SERVICES } from './services';

@Module({
  providers: [...DISH_SERVICES],
  controllers: [...DISH_CONTROLLERS],
})
export class DishModule {}
