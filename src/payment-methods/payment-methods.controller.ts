import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethodsService } from './payment-methods.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('payment-methods')
@UseGuards(JwtAuthGuard)
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodsService.create(request.user.id, createPaymentMethodDto);
  }

  @Get('me')
  findMine(@Req() request: AuthenticatedRequest) {
    return this.paymentMethodsService.findForUser(request.user.id);
  }

  @Put(':id')
  update(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodsService.update(request.user.id, id, updatePaymentMethodDto);
  }

  @Delete(':id')
  remove(@Req() request: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodsService.remove(request.user.id, id);
  }
}
