import { Body, Controller, Post } from '@nestjs/common';
import { Param, Put } from '@nestjs/common/decorators';
import { Status } from '@prisma/client';
import { CustomerPaymentDto } from './dto/customer-payment-dto';

import { CustomerPaymentService } from './customer-payment.service';

@Controller('customer-payment')
export class CustomerPaymentController {
  constructor(
    private readonly customerPaymentService: CustomerPaymentService,
  ) {}

  @Post()
  createCustomerPayment(@Body() createOrderDto: CustomerPaymentDto) {
    return this.customerPaymentService.createCustomerPayment(createOrderDto);
  }

  @Put(':id')
  updateStatus(@Param('id') id: string, @Body() status: Status) {
    return this.customerPaymentService.updateStatus(id, status);
  }
}
