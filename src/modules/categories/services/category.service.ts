import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '@entities/categories';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this._categoryRepository.createQueryBuilder('category').getMany();

    return categories;
  }

  async getCategory(dishId: string): Promise<Category> {
    const category = await this._categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.dish', 'dish')
      .where('dish.id = :id', { id: dishId })
      .getOne();

    return category;
  }
}
