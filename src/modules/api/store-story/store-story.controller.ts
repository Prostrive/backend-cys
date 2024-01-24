import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreStoryService } from './store-story.service';
import { CreateStoreStoryDto } from './dto/create-store-story.dto';
import { UpdateStoreStoryDto } from './dto/update-store-story.dto';

@Controller('store-story')
export class StoreStoryController {
  constructor(private readonly storeStoryService: StoreStoryService) {}

  @Post()
  create(@Body() createStoreStoryDto: CreateStoreStoryDto) {
    return this.storeStoryService.create(createStoreStoryDto);
  }

  @Get()
  findAll() {
    return this.storeStoryService.findAll();
  }

  @Get(':storeId')
  findOneByStoreId(@Param('storeId') storeId: string) {
    return this.storeStoryService.findOneByStoreId(storeId);
  }

  @Patch(':id/:storeId')
  update(
    @Param('id') id: string,
    @Param('storeId') storeId: string,
    @Body() updateStoreStoryDto: UpdateStoreStoryDto,
  ) {
    return this.storeStoryService.update(id, storeId, updateStoreStoryDto);
  }

  @Delete(':id/:storeId')
  remove(@Param('id') id: string, @Param('storeId') storeId: string) {
    return this.storeStoryService.remove(id, storeId);
  }
}
