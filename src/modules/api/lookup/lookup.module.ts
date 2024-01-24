import { Module } from '@nestjs/common';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';

@Module({
  controllers: [LookupController],
  providers: [LookupService, ExpoService],
  exports: [LookupService],
})
export class LookupsModule {}
