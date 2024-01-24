import { CustomerService } from '@/modules/api/customer/customer.service';
import { RegisterDriverDto } from '@/modules/api/driver/dto/register.driver.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDriverDto, DriverResponseDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import * as admin from 'firebase-admin';
import { nanoid } from 'nanoid';
import { Customer, DriverType, OrderDriverStatus } from '@prisma/client';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { GoogleMapsService } from '@/modules/common/google-maps/google-maps.service';
import { OrderService } from '../order/order.service';
import { OrderTripService } from '../order-trip/order-trip.service';

@Injectable()
export class DriverService {
  constructor(
    private prisma: PrismaService,
    private readonly customerService: CustomerService,
    private readonly expoService: ExpoService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly orderService: OrderService,
    private readonly orderTripService: OrderTripService,
  ) {}

  async register(image, registerDriverDto: RegisterDriverDto) {
    const { userId, city, vehicleType, dateOfBirth, phoneNumber } =
      registerDriverDto;
    const customer = await this.customerService.findOneByUserId(userId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    const existingDriver = await this.findOneByUserId(userId);

    if (existingDriver) {
      throw new Error('Driver already exists');
    }

    const { name, email, id: customerId } = customer;

    const imageFileName = nanoid();
    const fileReference = admin
      .storage()
      .bucket('gs://collect-your-shopping.appspot.com')
      .file(`drivers/${imageFileName}.jpg`);

    fileReference.save(image.buffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const imageUrl = await fileReference.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    return this.prisma.driver.create({
      data: {
        dateOfBirth: new Date(dateOfBirth),
        userId,
        name,
        imageUrl: imageUrl[0],
        email,
        city,
        customerId,
        vehicleType,
        phoneNumber,
      },
    });
  }

  create(createDriverDto: CreateDriverDto) {
    return this.prisma.driver.create({
      data: createDriverDto,
    });
  }

  findAll() {
    return this.prisma.driver.findMany();
  }

  findOne(id: string) {
    return this.prisma.driver.findUnique({
      where: { id },
    });
  }

  findOneByUserId(userId: string) {
    return this.prisma.driver.findUnique({
      where: { userId },
    });
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    return this.prisma.driver.update({
      where: { id },
      data: updateDriverDto,
    });
  }

  remove(id: string) {
    return this.prisma.driver.delete({
      where: { id },
    });
  }

  // Availability functions
  async getAvailability(id: string) {
    const { available } = await this.prisma.driver.findUnique({
      where: { id },
    });
    return available;
  }
  async updateAvailability(id: string, availability: boolean) {
    const { available } = await this.prisma.driver.update({
      where: { id },
      data: { available: availability },
    });
    return available;
  }

  /**This will find all available drivers that has a type provided
   *
   * @param driverType
   * @returns all available driver
   */
  findAvailableDrivers = (driverType: DriverType) => {
    return this.prisma.driver.findMany({
      where: { driverType, available: true },
    });
  };

  // Notifications
  async sendDriversNotification(driverType: DriverType, message: string) {
    const allTokens = [];
    const driversToken = await this.customerService.findAvailableDrivers(
      driverType,
    );
    driversToken.forEach((driverToken: Customer) => {
      allTokens.push(...driverToken.notificationTokens);
    });

    await this.expoService.sendPushNotifications(driversToken, message);
  }

  /**This returns all orders that are accepted by the stores and has no driver yet
   * Also finds all orders that the driver hasn't rejected/accepted yet
   * @param driverId to know that the order is not rejected
   * @returns order[]
   */
  async getAvailableOrdersForDrivers(
    driverId: string,
    lat: number,
    lng: number,
  ) {
    const orderDetails =
      await this.orderService.findOneAvailableOrderWithNoDriver(driverId);
    console.log('order details of order with no driver', { orderDetails });
    if (orderDetails) {
      const storeLocations = orderDetails.storeOrder.map(
        ({ store: { latitude, longitude } }) => `${latitude},${longitude}`,
      );
      const calculatedDirections = await this.googleMapsService.getDirections(
        `${lat},${lng}`,
        storeLocations,
        `${orderDetails.customerAddress.latitude},${orderDetails.customerAddress.longitude}`,
      );
      return { ...orderDetails, calculatedDirections };
    } else {
      return null;
    }
  }

  /** This will be called when driver accepts the order and it will assign the driver in Order table
   * Validation: The order must not have an existing driverId/driver
   * @param orderId
   * @param driverId
   */
  async acceptOrderByDriver(driverResponseDto: DriverResponseDto) {
    const { driverId, orderId } = driverResponseDto;

    const acceptedOrder = await this.prisma.order.update({
      where: { id: orderId, driverId: null },
      data: { driverId: driverId },
    });
    if (!acceptedOrder) {
      throw new HttpException(
        'The order has already an assigned driver',
        HttpStatus.CONFLICT,
      );
    }
    await this.prisma.orderDriver.updateMany({
      where: { orderId: orderId, driverId: driverId },
      data: {
        status: OrderDriverStatus.accepted,
      },
    });
    await this.orderTripService.create(acceptedOrder.id);
    return { ...acceptedOrder, driverId };
  }

  /** This will be called when driver rejects the order
   *
   * @param orderId
   * @param driverId
   */
  async rejectOrderByDriver(driverResponseDto: DriverResponseDto) {
    const { driverId, orderId } = driverResponseDto;
    await this.prisma.orderDriver.updateMany({
      where: {
        orderId: orderId,
        driverId: driverId,
        status: OrderDriverStatus.noResponse,
      },
      data: {
        status: OrderDriverStatus.rejected,
      },
    });
    return { ...driverResponseDto, status: OrderDriverStatus.rejected };
  }
}
