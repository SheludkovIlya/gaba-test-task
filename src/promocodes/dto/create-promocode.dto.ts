import { IsString, IsInt, Min, Max, IsDateString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromocodeDto {
  @ApiProperty({
    description: 'Уникальный код промокода',
    example: 'SUMMER2026',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  code: string;

  @ApiProperty({
    description: 'Размер скидки в процентах',
    example: 25,
    minimum: 1,
    maximum: 100,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  discount: number;

  @ApiProperty({
    description: 'Максимальное количество активаций',
    example: 100,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  maxUsages: number;

  @ApiProperty({
    description: 'Дата истечения срока действия',
    example: '2026-12-31T23:59:59Z',
  })
  @IsDateString()
  expiresAt: string;
}
