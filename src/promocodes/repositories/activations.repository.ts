import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Activation, Prisma } from '@prisma/client';

@Injectable()
export class ActivationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ActivationCreateInput): Promise<Activation> {
    return this.prisma.activation.create({
      data,
    });
  }

  async findByEmailAndPromocodeId(
    email: string,
    promocodeId: string,
  ): Promise<Activation | null> {
    return this.prisma.activation.findUnique({
      where: {
        email_promocodeId: {
          email,
          promocodeId,
        },
      },
    });
  }
}
