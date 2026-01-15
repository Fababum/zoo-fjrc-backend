import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(request.user.id, createOrderDto);
  }

  @Get('me')
  findMine(@Req() request: AuthenticatedRequest) {
    return this.ordersService.findForUser(request.user.id);
  }
}
