import { Column, Entity, ManyToOne } from 'typeorm';

import { Category } from '@entities/categories';

import { BaseEntity } from '../common';

@Entity('dish')
export class Dish extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @ManyToOne(() => Category, (category: Category) => category.dish)
  category: Category;

  @Column({
    type: 'varchar',
    name: 'image',
    length: 64,
  })
  image: string;

  @Column({
    type: 'varchar',
    name: 'caption',
    length: 255,
  })
  caption: string;

  @Column({
    type: 'float',
    name: 'price',
  })
  price: number;

  @Column({
    type: 'float',
    name: 'rating',
  })
  rating: number;

  @Column({
    type: 'smallint',
    name: 'delivery_time',
  })
  deliveryTime: number;

  @Column({
    type: 'varchar',
    name: 'description',
    length: 255,
  })
  description: string;
}
