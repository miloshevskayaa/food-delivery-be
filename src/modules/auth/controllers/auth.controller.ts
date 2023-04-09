import { Body, Get, Post, Request } from '@nestjs/common';

import { IsAuthenticated } from '@shared/user';

import { AuthController as Controller } from '../decorators';
import { UserLoginDto } from '../dto';
import { AuthService } from '../services';
@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: UserLoginDto) {
    return this._authService.login(email, password);
  }

  @IsAuthenticated()
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
