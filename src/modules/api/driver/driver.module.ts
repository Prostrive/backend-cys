import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { CustomerModule } from '@/modules/api/customer/customer.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ExpoModule } from '@/modules/common/expo/expo.module';
import { GoogleMapsModule } from '@/modules/common/google-maps/google-maps.module';
import { OrderModule } from '../order/order.module';
import { OrderTripModule } from '../order-trip/order-trip.module';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
  imports: [
    CustomerModule,
    NestjsFormDataModule,
    ExpoModule,
    GoogleMapsModule,
    OrderModule,
    OrderTripModule,
  ],
  exports: [DriverService],
})
export class DriverModule {}
