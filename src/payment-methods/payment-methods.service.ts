import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.prisma.paymentMethod.create({
      data: {
        userId,
        ...createPaymentMethodDto,
      },
    });
  }

  async findForUser(userId: number) {
    return this.prisma.paymentMethod.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(userId: number, id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const paymentMethod = await this.prisma.paymentMethod.findFirst({
      where: { id, userId },
    });

    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    return this.prisma.paymentMethod.update({
      where: { id },
      data: updatePaymentMethodDto,
    });
  }

  async remove(userId: number, id: number) {
    const paymentMethod = await this.prisma.paymentMethod.findFirst({
      where: { id, userId },
    });

    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
