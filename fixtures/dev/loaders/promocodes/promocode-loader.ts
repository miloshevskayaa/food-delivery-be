import { Promocode } from '@entities/promocode';
import { PROMOCODES_FIXTURES } from '@fixtures/dev/data/promocodes';
import { EnvironmentType } from '@models/enum';

// eslint-disable-next-line no-restricted-imports
import { AbstractLoader, IRelationsOptions } from '../../../abstract-loader';

export class PromocodeLoader extends AbstractLoader<Promocode> {
  entity: new () => Promocode = Promocode;

  data: Partial<Promocode>[] = PROMOCODES_FIXTURES;

  environments: EnvironmentType[] = [EnvironmentType.Development];

  relations: IRelationsOptions[] = [];
}
