import { Module } from '@nestjs/common';
import { CustomerRefundService } from './customer-refund.service';
import { CustomerRefundController } from './customer-refund.controller';

@Module({
  controllers: [CustomerRefundController],
  providers: [CustomerRefundService],
})
export class CustomerRefundModule {}
