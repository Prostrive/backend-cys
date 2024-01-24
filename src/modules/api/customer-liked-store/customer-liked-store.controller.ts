import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { CustomerLikedStoreDto } from './dto/customer-liked-store-dto';
import { CustomerLikedStoreService } from './customer-liked-store.service';

@Controller('liked-stores')
@UseGuards(FirebaseAuthGuard)
export class CustomerLikedStoreController {
  constructor(
    private readonly customerLikedStoreService: CustomerLikedStoreService,
  ) {}

  @Get(':customerId')
  findAll(@Param('customerId') customerId: string) {
    return this.customerLikedStoreService.findAll(customerId);
  }

  @Post()
  create(@Body() customerLikedStoreDto: CustomerLikedStoreDto) {
    return this.customerLikedStoreService.create(customerLikedStoreDto);
  }

  @Delete()
  delete(@Body() data: any) {
    return this.customerLikedStoreService.delete(data);
  }
}
