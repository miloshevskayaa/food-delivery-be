import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dish } from '@entities/dish';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private _dishRepository: Repository<Dish>,
  ) {}

  async getDishes(categoryId: string, search: string): Promise<any> {
    const dishes = await this._dishRepository.createQueryBuilder('dish').leftJoinAndSelect('dish.category', 'category');

    categoryId ? dishes.where('category.id = :id', { id: categoryId }) : dishes;

    search ? dishes.where('dish.title ilike :search', { search: `%${search}%` }) : dishes;

    return dishes.getMany();
  }

  async getDish(dishId: string): Promise<any> {
    const dish = await this._dishRepository.createQueryBuilder('dish').where('dish.id = :id', { id: dishId }).getOne();

    return dish;
  }
}
