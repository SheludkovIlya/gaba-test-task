import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Promocode, Prisma } from '@prisma/client';

@Injectable()
export class PromocodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PromocodeCreateInput): Promise<Promocode> {
    return this.prisma.promocode.create({
      data,
      include: {
        activations: true,
      },
    });
  }

  async findAll(): Promise<Promocode[]> {
    return this.prisma.promocode.findMany({
      include: {
        activations: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Promocode | null> {
    return this.prisma.promocode.findUnique({
      where: { id },
      include: {
        activations: true,
      },
    });
  }

  async findByCode(code: string): Promise<Promocode | null> {
    return this.prisma.promocode.findUnique({
      where: { code },
      include: {
        activations: true,
      },
    });
  }

  async countActivations(promocodeId: string): Promise<number> {
    return this.prisma.activation.count({
      where: { promocodeId },
    });
  }

  async findByCodeWithLock(
    code: string,
    tx: Prisma.TransactionClient,
  ): Promise<Promocode | null> {
    // Блокируем промокод через SELECT FOR UPDATE
    const [rawPromocode] = await tx.$queryRaw<
      Array<{
        id: string;
        code: string;
        discount: number;
        max_usages: number;
        expires_at: Date;
        created_at: Date;
        updated_at: Date;
      }>
    >`
      SELECT * FROM promocodes
      WHERE code = ${code}
      FOR UPDATE
    `;

    if (!rawPromocode) {
      return null;
    }

    return {
      id: rawPromocode.id,
      code: rawPromocode.code,
      discount: rawPromocode.discount,
      maxUsages: rawPromocode.max_usages,
      expiresAt: rawPromocode.expires_at,
      createdAt: rawPromocode.created_at,
      updatedAt: rawPromocode.updated_at,
    };
  }
}
