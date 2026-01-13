import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { UpdateArtikelDto } from './dto/update-artikel.dto';

@Injectable()
export class ArtikelService {
  constructor(private prisma: PrismaService) {}

  async create(createArtikelDto: CreateArtikelDto) {
    return this.prisma.artikel.create({
      data: createArtikelDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.artikel.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const artikel = await this.prisma.artikel.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!artikel) {
      throw new NotFoundException(`Artikel with ID ${id} not found`);
    }

    return artikel;
  }

  async update(id: number, updateArtikelDto: UpdateArtikelDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.artikel.update({
      where: { id },
      data: updateArtikelDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.artikel.delete({
      where: { id },
    });
  }
}
