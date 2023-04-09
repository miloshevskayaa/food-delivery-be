import { AuthModule } from './auth/auth.module';
import { DishModule } from './dishes/dish.module';
import { CreateModule } from './registration/create.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { UpdateModule } from './update/update.module';

export const APP_MODULES = [DishModule, AuthModule, UpdateModule, CreateModule, ResetPasswordModule];
