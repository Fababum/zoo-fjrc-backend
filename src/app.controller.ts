import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async findAll() {
    return this.appService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.appService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteUser(id);
  }
}

