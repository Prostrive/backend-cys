import { PushNotificationAudience } from '@prisma/client';

export class CreatePushNotificationDto {
  body: string;
  scheduledSendTime: Date;
  audience: PushNotificationAudience;
  notificationSent: boolean;
}
