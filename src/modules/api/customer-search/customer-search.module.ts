import { Module } from '@nestjs/common';
import { CustomerSearchService } from './customer-search.service';
import { CustomerSearchController } from './customer-search.controller';

@Module({
  controllers: [CustomerSearchController],
  providers: [CustomerSearchService],
})
export class CustomerSearchModule {}
