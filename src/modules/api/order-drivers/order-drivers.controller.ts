import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDriversService } from './order-drivers.service';
import { CreateOrderDriverDto } from './dto/create-order-driver.dto';
import { UpdateOrderDriverDto } from './dto/update-order-driver.dto';

@Controller('order-drivers')
export class OrderDriversController {
  constructor(private readonly orderDriversService: OrderDriversService) {}

  @Post()
  create(@Body() createOrderDriverDto: CreateOrderDriverDto) {
    return this.orderDriversService.create(createOrderDriverDto);
  }

  @Get()
  findAll() {
    return this.orderDriversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDriversService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDriverDto: UpdateOrderDriverDto,
  ) {
    return this.orderDriversService.update(id, updateOrderDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDriversService.remove(id);
  }
}
