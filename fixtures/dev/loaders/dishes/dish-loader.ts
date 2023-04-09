import { DeepPartial } from 'typeorm';

import { Dish } from '@entities/dish';
import { DISHES_FIXTURES } from '@fixtures/dev/data/dishes';
import { EnvironmentType } from '@models/enum';

// eslint-disable-next-line no-restricted-imports
import { AbstractLoader, IRelationsOptions } from '../../../abstract-loader';

export class DishLoader extends AbstractLoader<Dish> {
  entity: new () => Dish = Dish;

  data: DeepPartial<Dish>[] = DISHES_FIXTURES;

  environments: EnvironmentType[] = [EnvironmentType.Development];

  relations: IRelationsOptions[] = [];
}
