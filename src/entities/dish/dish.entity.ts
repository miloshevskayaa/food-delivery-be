import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { Category } from '@entities/categories';
import { OrderDishes } from '@entities/order_dishes';
import { User } from '@entities/user';

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

  @ManyToMany(() => User, (user: User) => user.favorite)
  user: User[];

  @OneToMany(() => OrderDishes, (orderDishes: OrderDishes) => orderDishes.dish)
  orderDishes: OrderDishes[];
}
