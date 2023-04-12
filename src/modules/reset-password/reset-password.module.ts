import { Module } from '@nestjs/common';

import { RESET_PASSWORD_CONTROLLERS } from './controllers';
import { RESTORE_PASSWORD_SERVICES } from './services';

import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: '',
          pass: '',
        },
      },
    }),
  ],
  providers: [...RESTORE_PASSWORD_SERVICES],
  controllers: [...RESET_PASSWORD_CONTROLLERS],
})
export class ResetPasswordModule {}
