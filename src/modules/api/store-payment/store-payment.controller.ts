import { Body, Controller, Post } from '@nestjs/common';
import { StorePaymentDto } from './dto/store-payment-dto';

import { StoreOrderPaymentService } from './store-payment.service';

@Controller('store-payment')
export class StorePaymentController {
  constructor(
    private readonly storeOrderPaymentService: StoreOrderPaymentService,
  ) {}

  @Post()
  createStorePayment(@Body() storePaymentDto: StorePaymentDto) {
    return this.storeOrderPaymentService.createStoreOrderPayment(
      storePaymentDto,
    );
  }
}
