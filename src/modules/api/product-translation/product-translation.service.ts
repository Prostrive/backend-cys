import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProductTranslationDto } from './dto/create-product-translation.dto';
import { UpdateProductTranslationDto } from './dto/update-product-translation.dto';

@Injectable()
export class ProductTranslationService {
  constructor(private prisma: PrismaService) {}

  create(createProductTranslationDto: CreateProductTranslationDto) {
    return this.prisma.productTranslation.create({
      data: createProductTranslationDto,
    });
  }

  findAll() {
    return this.prisma.productTranslation.findMany();
  }

  findOne(id: string) {
    return this.prisma.productTranslation.findUnique({
      where: { id },
    });
  }

  update(id: string, updateProductTranslationDto: UpdateProductTranslationDto) {
    return this.prisma.productTranslation.update({
      where: { id },
      data: updateProductTranslationDto,
    });
  }

  remove(id: string) {
    return this.prisma.productTranslation.delete({
      where: { id },
    });
  }
}
