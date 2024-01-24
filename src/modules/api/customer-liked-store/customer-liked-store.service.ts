import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CustomerLikedStoreDto } from './dto/customer-liked-store-dto';
import { isTimeWithinRange } from '@/utils/time';

@Injectable()
export class CustomerLikedStoreService {
  constructor(private prisma: PrismaService) {}

  async findAll(customerId: string) {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();

    const stores = await this.prisma.customerLikedStores.findMany({
      where: {
        customerId,
      },
      select: {
        store: {
          include: {
            openingTimes: true,
          },
        },
      },
    });

    return stores.map(({ store }) => {
      const isOpen = store.openingTimes.some((openingTime) => {
        return (
          openingTime.dayOfWeek === dayOfWeek &&
          isTimeWithinRange(now, openingTime.openTime, openingTime.closeTime)
        );
      });

      return {
        store: {
          ...store,
          isOpen,
        },
      };
    });
  }

  create(customerLikedStoreDto: CustomerLikedStoreDto) {
    return this.prisma.customerLikedStores.create({
      data: customerLikedStoreDto,
    });
  }

  delete({ customerId, storeId }: { customerId: string; storeId: string }) {
    return this.prisma.customerLikedStores.deleteMany({
      where: {
        customerId,
        storeId,
      },
    });
  }
}
