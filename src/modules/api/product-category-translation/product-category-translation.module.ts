import { Module } from '@nestjs/common';
import { ProductCategoryTranslationService } from './product-category-translation.service';
import { ProductCategoryTranslationController } from './product-category-translation.controller';

@Module({
  controllers: [ProductCategoryTranslationController],
  providers: [ProductCategoryTranslationService],
})
export class ProductCategoryTranslationModule {}
