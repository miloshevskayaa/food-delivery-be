import { Module } from '@nestjs/common';

import { FAVORITES_CONTROLLERS } from './controllers';
import { FAVORITES_SERVICES } from './services';

@Module({
  providers: [...FAVORITES_SERVICES],
  controllers: [...FAVORITES_CONTROLLERS],
})
export class FavoriteModule {}
