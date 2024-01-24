import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAuthModule } from '@whitecloak/nestjs-passport-firebase';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModules } from '@/modules/common/common.module';
import { ApiModules } from '@/modules/api/api.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OrderTripModule } from './modules/api/order-trip/order-trip.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    FirebaseAuthModule.register({
      audience: process.env.FIREABASE_AUDIENCE,
      issuer: process.env.FIREBASE_ISSUER,
    }),
    NestjsFormDataModule,
    ApiModules,
    CommonModules,
    OrderTripModule,
  ],
})
export class AppModule {}
