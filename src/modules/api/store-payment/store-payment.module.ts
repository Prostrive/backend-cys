import { Module } from '@nestjs/common';
import { StorePaymentController } from './store-payment.controller';
import { StoreOrderPaymentService } from './store-payment.service';

@Module({
  controllers: [StorePaymentController],
  providers: [StoreOrderPaymentService],
})
export class StorePaymentModule {}
