import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerRefundService } from './customer-refund.service';
import { CreateCustomerRefundDto } from './dto/create-customer-refund.dto';
import { UpdateCustomerRefundDto } from './dto/update-customer-refund.dto';

@Controller('customer-refund')
export class CustomerRefundController {
  constructor(private readonly customerRefundService: CustomerRefundService) {}

  @Post()
  create(@Body() createCustomerRefundDto: CreateCustomerRefundDto) {
    return this.customerRefundService.create(createCustomerRefundDto);
  }

  @Get()
  findAll() {
    return this.customerRefundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerRefundService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerRefundDto: UpdateCustomerRefundDto,
  ) {
    return this.customerRefundService.update(id, updateCustomerRefundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerRefundService.remove(id);
  }
}
