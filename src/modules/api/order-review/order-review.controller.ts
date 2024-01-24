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
} from '@nestjs/common';
import { OrderReviewService } from './order-review.service';
import { CreateOrderReviewDto } from './dto/create-order-review.dto';
import { UpdateOrderReviewDto } from './dto/update-order-review.dto';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';

@Controller('order-review')
export class OrderReviewController {
  constructor(private readonly orderReviewService: OrderReviewService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createOrderReviewDto: CreateOrderReviewDto) {
    return this.orderReviewService.create(createOrderReviewDto);
  }

  @Get()
  findAll() {
    return this.orderReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderReviewService.findOne(id);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateOrderReviewDto: UpdateOrderReviewDto,
  ) {
    return this.orderReviewService.update(id, updateOrderReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderReviewService.remove(id);
  }
}
