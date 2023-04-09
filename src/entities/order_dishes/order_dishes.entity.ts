import { Column, Entity, ManyToOne } from 'typeorm';

import { Dish } from '@entities/dish';
import { Order } from '@entities/order';

import { BaseEntity } from '../common';

@Entity('order_dishes')
export class OrderDishes extends BaseEntity {
  @ManyToOne(() => Dish, (dish: Dish) => dish.id)
  dish: Dish;

  @Column({
    type: 'smallint',
    name: 'count',
  })
  count: number;

  @ManyToOne(() => Order, (order: Order) => order.id)
  order: Order;
}
