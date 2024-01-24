import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  CreateOrderWithoutStripeDto,
} from './dto/create-order.dto';
import { Language, Status } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Query('language') language?: Language,
  ) {
    return this.orderService.create(createOrderDto, language || Language.en);
  }

  @Post('cys-credit')
  createOrderCYSCredit(
    @Body() createOrderWithoutStripeDto: CreateOrderWithoutStripeDto,
    @Query('language') language?: Language,
  ) {
    return this.orderService.createWithoutStripePayment(
      createOrderWithoutStripeDto,
      language || Language.en,
    );
  }

  @Get('all/:customerId')
  findAllByCustomer(@Param('customerId') customerId: string) {
    return this.orderService.findAllByCustomer(customerId);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('language') language?: Language) {
    return this.orderService.findOneOrderWithCompleteDetails(
      id,
      language || Language.en,
    );
  }

  @Put('status/picking/:id')
  updateStatusToPicking(@Param('id') id: string) {
    return this.orderService.updateOrderStatus(id, Status.picking);
  }

  @Put('status/picked/:id')
  updateStatusToPicked(@Param('id') id: string) {
    return this.orderService.updateOrderStatus(id, Status.picked);
  }

  @Put('status/delivery/:id')
  updateStatusToDelivery(@Param('id') id: string) {
    return this.orderService.updateStatusToDeliveryWithOrderTrip(id);
  }

  @Put('status/completed/:id')
  updateStatusToCompleted(@Param('id') id: string) {
    return this.orderService.updateOrderStatusToCompleted(id);
  }

  @Get('review/pending/:customerId')
  getPendingCompletedOrderWithoutReview(
    @Param('customerId') customerId: string,
  ) {
    return this.orderService.findPendingOrderReviews(customerId);
  }
}
