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

  async getDishes(categoryId: string): Promise<any> {
    const dishes = await this._dishRepository
      .createQueryBuilder('dish')
      .leftJoinAndSelect('dish.category', 'category')
      .where('category.id = :id', { id: categoryId })
      .getMany();

    return dishes;
  }
}
