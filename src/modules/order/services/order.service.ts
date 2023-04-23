import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '@entities/order';
import { User } from '@entities/user';
import { Role } from '@models/enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private _orderRepository: Repository<Order>,
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async createOrder(userId: string, promocodeId: string, totalPrice: number, time: number, address: string) {
    const randomCourier = await this._getRandomCourier();

    const deliveryTime = new Date();

    deliveryTime.setSeconds(deliveryTime.getSeconds() + time * 60);

    await this._orderRepository.save({
      user: { id: userId },
      promocode: { id: promocodeId },
      totalPrice: totalPrice,
      courier: { id: randomCourier.id },
      time: time,
      deliveryTime: deliveryTime,
      address: address,
    });
  }

  async getOrdersByUser(userId: string): Promise<any> {
    const orders = await this._orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.courier', 'courier')
      .leftJoinAndSelect('order.promocode', 'promocode')
      .where('user.id = :id', { id: userId });

    return orders.getMany();
  }

  async _getRandomCourier(): Promise<User> {
    const couriers = await this._userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: Role.Courier })
      .getMany();

    const indexRandomCourier = Math.floor(Math.random() * couriers.length);
    const randomCourier = couriers[indexRandomCourier];

    return randomCourier;
  }
}
