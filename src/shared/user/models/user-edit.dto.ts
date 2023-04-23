import { ApiProperty, OmitType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class UserEditDto extends OmitType(UserDto, ['role', 'userId', 'address', 'password']) {
  @ApiProperty({ example: 'passDanik' })
  password: string;
}
