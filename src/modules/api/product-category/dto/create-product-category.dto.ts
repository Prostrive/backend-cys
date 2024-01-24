export class CreateProductCategoryDto {
  name: string;
  description: string;
  hasParent?: boolean;
  parentId?: string;
  imageUrl: string;
  thumbnailUrl: string;
}
