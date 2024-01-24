import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreOpeningTimeService } from './store-opening-time.service';
import { CreateStoreOpeningTimeDto } from './dto/create-store-opening-time.dto';
import { UpdateStoreOpeningTimeDto } from './dto/update-store-opening-time.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('store-opening-times')
@ApiTags('store-opening-times')
export class StoreOpeningTimeController {
  constructor(
    private readonly storeOpeningTimeService: StoreOpeningTimeService,
  ) {}

  @Post()
  create(@Body() createStoreOpeningTimeDto: CreateStoreOpeningTimeDto) {
    console.log(createStoreOpeningTimeDto);

    return this.storeOpeningTimeService.create(createStoreOpeningTimeDto);
  }

  @Get()
  findAll() {
    return this.storeOpeningTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeOpeningTimeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreOpeningTimeDto: UpdateStoreOpeningTimeDto,
  ) {
    return this.storeOpeningTimeService.update(id, updateStoreOpeningTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeOpeningTimeService.remove(id);
  }
}
