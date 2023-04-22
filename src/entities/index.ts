import { Category } from './categories';
import { Dish } from './dish';
import { Favorite } from './favorites';
import { Order } from './order';
import { OrderDishes } from './order_dishes';
import { OneTimePassword } from './otp';
import { Promocode } from './promocode';
import { User } from './user';

export const ENTITIES = [Promocode, User, Dish, Order, OrderDishes, OneTimePassword, Category, Favorite];

export const SUBSCRIBERS = [];
