import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '' })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'passDanik' })
  password: string;
}
