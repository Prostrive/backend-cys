import { CreateStoreDto } from './dto/create-store.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CustomerSearchService } from '@/modules/api/customer-search/customer-search.service';
import { Language } from '@prisma/client';
import { upsertRecords } from '@/helpers/query';
import { SendgridService } from '@/modules/common/sendgrid/sendgrid.service';
import { utcToZonedTime } from 'date-fns-tz';
import * as admin from 'firebase-admin';
import { isTimeWithinRange } from '@/utils/time';
import { Coordinate, getDistanceBetweenTwoPoints } from '@/utils/distance';

@Injectable()
export class StoreService {
  constructor(
    private readonly customerSearchService: CustomerSearchService,
    private readonly prisma: PrismaService,
    private readonly sendgrid: SendgridService,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const { openingTimes, managers, ...data } = createStoreDto;

    const store = await this.prisma.store.create({
      data: {
        ...data,
        openingTimes: {
          createMany: {
            data: openingTimes,
          },
        },
        managers: {
          createMany: {
            data: managers,
          },
        },
      },
      include: {
        managers: true,
      },
    });

    return this.sendInvites(store.managers);
  }

  findAll(language: string) {
    return this.prisma.store.findMany({
      include: {
        category: {
          include: {
            translations: {
              where: {
                language: language as Language,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string, language: string) {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();

    const store = await this.prisma.store.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        products: {
          include: {
            productTranslations: {
              where: {
                language: language as Language,
              },
              select: {
                name: true,
                unit: true,
              },
            },
            images: true,
            category: {
              include: {
                translations: {
                  where: {
                    language: language as Language,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        openingTimes: { where: { dayOfWeek } },
        managers: true,
        storeAdvertisements: true,
        storeStory: true,
      },
    });

    const isOpen = store?.openingTimes.some((openingTime) => {
      if (openingTime.dayOfWeek === dayOfWeek) {
        return isTimeWithinRange(
          now,
          openingTime.openTime,
          openingTime.closeTime,
        );
      }
    });

    return {
      ...store,
      isOpen,
    };
  }

  async findOneByAdmin(id: string, language: string) {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();

    const store = await this.prisma.store.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        products: {
          include: {
            productTranslations: {
              where: {
                language: language as Language,
              },
              select: {
                name: true,
                unit: true,
              },
            },
            images: true,
            category: {
              include: {
                translations: {
                  where: {
                    language: language as Language,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        openingTimes: true,
        managers: true,
        storeAdvertisements: true,
        storeStory: true,
      },
    });

    const isOpen = store?.openingTimes.some((openingTime) => {
      if (openingTime.dayOfWeek === dayOfWeek) {
        return isTimeWithinRange(
          now,
          openingTime.openTime,
          openingTime.closeTime,
        );
      }
    });

    return {
      ...store,
      isOpen,
    };
  }

  /** This is called when we want to search for stores based on the location of the user and also by the name or category
   *
   * @param searchTerm
   * @param language
   * @param selectedLocation
   * @returns
   */
  async searchOpenStores(
    searchTerm: string,
    language: string,
    selectedLocation: string,
  ) {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();

    const stores = await this.prisma.store.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            category: {
              translations: {
                some: {
                  name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                  language: language as Language,
                },
              },
            },
          },
        ],
        openingTimes: {
          some: {
            dayOfWeek,
          },
        },
        address: {
          path: ['city'],
          equals: selectedLocation,
        },
      },
      include: {
        openingTimes: { where: { dayOfWeek } },
        category: {
          include: {
            translations: { where: { language: language as Language } },
          },
        },
      },
    });

    return stores.filter((store) => {
      const { openingTimes } = store;
      return isTimeWithinRange(
        now,
        openingTimes[0].openTime,
        openingTimes[0].closeTime,
      );
    });
  }

  /** This is called when we want to search for closed stores based on the location of the user and also by the name or category.
   *
   * @param searchTerm
   * @param language
   * @param selectedLocation
   * @returns
   */
  async searchClosedStores(
    searchTerm: string,
    language: string,
    selectedLocation: string,
  ) {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();

    const stores = await this.prisma.store.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            category: {
              translations: {
                some: {
                  name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                  language: language as Language,
                },
              },
            },
          },
        ],
        address: {
          path: ['city'],
          equals: selectedLocation,
        },
      },
      include: {
        openingTimes: { where: { dayOfWeek } },
        category: {
          include: {
            translations: { where: { language: language as Language } },
          },
        },
      },
    });

    return stores.filter((store) => {
      const { openingTimes } = store;

      if (openingTimes.length !== 0) {
        return !isTimeWithinRange(
          now,
          openingTimes[0].openTime,
          openingTimes[0].closeTime,
        );
      } else {
        return true;
      }
    });
  }

  /** This is called when the user search for a term and it will browse all the stores' name and category and return it with isOpen property.
   *
   * @param searchTerm
   * @param selectedLocation
   * @param language
   * @param customerId
   * @returns
   */
  async searchStoresByLocation(
    searchTerm: string,
    selectedLocation: string,
    language: string,
    customerId?: string,
  ) {
    if (!selectedLocation) return [];

    const openStores = await this.searchOpenStores(
      searchTerm,
      language,
      selectedLocation,
    );
    const closedStores = await this.searchClosedStores(
      searchTerm,
      language,
      selectedLocation,
    );

    // Creating isOpen property if store is closed or open
    const stores = [
      ...openStores.map((store) => ({ ...store, isOpen: true })),
      ...closedStores.map((store) => ({ ...store, isOpen: false })),
    ];

    if (searchTerm.length > 4 && customerId) {
      try {
        await this.customerSearchService.create({
          searchTerm: searchTerm,
          customerId: customerId,
        });
      } catch (e) {
        console.log(e);
      }
    }

    return stores;
  }

  /** This function is called to get all stores that is in the customer's city and also sorted and identify the location of it from the customer
   * It also adds "isOpen" property to determine if the store is open today
   * @param selectedLocation
   * @returns
   */
  async findNearbyStores(
    selectedLocation: string,
    currentCoordinates: Coordinate,
  ) {
    if (!selectedLocation) return [];
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const prevDate = new Date();
    prevDate.setMonth(now.getMonth() - 1);

    const stores = await this.prisma.store.findMany({
      where: {
        address: {
          path: ['city'],
          equals: selectedLocation,
        },
        active: true,
      },
      include: {
        _count: {
          select: {
            storeOrders: {
              where: { createdAt: { gte: prevDate, lte: now } },
            },
          },
        },
        openingTimes: { where: { dayOfWeek } },
      },
    });

    const storesWithDistance = stores.map((store) => {
      const isOpen = store.openingTimes.some((openingTime) => {
        return (
          openingTime.dayOfWeek === dayOfWeek &&
          isTimeWithinRange(now, openingTime.openTime, openingTime.closeTime)
        );
      });

      const distance = getDistanceBetweenTwoPoints(currentCoordinates, {
        latitude: store.latitude,
        longitude: store.longitude,
      });

      return {
        ...store,
        isOpen,
        distance,
      };
    });

    storesWithDistance.sort((a, b) => {
      if (a.distance === 0 && b.distance !== 0) {
        return 1;
      } else if (a.distance !== 0 && b.distance === 0) {
        return -1;
      } else {
        return a.distance - b.distance;
      }
    });

    return storesWithDistance;
  }

  async findPopularStoreByLocation(selectedLocation: string) {
    if (!selectedLocation) return [];
    const now = new Date();
    const dayOfWeek = now.getUTCDay();

    const prevDate = new Date();
    prevDate.setMonth(now.getMonth() - 1);

    const stores = await this.prisma.store.findMany({
      where: {
        address: {
          path: ['city'],
          equals: selectedLocation,
        },
        active: true,
      },

      include: {
        _count: {
          select: {
            storeOrders: {
              where: { createdAt: { gte: prevDate, lte: now } },
            },
          },
        },
        // openingTimes: true,  Uncomment if you want to display all of openingTimes
        openingTimes: { where: { dayOfWeek } },
      },
      orderBy: {
        storeOrders: {
          _count: 'desc',
        },
      },
    });

    return stores.map((store) => {
      const isOpen = store.openingTimes.some((openingTime) => {
        if (openingTime.dayOfWeek === dayOfWeek) {
          return isTimeWithinRange(
            now,
            openingTime.openTime,
            openingTime.closeTime,
          );
        }
      });

      return {
        ...store,
        isOpen,
      };
    });
  }

  async findStoresByCategory(categoryId: string, selectedLocation: string) {
    if (!selectedLocation) return [];
    const now = new Date();
    const dayOfWeek = now.getUTCDay();

    const stores = await this.prisma.store.findMany({
      where: {
        categoryId,
        address: {
          path: ['city'],
          equals: selectedLocation,
        },
      },
      include: { category: true, openingTimes: { where: { dayOfWeek } } },
    });

    return stores.map((store) => {
      const isOpen = store.openingTimes.some((openingTime) => {
        if (openingTime.dayOfWeek === dayOfWeek) {
          return isTimeWithinRange(
            now,
            openingTime.openTime,
            openingTime.closeTime,
          );
        }
      });

      return {
        ...store,
        isOpen,
      };
    });
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const { openingTimes, managers, ...data } = updateStoreDto;

    await this.prisma.$transaction(async () => {
      await this.prisma.store.update({
        where: {
          id,
        },
        data,
      });

      await upsertRecords(openingTimes, 'StoreOpeningTime', 'storeId', id);
      await upsertRecords(managers, 'StoreManager', 'storeId', id);
    });

    const savedManagers = await this.prisma.storeManager.findMany({
      where: {
        storeId: id,
      },
    });

    await this.sendInvites(savedManagers);
  }

  async sendInvites(managers: any[]) {
    try {
      for (const manager of managers) {
        const { email, userId } = manager;

        if (!userId) {
          const user = await admin.auth().createUser({
            email: manager.email,
          });

          await this.prisma.storeManager.update({
            where: {
              id: manager.id,
            },
            data: {
              userId: user.uid,
            },
          });
        }

        this.sendgrid.sendInvite(email);
      }

      return { status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.errorInfo,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: string) {
    return this.prisma.store.delete({
      where: {
        id,
      },
    });
  }
}
