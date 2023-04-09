import { Category } from '@entities/categories';
import { CATEGORIES_FIXTURES } from '@fixtures/dev/data/categories';
import { EnvironmentType } from '@models/enum';

// eslint-disable-next-line no-restricted-imports
import { AbstractLoader, IRelationsOptions } from '../../../abstract-loader';

export class CategoryLoader extends AbstractLoader<Category> {
  entity: new () => Category = Category;

  data: Partial<Category>[] = CATEGORIES_FIXTURES;

  environments: EnvironmentType[] = [EnvironmentType.Development];

  relations: IRelationsOptions[] = [];
}
