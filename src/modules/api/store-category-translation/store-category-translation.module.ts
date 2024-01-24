import { Module } from '@nestjs/common';
import { StoreCategoryTranslationService } from './store-category-translation.service';
import { StoreCategoryTranslationController } from './store-category-translation.controller';

@Module({
  controllers: [StoreCategoryTranslationController],
  providers: [StoreCategoryTranslationService],
})
export class StoreCategoryTranslationModule {}
