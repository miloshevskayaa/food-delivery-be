import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Config } from '@core/config';
import { User } from '@entities/user';
import { UserEditDto } from '@shared/user/models';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async updateUser(id: string, { password: plainPassword, ...userData }: UserEditDto) {
    if (plainPassword) {
      const password = await bcrypt.hash(plainPassword, +Config.get.hashSalt);

      await this._userRepository.update(id, { ...userData, password });
    } else {
      await this._userRepository.update(id, { ...userData });
    }
  }
}
