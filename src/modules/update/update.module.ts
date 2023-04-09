import { Module } from '@nestjs/common';

import { UPDATE_CONTROLLERS } from './controllers';
import { UPDATE_SERVICES } from './services';

@Module({
  providers: [...UPDATE_SERVICES],
  controllers: [...UPDATE_CONTROLLERS],
})
export class UpdateModule {}
