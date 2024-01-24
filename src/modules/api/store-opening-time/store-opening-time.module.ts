import { Module } from '@nestjs/common';
import { StoreOpeningTimeService } from './store-opening-time.service';
import { StoreOpeningTimeController } from './store-opening-time.controller';

@Module({
  controllers: [StoreOpeningTimeController],
  providers: [StoreOpeningTimeService],
})
export class StoreOpeningTimeModule {}
