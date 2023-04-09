import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '@core/config';
import { User } from '@entities/user';

import { AUTH_CONTROLLERS } from './controllers';
import { JwtStrategy } from './models';
import { AUTH_SERVICES } from './services';

@Module({
  imports: [
    JwtModule.register({
      privateKey: Config.get.keyPem,
      publicKey: Config.get.keyPub,
      signOptions: {
        algorithm: 'RS256',
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [...AUTH_CONTROLLERS],
  providers: [...AUTH_SERVICES, JwtStrategy, PassportModule],
})
export class AuthModule {}
