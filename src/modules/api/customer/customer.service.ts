import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { DriverType, Status, WalletTransactionType } from '@prisma/client';
import { UpdateCustomerDto } from '@/modules/api/customer/dto/update-customer.dto';
import * as admin from 'firebase-admin';
import { Decimal } from '@prisma/client/runtime';
@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(CustomerService.name);

  create(createCustomerDto: CreateCustomerDto) {
    const invalidNames = ['null null', '', null, undefined];
    createCustomerDto.name = invalidNames.includes(createCustomerDto.name)
      ? ''
      : createCustomerDto.name;

    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async login(userId: string, notificationToken?: string) {
    const customer = await this.prisma.customer.findUniqueOrThrow({
      where: {
        userId,
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            city: true,
            vehicleType: true,
            phoneNumber: true,
          },
        },
        likedStores: {
          select: {
            storeId: true,
          },
        },
      },
    });

    if (
      notificationToken &&
      !customer.notificationTokens.includes(notificationToken)
    ) {
      customer.notificationTokens.push(notificationToken);

      await this.update(customer.id, {
        notificationTokens: customer.notificationTokens,
      });
    }

    return customer;
  }

  findOneByUserId(userId: string) {
    return this.prisma.customer.findUnique({
      where: {
        userId,
      },
    });
  }

  findOneById(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  findAllWithToken = () => {
    return this.prisma.customer.findMany({
      where: {
        notificationTokens: {
          isEmpty: false,
        },
      },
    });
  };

  findAvailableDrivers = (type: DriverType) => {
    return this.prisma.customer.findMany({
      where: { driver: { driverType: type, available: true } },
    });
  };

  async update(id: string, data: UpdateCustomerDto) {
    try {
      const customer = await this.prisma.customer.update({
        where: {
          id,
        },
        data,
      });

      await admin.auth().updateUser(customer.userId, {
        email: customer.email,
        displayName: customer.name,
      });

      return customer;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**This function will delete all of customer's and driver's related data.
   *  Validation: If the customer or driver has an order that is not completed, they won't be able to delete their accounts
   * @param userId
   * @returns
   */
  async deleteCustomer(userId: string) {
    const { id: customerId } = await this.findOneByUserId(userId);

    if (!customerId) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    // Check if the user has a not completed order or not completed delivery
    const activeOrder = await this.prisma.order.findFirst({
      where: {
        OR: [{ customerId }, { driver: { userId } }],
        status: { notIn: [Status.completed, Status.canceled] },
      },
    });

    if (activeOrder) {
      throw new HttpException(
        "There is an active order in progress, account can't be deleted",
        HttpStatus.CONFLICT,
      );
    }

    await admin.auth().deleteUser(userId);

    return this.prisma.customer.delete({
      where: { id: customerId },
      include: { addresses: true, driver: true, Order: true, searches: true },
    });
  }

  async getCYSCredit(customerId: string) {
    const customer = await this.prisma.customer.findUniqueOrThrow({
      where: { id: customerId },
      select: { walletBalance: true },
    });
    return customer.walletBalance;
  }

  async updateWalletBalance(
    customerId: string,
    walletBalance: Decimal,
    type: WalletTransactionType,
  ) {
    if (type === 'increase') {
      return this.prisma.customer.update({
        where: { id: customerId },
        data: {
          walletBalance: {
            increment: walletBalance,
          },
        },
        select: { id: true, walletBalance: true, name: true },
      });
    } else {
      return this.prisma.customer.update({
        where: { id: customerId },
        data: {
          walletBalance: {
            decrement: walletBalance,
          },
        },
        select: { id: true, walletBalance: true, name: true },
      });
    }
  }
}
