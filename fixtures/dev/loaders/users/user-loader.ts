import { User } from '@entities/user';
import { EnvironmentType } from '@models/enum';

// eslint-disable-next-line no-restricted-imports
import { AbstractLoader, IRelationsOptions } from '../../../abstract-loader';
import { USERS_FIXTURES } from '../../data/users';

export class UserLoader extends AbstractLoader<User> {
  entity: new () => User = User;

  data: Partial<User>[] = USERS_FIXTURES;

  environments: EnvironmentType[] = [EnvironmentType.Development];

  relations: IRelationsOptions[] = [];
}
