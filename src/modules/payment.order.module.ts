import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentOrderController } from '../controllers/payment.order.controller';
import { PaymentOrderService } from '../services/payment.order.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentOrderController],
  providers: [PaymentOrderService],
})
export class PaymentOrderModule {}
