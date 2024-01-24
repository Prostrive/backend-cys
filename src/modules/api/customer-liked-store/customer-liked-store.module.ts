import { Module } from '@nestjs/common';
import { CustomerLikedStoreService } from './customer-liked-store.service';
import { CustomerLikedStoreController } from './customer-liked-store.controller';

@Module({
  controllers: [CustomerLikedStoreController],
  providers: [CustomerLikedStoreService],
})
export class CustomerLikedStoreModule {}
