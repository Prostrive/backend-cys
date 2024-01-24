import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateStoreOpeningTimeDto } from './dto/create-store-opening-time.dto';
import { UpdateStoreOpeningTimeDto } from './dto/update-store-opening-time.dto';

@Injectable()
export class StoreOpeningTimeService {
  constructor(private prisma: PrismaService) {}

  create(createStoreOpeningTimeDto: CreateStoreOpeningTimeDto) {
    return this.prisma.storeOpeningTime.createMany({
      data: createStoreOpeningTimeDto,
    });
  }

  findAll() {
    return this.prisma.storeOpeningTime.findMany();
  }

  findOne(id: string) {
    return this.prisma.storeOpeningTime.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateStoreOpeningTimeDto: UpdateStoreOpeningTimeDto) {
    return this.prisma.storeOpeningTime.update({
      where: {
        id,
      },
      data: updateStoreOpeningTimeDto,
    });
  }

  remove(id: string) {
    return this.prisma.storeOpeningTime.delete({
      where: {
        id,
      },
    });
  }
}
