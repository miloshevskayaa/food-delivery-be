import { Column, Entity, OneToMany } from 'typeorm';

import { Order } from '@entities/order/order.entity';

import { BaseEntity } from '../common';

@Entity('promocode')
export class Promocode extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'smallint',
    name: 'discount',
  })
  discount: number;

  @OneToMany(() => Order, (order: Order) => order.promocode)
  order: Order[];
}
