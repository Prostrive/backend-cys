import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { AdminGuard } from '../admin/admin.guard';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll(@Query('language') language: string) {
    return this.productCategoryService.findAll(language);
  }

  @Get('store/:storeId')
  findAllByStoreId(
    @Param('storeId') storeId: string,
    @Query('language') language: string,
  ) {
    return this.productCategoryService.findAllByStoreId(storeId, language);
  }

  @Get('parent')
  findParentCategories(@Query('language') language: string) {
    return this.productCategoryService.findParentCategories(language);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('storeId') storeId: string,
    @Query('language') language: string,
  ) {
    return this.productCategoryService.findOne(id, storeId, language);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(id, updateProductCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(id);
  }

  @Delete()
  @UseGuards(AdminGuard)
  deleteMany(@Body() { ids }: { ids: string[] }) {
    return this.productCategoryService.deleteMany(ids);
  }
}
