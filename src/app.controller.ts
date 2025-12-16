import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // GET /users - Get all users
  @Get()
  async findAll() {
    return this.appService.findAllUsers();
  }

  // GET /users/:id - Get user by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findUserById(id);
  }

  // POST /users - Create new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  // PUT /users/:id - Update user
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.appService.updateUser(id, updateUserDto);
  }

  // DELETE /users/:id - Delete user
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteUser(id);
  }
}
