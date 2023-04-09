// import { HttpModule, HttpService } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';

import { USERS_SERVICES } from './services';

export class UserModule {
  static forRoot(): DynamicModule {
    const providers = [...USERS_SERVICES];

    return {
      module: UserModule,
      providers,
      exports: providers,
    };
  }
}
