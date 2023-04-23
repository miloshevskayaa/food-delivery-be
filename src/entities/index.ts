import { Category } from './categories';
import { Dish } from './dish';
import { Favorite } from './favorites';
import { Order } from './order';
import { OneTimePassword } from './otp';
import { Promocode } from './promocode';
import { User } from './user';

export const ENTITIES = [Promocode, User, Dish, Order, OneTimePassword, Category, Favorite];

export const SUBSCRIBERS = [];
