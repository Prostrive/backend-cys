import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Language } from '@prisma/client';
import { translationFilter } from '@/utils/translation';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}
  create(createProductCategoryDto: CreateProductCategoryDto) {
    const { name, description, ...data } = createProductCategoryDto;

    return this.prisma.productCategory.create({
      data: {
        ...data,
        translations: {
          create: { name, description },
        },
      },
    });
  }

  async findAll(language: string) {
    return this.prisma.productCategory.findMany({
      include: {
        translations: {
          where: {
            ...(await translationFilter(
              language as Language,
              this.prisma.productCategoryTranslation,
            )),
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  }

  async findAllByStoreId(storeId: string, language: string) {
    return this.prisma.productCategory.findMany({
      where: { products: { some: { storeId } } },
      include: {
        translations: {
          where: {
            ...(await translationFilter(
              language as Language,
              this.prisma.productCategoryTranslation,
            )),
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
        products: true,
      },
    });
  }

  findParentCategories(language: string) {
    return this.prisma.productCategory.findMany({
      where: {
        hasParent: false,
      },
      include: {
        translations: {
          where: {
            language: language as Language,
          },
        },
      },
    });
  }

  async findOne(id: string, storeId: string, language: string) {
    const productCategory = await this.prisma.productCategory.findUnique({
      where: {
        id,
      },
      include: {
        translations: {
          where: {
            language: language as Language,
          },
        },
        products: {
          where: {
            storeId,
          },
          include: {
            store: {
              select: {
                id: true,
                stripeId: true,
                name: true,
                logoImageUrl: true,
              },
            },
            images: true,
            productTranslations: true,
          },
        },
      },
    });

    return productCategory ? { ...productCategory, storeId } : productCategory;
  }

  update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    const { name, description, ...data } = updateProductCategoryDto;

    return this.prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        ...data,
        translations: {
          updateMany: {
            where: {
              categoryId: id,
            },
            data: { name, description },
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.productCategory.delete({
      where: {
        id,
      },
    });
  }

  deleteMany(ids: string[]) {
    return this.prisma.productCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
