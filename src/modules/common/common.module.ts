import { ExpoModule } from '@/modules/common/expo/expo.module';
import { PrismaModule } from '@/modules/common/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';

@Module({
  imports: [PrismaModule, ExpoModule, AuthModule, CronModule, GoogleMapsModule],
})
export class CommonModules {}
