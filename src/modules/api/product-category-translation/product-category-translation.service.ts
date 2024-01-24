import { Injectable } from '@nestjs/common';
import { CreateProductCategoryTranslationDto } from './dto/create-product-category-translation.dto';
import { UpdateProductCategoryTranslationDto } from './dto/update-product-category-translation.dto';

@Injectable()
export class ProductCategoryTranslationService {
  create(
    createProductCategoryTranslationDto: CreateProductCategoryTranslationDto,
  ) {
    return 'This action adds a new productCategoryTranslation';
  }

  findAll() {
    return `This action returns all productCategoryTranslation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCategoryTranslation`;
  }

  update(
    id: number,
    updateProductCategoryTranslationDto: UpdateProductCategoryTranslationDto,
  ) {
    return `This action updates a #${id} productCategoryTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategoryTranslation`;
  }
}
