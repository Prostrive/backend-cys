import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';

import { AdminGuard } from '../admin/admin.guard';
import { Language } from '@prisma/client';
import { StoreGuard } from './store.guard';
import { Coordinate } from '@/utils/distance';

@Controller('stores')
@ApiTags('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get('store-details')
  @UseGuards(StoreGuard)
  getStoreInfo(@Req() request: Request, @Query('language') language: string) {
    const storeId = request['storeId'];
    return this.storeService.findOne(storeId, language || Language.en);
  }

  @Get()
  findAll(@Query('language') language: string) {
    return this.storeService.findAll(language || Language.en);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('language') language: string) {
    return this.storeService.findOne(id, language || Language.en);
  }

  @Get('/admin/:id')
  @UseGuards(StoreGuard)
  findOneByAdmin(@Param('id') id: string, @Query('language') language: string) {
    return this.storeService.findOneByAdmin(id, language || Language.en);
  }

  @Get('/all/search/:searchTerm')
  findStoresBySearch(
    @Param('searchTerm') searchTerm: string,
    @Query('customerId') customerId?: string,
    @Query('selectedLocation') selectedLocation?: string,
    @Query('language') language?: string,
  ) {
    return this.storeService.searchStoresByLocation(
      searchTerm,
      selectedLocation,
      language || Language.en,
      customerId,
    );
  }

  @Get('/all/popular/address')
  findPopularStoreByLocation(
    @Query('selectedLocation') selectedLocation?: string,
  ) {
    return this.storeService.findPopularStoreByLocation(selectedLocation);
  }

  @Get('/all/address')
  findNearbyStores(
    @Query('selectedLocation') selectedLocation?: string,
    @Query('customerCoordinates') customerCoordinates?: Coordinate,
  ) {
    return this.storeService.findNearbyStores(
      selectedLocation,
      customerCoordinates,
    );
  }

  @Get('category/:categoryId')
  findStoresByCategory(
    @Param('categoryId') categoryId: string,
    @Query('selectedLocation') selectedLocation?: string,
  ) {
    return this.storeService.findStoresByCategory(categoryId, selectedLocation);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
