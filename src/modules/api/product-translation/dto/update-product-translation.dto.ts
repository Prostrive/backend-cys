import { PartialType } from '@nestjs/swagger';
import { CreateProductTranslationDto } from './create-product-translation.dto';

export class UpdateProductTranslationDto extends PartialType(
  CreateProductTranslationDto,
) {}
