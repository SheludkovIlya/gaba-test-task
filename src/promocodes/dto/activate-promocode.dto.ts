import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivatePromocodeDto {
  @ApiProperty({
    description: 'Код промокода',
    example: 'SUMMER2026',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  code: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}
