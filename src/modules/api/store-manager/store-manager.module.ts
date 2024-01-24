import { Module } from '@nestjs/common';
import { StoreManagerService } from './store-manager.service';
import { StoreManagerController } from './store-manager.controller';

@Module({
  controllers: [StoreManagerController],
  providers: [StoreManagerService],
})
export class StoreManagerModule {}
