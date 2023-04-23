import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';
import { DishModule } from './dishes/dish.module';
import { FavoriteModule } from './favorites/favorite.module';
import { OrderModule } from './order/order.module';
import { PromocodeModule } from './promocodes/promocode.module';
import { CreateModule } from './registration/create.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { UpdateModule } from './update/update.module';

export const APP_MODULES = [
  DishModule,
  AuthModule,
  UpdateModule,
  CreateModule,
  ResetPasswordModule,
  CategoryModule,
  FavoriteModule,
  OrderModule,
  PromocodeModule,
];
