import { StoreManager, StoreOpeningTime } from '@prisma/client';

export class CreateStoreDto {
  name: string;
  openingTimes: StoreOpeningTime[];
  thumbnailImageUrl: string;
  logoImageUrl: string;
  categoryId: string;
  active: boolean;
  latitude: number;
  longitude: number;
  address: object;
  stripeId?: string;
  managers: StoreManager[];
}

export class OrderCount {
  _count: {
    storeOrders: number;
  };
}
