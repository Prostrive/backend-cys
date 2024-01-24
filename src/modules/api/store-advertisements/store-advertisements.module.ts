import { Module } from '@nestjs/common';
import { StoreAdvertisementsService } from './store-advertisements.service';
import { StoreAdvertisementsController } from './store-advertisements.controller';

@Module({
  controllers: [StoreAdvertisementsController],
  providers: [StoreAdvertisementsService],
})
export class StoreAdvertisementsModule {}
