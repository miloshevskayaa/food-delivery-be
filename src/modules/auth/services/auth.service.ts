import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@shared/user';

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UserService, private readonly _jwtService: JwtService) {}

  async login(email: string, plainTextPassword: string) {
    const user = await this._userService.getAuthenticatedUser(email, plainTextPassword);
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      token: this._jwtService.sign(payload),
    };
  }
}
