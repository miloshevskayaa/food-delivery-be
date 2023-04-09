import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Config } from '@core/config';
import { User } from '@entities/user';
import { Role } from '@models/enum';

import { UserRegisterDto } from '../dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async createUser({ password: plainPassword, ...userData }: UserRegisterDto) {
    try {
      const password = await bcrypt.hash(plainPassword, +Config.get.hashSalt);
      const role = Role.User;
      const avatar = 'images/users/default.jpg';
      const lastUserId = await this._getLastUserId();
      const userId = lastUserId + 1;

      const user = await this._userRepository.create({ ...userData, userId, password, role, avatar });

      await this._userRepository.save(user);

      delete user.password;

      return user;
    } catch (erorr) {
      throw new BadRequestException('user with that email already exists');
    }
  }

  private async _getLastUserId(): Promise<number> {
    const queryBuilder = this._userRepository
      .createQueryBuilder('user')
      .orderBy('user.userId', 'DESC')
      .select(['user.userId']);
    const { userId } = await queryBuilder.getOne();

    return userId;
  }
}
