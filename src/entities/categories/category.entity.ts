import { Column, Entity, OneToMany } from 'typeorm';

import { Dish } from '@entities/dish';

import { BaseEntity } from '../common';

@Entity('category')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @OneToMany(() => Dish, (dish: Dish) => dish.category)
  dish: Dish[];
}
