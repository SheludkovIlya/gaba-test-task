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
}
