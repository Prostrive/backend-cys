import { ProductImage, ProductTranslation } from '@prisma/client';

export class CreateProductDto {
  available: boolean;
  price: number;
  discountedPrice?: number;
  images?: ProductImage[];
  storeId: string;
  categoryId: string;
  productTranslations: ProductTranslation[];
}
