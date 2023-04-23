import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Role } from '@models/enum';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1' })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Danik' })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'images/users/default.jpg' })
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'moskaluk@mail.ru' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+375298905765' })
  phoneNumber: string;

  @IsString()
  @ApiProperty({ example: 'Bratskaya 2' })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: Role.User })
  role: Role;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'passDanik' })
  password: string;
}
