import { Module } from '@nestjs/common';

import { REGISTRATION_CONTROLLERS } from './controllers';
import { REGISTRATION_SERVICES } from './services';

@Module({
  providers: [...REGISTRATION_SERVICES],
  controllers: [...REGISTRATION_CONTROLLERS],
})
export class CreateModule {}
