import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreManagerService } from './store-manager.service';
import { CreateStoreManagerDto } from './dto/create-store-manager.dto';
import { UpdateStoreManagerDto } from './dto/update-store-manager.dto';

@Controller('store-manager')
export class StoreManagerController {
  constructor(private readonly storeManagerService: StoreManagerService) {}

  @Post()
  create(@Body() createStoreManagerDto: CreateStoreManagerDto) {
    return this.storeManagerService.create(createStoreManagerDto);
  }

  @Get()
  findAll() {
    return this.storeManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeManagerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreManagerDto: UpdateStoreManagerDto,
  ) {
    return this.storeManagerService.update(id, updateStoreManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeManagerService.remove(id);
  }
}
