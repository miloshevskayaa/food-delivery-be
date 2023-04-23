import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@entities/user';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User> {
    const user = await this._findOneByEmail(email);

    await this._verifyPassword(plainTextPassword, user.password);
    delete user.password;

    return user;
  }

  private async _verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong password');
    }
  }

  async _findOneByEmail(inputEmail: string): Promise<User | undefined> {
    const user = await this._userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.userName', 'user.email', 'user.password'])
      .where('user.email = :inputEmail', { inputEmail })
      .getOne();

    if (user) {
      return user;
    }

    console.log(user);

    throw new BadRequestException('Wrong email');
  }

  async _getUserById(inputId: any): Promise<User> {
    const user = this._userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.userId',
        'user.avatar',
        'user.userName',
        'user.email',
        'user.phoneNumber',
        'user.address',
        'user.role',
        'user.password',
      ])
      .where('user.id = :id', { id: inputId })
      .getOne();

    return user;
  }
}
