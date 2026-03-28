import { Module } from '@nestjs/common';
import { PromocodesController } from './controllers/promocodes.controller';
import { PromocodesService } from './services/promocodes.service';
import { PromocodesRepository } from './repositories/promocodes.repository';
import { ActivationsRepository } from './repositories/activations.repository';

@Module({
  controllers: [PromocodesController],
  providers: [
    PromocodesService,
    PromocodesRepository,
    ActivationsRepository,
  ],
})
export class PromocodesModule {}
