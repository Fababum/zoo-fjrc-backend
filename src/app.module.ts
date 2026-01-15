import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ArtikelModule } from './artikel/artikel.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ArtikelModule, OrdersModule, PaymentMethodsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
