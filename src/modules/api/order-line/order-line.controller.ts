import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { CreateStoreOrderLineDto } from './dto/create-order-item.dto';
import {
  UpdateStatusOrderLineDto,
  UpdateOrderLineDto,
} from './dto/update-order-item.dto';
import { StoreGuard } from '../store/store.guard';
import { Language } from '@prisma/client';

@Controller('order-line')
export class OrderLineController {
  constructor(private readonly orderLineService: OrderLineService) {}

  @Post()
  create(
    @Body() createStoreOrderLineDto: CreateStoreOrderLineDto,
    @Query('language') language?: Language,
  ) {
    return this.orderLineService.create(createStoreOrderLineDto, Language.en);
  }

  @Get()
  findAll() {
    return this.orderLineService.findAll();
  }

  @UseGuards(StoreGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderLineService.findOne(id);
  }

  @UseGuards(StoreGuard)
  @Get('all/:id')
  findAllOrderLineByStoreOrder(@Param('id') id: string) {
    return this.orderLineService.findAllOrderLineByStoreOrder(id);
  }

  @UseGuards(StoreGuard)
  @Put('reject-order-line')
  updateStatusToRejected(
    @Body() rejectedOrderLineDto: UpdateStatusOrderLineDto,
    @Req() request: Request,
  ) {
    const storeId = request['storeId'];
    return this.orderLineService.setRejectedStatus(
      rejectedOrderLineDto,
      storeId,
    );
  }

  @UseGuards(StoreGuard)
  @Put('accept-order-line')
  updateStatusToAccepted(
    @Body() rejectedOrderLineDto: UpdateStatusOrderLineDto,
    @Req() request: Request,
  ) {
    const storeId = request['storeId'];
    return this.orderLineService.setAcceptedStatus(
      rejectedOrderLineDto,
      storeId,
    );
  }

  @UseGuards(StoreGuard)
  @Put('accept-all-order-line/:storeOrderId')
  updateAllStatusToAccepted(@Param('storeOrderId') storeOrderId: string) {
    return this.orderLineService.setAllOrderLineToAccepted(storeOrderId);
  }

  @UseGuards(StoreGuard)
  @Put('reject-all-order-line/:storeOrderId')
  updateAllStatusToRejected(@Param('storeOrderId') storeOrderId: string) {
    return this.orderLineService.setAllOrderLineToRejected(storeOrderId);
  }

  @UseGuards(StoreGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    return this.orderLineService.update(id, updateOrderLineDto);
  }

  @UseGuards(StoreGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderLineService.remove(id);
  }
}
