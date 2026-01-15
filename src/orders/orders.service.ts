import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const items: Prisma.JsonArray = createOrderDto.items.map((item) => ({
      title: item.title,
      price: item.price,
      qty: item.qty,
    }));

    return this.prisma.order.create({
      data: {
        userId,
        items,
        total: createOrderDto.total,
      },
    });
  }

  async findForUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
