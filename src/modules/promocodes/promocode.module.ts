import { Module } from '@nestjs/common';

import { PROMOCODES_CONTROLLERS } from './controllers';
import { PROMOCODES_SERVICES } from './services';

@Module({
  providers: [...PROMOCODES_SERVICES],
  controllers: [...PROMOCODES_CONTROLLERS],
})
export class PromocodeModule {}
