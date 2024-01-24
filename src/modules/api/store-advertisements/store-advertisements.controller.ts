import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreAdvertisementsService } from './store-advertisements.service';
import { CreateStoreAdvertisementDto } from './dto/create-store-advertisement.dto';
import { UpdateStoreAdvertisementDto } from './dto/update-store-advertisement.dto';

@Controller('store-advertisements')
export class StoreAdvertisementsController {
  constructor(
    private readonly storeAdvertisementsService: StoreAdvertisementsService,
  ) {}

  @Post()
  create(@Body() createStoreStoryDto: CreateStoreAdvertisementDto) {
    return this.storeAdvertisementsService.create(createStoreStoryDto);
  }

  @Get()
  findAll() {
    return this.storeAdvertisementsService.findAll();
  }

  @Get('store/:storeId')
  findAllByStoreId(@Param('storeId') storeId: string) {
    return this.storeAdvertisementsService.findAllByStoreId(storeId);
  }

  @Get(':id/:storeId')
  findOne(@Param('id') id: string, @Param('storeId') storeId: string) {
    return this.storeAdvertisementsService.findOne(id, storeId);
  }

  @Patch(':id/:storeId')
  update(
    @Param('id') id: string,
    @Param('storeId') storeId: string,
    @Body() updateStoreStoryDto: UpdateStoreAdvertisementDto,
  ) {
    return this.storeAdvertisementsService.update(
      id,
      storeId,
      updateStoreStoryDto,
    );
  }

  @Delete('delete-many/:storeId')
  removeMany(@Param('storeId') storeId: string, @Body() ids: string[]) {
    return this.storeAdvertisementsService.removeMany(ids, storeId);
  }

  @Delete(':id/:storeId')
  remove(@Param('id') id: string, @Param('storeId') storeId: string) {
    return this.storeAdvertisementsService.remove(id, storeId);
  }
}
