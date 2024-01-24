import { Module } from '@nestjs/common';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, ExpoService],
  exports: [CustomerService],
})
export class CustomerModule {}
