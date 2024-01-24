import { Module } from '@nestjs/common';
import { CustomerPaymentService } from './customer-payment.service';
import { CustomerPaymentController } from './customer-payment.controller';

@Module({
  controllers: [CustomerPaymentController],
  providers: [CustomerPaymentService],
})
export class CustomerPaymentModule {}
