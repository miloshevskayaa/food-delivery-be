import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '@entities/favorites';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private _favoriteRepository: Repository<Favorite>,
  ) {}

  async getFavorites(userId: string): Promise<any> {
    const favorites = await this._favoriteRepository
      .createQueryBuilder('user_favorite_dishes')
      .leftJoinAndSelect('user_favorite_dishes.dish', 'dish')
      .leftJoin('user_favorite_dishes.user', 'user')
      .where('user.id = :id', { id: userId });

    return favorites.getMany();
  }

  async createFavorite(userId: string, dishId: string) {
    if (!userId || !dishId) {
      throw new BadRequestException('Nou full data');
    }

    await this._favoriteRepository.save({ user: { id: userId }, dish: { id: dishId } });
  }

  async removeFavorite(userId: string, dishId: string) {
    console.log(userId);
    console.log(dishId);
    const favorite = await this._favoriteRepository
      .createQueryBuilder('user_favorite_dishes')
      .leftJoinAndSelect('user_favorite_dishes.dish', 'dish')
      .leftJoin('user_favorite_dishes.user', 'user')
      .where('user.id = :userid', { userid: userId })
      .andWhere('dish.id = :dishid', { dishid: dishId })
      .getOne();

    await this._favoriteRepository.delete(favorite.id);
  }
}
