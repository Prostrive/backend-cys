import { Module } from '@nestjs/common';
import { OrderReviewService } from './order-review.service';
import { OrderReviewController } from './order-review.controller';

@Module({
  controllers: [OrderReviewController],
  providers: [OrderReviewService],
  exports: [OrderReviewService],
})
export class OrderReviewModule {}
