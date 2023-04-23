import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '@entities/favorites';
import { CategoryService } from '@modules/categories/services';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private _favoriteRepository: Repository<Favorite>,
    private readonly _categoryService: CategoryService,
  ) {}

  async getFavorites(userId: string, categoryId: string, search: string): Promise<any> {
    const favorites = await this._favoriteRepository
      .createQueryBuilder('user_favorite_dishes')
      .leftJoinAndSelect('user_favorite_dishes.dish', 'dish')
      .leftJoinAndSelect('user_favorite_dishes.category', 'category')
      .leftJoinAndSelect('user_favorite_dishes.user', 'user')
      .where('user.id = :id', { id: userId });

    categoryId ? favorites.where('category.id = :id', { id: categoryId }) : favorites;

    search ? favorites.where('dish.title ilike :search', { search: `%${search}%` }) : favorites;

    return favorites.getMany();
  }

  async createFavorite(userId: string, dishId: string) {
    if (!userId || !dishId) {
      throw new BadRequestException('Nou full data');
    }

    const category = await this._categoryService.getCategory(dishId);

    await this._favoriteRepository.save({ user: { id: userId }, dish: { id: dishId }, category: { id: category.id } });
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
