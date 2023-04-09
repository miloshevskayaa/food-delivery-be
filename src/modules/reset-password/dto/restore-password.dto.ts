import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RestorePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'u9kl80' })
  otp: string;
}
