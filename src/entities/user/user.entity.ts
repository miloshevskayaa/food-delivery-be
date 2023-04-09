import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { Dish } from '@entities/dish';
import { Order } from '@entities/order';
import { Role } from '@models/enum';

import { BaseEntity } from '../common';

@Entity('user')
export class User extends BaseEntity {
  @Column({
    type: 'smallint',
    name: 'user_id',
    unique: true,
  })
  userId: number;

  @Column({
    type: 'varchar',
    name: 'avatar',
    length: 64,
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    name: 'user_name',
    length: 40,
  })
  userName: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 40,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 40,
    unique: true,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    name: 'address',
    length: 255,
    nullable: true,
  })
  address: string;

  @Column({
    type: 'json',
    name: 'role',
  })
  role: Role;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 72,
    select: false,
  })
  password: string;

  @ManyToMany(() => Dish, (dish: Dish) => dish.user)
  @JoinTable()
  favorite: Dish[];

  @OneToMany(() => Order, (order: Order) => order.user)
  order: Order[];
}
