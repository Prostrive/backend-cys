import { Injectable } from '@nestjs/common';
import { CreateStoreAdvertisementDto } from './dto/create-store-advertisement.dto';
import { UpdateStoreAdvertisementDto } from './dto/update-store-advertisement.dto';

import { PrismaService } from '@/modules/common/prisma/prisma.service';

@Injectable()
export class StoreAdvertisementsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStoreStoryDto: CreateStoreAdvertisementDto) {
    return this.prismaService.storeAdvertisements.create({
      data: createStoreStoryDto,
    });
  }

  findAll() {
    return this.prismaService.storeAdvertisements.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findAllByStoreId(storeId: string) {
    return this.prismaService.storeAdvertisements.findMany({
      where: { storeId },
    });
  }

  findOne(id: string, storeId: string) {
    return this.prismaService.storeAdvertisements.findUniqueOrThrow({
      where: { id, storeId },
    });
  }

  update(
    id: string,
    storeId: string,
    updateStoreStoryDto: UpdateStoreAdvertisementDto,
  ) {
    return this.prismaService.storeAdvertisements.update({
      where: { id, storeId },
      data: updateStoreStoryDto,
    });
  }

  remove(id: string, storeId: string) {
    return this.prismaService.storeAdvertisements.delete({
      where: { id, storeId },
    });
  }

  removeMany(ids: string[], storeId: string) {
    console.log({ ids, storeId });
    return this.prismaService.storeAdvertisements.deleteMany({
      where: { id: { in: ids }, storeId },
    });
  }
}
