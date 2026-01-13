import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { UpdateArtikelDto } from './dto/update-artikel.dto';

@Controller('artikel')
export class ArtikelController {
  constructor(private readonly artikelService: ArtikelService) {}

  @Post()
  create(@Body() createArtikelDto: CreateArtikelDto) {
    return this.artikelService.create(createArtikelDto);
  }

  @Get()
  findAll() {
    return this.artikelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.artikelService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtikelDto: UpdateArtikelDto,
  ) {
    return this.artikelService.update(id, updateArtikelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.artikelService.remove(id);
  }
}
