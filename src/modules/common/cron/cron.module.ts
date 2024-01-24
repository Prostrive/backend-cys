import { CustomerModule } from '@/modules/api/customer/customer.module';
import { DriverModule } from '@/modules/api/driver/driver.module';
import { OrderModule } from '@/modules/api/order/order.module';
import { PushNotificationModule } from '@/modules/api/push-notification/push-notification.module';
import { ExpoModule } from '@/modules/common/expo/expo.module';
import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { OrderDriversModule } from '@/modules/api/order-drivers/order-drivers.module';

@Module({
  providers: [CronService],
  imports: [
    CustomerModule,
    PushNotificationModule,
    ExpoModule,
    OrderModule,
    DriverModule,
    OrderDriversModule,
  ],
})
export class CronModule {}
