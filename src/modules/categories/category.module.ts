import { Module } from '@nestjs/common';

import { CATEGORY_CONTROLLERS } from './controllers';
import { CATEGORY_SERVICES } from './services';

@Module({
  providers: [...CATEGORY_SERVICES],
  controllers: [...CATEGORY_CONTROLLERS],
})
export class CategoryModule {}
