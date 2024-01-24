import { AdminModule } from '@/modules/api/admin/admin.module';
import { CustomerAddressModule } from '@/modules/api/customer-address/customer-address.module';
import { CustomerSearchModule } from '@/modules/api/customer-search/customer-search.module';
import { CustomerModule } from '@/modules/api/customer/customer.module';
import { OrderLineModule } from '@/modules/api/order-line/order-line.module';
import { OrderModule } from '@/modules/api/order/order.module';
import { ProductTranslationModule } from '@/modules/api/product-translation/product-translation.module';
import { ProductModule } from '@/modules/api/product/product.module';
import { PushNotificationModule } from '@/modules/api/push-notification/push-notification.module';
import { StoreCategoryModule } from '@/modules/api/store-category/store-category.module';
import { StoreManagerModule } from '@/modules/api/store-manager/store-manager.module';
import { StoreOpeningTimeModule } from '@/modules/api/store-opening-time/store-opening-time.module';
import { StoreModule } from '@/modules/api/store/store.module';
import { Module } from '@nestjs/common';
import { ProductCategoryModule } from '@/modules/api/product-category/product-category.module';
import { ProductCategoryTranslationModule } from '@/modules/api/product-category-translation/product-category-translation.module';
import { StoreCategoryTranslationModule } from './store-category-translation/store-category-translation.module';
import { StripeModule } from './stripe/stripe.module';
import { DriverModule } from './driver/driver.module';
import { StoreOrderModule } from './store-order/store-order.module';
import { CustomerRefundModule } from './customer-refund/customer-refund.module';
import { CustomerPaymentModule } from './customer-payment/customer-payment.module';
import { StoreEmployeeModule } from './store-employee/store-employee.module';
import { OrderDriversModule } from './order-drivers/order-drivers.module';
import { OrderTripModule } from './order-trip/order-trip.module';
import { OrderReviewModule } from './order-review/order-review.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { WalletTransactionModule } from './wallet-transaction/wallet-transaction.module';
import { LookupsModule } from './lookup/lookup.module';
import { CustomerLikedStoreModule } from './customer-liked-store/customer-liked-store.module';
import { StoreStoryModule } from './store-story/store-story.module';
import { StoreAdvertisementsModule } from './store-advertisements/store-advertisements.module';
@Module({
  imports: [
    AdminModule,
    CustomerModule,
    CustomerAddressModule,
    CustomerSearchModule,
    OrderModule,
    OrderLineModule,
    ProductModule,
    ProductTranslationModule,
    PushNotificationModule,
    StoreModule,
    StoreCategoryModule,
    StoreManagerModule,
    StoreOpeningTimeModule,
    PushNotificationModule,
    ProductCategoryModule,
    ProductCategoryTranslationModule,
    StoreCategoryTranslationModule,
    StripeModule,
    DriverModule,
    StoreOrderModule,
    CustomerRefundModule,
    CustomerPaymentModule,
    StoreEmployeeModule,
    OrderDriversModule,
    OrderTripModule,
    OrderReviewModule,
    AppSettingsModule,
    WalletTransactionModule,
    LookupsModule,
    CustomerLikedStoreModule,
    StoreStoryModule,
    StoreAdvertisementsModule,
  ],
})
export class ApiModules {}
