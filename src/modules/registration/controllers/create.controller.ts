import { Body, Post } from '@nestjs/common';

import { CreateController as Controller } from '../decorators';
import { UserRegisterDto } from '../dto';
import { CreateService } from '../services';

@Controller()
export class CreateController {
  constructor(private readonly _createService: CreateService) {}

  @Post()
  async register(@Body() user: UserRegisterDto) {
    return this._createService.createUser(user);
  }
}
