import { Module } from '@nestjs/common';

import { Config } from '@core/config';

import { RESET_PASSWORD_CONTROLLERS } from './controllers';
import { RESTORE_PASSWORD_SERVICES } from './services';

import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'miiloosheevskaayyaa@gmail.com',
          pass: Config.get.emailPass,
        },
      },
    }),
  ],
  providers: [...RESTORE_PASSWORD_SERVICES],
  controllers: [...RESET_PASSWORD_CONTROLLERS],
})
export class ResetPasswordModule {}
