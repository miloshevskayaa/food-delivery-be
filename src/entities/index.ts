import { Category } from './categories';
import { Dish } from './dish';
import { Order } from './order';
import { OrderDishes } from './order_dishes';
import { OneTimePassword } from './otp';
import { Promocode } from './promocode';
import { User } from './user';

export const ENTITIES = [Promocode, User, Dish, Order, OrderDishes, OneTimePassword, Category];

export const SUBSCRIBERS = [];
