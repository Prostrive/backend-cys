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
import { ProductCategoryTranslationService } from './product-category-translation.service';
import { CreateProductCategoryTranslationDto } from './dto/create-product-category-translation.dto';
import { UpdateProductCategoryTranslationDto } from './dto/update-product-category-translation.dto';
import { AdminGuard } from '../admin/admin.guard';

@Controller('product-category-translation')
export class ProductCategoryTranslationController {
  constructor(
    private readonly productCategoryTranslationService: ProductCategoryTranslationService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  create(
    @Body()
    createProductCategoryTranslationDto: CreateProductCategoryTranslationDto,
  ) {
    return this.productCategoryTranslationService.create(
      createProductCategoryTranslationDto,
    );
  }

  @Get()
  findAll() {
    return this.productCategoryTranslationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryTranslationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body()
    updateProductCategoryTranslationDto: UpdateProductCategoryTranslationDto,
  ) {
    return this.productCategoryTranslationService.update(
      +id,
      updateProductCategoryTranslationDto,
    );
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.productCategoryTranslationService.remove(+id);
  }
}
