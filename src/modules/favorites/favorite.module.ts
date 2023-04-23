import { Module } from '@nestjs/common';

import { CategoryModule } from '@modules/categories/category.module';
import { CATEGORY_SERVICES } from '@modules/categories/services';

import { FAVORITES_CONTROLLERS } from './controllers';
import { FAVORITES_SERVICES } from './services';

@Module({
  imports: [CategoryModule],
  providers: [...FAVORITES_SERVICES, ...CATEGORY_SERVICES],
  controllers: [...FAVORITES_CONTROLLERS],
})
export class FavoriteModule {}
