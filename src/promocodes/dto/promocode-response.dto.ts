import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PromocodeResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'SUMMER2026' })
  @Expose()
  code: string;

  @ApiProperty({ example: 25 })
  @Expose()
  discount: number;

  @ApiProperty({ example: 100 })
  @Expose()
  maxUsages: number;

  @ApiProperty({ example: '2026-12-31T23:59:59.000Z' })
  @Expose()
  expiresAt: Date;

  @ApiProperty({ example: '2026-03-28T10:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2026-03-28T10:00:00.000Z' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ example: 5, description: 'Текущее количество активаций' })
  @Expose()
  @Type(() => Number)
  get currentUsages(): number {
    return this.activations?.length || 0;
  }

  activations?: any[];
}
