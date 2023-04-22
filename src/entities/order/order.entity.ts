import { Entity, ManyToOne, OneToMany } from 'typeorm';

import { OrderDishes } from '@entities/order_dishes';
import { Promocode } from '@entities/promocode';
import { User } from '@entities/user';

import { BaseEntity } from '../common';

@Entity('order')
export class Order extends BaseEntity {
  @ManyToOne(() => Promocode, (promocode: Promocode) => promocode.id)
  promocode: Promocode;

  @ManyToOne(() => User, (user: User) => user.order)
  user: User;

  @OneToMany(() => OrderDishes, (orderDishes: OrderDishes) => orderDishes.order)
  orderDishes: OrderDishes[];
}
