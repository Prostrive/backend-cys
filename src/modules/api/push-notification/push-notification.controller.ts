import { CreatePushNotificationDto } from '@/modules/api/push-notification/dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from '@/modules/api/push-notification/dto/update-push-notification.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { AdminGuard } from '../admin/admin.guard';
import { PushNotificationService } from './push-notification.service';

@Controller('push-notifications')
@UseGuards(AdminGuard)
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Get()
  getAllPushNotifications() {
    return this.pushNotificationService.getAllPushNotifications();
  }

  @Get('/scheduled')
  getAllScheduledPushNotifications() {
    return this.pushNotificationService.getAllScheduledPushNotifications();
  }

  @Patch('/:id')
  @UseGuards(FirebaseAuthGuard)
  async updatePushNotification(
    @Body() updatePushNotificationDto: UpdatePushNotificationDto,
    @Param('id') id: string,
  ) {
    return this.pushNotificationService.updatePushNotification(
      id,
      updatePushNotificationDto,
    );
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  createPushNotification(
    @Body() createPushNotificationDto: CreatePushNotificationDto,
  ) {
    console.log(createPushNotificationDto);

    return this.pushNotificationService.createPushNotification(
      createPushNotificationDto,
    );
  }

  @Delete('/:id')
  @UseGuards(FirebaseAuthGuard)
  deletePushNotification(@Param('id') id: string) {
    return this.pushNotificationService.deletePushNotification(id);
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard)
  deletePushNotifications(@Body() ids: string[]) {
    return this.pushNotificationService.deletePushNotifications(ids);
  }
}
