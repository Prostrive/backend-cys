import { PartialType } from '@nestjs/swagger';
import { CreateProductCategoryTranslationDto } from './create-product-category-translation.dto';

export class UpdateProductCategoryTranslationDto extends PartialType(
  CreateProductCategoryTranslationDto,
) {}
