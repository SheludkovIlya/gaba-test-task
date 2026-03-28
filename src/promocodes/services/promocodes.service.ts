import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PromocodesRepository } from '../repositories/promocodes.repository';
import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { ActivatePromocodeDto } from '../dto/activate-promocode.dto';
import { Promocode, Activation } from '@prisma/client';

@Injectable()
export class PromocodesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly promocodesRepository: PromocodesRepository,
  ) {}

  async create(dto: CreatePromocodeDto): Promise<Promocode> {
    const existingPromocode = await this.promocodesRepository.findByCode(
      dto.code,
    );

    if (existingPromocode) {
      throw new ConflictException(
        `Promocode with code "${dto.code}" already exists`,
      );
    }

    const expiresAt = new Date(dto.expiresAt);
    if (expiresAt <= new Date()) {
      throw new BadRequestException('Expiration date must be in the future');
    }

    return this.promocodesRepository.create({
      code: dto.code,
      discount: dto.discount,
      maxUsages: dto.maxUsages,
      expiresAt,
    });
  }

  async findAll(): Promise<Promocode[]> {
    return this.promocodesRepository.findAll();
  }

  async findById(id: string): Promise<Promocode> {
    const promocode = await this.promocodesRepository.findById(id);

    if (!promocode) {
      throw new NotFoundException(`Promocode with ID "${id}" not found`);
    }

    return promocode;
  }

  async activate(dto: ActivatePromocodeDto): Promise<Activation> {
    return this.prisma.$transaction(async (tx) => {
      const promocode = await this.promocodesRepository.findByCodeWithLock(
        dto.code,
        tx,
      );

      if (!promocode) {
        throw new NotFoundException(
          `Promocode with code "${dto.code}" not found`,
        );
      }

      if (promocode.expiresAt < new Date()) {
        throw new BadRequestException('Promocode has expired');
      }

      const existingActivation = await tx.activation.findUnique({
        where: {
          email_promocodeId: {
            email: dto.email,
            promocodeId: promocode.id,
          },
        },
      });

      if (existingActivation) {
        throw new ConflictException(
          'This email has already activated this promocode',
        );
      }

      const activationsCount = await tx.activation.count({
        where: { promocodeId: promocode.id },
      });

      if (activationsCount >= promocode.maxUsages) {
        throw new BadRequestException(
          'Promocode has reached its activation limit',
        );
      }

      return tx.activation.create({
        data: {
          email: dto.email,
          promocodeId: promocode.id,
        },
      });
    });
  }
}
