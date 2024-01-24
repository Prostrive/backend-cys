import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { CreateStoreManagerDto } from './dto/create-store-manager.dto';
import { UpdateStoreManagerDto } from './dto/update-store-manager.dto';

@Injectable()
export class StoreManagerService {
  constructor(private prisma: PrismaService) {}

  create(createStoreManagerDto: CreateStoreManagerDto) {
    return this.prisma.storeManager.create({
      data: createStoreManagerDto,
    });
  }

  findAll() {
    return this.prisma.storeManager.findMany();
  }

  findOne(id: string) {
    return this.prisma.storeManager.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findOneByUserId(userId: string) {
    return this.prisma.storeManager.findUniqueOrThrow({
      where: {
        userId,
      },
    });
  }

  update(id: string, updateStoreManagerDto: UpdateStoreManagerDto) {
    return this.prisma.storeManager.update({
      where: {
        id,
      },
      data: updateStoreManagerDto,
    });
  }

  remove(id: string) {
    return this.prisma.storeManager.delete({
      where: {
        id,
      },
    });
  }
}
