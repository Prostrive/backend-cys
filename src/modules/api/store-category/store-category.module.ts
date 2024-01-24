import { Module } from '@nestjs/common';
import { StoreCategoryController } from './store-category.controller';
import { StoreCategoryService } from './store-category.service';

@Module({
  controllers: [StoreCategoryController],
  providers: [StoreCategoryService],
})
export class StoreCategoryModule {}
