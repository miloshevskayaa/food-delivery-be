import { Module } from '@nestjs/common';

import { ORDERS_CONTROLLERS } from './controllers';
import { ORDERS_SERVICES } from './services';

@Module({
  providers: [...ORDERS_SERVICES],
  controllers: [...ORDERS_CONTROLLERS],
})
export class OrderModule {}
