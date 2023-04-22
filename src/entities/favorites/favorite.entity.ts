import { Entity, ManyToOne } from 'typeorm';

import { Dish } from '@entities/dish';
import { User } from '@entities/user';

import { BaseEntity } from '../common';

@Entity('user_favorite_dishes')
export class Favorite extends BaseEntity {
  @ManyToOne(() => Dish, (dish: Dish) => dish.id)
  dish: Dish;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;
}
