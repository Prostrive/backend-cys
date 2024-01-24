import { PartialType } from '@nestjs/swagger';
import { CreateStoreCategoryTranslationDto } from './create-store-category-translation.dto';

export class UpdateStoreCategoryTranslationDto extends PartialType(
  CreateStoreCategoryTranslationDto,
) {}
