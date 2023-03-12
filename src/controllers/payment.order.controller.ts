import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { PaymentOrder } from '../models/payment.order.model';
import { PaymentOrderService } from '../services/payment.order.service';
import { IPaymentOrderController } from './interfaces/payment.order.controller.interface';

@Controller()
export class PaymentOrderController implements IPaymentOrderController {
  constructor(private readonly paymentOrderService: PaymentOrderService) {}

  @Post()
  @ApiBody({ type: PaymentOrder })
  createPaymentOrder(@Body() body: PaymentOrder): number {
    return this.paymentOrderService.createPaymentOrder(body.value, body.secret);
  }

  @Get()
  getPaymentOrders(): PaymentOrder[] {
    return this.paymentOrderService.getPaymentOrders();
  }
}
