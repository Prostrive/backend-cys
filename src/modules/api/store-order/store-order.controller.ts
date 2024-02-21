import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { StoreOrderService } from './store-order.service';
import { CreateStoreOrderDto } from './dto/create-store-order.dto';
import { UpdateStoreOrderDto } from './dto/update-store-order.dto';
import { Language, Status } from '@prisma/client';
import { StoreGuard } from '../store/store.guard';
import { DriverGuard } from '../driver/driver.guard';

@Controller('store-order')
export class StoreOrderController {
  constructor(private readonly storeOrderService: StoreOrderService) {}

  @Post()
  create(@Body() createStoreOrderDto: CreateStoreOrderDto) {
    return this.storeOrderService.create(createStoreOrderDto);
  }

  @Get()
  findAll(@Query('storeId') storeId: string) {
    return this.storeOrderService.findAll(storeId);
  }

  @Get('store')
  @UseGuards(StoreGuard)
  findAllByStore(@Req() request: Request) {
    const storeId = request['storeId'];
    return this.storeOrderService.findAll(storeId);
  }

  @Get(':id')
  @UseGuards(StoreGuard)
  findOne(@Param('id') id: string, @Query('language') language: string) {
    return this.storeOrderService.findOne(id, Language.en);
  }

  @Get('accept/:id')
  @UseGuards(StoreGuard)
  acceptStoreOrder(@Param('id') storeOrderId: string) {
    return this.storeOrderService.acceptStoreOrder(storeOrderId);
  }

  @Get('cancel/:id')
  @UseGuards(StoreGuard)
  cancelStoreOrder(@Param('id') storeOrderId: string) {
    return this.storeOrderService.cancelStoreOrder(storeOrderId);
  }

  @Patch(':id')
  @UseGuards(StoreGuard)
  update(
    @Param('id') id: string,
    @Body() updateStoreOrderDto: UpdateStoreOrderDto,
  ) {
    return this.storeOrderService.update(id, updateStoreOrderDto);
  }

  @Put('status/picking/:id')
  @UseGuards(StoreGuard)
  updateStatusToPicking(@Param('id') id: string) {
    return this.storeOrderService.updateStatusToPicking(id);
  }

  /** This endpoint will be called if the store verifies the driver using the pickup code
   *
   * @param id
   * @returns updated storeOrder with picked status
   */
  @Put('status/picked/:id')
  @UseGuards(StoreGuard)
  updateStatusToPicked(@Param('id') id: string) {
    return this.storeOrderService.updateStatusToPicked(id);
  }

  @Put('status/delivery/:id/:driveId')
  @UseGuards(DriverGuard)
  updateStatusToDelivery(
    @Param('id') id: string,
    @Param('driverId') driverId: string,
  ) {
    return this.storeOrderService.updateStatusToDelivery(id, driverId);
  }

  @Put('status/completed/:id')
  @UseGuards(DriverGuard, StoreGuard)
  updateStatusToCompleted(@Param('id') id: string) {
    return this.storeOrderService.updateStatus(id, Status.delivery);
  }

  @Delete(':id')
  @UseGuards(StoreGuard)
  remove(@Param('id') id: string) {
    return this.storeOrderService.remove(id);
  }
}
