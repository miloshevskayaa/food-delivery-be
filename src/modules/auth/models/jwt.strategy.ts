import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Config } from '@core/config';
import { UserService } from '@shared/user';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.get.keyPem,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    const user = await this._userService._getUserById(payload.sub);

    return {
      user,
    };
  }
}
