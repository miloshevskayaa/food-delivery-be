import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Promocode } from '@entities/promocode';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(Promocode)
    private _promocodeRepository: Repository<Promocode>,
  ) {}

  async comparePromocodes(promocode: string) {
    const promocodes = await this._promocodeRepository.createQueryBuilder('promocode').getMany();

    const existedPromocode = promocodes.find((item: any) => item.name === promocode);

    if (existedPromocode) {
      return existedPromocode;
    }

    throw new BadRequestException('Wrong promocode');
  }
}
