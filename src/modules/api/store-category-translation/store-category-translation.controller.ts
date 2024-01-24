import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoreCategoryTranslationService } from './store-category-translation.service';
import { CreateStoreCategoryTranslationDto } from './dto/create-store-category-translation.dto';
import { UpdateStoreCategoryTranslationDto } from './dto/update-store-category-translation.dto';
import { AdminGuard } from '../admin/admin.guard';

@Controller('store-category-translation')
export class StoreCategoryTranslationController {
  constructor(
    private readonly storeCategoryTranslationService: StoreCategoryTranslationService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  create(
    @Body()
    createStoreCategoryTranslationDto: CreateStoreCategoryTranslationDto,
  ) {
    return this.storeCategoryTranslationService.create(
      createStoreCategoryTranslationDto,
    );
  }

  @Get()
  findAll() {
    return this.storeCategoryTranslationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeCategoryTranslationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body()
    updateStoreCategoryTranslationDto: UpdateStoreCategoryTranslationDto,
  ) {
    return this.storeCategoryTranslationService.update(
      id,
      updateStoreCategoryTranslationDto,
    );
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.storeCategoryTranslationService.remove(id);
  }
}
