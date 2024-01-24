import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Language } from '@prisma/client';
import { GoogleTranslateService } from '@/modules/common/google-translate/google-translate.service';
import { translationFilter } from '@/utils/translation';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private readonly googleTranslateService: GoogleTranslateService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { images, productTranslations, ...data } = createProductDto;
    const nlTranslation = productTranslations.find(
      (translation) => translation.language === 'nl',
    );
    const { name, description, unit } = productTranslations.find(
      (translation) => translation.language === 'en',
    );

    if (nlTranslation) {
      nlTranslation.name = await this.googleTranslateService.translate(
        name,
        'nl',
      );
      nlTranslation.description = await this.googleTranslateService.translate(
        description,
        'nl',
      );
      nlTranslation.unit = await this.googleTranslateService.translate(
        unit,
        'nl',
      );
    }

    return this.prisma.product.create({
      data: {
        ...data,
        productTranslations: {
          createMany: {
            data: productTranslations,
          },
        },
        images: {
          createMany: {
            data: images,
          },
        },
      },
    });
  }

  async findAll(language: string) {
    return this.prisma.product.findMany({
      include: {
        store: true,
        productTranslations: {
          where: {
            language: language as Language,
          },
        },
        category: {
          include: {
            translations: {
              where: {
                ...(await translationFilter(
                  language as Language,
                  this.prisma.productCategoryTranslation,
                )),
              },
            },
          },
        },
        images: {
          take: 1,
        },
      },
    });
  }

  async findOne(id: string, language: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        category: {
          include: {
            translations: {
              where: {
                ...(await translationFilter(
                  language as Language,
                  this.prisma.productCategoryTranslation,
                )),
              },
            },
          },
        },
        productTranslations: true,
        store: true,
      },
    });
  }

  async findProductsByStore(storeId: string, language: string) {
    return this.prisma.product.findMany({
      where: { storeId },
      include: {
        images: true,
        category: {
          include: {
            translations: {
              where: {
                ...(await translationFilter(
                  language as Language,
                  this.prisma.productCategoryTranslation,
                )),
              },
            },
          },
        },
        productTranslations: {
          where: {
            language: language as Language,
          },
          select: {
            name: true,
            unit: true,
          },
        },
        store: true,
      },
    });
  }

  async findByProductNameAndStoreId(
    storeId: string,
    searchTerm: string,
    language: string,
  ) {
    return this.prisma.product.findMany({
      where: {
        storeId,
        OR: [
          {
            productTranslations: {
              some: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
                language: language as Language,
              },
            },
          },
          {
            category: {
              translations: {
                some: {
                  name: { contains: searchTerm },
                  language: language as Language,
                },
              },
            },
          },
        ],
      },
      include: {
        productTranslations: {
          where: {
            language: language as Language,
          },
        },
        category: {
          include: {
            translations: {
              where: {
                ...(await translationFilter(
                  language as Language,
                  this.prisma.productCategoryTranslation,
                )),
              },
            },
          },
        },
        images: true,
        store: false,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, productTranslations, ...data } = updateProductDto;

    await this.prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });

    productTranslations
      .filter((translation) => !!translation.id)
      .forEach(async (translation) => {
        await this.prisma.productTranslation.update({
          where: {
            id: translation.id,
          },
          data: {
            ...translation,
          },
        });
      });

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...data,
        productTranslations: {
          createMany: {
            data: productTranslations.filter((translation) => !translation.id),
          },
        },
        images: {
          createMany: {
            data: images,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  deleteProducts(ids: string[]) {
    return this.prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async createBulkProducts(createProductDtos: CreateProductDto[]) {
    const createdProductTranslations = [];
    for (const dto of createProductDtos) {
      const createdProduct = await this.prisma.product.create({
        data: {
          storeId: dto.storeId,
          categoryId: dto.categoryId,
          available: dto.available,
          price: dto.price,
          discountedPrice: dto.discountedPrice,
        },
      });
      const prTranslation = dto.productTranslations;
      const nlTranslation = prTranslation.find(
        (translation) => translation.language === 'nl',
      );
      const { name, description, unit } = prTranslation.find(
        (translation) => translation.language === 'en',
      );
      if (nlTranslation) {
        nlTranslation.name = await this.googleTranslateService.translate(
          name,
          'nl',
        );
        nlTranslation.description = await this.googleTranslateService.translate(
          description,
          'nl',
        );
        nlTranslation.unit = await this.googleTranslateService.translate(
          unit,
          'nl',
        );
      }
      if (createdProduct) {
        const createdTranslations =
          await this.prisma.productTranslation.createMany({
            data: prTranslation.map((translation) => ({
              ...translation,
              productId: createdProduct.id,
              name: translation.name,
            })),
          });
        createdProductTranslations.push(createdTranslations);
      }
    }
    return createdProductTranslations;
  }
}
