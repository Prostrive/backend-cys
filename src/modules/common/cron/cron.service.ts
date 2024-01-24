import { CustomerService } from '@/modules/api/customer/customer.service';
import { DriverService } from '@/modules/api/driver/driver.service';
import { OrderDriversService } from '@/modules/api/order-drivers/order-drivers.service';
import { OrderService } from '@/modules/api/order/order.service';
import { PushNotificationService } from '@/modules/api/push-notification/push-notification.service';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Order } from '@prisma/client';

@Injectable()
export class CronService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly orderService: OrderService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly expoService: ExpoService,
    private readonly driverService: DriverService,
    private readonly orderDriversService: OrderDriversService,
  ) {}

  //BW: This is the cron job that runs every minute, only turn on when you want to test
  // @Cron('0-59 5-23,0-1 * * *')
  async handleCron() {
    const notifications =
      await this.pushNotificationService.getAllScheduledPushNotifications();
    const users = await this.customerService.findAllWithToken();
    const tokens = [];
    users.forEach((obj) => tokens.push(...obj.notificationTokens));

    for (const notification of notifications) {
      await this.expoService.sendPushNotifications(tokens, notification.body);
      await this.pushNotificationService.updatePushNotification(
        notification.id,
        { notificationSent: true },
      );
    }
  }

  @Cron('0-59 5-23,0-1 * * *')
  async sendNotificationToRegularDrivers() {
    const pendingOrders = await this.orderService.findPendingOrders();

    await Promise.all(
      pendingOrders.map(async (pendingOrder) => {
        await this.driverService.sendDriversNotification(
          'regular',
          'A New order has been placed!',
        );
        await this.orderDriversService.createOrderDriversForAllDrivers(
          'regular',
          pendingOrder.id,
        );
        await this.orderService.updateOrderStatusWithNotification(
          pendingOrder.id,
        );
      }),
    );
  }

  @Cron('0-59 5-23,0-1 * * *')
  async sendNotificationToCysDrivers() {
    const currentTime = new Date();
    const ordersWithNoDriver = await this.orderService.findOrdersWithNoDriver();

    Promise.all(
      ordersWithNoDriver.map(async (orderWithNoDriver: Order) => {
        const fiveMinutesLater = new Date(
          orderWithNoDriver.notificationTime.getTime() + 300000,
        );
        if (fiveMinutesLater > currentTime) {
          await this.driverService.sendDriversNotification(
            'cys',
            'A New order has been placed!',
          );
          await this.orderDriversService.createOrderDriversForAllDrivers(
            'regular',
            orderWithNoDriver.id,
          );
          await this.orderService.updateOrderCysNotification(
            orderWithNoDriver.id,
          );
        }
      }),
    );
  }
}
