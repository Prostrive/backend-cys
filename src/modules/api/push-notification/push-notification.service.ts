import { CreatePushNotificationDto } from '@/modules/api/push-notification/dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from '@/modules/api/push-notification/dto/update-push-notification.dto';
import { Injectable } from '@nestjs/common';
import { PushNotificationAudience } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PushNotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPushNotifications() {
    return this.prismaService.pushNotifications.findMany();
  }

  async getAllScheduledPushNotifications() {
    const now = new Date();
    const nowMinusOneMinute = new Date(now.getTime() - 60000);

    return this.prismaService.pushNotifications.findMany({
      where: {
        scheduledSendTime: {
          lte: now,
          gte: nowMinusOneMinute,
        },
        notificationSent: false,
      },
    });
  }

  async createPushNotification(
    createPushNotificationDto: CreatePushNotificationDto,
  ) {
    return this.prismaService.pushNotifications.create({
      data: createPushNotificationDto,
    });
  }

  async updatePushNotification(
    id: string,
    updatePushNotificationDto: UpdatePushNotificationDto,
  ) {
    return this.prismaService.pushNotifications.update({
      where: {
        id,
      },
      data: updatePushNotificationDto,
    });
  }

  async deletePushNotification(id: string) {
    return this.prismaService.pushNotifications.delete({
      where: {
        id,
      },
    });
  }

  async deletePushNotifications(ids: string[]) {
    return this.prismaService.pushNotifications.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
