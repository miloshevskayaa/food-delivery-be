import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'passDanik' })
  password: string;
}
