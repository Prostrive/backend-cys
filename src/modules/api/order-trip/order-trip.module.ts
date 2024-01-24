import { Module } from '@nestjs/common';
import { OrderTripService } from './order-trip.service';
import { OrderTripController } from './order-trip.controller';

@Module({
  controllers: [OrderTripController],
  providers: [OrderTripService],
  exports: [OrderTripService],
})
export class OrderTripModule {}
