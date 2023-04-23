import { Column, Entity, ManyToOne } from 'typeorm';

import { Promocode } from '@entities/promocode';
import { User } from '@entities/user';

import { BaseEntity } from '../common';

@Entity('order')
export class Order extends BaseEntity {
  @ManyToOne(() => Promocode, (promocode: Promocode) => promocode.id)
  promocode: Promocode;

  @ManyToOne(() => User, (user: User) => user.orderUser)
  user: User;

  @ManyToOne(() => User, (user: User) => user.orderCourier)
  courier: User;

  @Column({
    type: 'smallint',
    name: 'time',
  })
  time: number;

  @Column({
    type: 'timestamp',
    name: 'deliveryTime',
  })
  deliveryTime: Date;

  @Column({
    type: 'varchar',
    name: 'address',
    length: 255,
  })
  address: string;

  @Column({
    type: 'float',
    name: 'total_price',
  })
  totalPrice: number;
}
