import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { Language } from '@prisma/client';

@Injectable()
export class StoreCategoryService {
  constructor(private prisma: PrismaService) {}

  create(createStoreCategoryDto: CreateStoreCategoryDto) {
    const { name, description, ...data } = createStoreCategoryDto;

    return this.prisma.storeCategory.create({
      data: {
        ...data,
        translations: {
          create: [{ name, description }],
        },
      },
    });
  }

  findAll(language: string) {
    return this.prisma.storeCategory.findMany({
      include: {
        translations: {
          where: {
            language: language as Language,
          },
        },
        _count: {
          select: {
            store: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.storeCategory.findUnique({
      where: {
        id,
      },
      include: {
        translations: true,
      },
    });
  }

  update(id: string, updateStoreCategoryDto: UpdateStoreCategoryDto) {
    const { name, description, ...data } = updateStoreCategoryDto;

    return this.prisma.storeCategory.update({
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
    return this.prisma.storeCategory.delete({
      where: {
        id,
      },
    });
  }

  deleteMany(ids: string[]) {
    return this.prisma.storeCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
