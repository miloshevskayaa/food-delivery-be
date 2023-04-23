import { Get, Query } from '@nestjs/common';

import { PromocodeController as Controller } from '../decorators';
import { PromocodeService } from '../services';

@Controller()
export class PromocodeController {
  constructor(private readonly _promocodeService: PromocodeService) {}

  @Get()
  async comparePromocodes(@Query() { promocode }: any) {
    console.log(promocode);

    return this._promocodeService.comparePromocodes(promocode);
  }
}
