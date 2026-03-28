import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PromocodesModule } from './promocodes/promocodes.module';

@Module({
  imports: [PrismaModule, PromocodesModule],
})
export class AppModule {}
