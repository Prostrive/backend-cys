import { Language } from '@prisma/client';

export class CreateProductTranslationDto {
  name: string;
  description: string;
  unit: string;
  language: Language;
  productId: string;
}
