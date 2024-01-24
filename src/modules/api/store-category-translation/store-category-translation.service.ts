import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateStoreCategoryTranslationDto } from './dto/create-store-category-translation.dto';
import { UpdateStoreCategoryTranslationDto } from './dto/update-store-category-translation.dto';

@Injectable()
export class StoreCategoryTranslationService {
  constructor(private prismaService: PrismaService) {}

  create(createStoreCategoryTranslationDto: CreateStoreCategoryTranslationDto) {
    return this.prismaService.storeCategoryTranslation.create({
      data: createStoreCategoryTranslationDto,
    });
  }

  findAll() {
    return this.prismaService.storeCategoryTranslation.findMany();
  }

  findOne(id: string) {
    return this.prismaService.storeCategoryTranslation.findUnique({
      where: {
        id,
      },
    });
  }

  update(
    id: string,
    updateStoreCategoryTranslationDto: UpdateStoreCategoryTranslationDto,
  ) {
    return this.prismaService.storeCategoryTranslation.update({
      where: {
        id,
      },
      data: updateStoreCategoryTranslationDto,
    });
  }

  remove(id: string) {
    return this.prismaService.storeCategoryTranslation.delete({
      where: {
        id,
      },
    });
  }
}
