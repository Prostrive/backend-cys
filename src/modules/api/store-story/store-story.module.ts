import { Module } from '@nestjs/common';
import { StoreStoryService } from './store-story.service';
import { StoreStoryController } from './store-story.controller';

@Module({
  controllers: [StoreStoryController],
  providers: [StoreStoryService],
})
export class StoreStoryModule {}
