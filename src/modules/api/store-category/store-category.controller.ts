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
} from '@nestjs/common';
import { StoreCategoryService } from './store-category.service';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { AdminGuard } from '../admin/admin.guard';

@Controller('store-categories')
@ApiTags('store-categories')
export class StoreCategoryController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createStoreCategoryDto: CreateStoreCategoryDto) {
    return this.storeCategoryService.create(createStoreCategoryDto);
  }

  @Get()
  findAll(@Query('language') language: string) {
    return this.storeCategoryService.findAll(language);
  }

  findOne(@Param('id') id: string) {
    return this.storeCategoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateStoreCategoryDto: UpdateStoreCategoryDto,
  ) {
    return this.storeCategoryService.update(id, updateStoreCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.storeCategoryService.remove(id);
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard)
  @UseGuards(AdminGuard)
  deleteMany(@Body() { ids }: { ids: string[] }) {
    return this.storeCategoryService.deleteMany(ids);
  }
}
