import { CategoryLoader } from './categories';
import { DishLoader } from './dishes';
import { PromocodeLoader } from './promocodes';
import { UserLoader } from './users';

export const DEV_LOADERS = [PromocodeLoader, CategoryLoader, DishLoader, UserLoader];
