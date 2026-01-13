import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ArtikelController],
  providers: [ArtikelService, PrismaService],
})
export class ArtikelModule {}
