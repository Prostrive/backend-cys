import { Module } from '@nestjs/common';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { CustomerSearchService } from '@/modules/api/customer-search/customer-search.service';
import { StripeService } from '@/modules/api/stripe/stripe.service';
import { SendgridService } from '@/modules/common/sendgrid/sendgrid.service';

@Module({
  controllers: [StoreController],
  providers: [
    ExpoService,
    CustomerSearchService,
    SendgridService,
    StoreService,
    StripeService,
  ],
})
export class StoreModule {}
