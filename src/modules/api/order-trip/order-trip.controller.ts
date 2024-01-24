import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderTripService } from './order-trip.service';

@Controller('order-trip')
export class OrderTripController {
  constructor(private readonly orderTripService: OrderTripService) {}

  @Post(':orderId')
  create(@Param('orderId') orderId: string) {
    return this.orderTripService.create(orderId);
  }

  @Get()
  findAll() {
    return this.orderTripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTripService.findOne(+id);
  }

  /** This endpoint will be called when the driver picked up all order
   *
   * @param id
   * @returns order trip with the updated pickupTimestamp
   */
  @Put('pickup-time/:id')
  updatePickupTimestamp(@Param('id') id: string) {
    return this.orderTripService.update(id, { pickupTimestamp: new Date() });
  }

  /** This endpoint will be called when the driver delivered the order
   *
   * @param id
   * @returns order trip with the updated deliverTimestamp
   */
  @Put('delivered-time/:id')
  updateDeliveredTimestamp(@Param('id') id: string) {
    return this.orderTripService.update(id, { deliveredTimestamp: new Date() });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTripService.remove(id);
  }
}
